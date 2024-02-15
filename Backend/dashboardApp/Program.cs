/*
  This file configures the ASP.NET Core application, including setting up controllers, enabling CORS (Cross-Origin Resource Sharing), and configuring the HTTP request pipeline.

  - Libraries:
    - Microsoft.AspNetCore.Builder: Used for configuring the application's request pipeline.
    - Microsoft.Extensions.DependencyInjection: Used for configuring services in the application.
    - Microsoft.Extensions.Hosting: Used for hosting the application.

  - WebApplication:
    - CreateBuilder(args): Creates a new instance of the WebApplication builder.

  - ConfigureServices():
    - Adds controllers to the service collection.
    - Configures CORS policies to allow requests from a specified origin (React app).

  - Configure():
    - Configures the HTTP request pipeline.
    - Uses DeveloperExceptionPage in development environment.
    - Enables CORS with the specified policy.
    - Enables routing and authorization.
    - Maps controllers to routes.

  - Run():
    - Runs the application.

  - CORS Policy:
    - Name: "AllowReactApp".
    - Allows requests from "http://localhost:3000" (React app).
    - Allows any HTTP method and headers.

  Note: HTTPS redirection is commented out in this configuration.
*/

using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

// Configure controller class
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Allow requests from React app
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

// Build app
var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

//app.UseHttpsRedirection();
app.UseCors("AllowReactApp");

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

app.Run();
