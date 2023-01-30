import { EventBus, RequestContext, RequestContextService, Type, VendureEvent } from '@vendure/core';
import { PluginInitOptions as CronInitOptions } from './types';
import { OnApplicationBootstrap } from '@nestjs/common';
export declare class CronEvent extends VendureEvent {
    readonly taskId: string;
    ctx: RequestContext;
    constructor(taskId: string, ctx: RequestContext);
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
    private requestContextService;
    static options: CronInitOptions;
    /** @internal */
    constructor(eventBus: EventBus, requestContextService: RequestContextService);
    static init(options: CronInitOptions): Type<CronPlugin>;
    onApplicationBootstrap(): Promise<void>;
}
