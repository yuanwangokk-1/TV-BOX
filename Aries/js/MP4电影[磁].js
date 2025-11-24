/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: 'MP4电影',
  lang: 'ds'
})
*/

// http://localhost:5757/api/MP4电影[磁]?ac=list&t=分类&pg=1&ext=eyJ0eXBlIjoiMSJ9
// http://localhost:5757/api/MP4电影[磁]?ac=list&t=1&pg=1&ext=eyJ0eXBlIjoiMSJ9
// http://localhost:5757/api/MP4电影[磁]?ac=detail&ids=/detail/9278.html
// http://localhost:5757/api/MP4电影[磁]?wd=我的&pg=1
// http://localhost:5757/api/MP4电影[磁]?play=bXZfNTcyMzUtbm1fMQ%3D%3D&flag=由qq倾情打造
const { getHtml } = $.require('./_lib.request.js')
var rule = {
    类型: '影视',
    title: 'MP4电影',
    desc: 'MP4电影纯js版本',
    host: 'https://m.haomp4.cc',
    homeUrl: '',
    url: '',
    searchUrl: '**',
    searchable: 1,
    quickSearch: 0,
    timeout: 5000,
    play_parse: true,
    filterable: 1,
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
        'Referer': 'https://m.haomp4.cc',
        'Upgrade-Insecure-Requests': '1',
    },
    class_parse: async () => {
        return {
            class: [
                { type_name: '动作片', type_id: '1' },
                { type_name: '科幻片', type_id: '2' },
                { type_name: '爱情片', type_id: '3' },
                { type_name: '喜剧片', type_id: '4' },
                { type_name: '恐怖片', type_id: '5' },
                { type_name: '战争片', type_id: '6' },
                { type_name: '剧情片', type_id: '7' },
                { type_name: '纪录片', type_id: '8' },
                { type_name: '动画片', type_id: '9' },
                { type_name: '电视剧', type_id: '10' },
                { type_id: "分类", type_name: "分类" }],
            filters: {
                分类: [
                    {
                        "name": "类型",
                        "key": "type",
                        "value": [
                            {
                                "n": "全部",
                                "v": ""
                            },
                            {
                                "n": "动作片",
                                "v": "1"
                            },
                            {
                                "n": "科幻片",
                                "v": "2"
                            },
                            {
                                "n": "爱情片",
                                "v": "3"
                            },
                            {
                                "n": "喜剧片",
                                "v": "4"
                            },
                            {
                                "n": "恐怖片",
                                "v": "5"
                            },
                            {
                                "n": "战争片",
                                "v": "6"
                            },
                            {
                                "n": "剧情片",
                                "v": "7"
                            },
                            {
                                "n": "纪录片",
                                "v": "8"
                            },
                            {
                                "n": "动画片",
                                "v": "9"
                            },
                            {
                                "n": "电视剧",
                                "v": "10"
                            }
                        ],
                        "init": ""
                    },
                    {
                        "name": "地区",
                        "key": "area",
                        "value": [
                            {
                                "n": "全部",
                                "v": ""
                            },
                            {
                                "n": "大陆",
                                "v": "大陆"
                            },
                            {
                                "n": "香港",
                                "v": "香港"
                            },
                            {
                                "n": "美国",
                                "v": "美国"
                            },
                            {
                                "n": "英国",
                                "v": "英国"
                            },
                            {
                                "n": "日本",
                                "v": "日本"
                            },
                            {
                                "n": "韩国",
                                "v": "韩国"
                            },
                            {
                                "n": "法国",
                                "v": "法国"
                            },
                            {
                                "n": "德国",
                                "v": "德国"
                            },
                            {
                                "n": "加拿大",
                                "v": "加拿大"
                            },
                            {
                                "n": "意大利",
                                "v": "意大利"
                            },
                            {
                                "n": "台湾",
                                "v": "台湾"
                            },
                            {
                                "n": "印度",
                                "v": "印度"
                            },
                            {
                                "n": "泰国",
                                "v": "泰国"
                            },
                            {
                                "n": "西班牙",
                                "v": "西班牙"
                            },
                            {
                                "n": "澳大利亚",
                                "v": "澳大利亚"
                            },
                            {
                                "n": "瑞典",
                                "v": "瑞典"
                            },
                            {
                                "n": "比利时",
                                "v": "比利时"
                            },
                            {
                                "n": "俄罗斯",
                                "v": "俄罗斯"
                            },
                            {
                                "n": "荷兰",
                                "v": "荷兰"
                            },
                            {
                                "n": "丹麦",
                                "v": "丹麦"
                            }
                        ],
                        "init": ""
                    },
                    {
                        "name": "年代",
                        "key": "year",
                        "value": [
                            {
                                "n": "全部",
                                "v": ""
                            },
                            {
                                "n": "2024",
                                "v": "2024"
                            },
                            {
                                "n": "2023",
                                "v": "2023"
                            },
                            {
                                "n": "2022",
                                "v": "2022"
                            },
                            {
                                "n": "2021",
                                "v": "2021"
                            },
                            {
                                "n": "2020",
                                "v": "2020"
                            },
                            {
                                "n": "2019",
                                "v": "2019"
                            },
                            {
                                "n": "2018",
                                "v": "2018"
                            },
                            {
                                "n": "2017",
                                "v": "2017"
                            },
                            {
                                "n": "2016",
                                "v": "2016"
                            },
                            {
                                "n": "2015",
                                "v": "2015"
                            },
                            {
                                "n": "2014",
                                "v": "2014"
                            },
                            {
                                "n": "2013",
                                "v": "2013"
                            },
                            {
                                "n": "2012",
                                "v": "2012"
                            },
                            {
                                "n": "2011",
                                "v": "2011"
                            },
                            {
                                "n": "2010",
                                "v": "2010"
                            },
                            {
                                "n": "2009",
                                "v": "2009"
                            },
                            {
                                "n": "2008",
                                "v": "2008"
                            },
                            {
                                "n": "2007",
                                "v": "2007"
                            },
                            {
                                "n": "2006",
                                "v": "2006"
                            },
                            {
                                "n": "2005",
                                "v": "2005"
                            }
                        ],
                        "init": ""
                    },
                    {
                        "name": "标签",
                        "key": "tag",
                        "value": [
                            {
                                "n": "全部",
                                "v": ""
                            },
                            {
                                "n": "经典",
                                "v": "经典"
                            },
                            {
                                "n": "悬疑",
                                "v": "悬疑"
                            },
                            {
                                "n": "惊悚",
                                "v": "惊悚"
                            },
                            {
                                "n": "短片",
                                "v": "短片"
                            },
                            {
                                "n": "同性",
                                "v": "同性"
                            },
                            {
                                "n": "音乐",
                                "v": "音乐"
                            },
                            {
                                "n": "歌舞",
                                "v": "歌舞"
                            },
                            {
                                "n": "家庭",
                                "v": "家庭"
                            },
                            {
                                "n": "儿童",
                                "v": "儿童"
                            },
                            {
                                "n": "传记",
                                "v": "传记"
                            },
                            {
                                "n": "历史",
                                "v": "历史"
                            },
                            {
                                "n": "犯罪",
                                "v": "犯罪"
                            },
                            {
                                "n": "西部",
                                "v": "西部"
                            },
                            {
                                "n": "奇幻",
                                "v": "奇幻"
                            },
                            {
                                "n": "冒险",
                                "v": "冒险"
                            },
                            {
                                "n": "灾难",
                                "v": "灾难"
                            },
                            {
                                "n": "武侠",
                                "v": "武侠"
                            },
                            {
                                "n": "古装",
                                "v": "古装"
                            },
                            {
                                "n": "运动",
                                "v": "运动"
                            }
                        ],
                        "init": ""
                    }
                ]
            }
        }
    },
    预处理: async () => {
        // const html = (await getHtml({
        //     url: "https://domp4.icu/"
        // })).data;        
        // rule.host = "https://"+pq(html)("h4:first p").text().trim()
        // console.log(rule.host);        
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let { MY_CATE, input } = this;
        const type = extend.type ? "-id-" + extend.type : "";
        const year = extend.year ? "-year-" + extend.year : "";
        const area = extend.area ? "-area-" + extend.area : "";
        const tag = extend.tag ? "-wd-" + extend.tag : "";
        const p = pg === 1 ? "" : "-p-" + pg;
        let html;
        if (tid === "分类") {
            console.log(`${rule.host}/list-index${[type, year, tag, area, p].join("")}.html`,);
            html = ((await getHtml({
                url: `${rule.host}/list-index${[type, year, tag, area, p].join("")}.html`,
                headers: Object.assign(rule.headers, {
                    "Referer": "https://m.haomp4.cc/sort.html",
                    "x-requested-with": "XMLHttpRequest"
                })
            })).data).ajaxtxt;
            html = `<div id="list_all">${html}</div>`
        } else {
            html = (await getHtml({
                url: `${rule.host}/list/${tid}-${pg}.html`,
                headers: rule.headers
            })).data
        }
        const $ = pq(html);
        let videos = []
        for (const item of $("#list_all ul  li")) {
            const img = $(item).find("img:first")[0],
                a = $(item).find("a:first")[0],
                hdinfo = $($(item).find("div.hdinfo")[0]).text().trim(),
                remark = $($(item).find(".text_info>p:eq(-1)")[0]).text().trim();
            videos.push({
                vod_id: a.attribs.href.replace(/.*?\/movie\/(.*).html/g, "$1"),
                vod_name: img.attribs.alt.replace(/《|》/g, ""),
                vod_pic: img.attribs["data-original"],
                vod_remarks: remark || hdinfo || ""
            })
        }
        return videos
    },
    二级: async function (ids) {
        let { input } = this;
        const html = (await getHtml({
            url: rule.host + ids[0],
            headers: rule.headers
        })).data
        const $ = pq(html);
        let vod = {
            vod_id: ids[0],
            vod_pic: $(".pic img").attr("src"),
            vod_remarks: "",
            vod_area: $("em:contains(地区)+span").text().trim(),
            vod_director: $("em:contains(导演)+span").text().trim(),
            vod_year: $("em:contains(年份)+span").text().trim(),
            vod_content: $(".article-related.info").text().trim()
        };
        const playlist = $('[id^=download] ul').map((_, ul) => {
            let list = $(ul).find(".url-left a").map((_, a) => {
                return $(a).text() + "$" + $(a).attr("href")
            }).get()
            if (list[0] && list[1]) {
                [list[0], list[1]].sort()[0] === list[1] ? list.reverse() : list
            }
            return list.join("#")
        }).get()
        var playFroms = $('[id^=download]>h2').map((_, a) => {
            return "线路" + String.fromCharCode(65 + _)
            return $(a).text()
        }).get();
        vod.vod_play_from = playFroms.join('$$$');
        vod.vod_play_url = playlist.join("$$$");
        return vod
    },
    搜索: async function (wd, quick, pg) {
        let { input } = this
        const html = (await req(`${rule.host}/search/`, {
            method: "POST",
            headers: rule.headers,
            body: `wd=${wd}&p=${pg}`
        })).content;
        const $ = pq(html);
        let videos = []
        for (const item of $("#list_all ul li")) {
            const img = $(item).find("img:first")[0],
                a = $(item).find("a:first")[0],
                hdinfo = $($(item).find("div.hdinfo")[0]).text().trim(),
                remark = $($(item).find("div.jidi")[0]).text().trim();
            videos.push({
                vod_id: a.attribs.href,
                vod_name: img.attribs.alt.replace(/《|》/g, ""),
                vod_pic: img.attribs["data-original"],
                vod_remarks: remark || hdinfo || ""
            })
        }
        return videos
    },
    lazy: async function (flag, id, flags) {
        return { parse: 0, url: id }
    },
};
