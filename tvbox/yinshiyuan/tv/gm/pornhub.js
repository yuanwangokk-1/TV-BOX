// ==UserScript==
// @name         Jable
// @namespace    gmspider
// @version      1.0
// @description  Jable的gmspider
// @author       Luomo
// @match        https://jable.tv/*
// @grant        unsafeWindow
// ==/UserScript==
console.log('jable user scrpit');
$(document).ready(function () {
    function listVideos(result) {
        result.total = parseInt($(".content-header .title-box .inactive-color").text());
        result.pagecount = Math.ceil(result.total / result.limit);
       
         //类型列表
        $("[id^='list_videos_'] .row:first .video-img-box").each(function (i) {
            const subTitle = $(this).find(".sub-title").text().split('\n');//副标题
            const remarks = [
                "👁️" + subTitle[1].trim(),
                "❤️" + subTitle[2].trim()
            ];
            const url = new URL($(this).find(".img-box a").attr("href"));//链接
            result.list.push({
                vod_id: url.pathname.split('/').at(2).toUpperCase(),
                vod_name: $(this).find(".title").text(),//标题
                vod_pic: $(this).find(".img-box img").data("src"),//图片
                vod_remarks: remarks.join(" "),
                vod_year: $(this).find(".absolute-bottom-right").text()//左上角副标题
            })
        });
        return result;
    }

    unsafeWindow.GmSpider = (function () {
        return {
            homeContent: function () {
                const result = {
                    class: [
                        {type_id: "latest-updates", type_name: "最近更新"},
                        {type_id: "new-release", type_name: "全新上市"},
                        {type_id: "hot", type_name: "热门影片"},
                        {type_id: "categories", type_name: "主题&标签"},
                    ],
                    filters: {
                        hot: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                {
                                    n: "所有时间",
                                    v: "&sort_by=video_viewed"
                                },
                                {
                                    n: "本月热门",
                                    v: "&sort_by=video_viewed_month"
                                },
                                {
                                    n: "本周热门",
                                    v: "&sort_by=video_viewed_week"
                                },
                                {
                                    n: "今日热门",
                                    v: "&sort_by=video_viewed_today"
                                }
                            ]
                        }],
                        categories: [{
                            key: "sort_by",
                            name: "时间",
                            value: [
                                {
                                    n: "近期最佳",
                                    v: "&sort_by=post_date_and_popularity"
                                },
                                {
                                    n: "最近更新",
                                    v: "&sort_by=post_date"
                                },
                                {
                                    n: "最多观看",
                                    v: "&sort_by=video_viewed"
                                },
                                {
                                    n: "最高收藏",
                                    v: "&sort_by=most_favourited"
                                }
                            ]
                        }]
                    },
                    list: [],
                    parse: 0,
                    jx: 0
                };
                $(".jable-animate .owl-item:not(.cloned) a").each(function () {
                    const url = new URL($(this).attr("href"));
                    result.list.push({
                        vod_id: url.pathname.split('/').at(2).toUpperCase(),
                        vod_name: url.pathname.split('/').at(2).toUpperCase(),
                        vod_pic: $(this).find("img").data("src")
                    })
                });
                console.log(JSON.stringify(result));
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                console.log(tid, pg, filter, JSON.stringify(extend));
                const result = {
                    list: [],
                    limit: 24,
                    total: 0,
                    page: pg,
                    pagecount: 0
                };
                if (tid === "categories") {
                    $("#list_categories_video_categories_list .video-img-box").each(function () {
                        const url = new URL($(this).find("a").attr("href")).pathname.split('/');//主题分类
                        result.list.push({
                            vod_id: url[1] + "/" + url[2],
                            vod_name: $(this).find("h4").text(),
                            vod_pic: $(this).find("img").attr("src"),
                            vod_remarks: $(this).find(".absolute-center span").text(),
                            vod_tag: "folder",
                            style: {
                                "type": "rect",
                                "ratio": 1
                            }
                        })
                    });
                    const tags = [];
                    $(".app-nav .title-box:gt(0)").each(function () {
                        const remark = $(this).text();
                        $(this).next(".row").find(".tag").each(function () {
                            const url = new URL($(this).attr("href")).pathname.split('/');
                            result.list.push({
                                vod_id: url[1] + "/" + url[2],
                                vod_name: $(this).text(),
                                vod_pic: "https://i.ibb.co/7jb5Gv5/jable-tags-square.png",
                                vod_remarks: remark,
                                vod_tag: "folder",
                            })
                        });
                    });
                    result.pagecount = 1;
                } else {
                    listVideos(result);
                }
                console.log(JSON.stringify(result));
                return result;
            },
            detailContent: function (ids) {
                let vodActor = [];
                $(".video-info .info-header .models .model").each(function () {
                    const url = new URL($(this).attr("href")).pathname.split('/');
                    const id = url[1] + "/" + url[2];
                    const name = $(this).find(".rounded-circle").data("original-title");
                    vodActor.push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                });
                // $(".video-info .tags .cat").each(function () {
                //     const url = new URL($(this).attr("href")).pathname.split('/');
                //     const id = url[1] + "/" + url[2];
                //     const name = $(this).text();
                //     vodActor.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                // });
                // $(".video-info .tags a:not(.cat)").each(function () {
                //     const url = new URL($(this).attr("href")).pathname.split('/');
                //     const id = url[1] + "/" + url[2];
                //     const name = $(this).text();
                //     vodActor.push(`[a=cr:{"id":"${id}","name":"${name}"}/]#${name}[/a]`);
                // });
                const vod = {
                    vod_id: ids[0],
                    vod_name: ids[0].toUpperCase(),
                    vod_pic: $("#player").attr("poster"),
                    vod_remarks: "更新于 " + $(".video-info .info-header .mr-3:first").text() + " " + $(".video-info .info-header .inactive-color").text(),
                    vod_actor: vodActor.join(" "),
                    vod_content: $(".video-info h4").text(),
                    vod_play_from: $(".video-info .info-header .header-right h6").children().remove().end().text().trim(),
                    vod_play_url: ids[0].toUpperCase() + "$" + unsafeWindow.hlsUrl,
                };
                console.log(JSON.stringify({list: [vod]}))
                return {list: [vod]};
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    limit: 24,
                    total: 0,
                    page: pg,
                    pagecount: 0
                };
                listVideos(result);
                console.log(JSON.stringify(result));
                return result;
            }
        };
    })();
    GmSpiderInject.NoticeSpiderReady();
});