# Cron Plugin for Vendure
Adds a simple CRON functionality to Vendure. This can be used to run functions regularly, like checking shipment apis, raise prices every month, export data etc.

## Overview

The Vendure Cron Plugin provides the ability to run specified tasks at specific times, using cron-style scheduling. **This plugin works by firing events at predefined intervals, which you can subscribe to.**

To use the plugin, the following steps should be taken:

1. Install the plugin with a package manager.
2. Add the plugin to the Vendure configuration file.
3. Define a taskId for your CronEvent, which you can use to identify the CronEvent.
4. Write a plugin which listens for the CronEvent and checks if the taskId matches.

## Usage

### Configuration

```
export const config: VendureConfig = {
    // ...
    plugins: [
        CronPlugin.init({
            cron: [
                {
                    schedule: '0 0 * * *',
                    taskId: 'midnightBackup'
                },
                {
                    schedule: '*/5 * * * *',
                    task: () => {
                        console.log('Running task every 5 minutes');
                    }
                }
            ],
            logEvents: true //Turn on the logging whenever an event is fired (for debugging)
        }),
    ]
}
```

For more information on the scheduling, visit the [node-cron](https://github.com/kelektiv/node-cron) docs.

### Your Plugin

```
import { OnApplicationBootstrap } from '@nestjs/common';
import { PluginCommonModule, VendurePlugin, EventBus } from '@vendure/core';
import { CronEvent } from 'vendure-cron-plugin';

@VendurePlugin({
    imports: [PluginCommonModule],
})
export class YourPlugin implements OnApplicationBootstrap {
    constructor(private eventBus: EventBus) {}

    async onApplicationBootstrap() {
        this.eventBus.ofType(CronEvent).subscribe((event) => {
            console.log(`Cron Event "${event.taskId}" fired`);
            // Perform any tasks here in response to the fired event
        });
    }
}
```


## Development Server

A development server is configured in the `dev-server` folder, using [Docker](https://www.docker.com/) and [Docker Compose](https://docs.docker.com/compose/) to spin up a Postgres database, as well as a server and worker.  This is used to test the plugin during development.

To start the server, run:

```bash
yarn dev:run
```

To populate or reset the database, run the following command:

```bash
yarn dev:populate
```

To restart the server (only) after a change, use the following command:

```bash
yarn dev:restart
```

Note: The Docker containers must be rebuilt when updating dependencies.  Use the following command:

```bash
yarn dev:rebuild
```
