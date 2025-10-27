// ==UserScript==
// @name         nJAV
// @namespace    gmspider
// @version      2024.11.12
// @description  nJAV的gmspider
// @author       Luomo
// @match        https://njav.tv/*
// @match        https://javplayer.me/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.min.js
// @require      https://github.com/kapetan/jquery-observe/raw/refs/heads/master/jquery-observe.js
// ==/UserScript==
console.log(JSON.stringify(GM_info));
(function () {
    const GMSpiderArgs = {};
    if (typeof GmSpiderInject !== 'undefined') {
        let args = JSON.parse(GmSpiderInject.GetSpiderArgs());
        GMSpiderArgs.fName = args.shift();
        GMSpiderArgs.fArgs = args;
    } else {
        GMSpiderArgs.fName = "homeContent";
        GMSpiderArgs.fArgs = [true];
    }
    Object.freeze(GMSpiderArgs);
    const GmSpider = (function () {
        const filter = {
            key: "filter",
            name: "过滤",
            value: [{
                n: "全部",
                v: ""
            }, {
                n: "单个女演员",
                v: "&filter=single_actress"
            }]
        };
        const filterWithoutSort = [
            filter
        ];
        const defaultFilter = [
            filter,
            {
                key: "sort",
                name: "排序方式",
                value: [
                    {
                        n: "最近更新",
                        v: "&sort=recent_update"
                    },
                    {
                        n: "发布时间",
                        v: "&sort=release_date"
                    },
                    {
                        n: "动态",
                        v: "&sort=trending"
                    },
                    {
                        n: "今日最好",
                        v: "&sort=most_viewed_today"
                    },
                    {
                        n: "本周最好",
                        v: "&sort=most_viewed_week"
                    },
                    {
                        n: "本月最好",
                        v: "&sort=most_viewed_month"
                    },
                    {
                        n: "观看次数最多",
                        v: "&sort=most_viewed"
                    },
                    {
                        n: "最喜欢",
                        v: "&sort=most_favourited"
                    }
                ]
            }];

        function pageList(result) {
            result.total = parseInt($("#page-list .section-title .text-muted").text().replace(",", ""));
            result.pagecount = Math.ceil(result.total / result.limit);
            $("#page-list .box-item-list .box-item").each(function (i) {
                result.list.push({
                    vod_id: getIdFromHref($(this).find(".thumb a").attr("href")),
                    vod_name: $(this).find(".detail a").text(),
                    vod_pic: $(this).find(".thumb img").data("src"),
                    vod_year: $(this).find(".duration").text()
                })
            });
            return result;
        }

        function getIdFromHref(href) {
            return href.split("/").pop();
        }

        function Video(id, data) {
            return data.stream;
        }

        function formatDetail(detail, ...keys) {
            let format = "";
            for (let key of keys) {
                format += key in detail ? (Array.isArray(detail[key]) ? detail[key].join(" ") : detail[key]) : "";
            }
            return format;
        }


        return {
            homeContent: function () {
                let result = {
                    class: [
                        {type_id: "recent-update", type_name: "最近更新"},
                        {type_id: "new-release", type_name: "全新上市"},
                        {type_id: "censored", type_name: "审查"},
                        {type_id: "uncensored", type_name: "未经审查"},
                        {type_id: "uncensored-leaked", type_name: "未经审查泄露"},
                        {type_id: "vr", type_name: "VR"},
                        {type_id: "genres", type_name: "类型"}
                    ],
                    filters: {
                        "recent-update": filterWithoutSort,
                        "new-release": filterWithoutSort,
                        "censored": defaultFilter,
                        "uncensored": defaultFilter,
                        "uncensored-leaked": defaultFilter,
                        "vr": defaultFilter,
                        "genres": defaultFilter
                    },
                    list: [],
                    parse: 0,
                    jx: 0
                };
                const canonical = $("head link[rel=canonical]").attr("href");
                const base = $("head base").attr('href');
                if (canonical.includes(base)) {
                    let urlPrefix = canonical.replace(base, "");
                    urlPrefix = urlPrefix.endsWith("/") ? urlPrefix : urlPrefix + "/";
                    result.class.forEach((item) => {
                        if (item.type_id !== "genres") {
                            const modifiedTypeId = urlPrefix + item.type_id;
                            if (result.filters.hasOwnProperty(item.type_id)) {
                                result.filters[modifiedTypeId] = result.filters[item.type_id];
                                delete result.filters[item.type_id]
                            }
                            item.type_id = urlPrefix + item.type_id;
                        }
                    })
                }
                $("#top-carousel .box-item-list .box-item:not(.splide__slide--clone)").each(function () {
                    result.list.push({
                        vod_id: getIdFromHref($(this).find("a").attr("href")),
                        vod_name: $(this).find(".name").text(),
                        vod_pic: $(this).find("img").attr("src"),
                    })
                });
                return result;
            },
            categoryContent: function (tid, pg, filter, extend) {
                console.log(tid, pg, filter, JSON.stringify(extend));
                const result = {
                    list: [],
                    limit: 12,
                    total: 0,
                    page: pg,
                    pagecount: 0
                };
                if (tid === "genres") {
                    $("#page-list .bl-item").each(function () {
                        result.list.push({
                            vod_id: $(this).find("a").attr("href"),
                            vod_name: $(this).find(".name").text(),
                            vod_remarks: $(this).find(".text-muted").text(),
                            vod_tag: "folder",
                            style: {
                                "type": "rect",
                                "ratio": 1
                            }
                        })
                    });
                    result.pagecount = 1;
                } else {
                    pageList(result);
                }
                return result;
            },
            detailContent: function (ids) {
                const playUrl = $("#player iframe").get(0).src;
                let detail = {};
                $("#details .detail-item div").each(function (item) {
                    const key = $(this).find("span:first").text().replace(":", "");
                    if ($(this).find("span:eq(1) a").length === 0) {
                        detail[key] = $(this).find("span:eq(1)").text().trim();
                    } else {
                        detail[key] = [];
                        $(this).find("span:eq(1) a").each(function () {
                            const id = $(this).attr("href");
                            const name = $(this).text();
                            detail[key].push(`[a=cr:{"id":"${id}","name":"${name}"}/]${name}[/a]`);
                        })
                    }
                });
                const vod = {
                    vod_id: ids[0],
                    vod_name: $(".favourite:first").data("code"),
                    vod_pic: $("#player").data("poster"),
                    vod_year: formatDetail(detail, "发布日期"),
                    vod_remarks: formatDetail(detail, "类型"),
                    vod_director: formatDetail(detail, "制作者", "标签"),
                    vod_actor: formatDetail(detail, "演员"),
                    vod_content: $(".justify-content-between.align-items-start h1").text().trim(),
                    vod_play_from: "nJAV",
                    vod_play_url: "720P$" + playUrl,
                };
                return {list: [vod]};
            },
            playerContent: function (flag, id, vipFlags) {
                console.log(flag, id, vipFlags);
                const playUrl = eval($("#player").attr("v-scope"));
                return {
                    header: JSON.stringify({
                        "User-Agent": window.navigator.userAgent,
                        "Referer": "https://javplayer.me/"
                    }),
                    url: playUrl
                };
            },
            searchContent: function (key, quick, pg) {
                const result = {
                    list: [],
                    limit: 12,
                    total: 0,
                    page: pg,
                    pagecount: 0
                };
                return pageList(result);
            }
        };
    })();
    $(document).ready(function () {
        let result = "";
        if ($("#cf-wrapper").length > 0) {
            console.log("源站不可用:" + $('title').text());
            GM_toastLong("源站不可用:" + $('title').text());
        } else {
            result = GmSpider[GMSpiderArgs.fName](...GMSpiderArgs.fArgs);
        }
        console.log(result);
        if (typeof GmSpiderInject !== 'undefined') {
            GmSpiderInject.SetSpiderResult(JSON.stringify(result));
        }
    });
})();