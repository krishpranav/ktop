'use strict'

const os = require('os')
const childProcess = require('child_process')

const plugin = {
    /**
     * This appears in the title of the graph
     */
    title: 'Process List',
    description: `
       This returns a process list, grouped by executable name. CPU % is divided by the number of cores.
       100% CPU Usage is all cores being maxed out. Unlike other tools that define the maximum as 800% for 8 cores for example.`,

    /**
     * the type of sensor
     * @type {String}
     */
    type: 'table',
    
    interval: 2000,

    initialized: false,

    sort: 'cpu',

    columns: ['Command', 'CPU %', 'Count', 'Memory %'],
    currentValue: [{
    'Command': 'Google Chrome',
    'Count': '4',
    'CPU %': '0.4',
    'Memory %': '1'
    }, {
    'Command': 'Sublime Text 2',
    'Count': '1',
    'CPU %': '0.1',
    'Memory': '5'
    }],
}