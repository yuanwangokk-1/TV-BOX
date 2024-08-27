const os = require('os');
const { app, session, BrowserWindow, ipcMain } = require('electron');
const pie = require('puppeteer-in-electron');
const puppeteer = require('puppeteer-core');
const http = require('http');
const Store = require('electron-store');
const store = new Store();

const urlRegex = 'http((?!http).){12,}?\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)\\?.*|http((?!http).){12,}\\.(m3u8|mp4|flv|avi|mkv|rm|wmv|mpg|m4a|mp3)|http((?!http).)*?video/tos*';

async function trySniffer(url) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            let timeout = setTimeout(() => {
                timeout = null;
                resolve({ code: 500 });
                page.close();
            }, 15000);
            const browser = await pie.connect(app, puppeteer);
            const window = new BrowserWindow({
                show: false,
            });
            // window.webContents.openDevTools();
            const page = await pie.getPage(browser, window);
            await page.setRequestInterception(true);
            page.on('request', (req) => {
                if (!timeout) req.abort().catch((err) => console.error(err));
                var reqUrl = req.url();
                if (reqUrl.match(urlRegex)) {
                    if (reqUrl.indexOf('url=http') < 0 && reqUrl.indexOf('v=http') < 0 && reqUrl.indexOf('.css') < 0 && reqUrl.indexOf('.html') < 0) {
                        console.log(req.headers());
                        console.log(reqUrl);
                        const headers = req.headers();
                        const header = {};
                        if (headers['referer']) header['referer'] = headers['referer'];
                        if (headers['user-agent']) header['user-agent'] = headers['user-agent'];
                        resolve({ code: 200, url: reqUrl, header: header });
                        req.abort().catch((err) => console.error(err));
                        clearTimeout(timeout);
                        timeout = null;
                        page.close();
                        return;
                    }
                }
                if (req.isInterceptResolutionHandled()) return;
                if (req.resourceType() == 'image') req.abort().catch((err) => console.error(err));
                else req.continue().catch((err) => console.error(err));
            });
            await page.setUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1');
            await page.goto(url).catch((err) => {});
        } catch (e) {
            console.error(e);
            resolve({ code: 500 });
        }
    });
    return promise;
}

pie.initialize(app);

let httpServer = null;
const httpServerSockets = new Set();

const createMain = async () => {
    // await session.defaultSession.clearCache();
    const mainWindow = new BrowserWindow({
        show: false,
        width: 480,
        resizable: false,
        height: 300,
        webPreferences: {
            preload: __dirname + '/config.js',
        },
    });
    mainWindow.removeMenu();

    const defaultPort = 8889;

    function startServer() {
        if (httpServer) {
            return;
        }
        httpServerSockets.clear();
        const requestListener = async function (req, res) {
            if (!req.url.startsWith('/?url=')) {
                res.writeHead(500);
                res.end('Url must /?url=http*****');
                return;
            }
            const sniffUrl = req.url.substring(6).trim();
            const result = await trySniffer(sniffUrl);
            res.writeHead(200);
            res.end(JSON.stringify(result));
        };
        httpServer = http.createServer(requestListener);
        const port = store.get('port', defaultPort);
        store.set('port', port);
        httpServer.on('error', (e) => {
            httpServer = null;
            mainWindow.webContents.send('msg', {
                code: 201,
            });
        });
        httpServer.on('connection', (socket) => {
            httpServerSockets.add(socket);
            httpServer.once('close', () => {
                httpServerSockets.delete(socket);
            });
        });
        httpServer.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on`);
            console.log(`\thttp://127.0.0.1:${port}`);
            const interfaces = os.networkInterfaces();
            for (let intf in interfaces) {
                for (let i in interfaces[intf]) {
                    let address = interfaces[intf][i];
                    if (address.family === 'IPv4' && !address.internal) {
                        console.log(`\thttp://${address.address}:${port}`);
                    }
                }
            }
            mainWindow.webContents.send('msg', {
                code: 200,
            });
        });
    }

    function stopServer() {
        if (httpServer) {
            for (const socket of httpServerSockets) {
                socket.destroy();
                httpServerSockets.delete(socket);
            }
            httpServer.close();
            httpServerSockets.clear();
            httpServer = null;
        }
        mainWindow.webContents.send('msg', {
            code: 201,
        });
    }
    // mainWindow.webContents.openDevTools();
    ipcMain.on('msg', async (event, msg) => {
        switch (msg.code) {
            case 100: {
                const port = store.get('port', defaultPort);
                mainWindow.webContents.send('msg', {
                    code: 100,
                    cfg: {
                        port: port,
                    },
                });
                startServer();
                break;
            }
            case 200: {
                const port = msg.cfg.port;
                store.set('port', port);
                startServer();
                break;
            }
            case 201:
                stopServer();
                break;
            default:
                break;
        }
        console.log(msg);
    });
    await mainWindow.loadFile(__dirname + '/config.html');
    mainWindow.show();
};

app.whenReady().then(() => {
    createMain();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
