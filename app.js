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

  // Private functions

  /**
   * Draw header
   * @param  {string} left  This is the text to go on the left
   * @param  {string} right This is the text for the right
   * @return {void}
   */
  const drawHeader = () => {
    let headerText
    let headerTextNoTags
    if (upgradeNotice) {
      upgradeNotice = `${upgradeNotice}`
      headerText = ` {bold}vtop{/bold}{white-fg} for ${os.hostname()} {red-bg} Press 'u' to upgrade to v${upgradeNotice} {/red-bg}{/white-fg}`
      headerTextNoTags = ` vtop for ${os.hostname()}  Press 'u' to upgrade to v${upgradeNotice} `
    } else {
      headerText = ` {bold}vtop{/bold}{white-fg} for ${os.hostname()} `
      headerTextNoTags = ` vtop for ${os.hostname()} `
    }

    const header = blessed.text({
      top: 'top',
      left: 'left',
      width: headerTextNoTags.length,
      height: '1',
      fg: loadedTheme.title.fg,
      content: headerText,
      tags: true
    })
    const date = blessed.text({
      top: 'top',
      right: 0,
      width: 9,
      height: '1',
      align: 'right',
      content: '',
      tags: true
    })
    const loadAverage = blessed.text({
      top: 'top',
      height: '1',
      align: 'center',
      content: '',
      tags: true,
      left: Math.floor(program.cols / 2 - (28 / 2))
    })
    screen.append(header)
    screen.append(date)
    screen.append(loadAverage)

    const zeroPad = input => (`0${input}`).slice(-2)

    const updateTime = () => {
      const time = new Date()
      date.setContent(`${zeroPad(time.getHours())}:${zeroPad(time.getMinutes())}:${zeroPad(time.getSeconds())} `)
      screen.render()
    }

    const updateLoadAverage = () => {
      const avg = os.loadavg()
      loadAverage.setContent(`Load Average: ${avg[0].toFixed(2)} ${avg[1].toFixed(2)} ${avg[2].toFixed(2)}`)
      screen.render()
    }

    updateTime()
    updateLoadAverage()
    setInterval(updateTime, 1000)
    setInterval(updateLoadAverage, 1000)
  }

  /**
   * Draw the footer
   *
   * @todo This appears to break on some viewports
   */
   const drawFooter = () => {
    const commands = {
      'dd': 'Kill process',
      'j': 'Down',
      'k': 'Up',
      'g': 'Jump to top',
      'G': 'Jump to bottom',
      'c': 'Sort by CPU',
      'm': 'Sort by Mem'
    }
    let text = ''
    for (const c in commands) {
      const command = commands[c]
      text += `  {white-bg}{black-fg}${c}{/black-fg}{/white-bg} ${command}`
    }
    text += '{|}http://parall.ax/vtop'
    const footerRight = blessed.box({
      width: '100%',
      top: program.rows - 1,
      tags: true,
      fg: loadedTheme.footer.fg
    })
    footerRight.setContent(text)
    screen.append(footerRight)
  }

  /**
   * Repeats a string
   * @var string The string to repeat
   * @var integer The number of times to repeat
   * @return {string} The repeated chars as a string.
   */

})())

App.init()