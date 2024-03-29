/*
  This file contains the EventController class, which defines the endpoints and logic for handling event-related operations.

  - Libraries:
    - MySql.Data.MySqlClient: Used for interacting with MySQL database.
    - OfficeOpenXml: Used for reading Excel files.

  - Class Attributes:
    - ApiController: Indicates that this class handles HTTP API requests.
    - Route("[controller]"): Specifies the base route for the controller, which is "/Event".

  - Attributes:
    - awsRdsEndpoint: Endpoint for the AWS RDS database.
    - awsRdsDatabase: Name of the AWS RDS database.
    - awsRdsUsername: Username for accessing the AWS RDS database.
    - awsRdsPassword: Password for accessing the AWS RDS database.

  - Methods:
    1. ReadEventFile(): Scans an Excel spreadsheet, creates Event objects from it, and returns an array of Events.
    2. SaveEventsToDatabase(List<Event> events): Saves a list of events to the MySQL database.
    3. ReadEventsFromDatabase(): Retrieves events from the MySQL database.
    4. GetEventById(string id): Retrieves a specific event by its ID from the MySQL database.
    5. callSaveMethods(): Endpoint to call SaveEventsToDatabase method ("IT WORKS...").
    6. EditEvent([FromBody] Event eventData): Edits an existing event in the MySQL database.
    7. DeleteEvent(string id): Deletes an event from the MySQL database by its ID.
    8. AddEventToDatabase([FromBody] Event eventData): Adds a new event to the MySQL database.

  - Event object:
    - Defined using the record keyword.
    - Contains properties: Id, StartDate, EndDate, Time, EventName, Venue, City, Contact, Notes.
*/

using MySql.Data.MySqlClient;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

// All endpoints must start with "/Event"
[ApiController]
[Route("[controller]")]
public class EventController : ControllerBase
{
    private string awsRdsEndpoint = "reactblogdatabase.cf8sld5urrxi.ap-southeast-2.rds.amazonaws.com";
    private string awsRdsDatabase = "dawndatabase";
    private string awsRdsUsername = "admin";
    private string awsRdsPassword = "willawilla";
    // private string awsRdsEndpoint = "dawndatabase.chsgqwkqwl9s.ap-southeast-2.rds.amazonaws.com";
    // private string awsRdsDatabase = "dawndatabase";
    // private string awsRdsUsername = "admin";
    // private string awsRdsPassword = "Thoughthisbemadnessyetthereismethodinit1!";

    // Scans an Excel spreadsheet, creates Event objects from it and returns array of Events 
    public List<Event> ReadEventFile()
    {
        List<Event> events = new List<Event>();

        string filePath = "DawnEventsCopy.xlsx";

        using (ExcelPackage excelFile = new ExcelPackage(new FileInfo(filePath)))
        {
            // Open the worksheet in the excel file (there is only 1)
            ExcelWorksheet worksheet = excelFile.Workbook.Worksheets[0];

            // Get row count for worksheet
            int rows = worksheet.Dimension.Rows;

            // Start at row 2 (ignore headers)
            for (int row = 2; row <= rows; row++)
            {
                // Get cell value at current row and column [?]
                Guid guid = Guid.NewGuid();
                string Id = guid.ToString();
                //string Id = worksheet.Cells[row, 1].GetValue<string>();
                string startD = worksheet.Cells[row, 1].GetValue<string>();
                string endD = worksheet.Cells[row, 2].GetValue<string>();
                string time = worksheet.Cells[row, 3].GetValue<string>();
                string EventName = worksheet.Cells[row, 4].GetValue<string>();
                string venue = worksheet.Cells[row, 5].GetValue<string>();
                string city = worksheet.Cells[row, 6].GetValue<string>();
                string contact = worksheet.Cells[row, 7].GetValue<string>();
                string notes = worksheet.Cells[row, 8].GetValue<string>();

                Event e = new Event(Id, startD, endD, time, EventName, venue, city, contact, notes);
                events.Add(e);
                //Console.WriteLine(e);
            }
        }
        return events;
    }

    public void SaveEventsToDatabase(List<Event> events)
    {
        string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";
        using MySqlConnection connection = new MySqlConnection(connectionString);
        connection.Open();

        // Iterate through array and add to DB.
        foreach (Event e in events)
        {
            string insertQuery = "INSERT INTO eventlist (Id, StartDate, EndDate, Time, EventName, Venue, City, Contact, Notes) VALUES (@Id, @StartDate, @EndDate, @Time, @EventName, @Venue, @City, @Contact, @Notes)";
            using MySqlCommand command = new MySqlCommand(insertQuery, connection);

            command.Parameters.AddWithValue("@Id", e.Id);
            command.Parameters.AddWithValue("@StartDate", e.StartDate);
            command.Parameters.AddWithValue("@EndDate", e.EndDate);
            command.Parameters.AddWithValue("@Time", e.Time);
            command.Parameters.AddWithValue("@EventName", e.EventName);
            command.Parameters.AddWithValue("@Venue", e.Venue);
            command.Parameters.AddWithValue("@City", e.City);
            command.Parameters.AddWithValue("@Contact", e.Contact);
            command.Parameters.AddWithValue("@Notes", e.Notes);
            command.ExecuteNonQuery();
        }
        Console.WriteLine("Data saved to MySQL database.");
    }

