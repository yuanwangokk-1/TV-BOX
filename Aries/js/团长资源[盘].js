/*
@header({
  searchable: 1,
  filterable: 0,
  quickSearch: 1,
  title: '团长资源[盘]',
  lang: 'ds'
})
*/

const {getHtml} = $.require('./_lib.request.js')
const {get_waf} = $.require('./_lib.waf.js')
const {
    formatPlayUrl,
} = misc;
const aliTranscodingCache = {};
const aliDownloadingCache = {};
var rule = {
    title: '团长资源[盘]',
    host: 'https://t-rex.tzfile.com',
    url: '/fyclass/page/fypage',
    searchUrl: '/page/fypage?s=**&type=post',
    headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36 Edg/131.0.0.0",
    },
    cate_exclude: '全部影片',
    play_parse: true,
    searchable: 1, // 固定值
    filterable: 0, // 固定值
    quickSearch: 1, // 固定值
    class_parse: async () => {
        let classes = [{
            type_id: 'movies',
            type_name: '电影',
        }, {
            type_id: 'tvshow',
            type_name: '剧集',
        }, {
            type_id: 'tvshow/duanju',
            type_name: '短剧',
        }, {
            type_id: 'animation',
            type_name: '动漫',
        }, {
            type_id: 'show',
            type_name: '真人秀综艺',
        }, {
            type_id: 'faction',
            type_name: '纪录片',
        }];
        return {
            class: classes,
        }
    },
    预处理: async () => {
        if (rule.headers['cookie'] === '') {
            rule.headers['cookie'] = await get_waf('https://t-rex.tzfile.com/download?post_id=83876&index=0&i=0')
        }

        return []
    },
    推荐: async () => {
        return []
    },
    一级: async function (tid, pg, filter, extend) {
        let {MY_CATE, input} = this;
        let html = ''
        if (pg === 1) {
            html = (await getHtml(`${rule.host}/${tid}`)).data
        } else {
            html = (await getHtml(input)).data
        }
        const $ = pq(html)
        let videos = []
        let imgUrls = [];
        $('.post-list-item .box').each((index, item) => {
            const a = $(item).find('a:first')[0];
            const img = $(item).find('img:first')[0];
            const content = $(item).find('.video-text:first').text();
            imgUrls.push({
                index: index,
                url: img.attribs['data-src'],
                a: a,
                img: img,
                content: content
            });
        });

        // 并发处理所有图片 URL 的重定向
        const resolvedUrls = await Promise.all(imgUrls.map(async ({url}) => resolveRedirect(url)));

        imgUrls.forEach(({index, a, img, content}, i) => {
            videos.push({
                "vod_name": img.attribs['alt'],
                "vod_id": a.attribs.href,
                // "vod_remarks": content,
                "vod_pic": resolvedUrls[i]
            });
        });

        return videos
    },
    二级: async function (ids) {
        let {input} = this;
        let html = (await getHtml(input)).data
        const $ = pq(html)
        const img = $('div.entry-content p').find('img:first')[0]
        const content = $('div.entry-content p:nth-child(5)').text().replace(/tzfile.com/ig, '').replace(/\n/g, '')
        let vod = {
            "vod_name": img.attribs['alt'],
            "vod_id": input,
            "vod_pic": img.attribs['data-src'],
            "vod_content": content === '' ? $('div.entry-content p:nth-child(4)').text().replace(/tzfile.com/ig, '').replace(/\n/g, '') : content,
        }
        let playform = []
        let playurls = []
        let playPans = [];
        let post_id = input.split('/')[3].replace('.html', '')

        let data = qs.stringify({
            'post_id': post_id
        });
        let downdata = (await getHtml({
            url: 'https://t-rex.tzfile.com/wp-json/b2/v1/getDownloadData',
            method: 'POST',
            headers: rule.headers,
            data: data
        })).data[0].button
        let link_list = []
        downdata.forEach(it => {
            if (/夸克|阿里|UC/.test(it.name)) {
                link_list.push(it.link)
            }
        })
        let downpagedata = ''
        let down_link = []
        for (let i = 0; i < link_list.length; i++) {
            const params = new URLSearchParams(new URL(link_list[i]).search)
            let data = qs.stringify({
                'post_id': post_id,
                'index': params.get('index'),
                'i': params.get('i'),
                'guest': ''
            });
            if (rule.headers.cookie !== '') {
                downpagedata = (await getHtml({
                    url: 'https://t-rex.tzfile.com/wp-json/b2/v1/getDownloadPageData',
                    method: 'POST',
                    headers: rule.headers,
                    data: data
                })).data.button.url
                down_link.push(downpagedata)
            } else {
                rule.headers['cookie'] = await get_waf(link_list[i])
                downpagedata = (await getHtml({
                    url: 'https://t-rex.tzfile.com/wp-json/b2/v1/getDownloadPageData',
                    method: 'POST',
                    headers: rule.headers,
                    data: data
                })).data.button.url
                down_link.push(downpagedata)
            }
        }
        let urls = []
        for (let i = 0; i < down_link.length; i++) {
            let real_link = (await getHtml({
                url: 'https://t-rex.tzfile.com/redirect?token=' + down_link[i],
                method: 'Get'
            })).data
            urls.push(real_link.match(/window\.location\.href\s*=\s*"([^"]+)"/)[1])
        }
        for (const link of urls) {
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
            if (/www.alipan.com/.test(link)) {
                playPans.push(link);
                const shareData = Ali.getShareData(link);
                if (shareData) {
                    const videos = await Ali.getFilesByShareUrl(shareData);
                    log(videos)
                    if (videos.length > 0) {
                        playform.push('Ali-' + shareData.shareId);
                        playurls.push(videos.map((v) => {
                            const ids = [v.share_id, v.file_id, v.subtitle ? v.subtitle.file_id : ''];
                            return formatPlayUrl('', v.name) + '$' + ids.join('*');
                        }).join('#'))
                    } else {
                        playform.push('Ali-' + shareData.shareId);
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
        let {input} = this
        let html = (await getHtml(input)).data
        const $ = pq(html)
        let videos = []
        let imgUrls = [];
        $('.post-list-item .box').each((index, item) => {
            const a = $(item).find('a:first')[0];
            const img = $(item).find('img:first')[0];
            const content = $(item).find('.video-text:first').text();
            imgUrls.push({
                index: index,
                url: img.attribs['data-src'],
                a: a,
                img: img,
                content: content
            });
        });
        // 并发处理所有图片 URL 的重定向
        const resolvedUrls = await Promise.all(imgUrls.map(async ({url}) => resolveRedirect(url)));

        imgUrls.forEach(({index, a, img, content}, i) => {
            videos.push({
                "vod_name": img.attribs['alt'],
                "vod_id": a.attribs.href,
                // "vod_remarks": content,
                "vod_pic": resolvedUrls[i]
            });
        });
        return videos
    },
    lazy: async function (flag, id, flags) {
        let {getProxyUrl, input,mediaProxyUrl} = this;
        const ids = input.split('*');
        const urls = [];
        const headers = []
        let names = []
        let UCDownloadingCache = {};
        let UCTranscodingCache = {};
        let downUrl = ''
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
        }
        if (flag.startsWith('UC-')) {
            console.log("UC网盘解析开始")
            if (!UCDownloadingCache[ids[1]]) {
                const down = await UC.getDownload(ids[0], ids[1], ids[2], ids[3], true);
                if (down) UCDownloadingCache[ids[1]] = down;
            }
            downUrl = UCDownloadingCache[ids[1]].download_url;
            const headers = {
                "Referer": "https://drive.uc.cn/",
                "cookie": UC.cookie,
                "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) quark-cloud-drive/2.5.20 Chrome/100.0.4896.160 Electron/18.3.5.4-b478491100 Safari/537.36 Channel/pckk_other_ch'
            };
            urls.push("UC原画", downUrl);
            urls.push("原代服", mediaProxyUrl + `?thread=${ENV.get('thread') || 6}&form=urlcode&randUa=1&url=` + encodeURIComponent(downUrl) + '&header=' + encodeURIComponent(JSON.stringify(headers)));
            if (ENV.get('play_local_proxy_type', '1') === '2') {
                urls.push("原代本", `http://127.0.0.1:7777/?thread=${ENV.get('thread') || 6}&form=urlcode&randUa=1&url=` + encodeURIComponent(downUrl) + '&header=' + encodeURIComponent(JSON.stringify(headers)));
            } else {
                urls.push("原代本", `http://127.0.0.1:5575/proxy?thread=${ENV.get('thread') || 6}&chunkSize=256&url=` + encodeURIComponent(downUrl));
            }
            return {
                parse: 0,
                url: urls,
                header: headers,
            }
        }
        if (flag.startsWith('Ali-')) {
            const transcoding_flag = {
                UHD: "4K 超清",
                QHD: "2K 超清",
                FHD: "1080 全高清",
                HD: "720 高清",
                SD: "540 标清",
                LD: "360 流畅"
            };
            console.log("网盘解析开始")
            const down = await Ali.getDownload(ids[0], ids[1], flag === 'down');
            urls.push("原画", down.url + "#isVideo=true##ignoreMusic=true#")
            urls.push("极速原画", down.url + "#fastPlayMode##threads=10#")
            const transcoding = (await Ali.getLiveTranscoding(ids[0], ids[1])).sort((a, b) => b.template_width - a.template_width);
            transcoding.forEach((t) => {
                if (t.url !== '') {
                    urls.push(transcoding_flag[t.template_id], t.url);
                }
            });
            return {
                parse: 0,
                url: urls,
                header: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
                    'Referer': 'https://www.aliyundrive.com/',
                },
            }

        }
    },
}

async function resolveRedirect(url) {
    try {
        const response = await axios.head(url, {
            maxRedirects: 5, // 设置最大重定向次数
            headers: {
                'referer': 'https://t-rex.tzfile.com/'
            }
        });
        return response.config.url; // 返回最终的URL
    } catch (error) {
        if (error.response && error.response.request) {
            // 如果有重定向，获取最终的URL
            return error.response.request.res.responseUrl || url;
        } else {
            console.error('Error resolving redirect:', error.message);
            return url; // 返回原始URL作为默认值
        }
    }
}

