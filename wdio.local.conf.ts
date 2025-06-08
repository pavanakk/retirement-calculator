import { config as sharedConfig } from './wdio.shared.conf.js'

export const config: WebdriverIO.Config = {
    ...sharedConfig,
    ...{
        maxInstances: 1,
        capabilities: [{
            browserName: 'chrome',
            'goog:chromeOptions': {
                args: ['disable-gpu']
            }
        }]
    }
}
