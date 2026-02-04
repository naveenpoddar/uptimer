# Architecture Overview

This document explains how Uptimer is wired together so that new contributors can
orient themselves quickly.

## Runtime Flow

1. **Startup** (`index.js`)
   - Loads environment variables.
   - Connects to MongoDB.
   - Builds the Discord client and caches existing project URLs.
   - Loads command and event handlers.
   - Logs into Discord and starts the ping scheduler.
2. **Ping scheduler** (`services/pingScheduler.js`)
   - Updates the project count and bot activity.
   - Pings tracked URLs on a fixed interval.
3. **Commands** (`commands/uptime/*.js`)
   - `add` / `remove` manage monitored URLs.
   - `projects`, `stats`, and others provide visibility into tracked projects.

## Key Modules

| Module | Responsibility |
| --- | --- |
| `services/loadHandlers.js` | Loads command and event handlers. |
| `services/projectRegistry.js` | Manages cached project URLs and counts. |
| `services/pingScheduler.js` | Orchestrates periodic pings and activity updates. |
| `handlers/command.js` | Registers commands and aliases. |
| `handlers/events.js` | Registers Discord events. |
| `fetchProjects.js` | Pings URLs and updates error states. |

## Data Flow

- **MongoDB** stores each monitored URL, the author ID, error state, and ping count.
- **Client cache** stores a lightweight list of URLs (`client.projects`) used by the ping scheduler.
- **Config** (`config.json`) controls prefixes, ping intervals, and log channels.

## Adding a New Command

1. Create a new file in `commands/uptime/`.
2. Export `name`, `description`, and a `run` function.
3. The command will be auto-registered by the command handler.

## Adding a New Event

1. Create a new file in `events/`.
2. Export an optional `event` name and a `run` handler.
3. The event will be auto-registered by the event handler.
