'use strict'

const App = ((() => {
  // Load in required libs
  const Canvas = require('drawille')
  const blessed = require('blessed')
  const os = require('os')
  const cli = require('commander')
  const upgrade = require('./upgrade.js')
  const VERSION = require('./package.json').version
  const childProcess = require('child_process')
  const glob = require('glob')
  const path = require('path')
  let themes = ''
  let program = blessed.program()

  const files = glob.sync(path.join(__dirname, 'themes', '*.json'))
  for (var i = 0; i < files.length; i++) {
    let themeName = files[i].replace(path.join(__dirname, 'themes') + path.sep, '').replace('.json', '')
    themes += `${themeName}|`
  }
  themes = themes.slice(0, -1)

  // Set up the commander instance and add the required options
  cli
    .option('-t, --theme  [name]', `set the vtop theme [${themes}]`, 'parallax')
    .option('--no-mouse', 'Disables mouse interactivity')
    .option('--quit-after [seconds]', 'Quits vtop after interval', '0')
    .option('--update-interval [milliseconds]', 'Interval between updates', '300')
    .version(VERSION)
    .parse(process.argv)

  /**
   * Instance of blessed screen, and the charts object
   */
  let screen
  const charts = []
  let loadedTheme
  const intervals = []

  let upgradeNotice = false
  let disableTableUpdate = false
  let disableTableUpdateTimeout = setTimeout(() => {}, 0)

  let graphScale = 1

  // Private variables

  /**
   * This is the number of data points drawn
   * @type {Number}
   */
  let position = 0

  const size = {
    pixel: {
      width: 0,
      height: 0
    },
    character: {
      width: 0,
      height: 0
    }
  }

  // @todo: move this into charts array
  // This is an instance of Blessed Box
  let graph

  let graph2
  let processList
  let processListSelection


})())

App.init()