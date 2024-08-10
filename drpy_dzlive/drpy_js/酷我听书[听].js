var rule = {
    类型: '听书',
    title: '酷我听书[听]',
    host: 'http://tingshu.kuwo.cn',
    url: '/v2/api/search/filter/albums?classifyId=fyfilter&notrace=0&source=kwplayer_ar_9.1.8.1_tvivo.apk&platform=1&kweexVersion=1.1.5&uid=2511482006&sortType=playCnt&loginUid=540339516&bksource=kwbook_ar_9.1.8.1_tvivo.apk&rn=21&categoryId=fyclass&pn=fypage',
    searchUrl: 'http://search.kuwo.cn/r.s?client=kt&all=**&ft=album&newsearch=1&itemset=web_2013&cluster=0&pn=(fypage-1)&rn=21&rformat=json&encoding=utf8&show_copyright_off=1&vipver=MUSIC_8.0.3.0_BCS75&show_series_listen=1&version=9.1.8.1',
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter_url: "{{fl.class or '44'}}",
    filter: 'H4sIAAAAAAAAA5WV207iUBSG36XXXkBbELyet5h4YYxX43hjZpKJMUE5iDAUcBBFHGREDh4KFZQAtfRluvbefYvZAvsAk0ziTZPy9V/7X4e9OFBUZePzgfJl54eyoWzvbu3vK2vK3tbXHfqKn22oZen7963dbzuz7/befzYSMLaheUKf75D+pOvK4dqcIrPlTeueXaFPRiOc4nuXDDOoNsT3kwUNqZz6cQdGx95bnfRemFZQ3C7SE/FjDWViTLvOKUUoPiCdGIonFzQYjgpx9gm6Q+heQXrI8HpAqPN3nt1YUqsBKbjzTNopMG5I8YLhoCZyPn7C5SIyOriQYr5DQmykIN+HVNWbZJnvsDBmWKsn60FRkd9n6LKJ6n+gajKtiIzKJ2C2oJATtsJUu3m4uaaEPt7X6ggaFipb3oT1RlVF+eGtDlbRcwoLpkkFgPQlfsziVp4zMRCkl/DGLbhrQ7LDw0qVt/Lw6wgKaTItchyUI0PSIpkBixwQPSVuzRs50DrmpwodLlmQq3vjU86kbubOId+Yp8u7KYW9PfIvSygtEpXcmhVvFOMgJLUxi40mGtxyFpbPo3ZEDqrkBcdN/6Kz4kW6LzNAO0yHl+GosIP7d6RnzivMDpZrmxwga0SGSc6EYf/+yT93yZQXSBWGyesrtl+IIdh/ixcMaUKLnC6ctvkVk3JB/YclIiqOKlmZvGcwm2Ft/cNDjDJl/2aAmzVU7bOChaSbGouhizaJHSHzJ8fSjKernnONXRtKzwxL2wvoPb+uc50urw+/YXAg3f3cFXRvodiBdIblp6uSH6tIrAYn0nDjSY8m4o0LAgoj2idceqVYMNGguYr0prjD1k1QiwRWOF1WJFfgjv/B50mxrVRdRKdbCiVultW6NOoJFz82l4yrenTRzvDH/2sWi3fsojNTGhE9IpV49glpN0jPFlxb4Uu7m3Jh2a88eE6duI4UX4tKV9DOQ3JE9dLA6xF1ltPhXxyS0SNABwAA',
    timeout: 5000,
    class_name: '有声小说&音乐&相声评书&影视原声',
    class_url: '2&37&5&62',
    play_parse: true,
    lazy: $js.toString(() => {
        let html = request(input);
        let url = JSON.parse(html).data.url;
        input = {url: url, parse: 0};
    }),
    double: true,
    一级: $js.toString(() => {
        let d = [];
        let html = request(input);
        let data = JSON.parse(html).data.data;
        data.forEach(it => {
            let id = 'http://search.kuwo.cn/r.s?stype=albuminfo&user=8d378d72qw28f5f4&uid=2511552006&loginUid=540129516&loginSid=958467960&prod=kwplayer_ar_9.1.8.1&bkprod=kwbook_ar_9.1.8.1&source=kwplayer_ar_9.1.8.1_tvivo.apk&bksource=kwbook_ar_9.1.8.1_tvivo.apk&corp=kuwo&albumid=' + it.albumId + '&pn=0&rn=5000&show_copyright_off=1&vipver=MUSIC_8.2.0.0_BCS17&mobi=1&iskwbook=1';
            d.push({
                url: id,
                title: it.albumName,
                img: it.coverImg,
                desc: it.title,
            });
        });
        setResult(d);
    }),
    二级: $js.toString(() => {
        let urls = [];
        let html = request(input);
        let data = JSON.parse(html).musiclist;
        data.forEach(it => {
            urls.push(it.name + '$' + 'http://mobi.kuwo.cn/mobi.s?f=web&source=kwplayerhd_ar_4.3.0.8_tianbao_T1A_qirui.apk&type=convert_url_with_sign&rid=' + it.musicrid + '&br=320kmp3');
        });
        VOD = {
            vod_play_from: '球球啦',
            vod_play_url: urls.join('#')
        };
    }),
    搜索: $js.toString(() => {
        let d = [];
        // log(input);
        let html = request(input);
        let data = JSON5.parse(html).albumlist;
        // log(data);
        data.forEach(it => {
            let id = 'http://search.kuwo.cn/r.s?stype=albuminfo&user=8d378d72qw28f5f4&uid=2511552006&loginUid=540129516&loginSid=958467960&prod=kwplayer_ar_9.1.8.1&bkprod=kwbook_ar_9.1.8.1&source=kwplayer_ar_9.1.8.1_tvivo.apk&bksource=kwbook_ar_9.1.8.1_tvivo.apk&corp=kuwo&albumid=' + it.DC_TARGETID + '&pn=0&rn=5000&show_copyright_off=1&vipver=MUSIC_8.2.0.0_BCS17&mobi=1&iskwbook=1';
            d.push({
                url: id,
                title: it.name,
                img: it.img,
            });
        });
        setResult(d);
    })
}