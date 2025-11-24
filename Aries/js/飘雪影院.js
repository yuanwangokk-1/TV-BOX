/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '飘雪影院',
  author: '不告诉你',
  '类型': '影视',
  logo: 'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif',
  lang: 'ds'
})
*/

var rule = {
    类型:'影视',
    title:'飘雪影院',
    author: '不告诉你',
    logo:'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif',
    host:'https://www.yjmyston.com',
    url: '/pxyyshow/fyfilter.html',
    searchUrl:'/pxyysearch/page/fypage/wd/**.html',
    searchable:1,quickSearch:1,double:true,timeout:10000,play_parse:true,filterable:1,invalid:true,
    class_name: '电影&电视剧&综艺&动漫&短剧',
    class_url: '1&2&3&4&37',
    filter_url: '{{fl.类型}}{{fl.by}}/page/fypage',
    filter_def:{'1':{类型:'1'},'2':{类型:'2'},'3':{类型:'3'},'4':{类型:'4'},'37':{类型:'37'}},
    预处理: async () => {
        return []
    },
    推荐: async function (tid, pg, filter, extend) {
        let homeFn = rule.一级.bind(this);
        return await homeFn();
    },
    一级: async function (tid, pg, filter, extend) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, 'ul.stui-vodlist li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.lazyload&&data-original'),
                desc: pdfh(it, '.pic-text&&Text'),
                url: pd(it, 'a&&href'),
            })
        });
        return setResult(d)
    },
    二级: async function (ids) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let VOD = {};
        VOD.vod_name = pdfh(html, 'h1&&Text');//名称
        VOD.vod_actor = pdfh(html, '.stui-content__detail&&p:eq(0)&&Text');//演员
        VOD.vod_director = pdfh(html, '.stui-content__detail&&p:eq(1)&&Text');//导演
        VOD.vod_remarks = pdfh(html, '.stui-content__detail&&p:eq(2)&&Text');//备注
        VOD.vod_status = pdfh(html, '.stui-content__detail&&p:eq(3)&&Text');//状态
        VOD.vod_content = pdfh(html, '.stui-content__detail&&p:eq(4)&&Text');//简介
        let playlist = pdfa(html, '.stui-content__playlist');
        let tabs = pdfa(html, '.stui-pannel_hd .stui-pannel__head');
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, 'h3&&Text');
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
        let data = pdfa(html, 'ul.stui-vodlist__media li');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, '.lazyload&&data-original'),
                desc: pdfh(it, '.pic-text&&Text'),
                url: pd(it, 'a&&href'),
                content: pdfh(it, 'p.hidden-mi&&Text'),
            })
        });
        return setResult(d);
    },
    /*lazy: async function (flag, id, flags) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
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
            return {parse: 1, url: input}
        }
    },*/
    filter:{
    "1":[{"key":"类型","name":"类型","value":[{"n":"全部","v":"1"},{"n":"动作片","v":"6"},{"n":"喜剧片","v":"7"},{"n":"爱情片","v":"8"},{"n":"科幻片","v":"9"},{"n":"恐怖片","v":"10"},{"n":"剧情片","v":"11"},{"n":"战争片","v":"12"},{"n":"记录片","v":"19"},{"n":"奇幻片","v":"20"},{"n":"悬疑片","v":"21"},{"n":"理论片","v":"22"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
    "2":[{"key":"类型","name":"类型","value":[{"n":"全部","v":"2"},{"n":"国产剧","v":"13"},{"n":"港台剧","v":"14"},{"n":"日韩剧","v":"15"},{"n":"欧美剧","v":"16"},{"n":"海外剧","v":"23"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
    "3":[{"key":"类型","name":"类型","value":[{"n":"全部","v":"3"},{"n":"大陆综艺","v":"24"},{"n":"日韩综艺","v":"25"},{"n":"港台综艺","v":"26"},{"n":"欧美综艺","v":"27"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
    "4":[{"key":"类型","name":"类型","value":[{"n":"全部","v":"4"},{"n":"国产动漫","v":"28"},{"n":"日韩动漫","v":"29"},{"n":"港台动漫","v":"30"},{"n":"欧美动漫","v":"31"},{"n":"动漫电影","v":"38"},{"n":"里番动漫","v":"39"}]},{"key":"by","name":"排序","value":[{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}],
    "37":[{"key":"by","name":"排序","value":[{"n":"时间","v":"/by/time"},{"n":"人气","v":"/by/hits"},{"n":"评分","v":"/by/score"}]}]
    }
}