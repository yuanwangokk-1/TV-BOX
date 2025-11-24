/**仅供测试*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '抖音直播',
  lang: 'ds'
})
*/// const WebSocket = require('ws');
// const WebSocketServer = WebSocket.Server;
// const zlib = require('zlib');
const url = require('url');
// const fs = require('fs');
// const http = require('http');
const {get_sign, getDmHtml} = require('./_lib.douyin_sign.cjs');
// const douyin_pb = fs.readFileSync('./spider/js/_lib.douyin_pb.cjs', 'utf8');
// const douyin_pb = pathLib.readLib('./_lib.douyin_pb.cjs', 'utf8');
// console.log('douyin_pb:', douyin_pb.length);
// eval(douyin_pb);
function init_douyin_pb() {
    const douyin_pb = pathLib.readLib('./_lib.douyin_pb.cjs', 'utf8');
    console.log('douyin_pb:', douyin_pb.length);
    eval(douyin_pb);
}

init_douyin_pb();

var rule = {
    类型: '影视',
    title: '抖音直播',
    desc: '抖音直播纯js版本',
    host: 'https://live.douyin.com',
    url: '',
    searchUrl: '/search',
    class_name: '射击游戏&竞技游戏&单机游戏&棋牌游戏&休闲益智&角色扮演&策略卡牌&娱乐天地&科技文化',
    class_url: '1$1&2$1&3$1&4$1&5$1&6$1&7$1&10000$3&10001$3',
    filter_def: {},
    filter: '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',
    searchable: 1,
    quickSearch: 0,
    filterable: 1,
    headers: {},
    timeout: 5000,
    hikerClassListCol: 'movie_2',
    play_parse: true,
    class_parse: async () => {
        return []
    },
    预处理: async function () {
        // init_douyin_pb();
        let ck = (await axios({url: rule.host})).headers['set-cookie'];
        const regex = /ttwid=([^;]+)/;
        const match = ck[0].match(regex);
        if (match) {
            rule.headers.cookie = match[0];
        }
    },
    一级: async function (tid, pg, filter, extend) {
        let {MY_CATE, MY_FL, MY_PAGE, input} = this;
        let page = 15 * (MY_PAGE - 1);
        let select_partition = MY_FL.sort || MY_CATE;
        const partition = select_partition.split('$')[0];
        const type = select_partition.split('$')[1];
        let url = `https://live.douyin.com/webcast/web/partition/detail/room/v2/?aid=6383&count=15&partition=${partition}&partition_type=${type}&offset=${page}`;
        let html = await request(url, {
            headers: rule.headers
        });
        let d = [];
        let list = JSON.parse(html).data.data;
        list.forEach(it => {
            d.push({
                title: it.room.title,
                desc: it.room.owner.nickname + '(🔥' + it.room.stats.user_count_str + ')',
                img: it.room.cover.url_list[0],
                url: `https://live.douyin.com/webcast/room/web/enter/?aid=6383&app_name=douyin_web&live_id=1&device_platform=web&enter_from=web_live&browser_language=zh-CN&browser_platform=Linux+aarch64&browser_name=Chrome&browser_version=58.0.3029.110&web_rid=${it.web_rid}&room_id_str=${it.room.id_str}&enter_source=&is_need_double_stream=false&insert_task_id=&live_reason=&msToken=8wFjU02av0x2CQpyV09iun_1VawvtKzGS0gKEjA-eBjR3Z2Q2ZxicZ3wByfTPmaZEArRWz3pBRvb9DuLU05W7lTpleOKiBDf3_ce0L-Pai0cb6eMv-EevqjPdfaMRD1c9s_CIy2b_7FkQfTTtKtlA_G6g3bAIeZYKtolM3WRIfw0vGtAUD6svw%3D%3D&a_bogus=Dj05gtXLO2WROdKb8Or4ySCl51o%2FN0Sy%2FaidRupu9xYkOhzGcuNewxt%2Fbxof4gfDjupihK1HAdzlbxdcsdXT1ArpumpvuzUyItII9Xmo2qZsTPkhHHSkStTzzhMzUCTYscn4E-iXltXqXxP1irPzUQ1Jy%2FECmOYp%2Fr5D4Q8onNjWD8zc2NeIKafATviY-QI-TE%3D%3D##${it.room.id_str}`
            })
        })
        return setResult(d);
    },
    二级: async function (ids) {
        let {input} = this;
        let url = input.split('##')[0];
        let room_id = input.split('##')[1];
        let html = await request(url, {
            headers: rule.headers
        });
        const resolutionName = {
            "FULL_HD1": "蓝光",
            "HD1": "超清",
            "ORIGION": "原画",
            "SD1": "标清",
            "SD2": "高清"
        };
        let info = JSON.parse(html).data.data[0];
        const offwss = '#关闭弹幕$off';
        const flv = Object.entries(info.stream_url.flv_pull_url).map(([key, value]) => `${resolutionName[key]}$${value}@@${room_id}`).join('#') + offwss;
        const hls = Object.entries(info.stream_url.hls_pull_url_map).map(([key, value]) => `${resolutionName[key]}$${value}@@${room_id}`).join('#') + offwss;
        let vod = {
            vod_id: input,
            vod_name: info.title,
            vod_pic: info.cover.url_list[0],
            vod_director: info.owner.nickname,
            vod_content: ''
        };
        let playFroms = ['线路_flv', '线路_hls'];
        let playUrls = [flv, hls];
        vod.vod_play_from = playFroms.join('$$$');
        vod.vod_play_url = playUrls.join('$$$');
        return vod;
    },
    搜索: async function (wd, quick, pg) {
        let {input} = this;
        let page = 10 * (pg - 1);
        rule.headers.referer = `${rule.host}/`;
       let url = `https://www.douyin.com/aweme/v1/web/general/search/?device_platform=webapp&aid=6383&channel=channel_pc_web&search_channel=aweme_live&keyword=${wd}&offset=${page}&count=10&os_version=10`;
        let html = await request(url, {
            headers: rule.headers
        });
        let d = [];
        let list = JSON.parse(html).data;
        list.forEach(it => {
            let rawdata = JSON.parse(it.lives.rawdata);
            let web_rid = rawdata.owner.web_rid;
            let id_str = rawdata.id_str;
            let video_feed_tag = rawdata.video_feed_tag;
            let user_count = rawdata.user_count;
            d.push({
                title: rawdata.owner.nickname,
                desc: video_feed_tag + '(' + user_count + ')',
                content: rawdata.title,
                img: rawdata.owner.avatar_large.url_list[0],
                url: `https://live.douyin.com/webcast/room/web/enter/?aid=6383&live_id=1&device_platform=web&enter_from=web_live&browser_language=zh-CN&browser_platform=Linux+aarch64&browser_name=Chrome&browser_version=58.0.3029.110&web_rid=${web_rid}&room_id_str=${id_str}##${id_str}`
            })
        })
        return setResult(d);
    },
    lazy: async function (flag, id, flags) {
        let {input, hostUrl, hostname, getProxyUrl} = this;
        // log('hostUrl:', hostUrl);
        // log('hostname:', hostname);
        if (input === 'off') {
            if (currentWs) {
                console.log("有直播间正在运行弹幕WebSocket服务，即将关闭.");
                currentWs.close();
                // 清除全局变量中的连接，表示没有WebSocket服务正在运行
                currentWs = null;
                startTime = null;
            } else {
                console.log("暂无运行的弹幕WebSocket服务.");
            }
            return;
        } else {
            let url = input.split('@@')[0];
            let room_id = input.split('@@')[1];
            let ttwid = rule.headers.cookie;
            connectWebSocket(hostname, room_id, ttwid);
            // let danmu = `web://${hostUrl}:4201/danmu.html`;
            // return {parse: 0, url: url, danmaku: danmu};
            return {parse: 0, url: url, danmaku: 'web://' + getProxyUrl() + '&url=danmu.html'};
        }
    },
    proxy_rule: async function () {
        let {input, wsName} = this;
        // log('hostname:', hostname);
        if (input) {
            input = decodeURIComponent(input);
            log(`${rule.title}代理播放:${input}`);
            if (input.includes('danmu.html')) {
                const danmuHTML = getDmHtml(wsName);
                return [200, 'text/html', danmuHTML];
            }
        }
    }
};

