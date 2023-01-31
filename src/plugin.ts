import {
    EventBus,
    PluginCommonModule,
    RequestContext,
    RequestContextService,
    Type,
    VendureEvent,
    VendurePlugin,
} from '@vendure/core';
import path from 'path';

import { loggerCtx, PLUGIN_INIT_OPTIONS } from './constants';
import { Job, PluginInitOptions as CronInitOptions } from './types';
import { Logger, OnApplicationBootstrap } from '@nestjs/common';
import * as cron from 'node-cron';
import { setProcessContext } from '@vendure/core/dist/process-context/process-context';

export class CronEvent extends VendureEvent {
    constructor(public readonly taskId: string, public ctx: RequestContext) {
        super();
    }
}
/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     ExamplePlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
@VendurePlugin({
    imports: [PluginCommonModule],
})
export class CronPlugin implements OnApplicationBootstrap {
    static options: CronInitOptions = { cron: [], logEvents: false };

    /** @internal */
    constructor(private eventBus: EventBus, private requestContextService: RequestContextService) {}

    static init(options: CronInitOptions): Type<CronPlugin> {
        this.options = options;
        return this;
    }

    async onApplicationBootstrap() {
        CronPlugin.options.cron.forEach((job: Job) => {
            if (!job.task && !job.taskId) {
                Logger.error(
                    'Please provide either a task function or a taskId to run a cronjob.',
                    loggerCtx,
                );
                return;
            }
            cron.schedule(job.schedule, async () => {
                if (job.task) job.task();
                if (job.taskId) {
                    if (CronPlugin.options.logEvents) {
                        Logger.log('Firing Event', loggerCtx);
                    }
                    const ctx = await this.requestContextService.create({
                        apiType: 'admin',
                    });
                    this.eventBus.publish(new CronEvent(job.taskId, ctx));
                }
            });
        });
        if (CronPlugin.options.logEvents) {
            this.eventBus.ofType(CronEvent).subscribe((event) => {
                Logger.log(`Cron Event "${event.taskId}" fired`, loggerCtx);
            });
        }
    }
}
