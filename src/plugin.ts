import { PluginCommonModule, Type, VendurePlugin } from '@vendure/core';
import { PluginInitOptions } from './types';
import * as cron from 'node-cron';

/**
 * An example Vendure plugin.
 *
 * @example
 * ```TypeScript
 * export const config: VendureConfig = {
 *   //...
 *   plugins: [
 *     CronPlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */

@VendurePlugin({
    imports: [PluginCommonModule],
})
export class CronPlugin {
    static options: PluginInitOptions;

    static init(options: PluginInitOptions): Type<CronPlugin> {
        this.options = options;
        this.options.cron.forEach(job => {
            cron.schedule(job.schedule, job.task);
        });
        console.log("Cron-Jobs started");
        return CronPlugin;
    }
}