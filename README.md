# Uptimer

> **Status:** This project is no longer maintained. You can still fork it and run
> your own instance. A newer project is available at <https://uptimer.cursor.works>.

<p>
  <a href="https://discord.gg/mnQvdsZx5F"><img src="https://img.shields.io/discord/645980399545221153?color=7289da&logo=discord&logoColor=white" alt="Discord server" /></a>
</p>

## Table of Contents

- [About](#about)
- [Features](#features)
- [Requirements](#requirements)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Project Structure](#project-structure)
- [Bot Usage](#bot-usage)
- [Documentation](#documentation)
- [Queries](#queries)

## About

Uptimer is an open-source Discord bot that keeps your projects online by
periodically pinging their URLs.

## Features

- Tracks project URLs with MongoDB.
- Runs a scheduled ping loop to keep projects alive.
- Discord commands for adding, removing, and listing projects.
- Error logging to a designated Discord channel.

## Requirements

```diff
+ Node Version Requirements: v14+
+ MongoDB (Atlas or self-hosted)
```

You will also need:

- A Discord bot token.
- Access to the server/channel where the bot will post logs.

## Quick Start

1. Clone the repository and install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file:

   ```env
   BOT_TOKEN="your bot token"
   MONGO_URI="your mongo-db uri"
   ```

3. Update `config.json` with your server/channel configuration.
4. Start the bot:

   ```bash
   npm run start
   ```

## Configuration

### Environment Variables

| Variable | Description |
| --- | --- |
| `BOT_TOKEN` | Discord bot token. |
| `MONGO_URI` | MongoDB connection string. |

### `config.json`

| Key | Description |
| --- | --- |
| `default_prefix` | Command prefix (default `,`). |
| `owners` | Discord user IDs with owner-only access. |
| `timeout` | Ping interval in milliseconds. |
| `invite_link` | Bot invite URL. |
| `error_logs` | Channel ID for error logs. |
| `success_logs` | Channel ID for success logs. |
| `disable_fetching` | Skip pinging when `true`. |

## Scripts

| Script | Description |
| --- | --- |
| `npm run start` | Run the bot. |
| `npm run dev` | Run with nodemon for development. |

## Project Structure

```
.
├── commands/            # Discord commands (grouped by category)
├── database/            # Mongoose connection + models
├── docs/                # Architecture and contributor docs
├── events/              # Discord event handlers
├── handlers/            # Command/event loader logic
├── services/            # Runtime services (scheduler, registry)
├── fetchProjects.js     # URL ping implementation
└── index.js             # Application entrypoint
```

## Bot Usage

> The Uptimer Bot on Cursor Gaming is closed. Fork the repository to run your own
> instance if you still want to use the bot.

### Works for [Glitch](https://glitch.com/)

1. Go to your project. Click the share button.

   ![Glitch First](https://github.com/naveenpoddar/uptimer/blob/main/images/glitch-first.png?raw=true)

2. Copy the URL in `Live Site`.

   ![Glitch Second](https://github.com/naveenpoddar/uptimer/blob/main/images/glitch-second.png?raw=true)

3. Join the [Cursor Gaming](https://discord.gg/mnQvdsZx5F) Discord server and go
   to the uptimer channel.

   ![Uptimer Channel](https://github.com/naveenpoddar/uptimer/blob/main/images/uptimer.png?raw=true)

4. Add the URL using: `,add <the url you just copied>`.

### Works for [Repl](http://repl.it/)

1. Go to your project. If your project looks like this and it doesn't have the
   browser window, continue the steps. If you already have a browser window in
   the top right corner skip to step 3.

   ![Repl](https://github.com/naveenpoddar/uptimer/blob/main/images/repl-first.png?raw=true)

2. Create an Express app if needed:

   ```js
   const express = require("express");
   const app = express();
   const port = 3000;

   app.get("/", (req, res) => {
     res.send("Hello World!");
   });

   app.listen(port, () => {
     console.log(`Example app listening at Port: ${port}`);
   });
   ```

3. Click `Run`. If already running, stop it and run again. You should see a
   browser window in the top right corner.
4. Copy the URL in the browser window.

   ![Repl Second](https://github.com/naveenpoddar/uptimer/blob/main/images/repl-second.png?raw=true)

5. Join the [Cursor Gaming](https://discord.gg/mnQvdsZx5F) Discord server and go
   to the uptimer channel.

   ![Uptimer Channel](https://github.com/naveenpoddar/uptimer/blob/main/images/uptimer.png?raw=true)

6. Add the URL using: `,add <the url you just copied>`.

## Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)

## Queries?

If you have any questions regarding this project, or you are not able to use
this bot, feel free to ask in our Discord server [Cursor Gaming](https://discord.gg/mnQvdsZx5F).
