const { app, BrowserWindow, Menu, shell, ipcMain } = require('electron');
const path = require('path');

let mainWindow = null;

function createMainWindow() {
  const iconPath = path.join(__dirname, '../assets/icons/icon-512x512.png');
  
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    title: 'CliniPortal – Hệ sinh thái Y khoa',
    icon: iconPath,
    backgroundColor: '#0f172a',
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      webSecurity: false // Allow seamless local file loading & fetch across relative paths
    }
  });

  const entryHtml = path.join(__dirname, '../index.html');
  mainWindow.loadFile(entryHtml);

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
    mainWindow.focus();
  });

  // Handle external links (open in default browser instead of Electron)
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  buildAppMenu();
}

function buildAppMenu() {
  const isMac = process.platform === 'darwin';

  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'about', label: 'Về CliniPortal' },
        { type: 'separator' },
        { role: 'hide', label: 'Ẩn cửa sổ' },
        { role: 'hideOthers', label: 'Ẩn các cửa sổ khác' },
        { role: 'unhide', label: 'Hiện tất cả' },
        { type: 'separator' },
        { role: 'quit', label: 'Thoát' }
      ]
    }] : []),
    {
      label: 'Tệp (File)',
      submenu: [
        {
          label: 'Trang chủ (Home)',
          accelerator: 'CmdOrCtrl+H',
          click: () => {
            if (mainWindow) mainWindow.loadFile(path.join(__dirname, '../index.html'));
          }
        },
        {
          label: 'Tra cứu mã ICD-10',
          accelerator: 'CmdOrCtrl+I',
          click: () => {
            if (mainWindow) mainWindow.loadFile(path.join(__dirname, '../pages/Công cụ/Chung/Tra cứu mã ICD10/Tracuu_maICD10.html'));
          }
        },
        {
          label: 'Máy tính Lâm sàng',
          accelerator: 'CmdOrCtrl+M',
          click: () => {
            if (mainWindow) mainWindow.loadFile(path.join(__dirname, '../pages/Công cụ/cong-cu.html'));
          }
        },
        { type: 'separator' },
        isMac ? { role: 'close', label: 'Đóng' } : { role: 'quit', label: 'Thoát' }
      ]
    },
    {
      label: 'Hiển thị (View)',
      submenu: [
        { role: 'reload', label: 'Tải lại trang (Reload)' },
        { role: 'forceReload', label: 'Tải lại toàn bộ (Force Reload)' },
        { role: 'toggleDevTools', label: 'Công cụ Nhà phát triển (DevTools)' },
        { type: 'separator' },
        { role: 'resetZoom', label: 'Đặt lại thu phóng' },
        { role: 'zoomIn', label: 'Phóng to' },
        { role: 'zoomOut', label: 'Thu nhỏ' },
        { type: 'separator' },
        { role: 'togglefullscreen', label: 'Bật/Tắt Toàn màn hình (F11)' }
      ]
    },
    {
      label: 'Trợ giúp (Help)',
      submenu: [
        {
          label: 'Mã nguồn & Tài liệu',
          click: async () => {
            await shell.openExternal('https://github.com');
          }
        },
        { type: 'separator' },
        {
          label: 'Về CliniPortal Desktop v1.0.0',
          click: () => {
            const { dialog } = require('electron');
            dialog.showMessageBox(mainWindow, {
              type: 'info',
              title: 'Về CliniPortal Desktop',
              message: 'CliniPortal Desktop App v1.0.0',
              detail: 'Hệ sinh thái công cụ hỗ trợ lâm sàng dành cho bác sĩ nội khoa.\nChạy mượt mà offline trên Windows / macOS / Linux.\nCông nghệ: Electron.js + Pure Web Engine.',
              buttons: ['Đóng']
            });
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

app.whenReady().then(() => {
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
