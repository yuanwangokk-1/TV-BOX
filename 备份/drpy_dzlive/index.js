/**
 pathLib: {
 join: [Function: join],
 dirname: [Function: dirname],
 readDir: [Function (anonymous)],
 readFile: [Function (anonymous)],
 stat: [Function (anonymous)]
 }
 path
 path_dir
 **/
function naturalSort(arr, key) {
    return arr.sort((a, b) => a[key].localeCompare(b[key], undefined, {numeric: true, sensitivity: 'base'}));
}

async function main() {
    let js_order = ['360影视[官]', '菜狗[官]', '奇珍异兽[官]', '优酷[官]', '腾云驾雾[官]', '百忙无果[官]', '哔哩影视[官]', '哔哩教育[官]', '哔哩大全[官]', '采王道长[合]', '采王zy[密]'];
    let js_path = './drpy_js';
    let live_path = './lives';
    let config_path = './custom.json';
    let js_api = './drpy_libs/drpy2.min.js';
    let parse_apis = [
        '777,https://jx.777jiexi.com/player/?url=,0',
        '8090g,https://www.8090g.cn/jiexi/?url=,0',
        'ik9,https://yparse.ik9.cc/index.php?url=,0',
        '杰森,https://jx.jsonplayer.com/player/?url=,0',
        '阳途,https://jx.yangtu.top/?url=,0',
        '冰豆,https://bd.jx.cn/?url=,0',
        'm3u8TV,https://jx.m3u8.tv/jiexi/?url=,0',
        '听乐,https://jx.dj6u.com/?url=,0',
        '虾米,https://jx.xmflv.com/?url=,0',
        '虾米2,https://jx.xmflv.cc/?url=,0',
        '云析,https://jx.yparse.com/index.php?url=,0',
        '红狐,https://player.mrgaocloud.com/player/?url=,0',
    ];
    let parses = parse_apis.map((it) => {
        let _name = it.split(',')[0];
        let _url = it.split(',')[1];
        let _type = it.split(',').length > 2 ? it.split(',')[2] : '0';
        _type = Number(_type);
        return {
            name: _name,
            url: _url,
            type: _type,
            'ext': {
                'flag': [
                    'qiyi',
                    'imgo',
                    '爱奇艺',
                    '奇艺',
                    'qq',
                    'qq 预告及花絮',
                    '腾讯',
                    'youku',
                    '优酷',
                    'pptv',
                    'PPTV',
                    'letv',
                    '乐视',
                    'leshi',
                    'mgtv',
                    '芒果',
                    'sohu',
                    'xigua',
                    'fun',
                    '风行',
                ],
            },
            'header': {
                'User-Agent': 'Mozilla/5.0',
            },
        };

    });
    let js_files = pathLib.readDir(pathLib.join(path_dir, js_path)).filter(file => file && file.endsWith('.js'));
    // console.log(js_files);
    let live_files = pathLib.readDir(pathLib.join(path_dir, live_path));
    // console.log(live_files);
    let config_sites = [];
    try {
        let config_file = pathLib.readFile(pathLib.join(path_dir, config_path));
        config_sites = JSON.parse(config_file).sites;
    } catch (e) {
        console.log(`get config_file error:${e.message}`);
    }
    let channels = [];
    channels.push({
        'name': '稳定github直播',
        'urls': [
            'proxy://do=live&type=txt&ext=https://ghproxy.net/https://raw.githubusercontent.com/ssili126/tv/main/itvlist.txt',
        ],
    });
    live_files.forEach((it) => {
        let absp = pathLib.join(path_dir, `${live_path}/${it}`).replace(/\\/g, '/');
        if (absp.includes('/zyplayer/file/')) {
            absp = 'http://127.0.0.1:9978/api/v1/file/' + absp.split('/zyplayer/file/')[1];
        }
        let aname = it.split('.')[0];
        channels.push({
            'name': aname,
            'urls': [
                'proxy://do=live&type=txt&ext=' + absp,
            ],
        });
    });
    channels = channels.concat([
        {
            'name': '云星日记直播',
            'urls': [
                'proxy://do=live&type=txt&ext=https://itvbox.cc/云星日记/Ipv4.txt',
            ],
        },
        {
            'name': '本地嗅探器直播',
            'urls': [
                'proxy://do=live&type=txt&ext=http://127.0.0.1:5708/ysp',
            ],
        },
    ]);
    let json_config = {
        'wallpaper': 'https://tuapi.eees.cc/api.php?category=fengjing&type=302',
        'homepage': 'https://github.com/hjdhnx/hipy-server',
        "homeLogo": "./img/logo500x200-1.png",
        "spider": "./jar/pg.jar?md5=7633f8ea346c082b7aa163be58aed023",
        'sites': [],
        'parses': parses,
        'flags': [
            'imgo',
            'youku',
            'qq',
            'qq 预告及花絮',
            'iqiyi',
            'qiyi',
            'fun',
            'letv',
            'leshi',
            'sohu',
            'tudou',
            'xigua',
            'cntv',
            '1905',
            'pptv',
            'mgtv',
            'wasu',
            'bilibili',
            'renrenmi',
        ],
        'lives': [
            {
                'group': 'redirect',
                'channels': channels,
            },
        ],

    };
    js_files.forEach((it, index) => {
        let rname = it.replace('.js', '');
        let extras = [''];
        if (rname.includes('我的哔哩[官]')) {
            extras = [
                '?type=url&params=../json/哔哩教育.json@哔哩教育[官]',
                '?type=url&params=../json/哔哩大全.json@哔哩大全[官]',
            ];
        } else if (rname.includes('采集之王')) {
            extras = [
                '?type=url&params=../json/采集静态.json$1@采王道长[合]',
                '?type=url&params=../json/采集[zy]静态.json$1@采王zy[密]',
                '?type=url&params=../json/采集[密]静态.json@采王成人[密]',
            ];
        } else if (rname.includes('直播转点播')) {
            extras = [
                '?type=url&params=../json/live2cms.json',
            ];
        }

        //let excludes = ['玩偶哥哥','阿里土豆'];
        let excludes = [];
        if (!excludes.includes(rname)) {
            extras.forEach((extra, index) => {
                let ext_str = 'drpy_t3';
                let _name = extras.length > 1 ? `${rname}${index}` : `${rname}`;
                let ext_name = extra.includes('@') ? extra.split('@')[1] : _name;
                extra = extra.split('@')[0];
                if (extra) {
                    try {
                        ext_str = extra.split('/').slice(-1)[0].split('.')[0];
                    } catch (e) {
                    }
                }
                ext_name = ext_name || `${rname}(${ext_str})`;
                let data = {
                    'key': extras.length > 1 ? `hipy_js_${rname}${index}` : `hipy_js_${rname}`,
                    'name': `${ext_name}(drpy_t3)`,
                    'type': 3,
                    'api': js_api,
                    'searchable': 1,
                    'quickSearch': 1,
                    'filterable': 1,
                    'order_num': index,
                    'ext': `${js_path}/${it}${extra}`,
                };
                json_config.sites.push(data);
            });

            // for(let index in extras){
            // let extra = extras[index];
            // let ext_str = 'drpy_t3';
            // if(extra){
            // try{
            // ext_str = extra.split('/').slice(-1)[0].split('.')[0];
            // }catch(e){}
            // }
            // let data = {
            // 'key': extras.length>1?`hipy_js_${rname}${index}`:`hipy_js_${rname}`,
            // 'name': extras.length>1?`${rname}(${ext_str})`:`${rname}(drpy_t3)`,
            // 'type': 3,
            // 'api': js_api,
            // 'searchable': 1,
            // 'quickSearch': 1,
            // 'filterable': 1,
            // 'order_num': index,
            // 'ext': `${js_path}/${it}${extra}`,
            // };
            // json_config.sites.push(data);

            // }
        }
    });
    json_config.sites = json_config.sites.concat(config_sites);
    json_config.sites = json_config.sites.sort((a, b) => {
        let i = a.name.split('(')[0];
        let j = b.name.split('(')[0];
        return (js_order.indexOf(i) === -1 ? 9999 : js_order.indexOf(i)) - (js_order.indexOf(j) === -1 ? 9999 : js_order.indexOf(j));
    });
    let top_sites = json_config.sites.filter(x => js_order.includes(x.name.split('(')[0]));
    let other_sites = json_config.sites.filter(x => !js_order.includes(x.name.split('(')[0]));
    let ret_sites = top_sites.concat(naturalSort(other_sites, 'name'));
    json_config.sites = ret_sites;
    return JSON.stringify(json_config, null, "\t");
}
