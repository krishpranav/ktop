/**
 * Memory Usage Sensor
 *
 */
'use strict'

const os = require('os-utils')
const _os = require('os')
const child = require('child_process')

const plugin = {
    /**
     * This appears in the title of the graph
     */
    title: 'Memory Usage',
    /**
     * The Type Of Sensor
     * @type {String}
     */
    type: 'chart',
    /**
     * The Default Interval Time In Ms That This Plugin Should Be Polled
     * More Costly Benchmarks Should Be Polled Less Frequenty.
     */
    interval: 200,

    initialized: false,

    currentValue: 0,

    isLinux: _os.platform().includes('linux'),

    isMac: _os.platform().includes('darwin'),

}