    [HttpGet("printevents")]
    public List<Event> ReadEventsFromDatabase()
    {
        List<Event> events = new List<Event>();

        string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";
        using MySqlConnection connection = new MySqlConnection(connectionString);
        connection.Open();

        string query = "SELECT * FROM eventlist";

        using (MySqlCommand command = new MySqlCommand(query, connection))
        {

            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    Event e = new Event(
                        reader.GetString("Id"),
                        reader.GetString("StartDate"),
                        reader.GetString("EndDate"),
                        reader.GetString("Time"),
                        reader.GetString("EventName"),
                        reader.GetString("Venue"),
                        reader.GetString("City"),
                        reader.GetString("Contact"),
                        reader.GetString("Notes")
                    );

                    events.Add(e);
                }
            }
        }
        return events;
    }

    [HttpGet("showById/{id}")]
    public IActionResult GetEventById(string id)
    {
        try
        {
            string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";

            using (MySqlConnection connection = new MySqlConnection(connectionString))
            {
                connection.Open();

                string eventId = id;
                string query = "SELECT * FROM eventlist WHERE Id = @Id";

                using (MySqlCommand command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", eventId);

                    using (MySqlDataReader reader = command.ExecuteReader())
                    {
                        if (reader.Read())
                        {
                            Event eventObj = new Event(
                                reader.GetString("Id"),
                                reader.GetString("StartDate"),
                                reader.GetString("EndDate"),
                                reader.GetString("Time"),
                                reader.GetString("EventName"),
                                reader.GetString("Venue"),
                                reader.GetString("City"),
                                reader.GetString("Contact"),
                                reader.GetString("Notes")
                            );

                            return Ok(eventObj);
                        }
                        else
                        {
                            return NotFound();
                        }
                    }
                }
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Use endpoint "/Event/returnevents" to call this function ("it works")
    [HttpGet("returnevents")]
    public ActionResult<IEnumerable<Event>> callSaveMethods()
    {
        try
        {
            SaveEventsToDatabase(ReadEventFile());

            return Ok("IT WORKS...(EVENT PAGE)");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPut("edit")]
    public IActionResult EditEvent([FromBody] Event eventData)
    {
        try
        {
            string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";
            using MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();

            string updateQuery = "UPDATE eventlist SET StartDate = @StartDate, EndDate = @EndDate, Time = @Time, EventName = @EventName, Venue = @Venue, City = @City, Contact = @Contact, Notes = @Notes WHERE Id = @Id";
            using MySqlCommand command = new MySqlCommand(updateQuery, connection);

            command.Parameters.AddWithValue("@Id", eventData.Id);
            command.Parameters.AddWithValue("@StartDate", eventData.StartDate);
            command.Parameters.AddWithValue("@EndDate", eventData.EndDate);
            command.Parameters.AddWithValue("@Time", eventData.Time);
            command.Parameters.AddWithValue("@EventName", eventData.EventName);
            command.Parameters.AddWithValue("@Venue", eventData.Venue);
            command.Parameters.AddWithValue("@City", eventData.City);
            command.Parameters.AddWithValue("@Contact", eventData.Contact);
            command.Parameters.AddWithValue("@Notes", eventData.Notes);

            command.ExecuteNonQuery();

            return Ok("Data updated successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpDelete("delete/{id}")]
    public IActionResult DeleteEvent(string id)
    {
        try
        {
            string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";
            using MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();

            string eventId = id;

            string deleteQuery = "DELETE FROM eventlist WHERE Id = @Id";
            using MySqlCommand command = new MySqlCommand(deleteQuery, connection);

            command.Parameters.AddWithValue("@Id", eventId);

            int rowsAffected = command.ExecuteNonQuery();

            if (rowsAffected > 0)
            {
                return Ok("Data deleted successfully");
            }
            else
            {
                return NotFound("No matching data found for deletion");
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    [HttpPost("add")]
    public IActionResult AddEventToDatabase([FromBody] Event eventData)
    {
        try
        {
            string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";

            using MySqlConnection connection = new MySqlConnection(connectionString);
            connection.Open();

            string insertQuery = "INSERT INTO eventlist (Id, StartDate, EndDate, Time, EventName, Venue, City, Contact, Notes) " +
                                 "VALUES (@Id, @StartDate, @EndDate, @Time, @EventName, @Venue, @City, @Contact, @Notes)";

            using MySqlCommand command = new MySqlCommand(insertQuery, connection);

            Guid addguid = Guid.NewGuid();
            string addId = addguid.ToString();
            command.Parameters.AddWithValue("@Id", addId);
            command.Parameters.AddWithValue("@StartDate", eventData.StartDate);
            command.Parameters.AddWithValue("@EndDate", eventData.EndDate);
            command.Parameters.AddWithValue("@Time", eventData.Time);
            command.Parameters.AddWithValue("@EventName", eventData.EventName);
            command.Parameters.AddWithValue("@Venue", eventData.Venue);
            command.Parameters.AddWithValue("@City", eventData.City);
            command.Parameters.AddWithValue("@Contact", eventData.Contact);
            command.Parameters.AddWithValue("@Notes", eventData.Notes);

            command.ExecuteNonQuery();

            return Ok("Data added successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Define Event object
    public record Event(string Id, string StartDate, string EndDate, string Time, string EventName, string Venue, string City, string Contact, string Notes)
    {
    }
}