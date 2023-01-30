import {
	EventBus,
	PluginCommonModule,
	Type,
	VendurePlugin,
	VendureEvent,
} from "@vendure/core";
import {Job, PluginInitOptions} from "./types";
import * as cron from "node-cron";

export class CronEvent extends VendureEvent {
	constructor(public readonly taskId: string) {
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
    static eventBus: EventBus;
	constructor(private eventBus: EventBus) {
        this.eventBus = eventBus;
    }

	static init(options: PluginInitOptions): Type<CronPlugin> {
		CronPlugin.options = options;
        CronPlugin.options.cron.forEach(job => {
            cron.schedule(job.schedule, () => {
                if (job.task) job.task();
                if (job.taskId) {
                    this.runJob(job);
                }
            });
        });
		return this;
	}

	static runJob(job: Job) {
        console.log("Firing Event")
		this.eventBus.publish(new CronEvent(job.taskId));
	}

	async onApplicationBootstrap() {
		this.eventBus.ofType(CronEvent).subscribe(event => {
			// Logger.info(`Cron Event "${event.taskId}" fired`, "CronPlugin");
			console.log(`Cron Event "${event.taskId}" fired`);
		});
	}
}
