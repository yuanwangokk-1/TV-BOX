/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '追剧狂人',
  logo: 'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif',
  lang: 'ds'
})
*/

var rule = {
    类型: "影视",
    title: "追剧狂人",
    author: "不告诉你",
    logo: 'https://i-blog.csdnimg.cn/blog_migrate/2621e710a94ab40ba66645d47f296aaf.gif',
    host: "https://www.zjkrmv.vip",
    url: "/vodshow/fyfilter.html",
    searchUrl: "/vodsearch/**----------fypage---",
    searchable: 1, quickSearch: 1, double: false, timeout: 10000, play_parse: true, filterable: 1, invalid: true,
    class_name: "电影&连续剧&动漫&综艺&短剧",
    class_url: "1&2&4&3&23",
    filter_url: '{{fl.类型}}-{{fl.地区}}-{{fl.by}}-{{fl.剧情}}-----fypage---{{fl.年份}}.html',
    filter_def: {1: {类型: '1'}, 2: {类型: '2'}, 3: {类型: '3'}, 4: {类型: '4'}, 23: {类型: '23'}},
    推荐: '.myui-vodbox-content;.title&&Text;img&&src;.tag-box&&Text;a&&href',
    // 推荐: async function (tid, pg, filter, extend) {
    //   const { input, pdfa, pdfh, pd } = this;
    //   const html = await request(input);
    //   const d = [];
    //   const data = pdfa(html, ".myui-vodbox-content");
    //   data.forEach((it) => {
    //     d.push({
    //       title: pdfh(it, ".title&&Text"),
    //       pic_url: pd(it, "img&&src"),
    //       desc: pdfh(it, ".tag&&Text"),
    //       url: pd(it, "a&&href"),
    //     });
    //   });
    //   return setResult(d);
    // },
    一级: async function (tid, pg, filter, extend) {
        const {input, pdfa, pdfh, pd} = this;
        const html = await request(input);
        const d = [];
        const data = pdfa(html, ".show-vod-list&&a");
        data.forEach((it) => {
            d.push({
                title: pdfh(it, ".title&&Text"),
                pic_url: pd(it, "img&&src"),
                desc: pdfh(it, ".tag&&Text"),
                url: pd(it, "a&&href"),
            });
        });
        return setResult(d);
    },
    二级: async function (ids) {
        const {input, pdfa, pdfh, pd} = this;
        const html = await request(input);
        const playlist = pdfa(html, ".tab-pane");
        const tabs = pdfa(html, ".player-box&&ul li");
        let playmap = {};
        tabs.map((item, i) => {
            const form = pdfh(item, "Text");
            const list = playlist[i];
            const a = pdfa(list, "body&&a:not(:contains(排序))");
            a.map((it) => {
                let title = pdfh(it, "Text");
                let urls = pd(it, "a&&href", input);
                if (!playmap.hasOwnProperty(form)) {
                    playmap[form] = [];
                }
                playmap[form].push(title + "$" + urls);
            });
        });
        const urls = Object.values(playmap);
        const playUrls = urls.map((urllist) => urllist.join("#"));
        const VOD = {
            vod_name: pdfh(html, "h1&&Text"), // 名称
            vod_actor: pdfh(html, ".director:eq(1)&&Text"), // 演员
            vod_director: pdfh(html, ".director:eq(0)&&Text"), // 导演
            vod_remarks: pdfh(html, ".bottom:eq(1)&&Text"), // 备注
            vod_content: pdfh(html, ".wrapper_more_text&&Text"), // 简介p:eq(0)&&Text
            vod_play_from: Object.keys(playmap).join("$$$"), // 线路
            vod_play_url: playUrls.join("$$$"), // 播放地址
        };
        return VOD;
    },
    // 搜索: async function (wd, quick, pg) {
    //   const homeFn = rule.一级.bind(this);
    //   return await homeFn();
    // },
    搜索: '*',
    // 搜索:'.show-vod-list&&a;.title&&Text;img&&src;.tag&&Text;a&&href',
    lazy: async function (flag, id, flags) {
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
    },
    filter: 'H4sIAAAAAAAAA+2Y227TQBCG73kK5Ote1GlpC6+CuABUCcRJ4iQhhASkSZsUkrSigZD0JJoDpaEJh9I6OHkZ7zp9CzaenZldoVoWIECQXvWbP+ud3fX8Y+1Dx3XOnX/oXJt/4Jxzwm5PbCw7E87NizfmTb5/8fq9+eiHN1VYZFrH6dYorMB1Hk3ocL4V+LUwt6iVGVbKNZFrsjJLSrjUlekMK3OsNFfEUY+Vs6TIJyX5uMyKO8kT5ZrW41zOTi69CrycIaXMxMMXxlQuzyXqi1YWKZ5LPt0LyyuGxHOF3q7w1wxJzXVhJMI2i1pHPPN4m4ljtpkz2mkeV7I6qgG140ZFHu5rTQONK3bkUR/HAVC+/YKo+lrTQMv8uMaaBtSGy13WNNC4l3VZ28NxAJTn5lsep4Hy7H9hTQPn0jFz6VjjnneE18BxADRuoah2Siy9xaHEtJL6ICy2w1wFF0PML8mWXB6oYTgFMf0icxD0yigDWMd+9Cno+caxIyc59tRk6gy9g+pfIz7N8WkzPsXxKTOe4njKjLscd834JMcnjbiqEowbBaNgjuNzZnyW47NmfIbjM2ac1+ua63V5vepfa4Oj6jc2GDlRXUUehacHYLsU1geA7Ub4YgHYjkgvTAS2v+EzAWwbw3EAto/hfAD0Frcb4tkuvsIANF9+P/RR02AbIOc5AtsBUQOgXNqNoL+FuQDQuOzqcQULTgON29hVmeM4gCT7CZaLGgBp6bx8+ho1AFp7rygyh7h2APKi9VX5qo5eBEDPLC8Ocx4+E4B96n344rPwu2RVyOy4O8M3dIoApBWyovgBNQA6xUFJnQGeIgDvak2ur9CuRkDawiB8hyvRQDvgr4S9mpWwFTLL6NIDLiFZWBVe8bsSkuVOcJgPvYF+1t2r6tc0V7otG/jWX7l6947xLvnD/QWt3Ll86/b8aOILE6dOqz8n9ZNfIkZDr/qB1+Rydtn/VEtUzc+Q2DJVkxr1IpbYdeRec9QWWZr5hQ09m1G/pyONIEmj/NFmH9eY4z8ETm6+sR8C5Y7qlWJ9m+oIedw4/4nGGWNzcc0KvFY8ORDpomW/OpSkMYv3B8JrowaQsOGd2JjjGl5cY46z9LgGFBxts6Vr4KaWkRWscQ0031qWm6gGw+55zzQkrbY/Zf9TY/sf2//Y/sf2P7b//9H+p3/S/rmEtf3nW/LrO3zluaC0zVuqcbcI/cFUp4wrP+gDlur+wlYQJY5HA5DEtiEt1ADG5vovmOuo5hc2DQNQQIUWc4GkinC4/Rg1AHpmoRWW8AJZA2mljXCPLlgA+EPl5AudYWl9WECj10DP3NoWVTRpDUmMWNY845IIgOaLuSKJazqio7bpE84HYGr1j4amgPZzpx98xcslDWz8m2KpSsYfAZm790G0S2juAPTMal5W8HJJA+9LVwxe0r5E8LcbeMr8gP/tSUQ5PPoGACVGrc8aAAA='
}