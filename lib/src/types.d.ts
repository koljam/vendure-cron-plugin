/**
 * The plugin can be configured using the following options:
 */
export interface Job {
    schedule: string;
    task?: () => void;
    taskId?: string;
}
export interface PluginInitOptions {
    cron: Job[];
    logEvents?: boolean;
}
