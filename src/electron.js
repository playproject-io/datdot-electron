const electron = require('electron')
const path = require('path')

const { app, Menu, Tray, BrowserWindow, screen, session } = electron

const iconPath = path.join(__dirname, 'assets/IconTemplate.png')
const state_ok_20_png = path.join(__dirname, 'assets/state-ok-20.png')
const state_sync_20_png = path.join(__dirname, 'assets/state-sync-20.png')
const state_sync_20_60_png = path.join(__dirname, 'assets/state-sync-20-60.png')
const state_sync_20_120_png = path.join(__dirname, 'assets/state-sync-20-120.png')

const args = process.argv.slice(2)
const secret = ''
const wallet = (args[0] === '--dev') ?
  `https://localhost:9966/#${secret}`
  : `file://${process.cwd()}/index.html#${secret}`

var tray = app.whenReady().then(start)

function start () {
  tray = new Tray(iconPath)

  // @NOTE https://www.electronjs.org/docs/api/menu-item
  const template = [
    // {
    //   label: 'Edit',
    //   submenu: [
      // { label: 'Item1', type: 'radio' },
      // { label: 'Item2', type: 'radio' },
      // { label: 'Item3', type: 'radio', checked: true },
      // { label: 'Item4', type: 'radio' },
    //     {
    //       label: 'Undo',
    //       accelerator: 'CommandOrControl+Z',
    //       role: 'undo',
    //     },
    //     {
    //       label: 'Redo',
    //       accelerator: 'Shift+CommandOrControl+Z',
    //       role: 'redo',
    //     },
    //     { type: 'separator' },
    //     {
    //       label: 'Cut',
    //       accelerator: 'CommandOrControl+X',
    //       role: 'cut',
    //     },
    //     {
    //       label: 'Select All',
    //       accelerator: 'CommandOrControl+A',
    //       role: 'selectall',
    //     },
    // 	],
    // },
    {
      label: 'open datdot',
      // accelerator: 'CommandOrControl+K',
      async click (menuItem, browserWindow, event) {
        mainWindow.show()
      }
    },
    { type: 'separator' },
    {
      label: 'exit',
      accelerator: 'Command+Q',
      click() { app.quit() },
    },
  ]
  const contextMenu = Menu.buildFromTemplate(template)
  tray.setContextMenu(contextMenu)

  setOkIcon()
  const trayAnimation = setInterval(frame, 1000);
  // simulate data fetching
  sleep(3000).then(() => {
    clearInterval(trayAnimation)
    setOkIcon()
  })

  function setOkIcon() {
    tray.setImage(state_ok_20_png)
  }	
  function frame() {
    setTimeout(() => tray.setImage(state_sync_20_png), 300)
    setTimeout(() => tray.setImage(state_sync_20_60_png), 600)
    setTimeout(() => tray.setImage(state_sync_20_120_png), 900)
  }
  function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  // @TODO: open on icon click open
  // @TODO: close on X + close on blur
  // @TODO: change icon upon incoming transaction
  // @TODO: show transaction notification
  // @TODO: show on notification click


  session
    .fromPartition('some-partition')
    .setPermissionRequestHandler((webContents, permission, callback) => {
      const url = webContents.getURL()

      console.log({url})

      if (permission === 'notifications') {
        // Approves the permissions request
        callback(true)
      }

      // Verify URL
      if (!url.startsWith('https://example.com/')) {
        // Denies the permissions request
        return callback(false)
      }
    })
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   console.log({details})
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,

  // @TODO:
  // Content-Security-Policy: script-src 'self' https://apis.example.com
  
  //       'Content-Security-Policy': ['default-src \'none\'']
  //     }
  //   })
  // })
  app.on('certificate-error', function(event, webContents, url, error, 
    certificate, callback) {
    // console.log('allow budo: self signed https')
    event.preventDefault()
    callback(true)
  })
  app.on('web-contents-created', (event, contents) => {
    // console.log('app web contents')
    contents.on('will-navigate', (event, navigationUrl) => {
      const parsedUrl = new URL(navigationUrl)
      // if (parsedUrl.origin !== 'https://example.com')
      // @NOTE: don't prevent default in DEV because LIVE RELOAD
      // event.preventDefault()
    })
    contents.on('new-window', async (event, navigationUrl) => {
      event.preventDefault()
    })
  })
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------
  // -------------------------------------------------

  const displays = screen.getAllDisplays().map(displays => {
    const { bounds, workArea, size, workAreaSize } = displays
    return { bounds, workArea, size, workAreaSize }
  })
  // const winBounds = win.getBounds();
  // const trayBounds = tray.getBounds();
  const bounds = tray.getBounds()
  const xy = screen.getCursorScreenPoint()
  console.log({xy})
  console.log(displays)
  console.log({bounds})
  const SCREEN = screen.getPrimaryDisplay().workAreaSize
  console.log({SCREEN})
  // win = new BrowserWindow({width, height})
  // x = trayX - (trayWidth / 2) - (appWidth / 2);
  // y = trayY + trayHeight;
  //
  // // Calculate new app window coordinates
  // let x = Math.round(trayBounds.x + (trayBounds.width / 2) - (winBounds.width / 2));
  // let y = trayBounds.y + trayBounds.height;
  //
  // // Set new position
  // win.setPosition(x, y);
  const { width, height } = SCREEN

  const w = height / 4
  const h = width / 4
  const mainWindow = new BrowserWindow({
    // width: 800,
    // height: 600,
    width: w,
    height: h,
    // x: 100,
    // y: 100,
    show: false,
    // backgroundColor: '#f00',
    titleBarStyle: 'hidden',
    titleBarStyle: "none",
    hasShadow: false,
    // alwaysOnTop: true,
    resizable: false,
    transparent: true,
    frame: false, // no window frame or border
    // ------
    fullscreenable: false,
    skipTaskbar: true,
    resizable: false,
    movable: false,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      webSecurity: true,
      allowRunningInsecureContent: false,
      experimentalFeatures: false,
      allowEval: false // This is the key!
    }
  })
  mainWindow.moveTop() // move it 'AlwaysOnTop'
  mainWindow.loadURL(wallet)
  mainWindow.setTitle('datdot-wallet')

  // mainWindow.show()
  // mainWindow.setAlwaysOnTop(true, 'screen')
  mainWindow.setVisibleOnAllWorkspaces(true)
  mainWindow.setContentProtection(true)
  mainWindow.setParentWindow(null)

  // mainWindow.setFullScreen(true)
  // mainWindow.setKiosk(true)
  // setTimeout(() => mainWindow.maximize(), 1000)

  // mainWindow.on('closed', () => {
  //     mainWindow = null
  // })
  mainWindow.on('blur', event => mainWindow.hide())
  mainWindow.toggleDevTools()
  mainWindow.center()
  mainWindow.show()
}

// var net = require('net')
// // This server listens on a Unix socket at /var/run/mysocket
// var unixServer = net.createServer(function(client) {
//   // Do something with the client connection
// })
// unixServer.listen('/var/run/mysocket')
// // This server listens on TCP/IP port 1234
// var tcpServer = net.createServer(function(client) {
//   // Do something with the client connection
// })
// tcpServer.listen(1234, () => {
// 	console.log(`listen on: ${1234}`)
// })