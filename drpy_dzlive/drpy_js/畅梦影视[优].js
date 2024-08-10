// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
// 注入全局方法 (仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0)
globalThis.getHeaders = function (input) {
    let t = new Date().getTime().toString();
    let headers = {
        'version_name': '1.0.6',
        'version_code': '6',
        'package_name': 'com.app.nanguatv',
        'sign': md5('c431ea542cee9679#uBFszdEM0oL0JRn@' + t).toUpperCase(),
        'imei': 'c431ea542cee9679',
        'timeMillis': t,
        'User-Agent': 'okhttp/4.6.0'
    };
    return headers
}

var rule = {
    title: '畅梦影视[优]',
    host: 'http://ys.changmengyun.com',
    homeUrl: '/api.php/provide/vod_rank?app=ylys&sort_type=month&imei=c431ea542cee9679&id=2&page=1',
    url: '/api.php/provide/vod_list?app=ylys&id=fyclassfyfilter&page=fypage&imei=c431ea542cee9679',
    detailUrl: '/api.php/provide/vod_detail?app=ylys&imei=c431ea542cee9679&id=fyid',
    searchUrl: '/api.php/provide/search_result_more?app=ylys&video_name=**&pageSize=20&tid=0&imei=c431ea542cee9679&page=fypage',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter_url: '&area={{fl.area}}&year={{fl.year}}&type={{fl.class}}&total={{fl.total or "状态"}}&order={{fl.by or "新上线"}}',
    filter: 'H4sIAAAAAAAAA+2XUXPSQBDHv0ueeQBqKfSrOH2IDk9inWmrM0yHmVakFtqC1hm0FqsdW4JjKUFrLcG0XyZ3gW9hwuV293AGikZfzBu///5z2Vx298K6ltAW765rD7J5bVG7n9NXV7WYtqw/zHrodvvsaMfjJ3rucXbkW/ZkVmoNiy1fRk8hFsQqLcduuOXnQRgZHPUGKxvEASwd7naXF0voQAaH8ZL1+sQBLB188wXfqKMDGfIoG8pdkGGN7TeOVSZrAIOjWOFP3xIHcGHJ94hd1VeyOm4qa5hs15q8qYEHUt2rDjptGRMgY8PmAb/q4KLjEmzZdZUd2nK/BMBjnBn84ot8BgGw/vtPeF0AcN3rU944k9cJgJxrJu9dK3kpEqzx1cT1A5h1DbZnMqsJ+zMCiJUu2XlRxgTQl5PP6ivk5fQunL495eUIj7xBMp6cCyKjn0RPop6kegL1BNXjqMeJnsiA7v0kehr1NNUXUF+gegr1FNXnUZ8HPREfPejHIAYo43E1Hh+PZ9R4ZjyeVuOA9OXcy+Or4dV9ZtV+eTVusc3327zZkKUNDBVwag86z9CBDDVYN52rimvdyDIE9pJZimnJcEfkoe1YhjduZD7AkI/XvTUTHcjhjpWtkqfImIBZx8rUFo1aLWq1GVptLtxWOzGGB1syGQFqkykdRg8276jDg80Hclh6xycelj78s7YMNenohIza9lZNeecvnH/8x2fl/PNZrVZ0IKu1ThzAaqcQB3Cozepctb38lTmjSLf5VJ74iR01btS4v9e4cKu1R2t6jrRs5ZJvbE5pWeGR9xncHA1sWaEBQBWe77r9V7KABARjIxXq3BA9Tr6KgdVmIQ5gcHz7zk7qxAEc6lSY1NFKhuPpTZgSk/4oD3a6GAuA1AirfGDvjrFGAiZzxOnXcY74EM2R/2mO/Ol3e+EntzVJNEcUAAA=',
    headers: {
        "User-Agent": "okhttp/4.6.0"
    },
    timeout: 5000,
    class_name: '电视剧&电影&动漫&综艺&海外精选', // /api.php/provide/home_nav
    class_url: '2&1&4&3&46',
    limit: 20,
    play_parse: true,
    lazy: `js:
        try {
            function getvideo(url) {
                let jData = JSON.parse(request(url, {
                    headers: getHeaders(url)
                }));
                if (jData.code == 1) {
                    return jData.data.url
                } else {
                    return 'http://43.154.104.152:1234/jhapi/cs.php?url=' + url.split('=')[1]
                }
            }
            if (/,/.test(input)) {
                let mjurl = input.split(',')[1]
                let videoUrl = getvideo(mjurl);
                input = {
                    jx: 0,
                    url: videoUrl,
                    parse: 0,
                    header: JSON.stringify({
                        'user-agent': 'Lavf/58.12.100'
                    })
                }
            } else {
                let videoUrl = getvideo(input);
                if (/jhapi/.test(videoUrl)) {
                    videoUrl = getvideo(videoUrl);
                    input = {
                        jx: 0,
                        url: videoUrl,
                        parse: 0,
                        header: JSON.stringify({
                            'user-agent': 'Lavf/58.12.100'
                        })
                    }
                } else {
                    input = {
                        jx: 0,
                        url: videoUrl,
                        parse: 0
                    }
                }
            }
        } catch (e) {
            log(e.toString())
        }
	`,
    推荐: `js:
        var d = [];
        let html = request(input, {
            headers: getHeaders(input)
        });
        html = JSON.parse(html);
        html.forEach(function(it) {
            d.push({
                title: it.name,
                img: it.img,
                desc: it.remarks,
                url: it.id
            })
        });
        setResult(d);
    `,
    一级: `js:
		var d = [];
		let html = request(input, {
			headers: getHeaders(input)
		});
		html = JSON.parse(html);
		html.list.forEach(function(it) {
			d.push({
				title: it.name,
				img: it.img,
				desc: it.msg,
				url: it.id
			})
		});
		setResult(d);
	`,
    二级: `js:
        var d = [];
        VOD = {
            vod_id: input.split('id=')[1]
        };
        try {
            let html = request(input, {
                headers: getHeaders(input)
            });
            html = JSON.parse(html);
            let node = html.data;
            VOD = {
                vod_name: node['name'],
                vod_pic: node['img'],
                type_name: node['type'],
                vod_year: node['year'],
                vod_remarks: '更新至: ' + node['msg'] + ' / 评分: ' + node['score'],
                vod_content: node['info'].strip()
            };
            let episodes = node.player_info;
            let playMap = {};
            if (typeof play_url === 'undefined') {
                var play_url = ''
            }
            episodes.forEach(function(ep) {
                let playurls = ep['video_info'];
                playurls.forEach(function(playurl) {
                    let source = ep['show'];
                    if (!playMap.hasOwnProperty(source)) {
                        playMap[source] = []
                    }
                    playMap[source].append(playurl['name'].strip() + '$' + play_url + urlencode(playurl['url']))
                })
            });
            let playFrom = [];
            let playList = [];
            Object.keys(playMap)
                .forEach(function(key) {
                    playFrom.append(key);
                    playList.append(playMap[key].join('#'))
                });
            let vod_play_from = playFrom.join('$$$');
            let vod_play_url = playList.join('$$$');
            VOD['vod_play_from'] = vod_play_from;
            VOD['vod_play_url'] = vod_play_url
        } catch (e) {
            log('获取二级详情页发生错误:' + e.message)
        }
	`,
    搜索: `js:
        var d = [];
        let html = request(input, {
            headers: getHeaders(input)
        });
        html = JSON.parse(html);
        html.data.forEach(function(it) {
            d.push({
                title: it.video_name,
                img: it.img,
                desc: it.qingxidu + '/' + it.category,
                url: it.id,
                content: it.blurb
            })
        });
        setResult(d);
    `,
}