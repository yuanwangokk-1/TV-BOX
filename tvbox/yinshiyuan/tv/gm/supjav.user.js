// ==UserScript==
// @name         Supjav
// @namespace    gmspider
// @version      2024.11.21
// @description  Supjav GMSpider
// @author       Luomo
// @match        https://supjav.com/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js
// ==/UserScript==
console.log(JSON.stringify(GM_info));
(function () {
    const GMSpiderArgs = {};
    if (typeof GmSpiderInject !== 'undefined') {
        let args = JSON.parse(GmSpiderInject.GetSpiderArgs());
        GMSpiderArgs.fName = args.shift();
        GMSpiderArgs.fArgs = args;
    } else {
        GMSpiderArgs.fName = "detailContent";
        GMSpiderArgs.fArgs = ["tag"];
    }
    Object.freeze(GMSpiderArgs);
    const GmSpider = (function () {
        function listVideos() {
            let itemList = [];
            $(".post").each(function () {
                const url = new URL($(this).find(".img").attr("href"));
                itemList.push({
                    vod_id: url.pathname.split('/').at(2),
                    vod_name: $(this).find(".img").attr("title"),
                    vod_pic: $(this).find("img").data("original"),
                    vod_remarks: $(this).find(".date").text(),
                    vod_year: $(this).find(".meta").children().remove().end().text()
                })
            });
            return itemList;
        }

        return {
            homeContent: function (filter) {
                const defaultFilter = [{
                    key: "sort",
                    name: "排序",
                    value: [
                        {
                            n: "观看数",
                            v: "views"
                        },
                        {
                            n: "更新时间",
                            v: ""
                        }
                    ]
                }];
                let result = {
                    class: [
                        {type_id: "popular", type_name: "热门"},
                        {type_id: "category/censored-jav", type_name: "有码"},
                        {type_id: "category/uncensored-jav", type_name: "无码"},
                        {type_id: "category/amateur", type_name: "素人"},
                        {type_id: "category/chinese-subtitles", type_name: "中文字幕"},
                        {type_id: "category/reducing-mosaic", type_name: "无码破解"},
                        {type_id: "category/english-subtitles", type_name: "英文字幕"},
                        {type_id: "tag", type_name: "类别"},
                    ],
                    filters: {
                        popular: [{
                            key: "sort",
                            name: "时间",
                            value: [
                                {
                                    n: "本月热门",
                                    v: "month"
                                },
                                {
                                    n: "本周热门",
                                    v: "week"
                                },
                                {
                                    n: "今日热门",
                                    v: ""
                                }
                            ]
                        }]
                    },
                    list: []
                };
                result.class.forEach((item) => {
                    if (typeof result.filters[item.type_id] === "undefined") {
                        result.filters[item.type_id] = defaultFilter;
                    }
                })
                result.list = listVideos()
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                let result = {
                    list: [],
                    pagecount: 1
                };
                if (tid === "tag") {
                    $(".categorys .child").each(function () {
                        const url = new URL($(this).find("a").attr("href")).pathname.split('/');
                        const text = $(this).text().trim().split("(")
                        result.list.push({
                            vod_id: url[2] + "/" + url[3],
                            vod_name: text[0],
                            vod_remarks: parseInt(text[1]) + " 部影片",
                            vod_tag: "folder",
                            style: {
                                "type": "rect",
                                "ratio": 1
                            }
                        })
                    });
                    result.pagecount = $(".pagination li").not(".next-page").last().text().trim();
                } else {
                    if ($(".pagination li").length > 0) {
                        result.pagecount = $(".pagination li").not(".next-page").last().text().trim();
                    }
                    result.list = listVideos();
                }
                return result;
            },
            detailContent: function (ids) {
                $("#vserver").click();
                let vodActor = [], tags = [];
                $(".post-meta .cats a").each(function () {
                    const id = new URL($(this).attr("href")).pathname.replace("/zh/", "");
                    const name = $(this).text().trim();
                    vodActor.unshift(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                });
                $(".post-meta .tags a").each(function () {
                    const id = new URL($(this).attr("href")).pathname.replace("/zh/", "");
                    const name = $(this).text().trim();
                    tags.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                });

                const result = {
                    list: [{
                        vod_id: ids[0],
                        vod_name: $(".post-meta .img").attr("alt"),
                        vod_pic: $(".post-meta .img").attr("src"),
                        vod_actor: vodActor.join(" "),
                        vod_remarks: tags.join(" "),
                        vod_content: $(".post-meta .img").attr("alt"),
                        vod_play_from: "Supjav",
                        vod_play_url: "1080P$@{playUrl}",
                    }]
                };
                console.log(result);
                return result
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    pagecount: 1
                };
                result.list = listVideos();
                if ($(".pagination li").length > 0) {
                    result.pagecount = $(".pagination li").not(".next-page").last().text().trim();
                }
                return result;
            }
        };
    })();
    $(window).load(function () {
        const result = GmSpider[GMSpiderArgs.fName](...GMSpiderArgs.fArgs);
        console.log(result);
        if (typeof GmSpiderInject !== 'undefined') {
            GmSpiderInject.SetSpiderResult(JSON.stringify(result));
        }
    });
})();