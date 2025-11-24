/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '闪电优汐[盘]',
  lang: 'ds'
})
*/

const {getHtml} = $.require('./_lib.request.js')
const {
    formatPlayUrl,
} = misc;
var rule = {
    title: '闪电优汐[盘]',
    host: 'http://1.95.79.193',
    url: '/index.php/vod/show/id/fyfilter.html',
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    filter: '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',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
        5: {cateId: '5'},
    },
    cate_exclude: '网址|专题|全部影片',
    // tab_rename: {'KUAKE1': '夸克1', 'KUAKE11': '夸克2', 'YOUSEE1': 'UC1', 'YOUSEE11': 'UC2',},
    play_parse: true,
    searchable: 1,
    filterable: 1,
    quickSearch: 0,
    class_name: '电影&剧集&动漫&综艺',
    class_url: '1&2&4&3',
    class_parse: async () => {
    },
    预处理: async () => {
        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {MY_CATE, input} = this;
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let videos = []
        $('.module-items .module-item').each((index, item) => {
            const a = $(item).find('a:first')[0];
            const img = $(item).find('img:first')[0];
            const content = $(item).find('.video-text:first').text();
            videos.push({
                "vod_name": a.attribs.title,
                "vod_id": a.attribs.href,
                "vod_remarks": content,
                "vod_pic": img.attribs['data-src']
            })
        })
        return videos
    },
    二级: async function (ids) {
        let {input} = this;
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let vod = {
            "vod_name": $('h1.page-title').text(),
            "vod_id": input,
            "vod_remarks": $('.video-info-item').text(),
            "vod_pic": $('.lazyload').attr('data-src'),
            "vod_content": $('p.sqjj_a').text(),
        }
        let playform = []
        let playurls = []
        let playPans = [];
        for (const item of $('.module-row-title')) {
            const a = $(item).find('p:first')[0];
            let link = a.children[0].data.trim()
            if (/drive.uc.cn/.test(link)) {
                playPans.push(link);
                const shareData = UC.getShareData(link);
                if (shareData) {
                    const videos = await UC.getFilesByShareUrl(shareData);
                    if (videos.length > 0) {
                        playform.push('UC-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const list = [shareData.shareId, v.stoken, v.fid, v.share_fid_token, v.subtitle ? v.subtitle.fid : '', v.subtitle ? v.subtitle.share_fid_token : ''];
                            return v.file_name + '$' + list.join('*');
                        }).join('#'))
                    } else {
                        playform.push('UC-' + shareData.shareId);
                        playurls.push("资源已经失效，请访问其他资源")
                    }
                }
            }
            if (/pan.quark.cn/.test(link)) {
                playPans.push(link);
                const shareData = Quark.getShareData(link);
                if (shareData) {
                    const videos = await Quark.getFilesByShareUrl(shareData);
                    if (videos.length > 0) {
                        playform.push('Quark-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const list = [shareData.shareId, v.stoken, v.fid, v.share_fid_token, v.subtitle ? v.subtitle.fid : '', v.subtitle ? v.subtitle.share_fid_token : ''];
                            return v.file_name + '$' + list.join('*');
                        }).join('#'))
                    } else {
                        playform.push('Quark-' + shareData.shareId);
                        playurls.push("资源已经失效，请访问其他资源")
                    }
                }
            }
        }
        vod.vod_play_from = playform.join("$$$")
        vod.vod_play_url = playurls.join("$$$")
        vod.vod_play_pan = playPans.join("$$$")
        return vod
    },
    搜索: async function (wd, quick, pg) {
        let {input, pdfa, pdfh, pd} = this;
        let html = await request(input);
        let d = [];
        let data = pdfa(html, '.module-items .module-search-item');
        data.forEach((it) => {
            d.push({
                title: pdfh(it, 'a&&title'),
                pic_url: pd(it, 'img&&data-src'),
                desc: pdfh(it, '.video-text&&Text'),
                url: pd(it, 'a:eq(-1)&&href'),
                content: pdfh(it, '.video-info-items:eq(-1)&&Text'),
            })
        });
        return setResult(d);
    },
    lazy: async function (flag, id, flags) {
        let {input,mediaProxyUrl} = this;
        const ids = input.split('*');
        const urls = [];
        let UCDownloadingCache = {};
        let UCTranscodingCache = {};
        if (flag.startsWith('Quark-')) {
            console.log("夸克网盘解析开始")
            const down = await Quark.getDownload(ids[0], ids[1], ids[2], ids[3], true);
            const headers = {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                'origin': 'https://pan.quark.cn',
                'referer': 'https://pan.quark.cn/',
                'Cookie': Quark.cookie
            };
            urls.push("原画", down.download_url + '#fastPlayMode##threads=10#')
            urls.push("原代服", mediaProxyUrl + `?thread=${ENV.get('thread') || 6}&form=urlcode&randUa=1&url=` + encodeURIComponent(down.download_url) + '&header=' + encodeURIComponent(JSON.stringify(headers)))
            if (ENV.get('play_local_proxy_type', '1') === '2') {
                urls.push("原代本", `http://127.0.0.1:7777/?thread=${ENV.get('thread') || 6}&form=urlcode&randUa=1&url=` + encodeURIComponent(down.download_url) + '&header=' + encodeURIComponent(JSON.stringify(headers)));
            } else {
                urls.push("原代本", `http://127.0.0.1:5575/proxy?thread=${ENV.get('thread') || 6}&chunkSize=256&url=` + encodeURIComponent(down.download_url));
            }
            const transcoding = (await Quark.getLiveTranscoding(ids[0], ids[1], ids[2], ids[3])).filter((t) => t.accessable);
            transcoding.forEach((t) => {
                urls.push(t.resolution === 'low' ? "流畅" : t.resolution === 'high' ? "高清" : t.resolution === 'super' ? "超清" : t.resolution, t.video_info.url)
            });
            return {
                parse: 0,
                url: urls,
                header: headers
            }
        } else if (flag.startsWith('UC-')) {
            console.log("UC网盘解析开始");
            if (!UCDownloadingCache[ids[1]]) {
                const down = await UC.getDownload(ids[0], ids[1], ids[2], ids[3], true);
                if (down) UCDownloadingCache[ids[1]] = down;
            }
            const downCache = UCDownloadingCache[ids[1]];
            return await UC.getLazyResult(downCache, mediaProxyUrl)
        }
    },
}
