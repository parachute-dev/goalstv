/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, shell, ipcMain, globalShortcut, dialog  } from 'electron';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import Store from 'electron-store';
const AutoLaunch = require('auto-launch');

import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
const { networkInterfaces } = require('os');


class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}
const appAutoLauncher = new AutoLaunch({
  name: 'GoalsTV',  // Replace with the name of your app
  path: app.getPath('exe'), // Path to your app executable
  isHidden: true,  // Optional: Set whether to launch the app in hidden mode
});

// Check if auto-launch is enabled, and enable it if not
appAutoLauncher.isEnabled().then((isEnabled) => {
  if (!isEnabled) {
      appAutoLauncher.enable();
  }
}).catch((err) => {
  console.error('Error checking or enabling auto-launch:', err);
});

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const store = new Store();


// IPC listener
ipcMain.on('electron-store-get', async (event, val) => {
  event.returnValue = store.get(val);
});
ipcMain.on('electron-store-set', async (event, key, val) => {
  store.set(key, val);
});




const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload,
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  var kioskMode = true;
  if (isDebug) {
    kioskMode = false
  }
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    alwaysOnTop:kioskMode,
    kiosk: kioskMode,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      webSecurity: false,
      nodeIntegration: false, // Keep this false for security
      contextIsolation: true,  // Recommended for security
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  globalShortcut.register('F7', () => {
    if (mainWindow) {
      mainWindow.webContents.openDevTools(); // Open the DevTools
    }
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });


  app.on('will-quit', () => {
    // Unregister all shortcuts.
    globalShortcut.unregisterAll();
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

// Auto-update event listeners
autoUpdater.on('update-available', () => {
  log.info('Update available');
  if (mainWindow) {
    //mainWindow.webContents.send('update_available');

  }
});

autoUpdater.on('update-downloaded', () => {
  log.info('Update downloaded');
  if (mainWindow) {
    //mainWindow.webContents.send('update_downloaded');
    autoUpdater.quitAndInstall();

  }
});

autoUpdater.on('error', (error) => {
  log.error('Error in auto-updater: ', error);
 // dialog.showErrorBox('Update Error', 'An error occurred while updating the application.');
});



  const getLocalIPAddress = () => {
    const nets = networkInterfaces();
    const results = {};

    for (const name of Object.keys(nets)) {
      for (const net of nets[name]) {
        // Retrieve only IPv4 addresses
        if (net.family === 'IPv4' && !net.internal) {
          if (!results[name]) {
            results[name] = [];
          }
          if (net.address.includes("192.168")){
return net.address;
          }

        }
      }
    }



    // No IP address found
    return null;
  };

  const localIPAddress = getLocalIPAddress();

  store.set("LOCALIPADDRESS", localIPAddress);


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});




const gotTheLock = app.requestSingleInstanceLock();

if (!gotTheLock) {
  // If we didn't get the lock, that means another instance is running, so we quit
  app.quit();
} else {
  // If we got the lock, set up an event listener for the second instance attempt
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // This will be triggered if a second instance is opened
    // Focus the primary instance window here, e.g. by showing and focusing the main window
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });

  // Continue with your app's normal startup process
  app.on('ready', () => {
    createWindow();
  });
}
