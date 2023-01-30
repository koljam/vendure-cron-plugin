import { EventBus, Type, VendureEvent } from '@vendure/core';
import { PluginInitOptions as CronInitOptions } from './types';
import { OnApplicationBootstrap } from '@nestjs/common';
export declare class CronEvent extends VendureEvent {
    readonly taskId: string;
    constructor(taskId: string);
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
export declare class CronPlugin implements OnApplicationBootstrap {
    private eventBus;
    static options: CronInitOptions;
    /** @internal */
    constructor(eventBus: EventBus);
    static init(options: CronInitOptions): Type<CronPlugin>;
    onApplicationBootstrap(): Promise<void>;
}
