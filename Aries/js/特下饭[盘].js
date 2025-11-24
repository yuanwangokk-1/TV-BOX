/*
@header({
  searchable: 1,
  filterable: 1,
  quickSearch: 0,
  title: '特下饭[盘]',
  lang: 'ds'
})
*/

const {getHtml} = $.require('./_lib.request.js')
const {
    formatPlayUrl,
} = misc;
var rule = {
    title: '特下饭[盘]',
    // host: 'http://txfyyds.top',
    host: 'http://txfpan.top/',
    url: '/index.php/vod/show/id/fyfilter.html',
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    filter: 'H4sIAAAAAAACA+2Z228TRxTG3/kz9jmVZx3C7Y074X6/VTwYWLVR0yAlBilCkSiJTS4kJlFqk+JQquZKY+xQSsGWk3/Gu2v/F931jM+e+Vw1bsUDbefR3+/LmZ1vxnt8lIeWbR348qH1jTNsHbDu9CeGhqwuayDxrRN8dCdWvdFU8PlBov++0/QNhHJqrTG6FsrBB2ukS6nZfOBXaqxZKaa0lsUf31T1IovSWhbvu2feo6xuURotNLlWq+ZhIanRQquz7scKLCQ1qkJ7Y1WkRs8y/rxWnoBnkVrLUi+suE9f6xal0bNMFv0qWJTGduTPV9p2FGpkWX7StiOl0eMWVmpbr+BxpUZV0nONhXWoIjWq8vJ1sEeoIrW/cUbe4w0/OwsWqZFldNJ7/ANYpEbRVTJu6gNEJ7WWpbE45z1f1i1Ko4WyT+oTZVhIapTL1ht//je3ugnRkEzGzFL9Z7w1UiPLTNrNvAWL1OjWbD8LjhdujdSik8p7i7N4Uk2NLGPb/i+wdaVRgNVZv5L/s61pZORW+AfyFZAYdBLsDZAvuU/Lnb4BllYbC+nWOmGhmJLotFYWvA9FzaGkKOCS93FLryEl2tPWjPuiqjmURAf+6/foUBIdwNQmOpRENXLLXn5DryEl2suP61hDSdGt+h0dSoqetNT+pCWtxnTJLa/oNaRENcYyQcru+LpehlTa8/K2nyn4Ewv6tkmNXkavvKnt4I/1RUklX+p9rZLVTVLi16k/MfBVdJ3qxUJ97VGn1+lFNfC3FggLxZTEjhEdSqLL8nYJHUqiY8xV3ekcmiKVHXebSUrsyqBDSexitjmkxK5M256lxGJ334zqDinx2IedxGAUu5d738i96zD2uIjvbpUPy8SaAqPdSLs5jSONc2ojtTkVSAWj9n6ggcDoPqT7ON2LdC+ne5Du4bQHaQ+nmJXNs7IxK5tnZWNWNs/KxqxsnpWNWdk8K4FZCZ6VwKwEz0pgVoJnJTArwbMSmJXgWQnMSvCsBGYleFYCsxI8K4FZCZ6VwKwCQXtHOcmkw74ubiHnFac7/LocpK9is0rsIJFDQA4ROQzkMJEjQI4QOQrkKJFjQI4ROQ7kOJETQE4Q6QXSS+QkkJNETgE5ReQ0kNNEzgA5Q+QskLNEzgE5R+Q8kPNELgC5QOQikItELgG5ROQykMtErgC5QuQqkKtErgG5RuQ6kOtEbgC5QeQmkJtExBf7gYUK/wrcHmbdYmbOLWfarn/URMI6t4djyb7A3lqiVi57pXlGv+5LDkWNujjmjqcZHbpzb9AJn+BWlxUPlthlJlAzgZoJ9H89ge76FCNoOhX4/3IE3XFs+xRD6s7jYydj7E7DYQdjbLYUTG7u4k96GVLNMPePhzkziJlBzAxiZhAzg5gZxP4bg1i3Noglkk7v3ehh/M2K+3Kq825fK9Mk1nc3xhpI0EaDXstZ9IrwNlaDH0GcxfWfhqadmnZq2qlpp6admnb6ubfT3bydmsZlGpdpXKZxmcZlGtdn/w+5HtO5TOcynct0LtO5TOf693SukT8A3qOeGs0wAAA=',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'},
    },
    cate_exclude: '网址|专题|全部影片',
    tab_rename: {'KUAKE1': '夸克1', 'KUAKE11': '夸克2', 'YOUSEE1': 'UC1', 'YOUSEE11': 'UC2',},
    play_parse: true,
    searchable: 1,
    filterable: 1,
    quickSearch: 0,
    class_name: '电影&剧集&动漫&综艺',
    class_url: '1&2&3&4',
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
        let {input, mediaProxyUrl} = this;
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
                header: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'origin': 'https://pan.quark.cn',
                    'referer': 'https://pan.quark.cn/',
                    'Cookie': headers
                }
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
