import { DefaultJobQueuePlugin, dummyPaymentHandler, VendureConfig } from '@vendure/core';
import { AssetServerPlugin } from '@vendure/asset-server-plugin';
import path from 'path';
import { CronPlugin } from '../index';
import { compileUiExtensions } from '@vendure/ui-devkit/compiler';
import { YourPlugin } from './plugin';

export const headlessConfig: VendureConfig = {
    apiOptions: {
        port: 3000,
        adminApiPath: 'admin-api',
        adminApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        }, // turn this off for production
        adminApiDebug: true, // turn this off for production
        shopApiPath: 'shop-api',
        shopApiPlayground: {
            settings: {
                'request.credentials': 'include',
            } as any,
        }, // turn this off for production
        shopApiDebug: true, // turn this off for production
    },
    authOptions: {
        superadminCredentials: {
            identifier: 'superadmin',
            password: 'superadmin',
        },
        cookieOptions: {
            secret: 'v5evpqy0rn',
        },
    },
    dbConnectionOptions: {
        type: 'mariadb',
        // See the README.md "Migrations" section for an explanation of
        // the `synchronize` and `migrations` options.
        synchronize: true,
        migrations: [path.join(__dirname, './migrations/*.+(js|ts)')],
        logging: false,
        database: 'vendure',
        host: 'localhost',
        port: +(process.env.DB_PORT || 3306),
        username: 'root',
        password: 'password',
    },
    paymentOptions: {
        paymentMethodHandlers: [dummyPaymentHandler],
    },
    customFields: {},
    plugins: [
        AssetServerPlugin.init({
            route: 'assets',
            assetUploadDir: path.join(__dirname, './static/assets'),
        }),
        DefaultJobQueuePlugin,
        CronPlugin.init({
            cron: [
                {
                    schedule: '*/1 * * * *',
                    task: () => {
                        console.log('Running task every 1 minutes');
                    },
                    taskId: 'task1',
                },
            ],
            logEvents: false,
        }),
        YourPlugin,
    ],
};

export const config: VendureConfig = {
    ...headlessConfig,
    plugins: [...(headlessConfig.plugins || [])],
};
