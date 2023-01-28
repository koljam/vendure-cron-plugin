# vendure-cron-plugin
Adds a CRON functionality to Vendure

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