function generateSignature(wss) {
    const parsedUrl = new url.URL(wss);
    const searchParams = new URLSearchParams(parsedUrl.search);
    const params = ["live_id", "aid", "version_code", "webcast_sdk_version",
        "room_id", "sub_room_id", "sub_channel_id", "did_rule",
        "user_unique_id", "device_platform", "device_type", "ac",
        "identity"
    ];
    const wssMaps = {};
    params.forEach(param => {
        wssMaps[param] = searchParams.get(param) || '';
    });
    const tplParams = params.map(i => `${i}=${wssMaps[i]}`);
    const param = tplParams.join(',');
    let md5_param = md5(param);
    let signature = get_sign(md5_param);
    return signature;
}

// 定义一个全局变量来存储WebSocket连接
let currentWs;
let startTime;

function connectWebSocket(hostname, room_id, ttwid) {
    // 检查是否已经有WebSocket服务正在运行
    if (currentWs) {
        // 如果有，先关闭这个WebSocket服务
        console.log("有正在运行的WebSocket服务.");
        currentWs.close();
        // 清除全局变量中的连接，表示没有WebSocket服务正在运行
        currentWs = null;
    }
    let wss = `wss://webcast5-ws-web-hl.douyin.com/webcast/im/push/v2/?app_name=douyin_web&version_code=180800&webcast_sdk_version=1.0.14-beta.0&update_version_code=1.0.14-beta.0&compress=gzip&device_platform=web&cookie_enabled=true&screen_width=1536&screen_height=864&browser_language=zh-CN&browser_platform=Win32&browser_name=Mozilla&browser_version=5.0%20(Windows%20NT%2010.0;%20Win64;%20x64)%20AppleWebKit/537.36%20(KHTML,%20like%20Gecko)%20Chrome/126.0.0.0%20Safari/537.36&browser_online=true&tz_name=Asia/Shanghai&cursor=d-1_u-1_fh-7392091211001140287_t-1721106114633_r-1&internal_ext=internal_src:dim|wss_push_room_id:${room_id}|wss_push_did:7319483754668557238|first_req_ms:1721106114541|fetch_time:1721106114633|seq:1|wss_info:0-1721106114633-0-0|wrds_v:7392094459690748497&host=https://live.douyin.com&aid=6383&live_id=1&did_rule=3&endpoint=live_pc&support_wrds=1&user_unique_id=7319483754668557238&im_path=/webcast/im/fetch/&identity=audience&need_persist_msg_count=15&insert_task_id=&live_reason=&room_id=${room_id}&heartbeatDuration=0`;
    const signature = generateSignature(wss);
    wss += `&signature=${signature}`;
    const headers = {
        'Cookie': ttwid,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
    };
    startServer(hostname);//启动弹幕服务
    const ws = new WebSocket(wss, {
        headers: headers
    });
    // 存储新的WebSocket连接到全局变量
    currentWs = ws;

    ws.on('open', () => {
        console.log("WebSocket服务已启动.");
    });

    ws.on('message', (message) => {
        let pushframe = new proto.douyin.PushFrame.deserializeBinary(message);
        let payload = pushframe.getPayload_asU8();
        try {
            const buffer = zlib.gunzipSync(payload);
            // console.log('zlib解压成功');
            let response = new proto.douyin.Response.deserializeBinary(buffer);
            let res = response.toObject();
            let frame = pushframe.toObject();
            if (res.needack) {
                let ack = new proto.douyin.PushFrame();
                ack.setLogid(frame.logid);
                ack.setPayloadtype('ack');
                ack.setPayload(Buffer.from(res.internalext, 'utf-8'));
                let data = ack.serializeBinary();
                ws.send(data, {
                    binary: true,
                    mask: true
                }, (err) => {
                    if (err) {
                        // console.error('发送数据时出错:', err);
                        console.error('发送数据时出错:', err.message);
                    } else {
                        //console.log('数据发送成功');
                    }
                });

            }
            let messageslistList = response.getMessageslistList();
            try {
                for (let msg of messageslistList) {
                    let method = msg.getMethod();
                    if (method == 'WebcastChatMessage') {
                        let payload = msg.getPayload_asU8();
                        let chatmessage = new proto.douyin.ChatMessage.deserializeBinary(payload);
                        // let user_name = chatmessage.getUser().getNickname();
                        // let eventTime = chatmessage.getEventtime();
                        let content = chatmessage.getContent();
                        sendDanmuArray(hostname, [{text: content}]);
                        //   console.log(`【${user_name}】:${content}`);
                    }
                }
            } catch (error) {
                // console.error('message处理错误:', error);
            }
        } catch (error) {
            console.error('解压失败:', error);
        }
    });

    ws.on('error', (error) => {
        console.error('WebSocket error:', error);
        ws.close();
    });

    ws.on('close', () => {
        console.log('WebSocket服务已关闭.');
    });
}


