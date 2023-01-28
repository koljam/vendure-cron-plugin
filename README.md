# vendure-cron-plugin
Adds a simple CRON functionality to Vendure. This can be used to run functions regularly, like checking shipment apis, raise prices every month, export data etc.

## Usage

```
export const config: VendureConfig = {
    // ...
    plugins: [
        CronPlugin.init({
            cron: [
                {
                    schedule: '*/5 * * * *',
                    task: () => {
                        console.log('Running task every 5 minutes');
                    }
                },
                {
                    schedule: '0 0 * * *',
                    task: midnightFunction
                }
            ]
        }),
    ]
}
```

For more information on the scheduling, visit the [node-cron](https://github.com/kelektiv/node-cron) docs.