/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '九七电影网',
  lang: 'ds'
})
*/

var rule = {
    类型: '影视',
    title: '九七电影网',
    编码: 'gb18030',
    desc: '不告诉你',
    host: 'http://m.aogetu.com',
    url: '/fyclass/indexfypage.html[/fyclass]',
    searchUrl: '/s.asp?page=fypage&searchword=**&searchtype=-1',
    headers: {'User-Agent': 'MOBILE_UA'},
    searchable: 2, quickSearch: 0, timeout: 5000, play_parse: true, filterable: 0,
    class_name: '动作片&喜剧片&爱情片&科幻片&恐怖片&剧情片&战争片&纪录片&VIP&动画&国产剧&欧美剧&香港剧&韩国剧&台湾剧&日本剧&泰国剧&海外剧&微短剧&国产动漫&日韩动漫&欧美动漫&其他动漫&大陆综艺&香港综艺&台湾综艺&日韩综艺&欧美综艺&其他综艺&理论片&写真&主播',
    class_url: 'dianying/dongzuopian&dianying/xijupian&dianying/aiqingpian&dianying/kehuanpian&dianying/kongbupian&dianying/juqingpian&dianying/zhanzhengpian&dianying/jilupian&dianying/fuli&dianying/dhdy&dianshiju/guochanju&dianshiju/oumeiju&dianshiju/hongkongju&dianshiju/hanguoju&dianshiju/taiwanju&dianshiju/ribengju&dianshiju/taiguoju&dianshiju/haiwaiju&dianshiju/duanju&dongmandonghua/guochandonghua&dongmandonghua/ribendongman&dongmandonghua/oumeidongman&dongmandonghua/qitadongman&zongyiyule/daluzongyi&zongyiyule/hongkongzongyi&zongyiyule/taiwanzongyi&zongyiyule/rihanzongyi&zongyiyule/oumeizongyi&zongyiyule/qitazongyi&wuyejuchang/lunli&wuyejuchang/xiezhen&wuyejuchang/zhubo',
    预处理: async () => {
        return []
    },
    推荐: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.list_tab_img li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.loading&&data-original'),
                desc: pdfh(it, '.title&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    一级: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.list_tab_img li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.loading&&data-original'),
                desc: pdfh(it, '.name&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');
        VOD.vod_content = pdfh(html, '.v-js.clear.yc&&Text');
        let playlist = pdfa(html, '.plau-ul-list');
        let tabs = pdfa(html, '.vod-info-tab .play-title');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text');
            const list = playlist[i];
            const a = pdfa(list, 'body&&a');
            a.map((it) => {
                let title = pdfh(it, 'a&&Text');
                let urls = pd(it, 'a&&href', input);
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(title + "$" + urls);
            });
        });
        VOD.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => {
            return urllist.join("#");
        });
        VOD.vod_play_url = playUrls.join('$$$');
        return VOD;
    },
    搜索: async function (wd, quick, pg) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.list_tab_img li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.loading&&data-original'),
                desc: pdfh(it, '.name&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, ''),
            })
        });
        return setResult(d);
    },
    lazy: async function (flag, id, flags) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        // log(html);
        html = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]);
        let url = html.url;
        if (html.encrypt == "1") {
            url = unescape(url)
            return {parse: 0, url: url}
        } else if (html.encrypt == "2") {
            url = unescape(base64Decode(url))
            return {parse: 0, url: url}
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
            return {parse: 0, url: input}
        } else {
            return {parse: 0, url: input}
        }
    }
}
