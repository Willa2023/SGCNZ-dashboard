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
                string what = worksheet.Cells[row, 3].GetValue<string>();
                string venue = worksheet.Cells[row, 4].GetValue<string>();
                string city = worksheet.Cells[row, 5].GetValue<string>();
                string contact = worksheet.Cells[row, 6].GetValue<string>();

                Event e = new Event(startD, endD, what, venue, city, contact);
                events.Add(e);
            }
        }
        return events;
    }

    // Define Event object
    public record Event(string startDate, string endDate, string what, string venue, string city, string contact)
    {
    }
}