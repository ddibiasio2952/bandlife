# BandLife

BandLife is a browser-based, single-player text adventure in which players form a band and make decisions that shape their career.

Players encounter events with multiple choices. Each choice produces an outcome and can modify profile attributes such as band membership, employment, income, popularity, and listeners.

The project is inspired by the decision-based gameplay of *NationStates*, adapted into a single-player experience centered on the challenges and opportunities of life as a musician.

## Current Features

* User registration, login, and logout
* Cookie-based authentication with ASP.NET Core Identity
* Role-based authorization for users, moderators, and administrators
* Persistent user profiles stored in SQL Server
* Event prompts with multiple selectable options
* Outcomes that are added to the player’s ongoing status history
* Profile changes based on selected event options, including:

  * Band members
  * Employment
  * Job income
  * Band income
  * Popularity
  * Listeners
* Event creation, retrieval, and modification via Moderator / Admin portal
* Protected pages and API endpoints
* Desktop browser-based interface

## How Events Work

Each event contains a description and one or more options. Every option has its own outcome and set of profile modifiers.

When a player selects an option:

1. The frontend sends the selected event and option IDs to the API.
2. The backend confirms that the option belongs to the specified event.
3. The option’s modifiers are applied to the authenticated user.
4. The outcome is added to the user’s status history.
5. The updated profile is saved to the database.

This validation and profile-update logic is handled by the backend so that users cannot directly manipulate their profile values through the browser.

## Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript
* ES modules
* Fetch API

### Backend

* C#
* ASP.NET Core Web API
* ASP.NET Core Identity
* Entity Framework Core
* Role-based authorization

### Database

* Microsoft SQL Server
* Entity Framework Core migrations

### Development Tools

* Visual Studio
* Swagger / OpenAPI
* SQL Server Management Studio
* Git and GitHub

## Data Model

The event system uses a parent-child relationship:

* An `Event` represents the scenario presented to the player.
* An `EventOption` represents one possible response and its resulting modifiers.
* Each event can contain multiple event options.
* Each event option belongs to one event.

User accounts are managed through ASP.NET Core Identity and extended with game-specific profile properties.

## Project Structure

```text
## Project Structure

```text
BandLife/
├── Authorization/     Role definitions
├── Controllers/       API controllers and endpoint logic
├── Data/              Entity Framework Core database context and configuration
├── Migrations/        Entity Framework Core database migrations
├── Models/
│ ├── Domain/          Database entities and domain models
│ └── DTOs/            API request and response models
│     └── Events/      Event creation, update, and response DTOs
├── ProtectedPages/    Pages restricted by authentication or user role
├── Sql/               SQL scripts and database-related resources
├── wwwroot/
│   ├── assets/        Icons and images
│   ├── css/           Stylesheets
│   ├── js/            JavaScript modules
│   ├── pages/         Application pages
│   └── templates/     Template pages
├── Program.cs         Application configuration
└── appsettings.json   Application and database settings
```

The exact folder names may vary as development continues.

## Getting Started

### Prerequisites

To run BandLife locally, you will need:

* .NET 10 SDK
* Microsoft SQL Server
* SQL Server Management Studio or another SQL client
* A modern web browser
* Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/ddibiasio2952/bandlife.git
cd bandlife
```

2. Update the database connection string in `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnectionString": "Your SQL Server connection string"
  }
}
```

3. Apply the Entity Framework Core migrations:

```bash
dotnet ef database update
```

4. Start the application:

```bash
dotnet run
```

5. Open the local HTTPS URL displayed in the terminal.

The exact port may differ depending on the development environment.

## API Documentation

When the application is running in the development environment, Swagger can be used to inspect and test the available API endpoints.

Navigate to:

```text
https://localhost:<port>/swagger
```

Some endpoints require an authenticated account or a specific Identity role.

## Project Status

BandLife is currently under active development.

Planned improvements include:

* Additional events and outcomes
* More detailed band progression
* Additional administrative tools
* Further interface and accessibility improvements

## Purpose

BandLife is a portfolio project created to demonstrate experience with:

* Full-stack web development
* REST API design
* Authentication and authorization
* Relational database design
* Entity Framework Core
* Asynchronous JavaScript
* Client-server communication
* Input validation and error handling

## License

All rights reserved.

This repository is provided for portfolio and demonstration purposes. The source code may be viewed, but it may not be copied, modified, redistributed, or used in another project without permission.

### Author
Daniel DiBiasio

[GitHub](https://github.com/ddibiasio2952/)
