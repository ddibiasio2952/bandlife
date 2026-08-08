# BandLife

A browser-based text adventure game where you simulate life as a musician in a band. Make choices that affect your band’s success, relationships, finances, and reputation.

Inspired by the decision-making style of NationStates, but focused on single-player storytelling with no multiplayer features or message boards.

## Features

- Text-based choice system
- Simulate different aspects of band life (gigs, recording, member conflicts, fame, etc.)
- Persistent progress using a SQL database
- Clean, responsive web interface

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** ASP.NET Core, C#
- **Database:** SQL Server

## Getting Started

### Prerequisites
- .NET SDK (version used in the project)
- SQL Server (LocalDB or full instance)
- A modern web browser

### Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ddibiasio2952/bandlife.git
2. Update the connection string in appsettings.json to point to your SQL Server instance.
3. Run the database script (if included) or apply migrations.
4. Start the application
   ```bash
   dotnet run
5. Open your browser and navigate to the local URL shown in the terminal (usually https://localhost:5001 or similar).

### Project Structure

- /Controllers – API and page controllers
- /Models – Data models
- /wwwroot – Frontend files (HTML, CSS, JS)
- /Sql – Database context
- /Migrations - Database migrations

### License
All rights reserved.

This project is for portfolio purposes only. Please do not copy, modify, or redistribute the code.

### Author
Daniel DiBiasio

[GitHub](https://github.com/ddibiasio2952/)
