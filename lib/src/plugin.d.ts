import { Type } from '@vendure/core';
import { PluginInitOptions } from './types';
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
export declare class CronPlugin {
    static options: PluginInitOptions;
    static init(options: PluginInitOptions): Type<CronPlugin>;
}