let DMwss;
let isServerStarted = false;

function startServer(hostname) {
    if (isServerStarted) {
        return;
    }
    // 原生的server
    // let server = http.createServer((req, res) => {
    //     if (req.url === '/danmu.html') {
    //         const danmuHTML = getDmHtml(hostname);
    //         res.writeHead(200, {'Content-Type': 'text/html'});
    //         res.end(danmuHTML);
    //     } else {
    //         res.writeHead(404);
    //         res.end('Not Found');
    //     }
    // });
    // fastify的server
    let server = fServer;
    DMwss = new WebSocketServer({server});
    // 监听客户端连接事件
    DMwss.on('connection', (ws, request) => {
        console.log(`Client connected at ${request.url}`);
        // 检测心跳的定时器
        const interval = setInterval(() => {
            ws.ping(); // 发送 ping 消息
        }, 5000);

        // 接收客户端 pong 消息
        ws.on('pong', () => {
            // console.log('Heartbeat received');
        });

        // 接收消息
        ws.on('message', (message) => {
            console.log('Received message:', message);
            ws.send('ok');
        });

        // 连接关闭时清理
        ws.on('close', () => {
            console.log('Client disconnected');
            clearInterval(interval);
            if (DMwss.clients.size === 0) {
                console.log("关闭所有websocket");
                currentWs.close();
                currentWs = null;
                DMwss.close();
                isServerStarted = false;
            }
        });

        // 连接出错时清理
        ws.on('error', (err) => {
            console.error('WebSocket error:', err);
            clearInterval(interval);
        });
    });
    isServerStarted = true;
    console.log(`[DMwss] WebSocketServer is running on ${hostname}`);
    // 原生启动服务需要在此监听端口，直接用fServer则不需要
    // server.listen(4201, () => {
    //     console.log(`Server is running on ${hostUrl}:4201/`);
    //     isServerStarted = true;
    // });
}

function sendDanmuArray(hostname, danmuArray) {
    // if (!isServerStarted) {
    //     startServer(hostname);
    // }
    const danmuJSON = JSON.stringify(danmuArray);
    DMwss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(danmuJSON);
        }
    });
}
