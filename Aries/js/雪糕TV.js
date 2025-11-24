/*
@header({
  searchable: 2,
  filterable: 0,
  quickSearch: 0,
  title: '雪糕TV',
  lang: 'ds'
})
*/

class Rule {
    类型 = '影视';
    title = '雪糕TV';
    desc = '';
    host = 'https://www.xgitv.com';
    homeUrl = '/';
    url = '/vshow/fyclass--------fypage---.html';
    searchUrl = '/vsearch/**----------fypage---.html';
    searchable = 2;
    quickSearch = 0;
    timeout = 5000;
    play_parse = true;

    async class_parse() {
        let classes = [
            {type_id: 'dianying', type_name: '电影'},
            {type_id: 'dianshiju', type_name: '电视剧'},
            {type_id: 'dongman', type_name: '动漫'},
            {type_id: 'zongyi', type_name: '综艺'}
        ];
        return {class: classes,}
    }

    async 预处理() {
    }

    async 推荐() {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-vod-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    }

    async 一级(tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-vod-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    }

    async 搜索(wd, quick, pg) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.hl-one-list li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.hl-lazy&&data-original'),
                desc: pdfh(it, '.hl-pic-text&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, '.hl-item-content&&p:eq(0)&&Text'),
            })
        });
        return setResult(d)
    }

    async 二级(ids) {
        let {
            input,
            pdfa,
            pdfh,
            pd
        } = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, '.hl-dc-title.hl-data-menu&&Text');
        VOD.vod_content = pdfh(html, '.hl-dc-content&&.blurb&&Text');
        let playlist = pdfa(html, '.hl-plays-list')
        let tabs = pdfa(html, '.hl-plays-from.hl-tabs a');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'Text')
            const list = playlist[i]
            const a = pdfa(list, 'body&&a:not(:contains(展开))')
            a.map((it) => {
                let title = pdfh(it, 'a&&Text')
                let urls = pd(it, 'a&&href', input)
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(title + "$" + urls);
            });
        });
        VOD.vod_play_from = Object.keys(playmap).join('$$$');
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => {
            return urllist.join("#")
        });
        VOD.vod_play_url = playUrls.join('$$$');
        return VOD
    }

    async lazy(flag, id, flags) {
        let {input} = this
        const html = JSON.parse((await req(input)).content.match(/r player_.*?=(.*?)</)[1]);
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
            return {parse: 1, url: input}
        }
    }
}

rule = new Rule();
