using MySql.Data.MySqlClient;
using OfficeOpenXml;
using System;
using System.Collections.Generic;
using System.IO;

public class Controller
{
    public Controller()
    {
    }

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
                string what = worksheet.Cells[row, 4].GetValue<string>();
                string venue = worksheet.Cells[row, 5].GetValue<string>();
                string city = worksheet.Cells[row, 6].GetValue<string>();
                string contact = worksheet.Cells[row, 7].GetValue<string>();
                string notes = worksheet.Cells[row, 8].GetValue<string>();

                Event e = new Event(startD, endD, time, what, venue, city, contact, notes);
                events.Add(e);
                //Console.WriteLine(e);
            }
        }
        return events;
    }

    public void SaveToDatabase(List<Event> events)
    {

        string connectionString = "Server=localhost;Database=test;User Id=root;Password=";
        using MySqlConnection connection = new MySqlConnection(connectionString);
        connection.Open();

        foreach (Event e in events)
        {
            string insertQuery = "INSERT INTO dawndb (StartDate, EndDate, Time, What, Venue, City, Contact, Notes) VALUES (@StartDate, @EndDate, @Time, @What, @Venue, @City, @Contact, @Notes)";
            using MySqlCommand command = new MySqlCommand(insertQuery, connection);

            command.Parameters.AddWithValue("@StartDate", e.StartDate);
            command.Parameters.AddWithValue("@EndDate", e.EndDate);
            command.Parameters.AddWithValue("@Time", e.Time);
            command.Parameters.AddWithValue("@What", e.What);
            command.Parameters.AddWithValue("@Venue", e.Venue);
            command.Parameters.AddWithValue("@City", e.City);
            command.Parameters.AddWithValue("@Contact", e.Contact);
            command.Parameters.AddWithValue("@Notes", e.Notes);


            command.ExecuteNonQuery();
        }
        Console.WriteLine("Data saved to MySQL database.");

    }

    public List<Event> readFromDatabase()
    {
        List<Event> events = new List<Event>();

        string connectionString = "Server=localhost;Database=test;User Id=root;Password=";
        using MySqlConnection connection = new MySqlConnection(connectionString);

        string query = "SELECT * FROM dawndb";

        using (MySqlCommand command = new MySqlCommand(query, connection))
        {
            connection.Open();
            using (MySqlDataReader reader = command.ExecuteReader())
            {
                while (reader.Read())
                {
                    Event e = new Event(
                        reader.GetString("StartDate"),
                        reader.GetString("EndDate"),
                        reader.GetString("Time"),
                        reader.GetString("What"),
                        reader.GetString("Venue"),
                        reader.GetString("City"),
                        reader.GetString("Contact"),
                        reader.GetString("Notes");
                    );
                    events.Add(e);
                }
            }
        }
        for (Event e in events)
        {
            Console.WriteLine(e.StartDate);
            Console.WriteLine(e.EndDate);
            Console.WriteLine(e.Time);
            Console.WriteLine(e.What);
            Console.WriteLine(e.Venue);
            Console.WriteLine(e.City);
            Console.WriteLine(e.Contact);
            Console.WriteLine(e.Notes);

        }
        return events;
    }



    // Define Event object
    public record Event(string StartDate, string EndDate, string Time, string What, string Venue, string City, string Contact, string Notes)
    {
    }

}