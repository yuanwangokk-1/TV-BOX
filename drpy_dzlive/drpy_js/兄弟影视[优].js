muban.mxpro.二级.tabs = '.module-tab-items-box&&.module-tab-item';
muban.mxpro.二级.tab_text = 'div--small&&Text';
var rule = {
    模板: 'mxpro',
    title: '兄弟影视[优]',
    host: 'https://brovod.com',
    // url:'/show/fyclass--------fypage---/',
    url: '/show/fyclassfyfilter/',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2ZWU9bRxTH3/spKj/zcE0gSfOWfd/3VHlwI6uNSqkEtBKKIgHG1BBiG0QgZqfBQBDGZhGFSzFfxjO2v0XGnrOhtlf3ARLUXJ78+x+fuXNmhjl/Xb/65lv4C4VDZ75/Ffo52hk6E3rREmlvDzWEWiO/RA2q/kUdixv+PdLyW7T+vdaaHF+qxpZqsoHQ6wZQRyfN90EFwFg5sQYDMWBMd6d11yjEAGjMgaXS3iSOaYHGXBxSO7s4pgWKdRer40WMWaAxqSgGmkvifcntx7lYwFglt6AGlyEGQM8byJf3MAYgaiiP7HINNaBY9g+uAYDmklsoFWdxLhYor2+4mvmIeRYob3rZzBzzLPhZa92zUh4dwpgFisUGdM84xiy8fl6L2nMTaYtGxLGZLKhB1++xmV+sZvqwFAsYqy5k9HYeYgC05MWkmtjDJbdA0914xzEA2sY3axwDoLyxrJ5cwTwLNJeZj5wHQDUU/+IYAM+lIOdSOJD3tqDcBcyzQHm9KbMaKoG7zEyVZPfLqVy5P4PFEPPRm9Vv9k0anT5k+kZ8q7SLBwJAbmxLpPVH3thKPldZ6vK5sTqzWu0ar+SnsABisRVmRN6KGtD2rs9zDEBsBccAxBZyDEAcCxGzILaQYwBikdRqjBepBnKROqORNl4kPbZVHdv0uUiNTuMJ0Oofhd7IeqPUw6yHpe6w7gg9/B3p5qPQT7N+WuqnWD8l9ZOsn5R6M+vNUm9ivUnqXG9Y1hvmesOy3jDXG5b1hrle8/HAmY12dETFhqjcmM6/9bkhZ0E4S8o5UM6Rch6U86RcAOUCKRdBuUjKJVAukXIZlMukXAHlCilXQblKyjVQrpFyHZTrpNwA5QYpN0G5ScotUG6RchuU26TcAeUOKXdBuUvKPVDukXIflPukPADlASkPQXlIyiNQHpHyGJTHpDwB5QkpT0F5SsozUJ4dOBQ/dIr/0OSwclP/OBD8j2ug46X5Kg5Zcl1dGIHITy872vkKy/eqBHav9he/tkVrT33ewPaq8bDsVWq+8oFsiwU/tqU6NazfZ1X3loql8MqUkh/7pla3lEuXowWf1uc/7ZuX9fGyaCrZp1LrGLNAc9lNqfg2zsUC7eHOnJ5CewPA9iauM+gzAOh57/rYTgHQ8/aGeM0A/HbWI7JMXrbIy8J4WS2VKuidIh29OvixTF7Wx9OGjRaMU1FTc5hK/Blsi5mIMAIWvpRhCYzH8TcepDtcryPrdbheR9brcF2OrMvhuhxZl8N1mY+B4QkFhudYGp4Th2R4ql395cUuvDQtyIbdOyMatgGa4ep+pZDAS9oC5Q3n9EAW8yzwRRzX22geAPgC3yjtpOkCr4PouNUPOBcAirnLanUaYxboeRPrlX4Xn2eB8kZm9Ca927JAedvbOpEqucPGUGG2lGgdNv80FgjXwQKNsdZT6R7EbAufwZwYU2HsA026DqIPms7IfbAGFFtZNAuLMQv/27cUQdM//k0/aL5B8z2WzbfpkJqvV4P1/OEllqvMYdMGoDGTS+U0zh6AYunp8gr9+GCBLkSPHzsq6alKEt98ANCYs3Nqgi5ZCzSmx5sJPemKH1As0PP209x2ASjP4y2MKphlwt0GkLHshogZoPWcL5b+xh9eACgvOaMSE5hngc/QusqhYQGgMScGdAaNBwCvy5raH6N1qYNoTF/ijYbnG4Z/MwY+pxuYhsA0BKYhFJiGr940NAvTcESXuOqLm7Goh9eB7sMj+CX/q7r8g9+1g6YRNI2gaRx906j3jNefAExkaDU9KAAA',
    searchUrl: '/search/**----------fypage---/',
    class_parse: '.navbar-items&&.swiper-slide;a&&title;a&&href;.*/(\\d+)/',
    lazy: $js.toString(() => {
        let html = fetch(input);
        let json = JSON.parse(html.match(/r player_.*?=(.*?)</)[1]);
        let turl;
        let url = json.url;
        let from = json.from;
        let furl = HOST + '/static/player/' + from + '.js';
        if (json.encrypt == '1') {
            turl = unescape(url)
        } else if (json.encrypt == '2') {
            turl = unescape(base64Decode(url))
        } else {
            let str = fetch(furl);
            let jxurl = str.match(/src="(.*?)'/)[1] + url;
            let jxstr = fetch(jxurl);
            let config = {};
            eval(jxstr.match(/config[\s\S]*?}/)[0]);
            let data = fetch('https://jx.xdys.vip/v1/jx', {
                body: {
                    "url": config.url,
                    "pbgjz": config.pbgjz,
                    "vkey": config.vkey
                }, method: 'POST'
            });
            turl = JSON.parse(data).jarod;
        }
        if (turl && /m3u8|mp4|mp3/.test(turl)) {
            input = {
                jx: 0,
                url: turl,
                parse: 0
            }
        } else {
            input = input
        }
    }),
}