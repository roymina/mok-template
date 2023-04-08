/* eslint-disable no-unused-vars */
import { app, shell, BrowserWindow, Notification, ipcMain, Tray, Menu, nativeImage } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import appIcon from '../../resources/icon.png?asset'

let mainWindow, tray
function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { appIcon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })
  mainWindow.setBackgroundColor('rgb(24, 26, 27)')
  mainWindow.on('ready-to-show', async () => {
    //mainWindow.maximize()
    mainWindow.show()
  })

  //下载设置，打开后拦截浏览器下载窗口，若需要请取消注释
  /*
  // eslint-disable-next-line no-unused-vars
  mainWindow.webContents.session.on('will-download', (event, item, webContents) => {
    webContents.send('download-file', { state: 'start' })
    const fileName = item.getFilename()
    const tempFolder = app.getPath('temp')
    const savePath = join(tempFolder, fileName)
    item.setSavePath(savePath)

    item.once('done', (event, state) => {
      if (state === 'completed') {
        webContents.send('download-file', { state: 'end' })
        shell.openExternal(savePath)
      } else {
        webContents.send('download-file', { state: 'error', err: state })
        // console.log(`Download failed: ${state}`)
      }
    })
  })
  */

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}
app.setAppUserModelId(process.execPath)

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
//系统托盘
/*
  .then(() => {
    const icon = nativeImage.createFromPath(appIcon)
    tray = new Tray(icon)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: '退出',
        click: () => {
          app.quit()
        }
      }
    ])

    tray.setContextMenu(contextMenu)
    tray.setToolTip('托盘提示')
    tray.setTitle('托盘标题')
  })
  .then(() => {
    installExtension('nhdogjmejiglipccpnnnanhbledajbpd')
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err))
  })
  */

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//系统通知

ipcMain.on('show-notify', (event, { title, subTitle, body }) => {
  new Notification({ appIcon, title, subTitle, body }).show()
})

//全屏
// eslint-disable-next-line no-unused-vars

ipcMain.on('set-fullscreen', (e) => {
  mainWindow.setFullScreen(true)
})
