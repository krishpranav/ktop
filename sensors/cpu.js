'use strict'
/**
 * 
 * CPU USAGE SENSOR
 */
'use strict'

const os = require('os-utils')
const plugin = {
    // this appears in the title of the graph
    title = 'CPU Usage',
    /**
     * @type {String}
     */
    type: 'chart',
    /**
     * The default interval time in ms that this plugin should be polled
     * more costyle bench marks should be polled less
     */
    interval: 200,

    initialized: false,

    currentValue: 0,
    /**
     * grab the current value from 0 to 100
     */
    poll () {
        os.cpuUsage(v => {
            plugin.currentValue = (Math.floor(v * 100))
            plugin.initialized = true
        })
    }
}

module.exports = exports = plugin