import { OnApplicationBootstrap } from '@nestjs/common';
import { PluginCommonModule, VendurePlugin, EventBus } from '@vendure/core';
import { CronEvent } from '../src/plugin';

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
