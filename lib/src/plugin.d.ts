import { EventBus, Type, VendureEvent } from "@vendure/core";
import { Job, PluginInitOptions } from "./types";
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
 *     CronPlugin.init({
 *       // options
 *     }),
 *   ]
 * }
 * ```
 */
export declare class CronPlugin {
    private eventBus;
    static options: PluginInitOptions;
    static eventBus: EventBus;
    constructor(eventBus: EventBus);
    static init(options: PluginInitOptions): Type<CronPlugin>;
    static runJob(job: Job): void;
    onApplicationBootstrap(): Promise<void>;
}
