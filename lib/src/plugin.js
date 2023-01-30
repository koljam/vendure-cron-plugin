"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var CronPlugin_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronPlugin = exports.CronEvent = void 0;
const core_1 = require("@vendure/core");
const constants_1 = require("./constants");
const common_1 = require("@nestjs/common");
const cron = __importStar(require("node-cron"));
class CronEvent extends core_1.VendureEvent {
    constructor(taskId) {
        super();
        this.taskId = taskId;
    }
}
exports.CronEvent = CronEvent;
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
let CronPlugin = CronPlugin_1 = class CronPlugin {
    /** @internal */
    constructor(eventBus) {
        this.eventBus = eventBus;
    }
    static init(options) {
        this.options = options;
        return this;
    }
    async onApplicationBootstrap() {
        CronPlugin_1.options.cron.forEach((job) => {
            cron.schedule(job.schedule, () => {
                if (job.task)
                    job.task();
                if (job.taskId) {
                    if (CronPlugin_1.options.logEvents) {
                        common_1.Logger.log('Firing Event', constants_1.loggerCtx);
                    }
                    this.eventBus.publish(new CronEvent(job.taskId));
                }
            });
        });
        if (CronPlugin_1.options.logEvents) {
            this.eventBus.ofType(CronEvent).subscribe((event) => {
                common_1.Logger.log(`Cron Event "${event.taskId}" fired`, constants_1.loggerCtx);
            });
        }
    }
};
CronPlugin.options = { cron: [], logEvents: false };
CronPlugin = CronPlugin_1 = __decorate([
    core_1.VendurePlugin({
        imports: [core_1.PluginCommonModule],
    }),
    __metadata("design:paramtypes", [core_1.EventBus])
], CronPlugin);
exports.CronPlugin = CronPlugin;
//# sourceMappingURL=plugin.js.map