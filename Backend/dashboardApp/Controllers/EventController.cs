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

    // Scans an Excel spreadsheet, creates Event objects from it and returns array of Events 
    public List<Event> ReadFile()
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
                string startD = worksheet.Cells[row, 1].GetValue<string>();
                string endD = worksheet.Cells[row, 2].GetValue<string>();
                string time = worksheet.Cells[row, 3].GetValue<string>();
                string EventName = worksheet.Cells[row, 4].GetValue<string>();
                string venue = worksheet.Cells[row, 5].GetValue<string>();
                string city = worksheet.Cells[row, 6].GetValue<string>();
                string contact = worksheet.Cells[row, 7].GetValue<string>();
                string notes = worksheet.Cells[row, 8].GetValue<string>();

                Event e = new Event(startD, endD, time, EventName, venue, city, contact, notes);
                events.Add(e);
                //Console.WriteLine(e);
            }
        }
        return events;
    }

    public void SaveToDatabase(List<Event> events)
    {
        string awsRdsEndpoint = "reactblogdatabase.cf8sld5urrxi.ap-southeast-2.rds.amazonaws.com";
        string awsRdsDatabase = "dawndatabase";
        string awsRdsUsername = "admin";
        string awsRdsPassword = "willawilla";

        string connectionString = $"Server={awsRdsEndpoint};Database={awsRdsDatabase};User Id={awsRdsUsername};Password={awsRdsPassword}";
        using MySqlConnection connection = new MySqlConnection(connectionString);
        connection.Open();

        // Iterate through array and add to DB.
        foreach (Event e in events)
        {
            string insertQuery = "INSERT INTO eventlist (StartDate, EndDate, Time, EventName, Venue, City, Contact, Notes) VALUES (@StartDate, @EndDate, @Time, @EventName, @Venue, @City, @Contact, @Notes)";
            using MySqlCommand command = new MySqlCommand(insertQuery, connection);

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
    public List<Event> ReadFromDatabase()
    {
        List<Event> events = new List<Event>();

        string awsRdsEndpoint = "reactblogdatabase.cf8sld5urrxi.ap-southeast-2.rds.amazonaws.com";
        string awsRdsDatabase = "dawndatabase";
        string awsRdsUsername = "admin";
        string awsRdsPassword = "willawilla";

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
                        reader.GetString("StartDate"),
                        reader.GetString("EndDate"),
                        reader.GetString("Time"),
                        reader.GetString("EventName"),
                        reader.GetString("Venue"),
                        reader.GetString("City"),
                        reader.GetString("Contact"),
                        " "
                    // reader.GetString("Notes")
                    );
                    events.Add(e);
                }
            }
        }
        /**    foreach (Event e in events)
            {
                Console.WriteLine(e.StartDate);
                Console.WriteLine(e.EndDate);
                Console.WriteLine(e.Time);
                Console.WriteLine(e.EventName);
                Console.WriteLine(e.Venue);
                Console.WriteLine(e.City);
                Console.WriteLine(e.Contact);
                Console.WriteLine(e.Notes);
            } **/
        return events;
    }

    // Use endpoint "/Event/returnevents" to get this function ("it works")
    [HttpGet("returnevents")]
    public ActionResult<IEnumerable<Event>> SendDataToFrontend()
    {
        try
        {
            // List<Event> events = ReadFromDatabase();
            return Ok("IT WORKS...");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

    // Define Event object
    public record Event(string StartDate, string EndDate, string Time, string EventName, string Venue, string City, string Contact, string Notes)
    {
    }
}