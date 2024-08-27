const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('msg_center', {
    send: (...args) => ipcRenderer.send('msg', ...args),
    on: (fn) => {
        ipcRenderer.on('msg', (event, ...args) => fn(event, ...args));
    },
});
