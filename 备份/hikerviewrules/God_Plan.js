const BASE_URL = "https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/"
/* Base Function */

/**
 * @param fetch_file String 远程文件web地址
 * @param local_file String 本地文件路径
 * */
const godWriteFile = (fetch_file, local_file) => {
    let localFile = request(local_file);
    let fetchFile = request(fetch_file);
    if (!localFile || localFile !== fetchFile) writeFile(local_file, fetchFile)
}

const godSaveFile = (fetch_file, local_file) => {
    let localFile = request(local_file);
    let fetchFile = request(fetch_file);
    if (!localFile) writeFile(local_file, fetchFile)
}

const time = (new Date()).getTime()

/* Base Function */

/* Customize Function */

const home_page = _ => {
    godWriteFile(BASE_URL + "tyrantgenesis.js?t=" + time, 'hiker://files/TyrantG/tyrantgenesis.js')
    godWriteFile(BASE_URL + "public/Home.html?t=" + time, 'hiker://files/TyrantG/public/Home.html')
    godSaveFile(BASE_URL + "public/fonts/AlexBrush-Regular.ttf", 'hiker://files/TyrantG/public/fonts/AlexBrush-Regular.ttf')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const new_homepage = _ => {
    godWriteFile(BASE_URL + "HOME/index.html?t=" + time, 'hiker://files/TyrantG/HOME/index.html')
    godWriteFile(BASE_URL + "TEST/new-homepage.js?t=" + time, 'hiker://files/TyrantG/TEST/new-homepage.js')
}

const tyrantgenesis = _ => {
    godWriteFile(BASE_URL + "data/base.json?t=" + time, 'hiker://files/TyrantG/data/base.json')
    godWriteFile(BASE_URL + "tyrantgenesis.js?t=" + time, 'hiker://files/TyrantG/tyrantgenesis.js')
    godSaveFile(BASE_URL + "public/css/element-ui.css", 'hiker://files/TyrantG/public/css/element-ui.css')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const acfun = _ => {
    godWriteFile(BASE_URL + "TEST/acfun-bangumilist.js?t=" + time, 'hiker://files/TyrantG/TEST/acfun-bangumilist.js')
    godWriteFile(BASE_URL + "public/category.html?t=" + time, 'hiker://files/TyrantG/public/category.html')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const TMusic = _ => {
    godWriteFile(BASE_URL + "data/music_list.json?t=" + time, 'hiker://files/TyrantG/data/music_list.json')
    godWriteFile(BASE_URL + "TOOL/cloud-music.js?t=" + time, 'hiker://files/TyrantG/TOOL/cloud-music.js')
}

const douyu_live = _ => {
    godWriteFile(BASE_URL + "LIVE/douyu.js?t=" + time, 'hiker://files/TyrantG/LIVE/douyu.js')
    godWriteFile(BASE_URL + "public/douyu-tabs.html?t=" + time, 'hiker://files/TyrantG/public/douyu-tabs.html')
    godWriteFile(BASE_URL + "public/douyu-player.html?t=" + time, 'hiker://files/TyrantG/public/douyu-player.html')
    godSaveFile(BASE_URL + "public/css/element-ui.css", 'hiker://files/TyrantG/public/css/element-ui.css')
    godSaveFile(BASE_URL + "public/css/aliplayer-min.css", 'hiker://files/TyrantG/public/css/aliplayer-min.css')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    godSaveFile(BASE_URL + "public/js/aliplayer-min.js", 'hiker://files/TyrantG/public/js/aliplayer-min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const douyu_danmu = _ => {
    godWriteFile(BASE_URL + "LIVE/douyu_danmu.js?t=" + time, 'hiker://files/TyrantG/LIVE/douyu_danmu.js')
    godWriteFile(BASE_URL + "public/douyu-danmu-tabs.html?t=" + time, 'hiker://files/TyrantG/public/douyu-tabs.html')
    godSaveFile(BASE_URL + "public/css/douyu_danmu.css", 'hiker://files/TyrantG/public/css/douyu_danmu.css')
    godSaveFile(BASE_URL + "public/js/douyu_danmu.js", 'hiker://files/TyrantG/public/js/douyu_danmu.js')
    godSaveFile(BASE_URL + "public/douyu_danmu.html", 'hiker://files/TyrantG/public/douyu_danmu.html')
}

const twitch = _ => {
    godWriteFile(BASE_URL + "LIVE/twitch.js?t=" + time, 'hiker://files/TyrantG/LIVE/twitch.js')
}

const _17live = _ => {
    godWriteFile(BASE_URL + "LIVE/17live.js?t=" + time, 'hiker://files/TyrantG/LIVE/17live.js')
}

const huya_live = _ => {
    godWriteFile(BASE_URL + "LIVE/huya.js", 'hiker://files/TyrantG/LIVE/huya.js')
    godWriteFile(BASE_URL + "public/huya-tabs.html", 'hiker://files/TyrantG/public/huya-tabs.html')
    godWriteFile(BASE_URL + "public/huya-category.html", 'hiker://files/TyrantG/public/huya-category.html')
    // godWriteFile(BASE_URL+"public/huya-player.html?t="+time, 'hiker://files/TyrantG/public/huya-player.html')
    // godSaveFile(BASE_URL+"public/utils/huya_lib.js", 'hiker://files/TyrantG/public/utils/huya_lib.js')
    godSaveFile(BASE_URL + "public/css/element-ui.css", 'hiker://files/TyrantG/public/css/element-ui.css')
    // godSaveFile(BASE_URL+"public/css/aliplayer-min.css", 'hiker://files/TyrantG/public/css/aliplayer-min.css')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    // godSaveFile(BASE_URL+"public/js/aliplayer-min.js", 'hiker://files/TyrantG/public/js/aliplayer-min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const qie_egame_live = _ => {
    godWriteFile(BASE_URL + "LIVE/qie_egame.js?t=" + time, 'hiker://files/TyrantG/LIVE/qie_egame.js')
    godWriteFile(BASE_URL + "public/qieEgame-tabs.html?t=" + time, 'hiker://files/TyrantG/public/qieEgame-tabs.html')
    godSaveFile(BASE_URL + "public/css/element-ui.css", 'hiker://files/TyrantG/public/css/element-ui.css')
    godSaveFile(BASE_URL + "public/js/vue.min.js", 'hiker://files/TyrantG/public/js/vue.min.js')
    godSaveFile(BASE_URL + "public/js/element-ui.js", 'hiker://files/TyrantG/public/js/element-ui.js')
}

const qie_sport_live = _ => {
    godWriteFile(BASE_URL + "LIVE/qie_sport.js?t=" + time, 'hiker://files/TyrantG/LIVE/qie_sport.js')
}

const _95_xiu_live = _ => {
    godWriteFile(BASE_URL + "LIVE/95_xiu.js?t=" + time, 'hiker://files/TyrantG/LIVE/95_xiu.js')
}

const yande_re = _ => {
    godWriteFile(BASE_URL + "GHS/yande.re.js?t=" + time, 'hiker://files/TyrantG/GHS/yande.re.js')
}

const pornhub = _ => {
    godWriteFile(BASE_URL + "GHS/pornhub.js?t=" + time, 'hiker://files/TyrantG/GHS/pornhub.js')
}

const jable = _ => {
    godWriteFile(BASE_URL + "GHS/jable.js?t=" + time, 'hiker://files/TyrantG/GHS/jable.js')
}

const spankbang = _ => {
    godWriteFile(BASE_URL + "GHS/spankbang.js?t=" + time, 'hiker://files/TyrantG/GHS/spankbang.js')
}

const eroticmovies_xyz = _ => {
    godWriteFile(BASE_URL + "GHS/eroticmovies.xyz.js?t=" + time, 'hiker://files/TyrantG/GHS/eroticmovies.xyz.js')
}

const eporner = _ => {
    godWriteFile(BASE_URL + "GHS/eporner.js?t=" + time, 'hiker://files/TyrantG/GHS/eporner.js')
}

const _7719 = _ => {
    godWriteFile(BASE_URL + "GHS/7719.js?t=" + time, 'hiker://files/TyrantG/GHS/7719.js')
}

const shuiguopai = _ => {
    godWriteFile(BASE_URL + "GHS/shuiguopai.js?t=" + time, 'hiker://files/TyrantG/GHS/shuiguopai.js')
}

const ohentai = _ => {
    godWriteFile(BASE_URL + "GHS/ohentai.js?t=" + time, 'hiker://files/TyrantG/GHS/ohentai.js')
}

const aktool = _ => {
    godWriteFile(BASE_URL + "TOOL/aktools.js?t=" + time, 'hiker://files/TyrantG/TOOL/aktool.js')
}

const prts = _ => {
    godWriteFile(BASE_URL + "TOOL/prts.js?t=" + time, 'hiker://files/TyrantG/TOOL/prts.js')
}

const ys_map = _ => {
    godWriteFile(BASE_URL + "TOOL/ys_map.js?t=" + time, 'hiker://files/TyrantG/TOOL/ys_map.js')
}

const zczc = _ => {
    godWriteFile(BASE_URL + "TOOL/zczc.js?t=" + time, 'hiker://files/TyrantG/TOOL/zczc.js')
}

const naraka_score = _ => {
    godWriteFile(BASE_URL + "TOOL/naraka_score.js?t=" + time, 'hiker://files/TyrantG/TOOL/naraka_score.js')
}

const artStation = _ => {
    godWriteFile(BASE_URL + "IMAGE/artstation.js?t=" + time, 'hiker://files/TyrantG/IMAGE/artstation.js')
}

const zcool = _ => {
    godWriteFile(BASE_URL + "IMAGE/zcool.js?t=" + time, 'hiker://files/TyrantG/IMAGE/zcool.js')
}

const huashi6 = _ => {
    godWriteFile(BASE_URL + "IMAGE/huashi6.js?t=" + time, 'hiker://files/TyrantG/IMAGE/huashi6.js')
}

const manhuagui = _ => {
    godWriteFile(BASE_URL + "COMIC/manhuagui.js?t=" + time, 'hiker://files/TyrantG/COMIC/manhuagui.js')
}

const picacg = _ => {
    godWriteFile(BASE_URL + "COMIC/picacg.js?t=" + time, 'hiker://files/TyrantG/COMIC/picacg.js')
}

const ednovas = _ => {
    godWriteFile(BASE_URL + "VIDEO/ednovas.js?t=" + time, 'hiker://files/TyrantG/VIDEO/ednovas.js')
}

const youtube = _ => {
    godWriteFile(BASE_URL + "TEST/youtube.js?t=" + time, 'hiker://files/TyrantG/TEST/youtube.js')
}

const douyin_web = _ => {
    godWriteFile(BASE_URL + "VIDEO/douyin_web.js?t=" + time, 'hiker://files/TyrantG/VIDEO/douyin_web.js')
}

/* Customize Function */
