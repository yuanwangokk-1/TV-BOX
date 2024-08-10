var rule = {
    类型: '听书',
    title: '喜马拉雅[听]',
    host: 'https://m.ximalaya.com',
    url: '/m-revision/page/category/queryCategoryAlbumsByPage?sort=0&pageSize=50&page=fypage&categoryCode=fyclass',
    searchUrl: 'https://www.ximalaya.com/revision/search/main?core=album&page=1&rows=20&kw=**',
    searchable: 2,
    quickSearch: 0,
    timeout: 5000,
    class_name: '有声书&儿童&音乐&相声&娱乐&广播剧&历史&外语',
    class_url: 'youshengshu&ertong&yinyue&xiangsheng&yule&guangbojv&lishi&waiyu',
    play_parse: true,
    lazy: $js.toString(() => {
        input = {url: input, parse: 0}
    }),
    double: true,
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.albumBriefDetailInfos;
        data.forEach(it => {
            let id = 'https://mobile.ximalaya.com/mobile/v1/album/track/ts-1720589105807?albumId=' + it.id + '&pageId=1&pageSize=3000&device=android&isAsc=true';
            d.push({
                url: id,
                title: it.albumInfo.title,
                img: 'http://imagev2.xmcdn.com/' + it.albumInfo.cover,
            })
        });
        setResult(d);
    }),
    二级: $js.toString(() => {
        let urls = [];
        let html = request(input);
        let json = JSON.parse(html);
        // log(html);
        let data = json.data.list;
        data.forEach(it => {
            urls.push(it.title + '$' + it.playPathAacv164);
        });
        let maxPageId = json.data.maxPageId;
        if (typeof (batchFetch) === 'function' && maxPageId > 1) {
            let reqUrls = [];
            for (let j = 2; j <= maxPageId; j++) {
                reqUrls.push({url: input.replace('pageId=1', 'pageId=' + j), option: {timeout: 5000}});
            }
            let rhtmls = batchFetch(reqUrls);
            rhtmls.forEach((rhtml) => {
                let rjson = JSON.parse(rhtml);
                let rdata = rjson.data.list;
                rdata.forEach(it => {
                    urls.push(it.title + '$' + it.playPathAacv164);
                });
            });
        }

        VOD = {
            vod_play_from: '球球啦',
            vod_play_url: urls.join('#')
        };
    }),
    搜索: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.album.docs;
        data.forEach(it => {
            let id = 'https://mobile.ximalaya.com/mobile/v1/album/track/ts-1720589105807?albumId=' + it.albumId + '&pageId=1&pageSize=3000&device=android&isAsc=true';
            d.push({
                url: id,
                title: it.title,
                img: it.coverPath,
            })
        });
        setResult(d);
    }),
}