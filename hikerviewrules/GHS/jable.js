const baseParse = _ => {
    let d = [];
    try {
        const list = pdfa(getResCode(), '.site-content&&.video-img-box');
        for (let j in list) {
            d.push({
                title: pdfh(list[j], 'h6&&a&&Text'),
                desc: pdfh(list[j], '.label&&Text'),
                pic_url: pd(list[j], 'img&&data-src'),
                url: $(pd(list[j], 'a&&href')).rule(() => {
                    eval(fetch("hiker://files/TyrantG/GHS/jable.js"))
                    secParse()
                }),
                col_type: 'movie_2',
            })
        }
    } catch (e) {
    }

    setResult(d);
}

const secParse = _ => {
    let d = [];
    try {
        const html = getResCode()

        d.push({
            title: pdfh(html, '.header-left&&h4&&Text'),
            desc: pdfh(html, '.video-info&&.text-center&&.tags&&Text'),
            pic_url: pd(html, 'video&&poster'),
            url: html.match(/hlsUrl = '(.*?)'/)[1],
            col_type: 'pic_1',
        })

        d.push({
            title: '演员',
            url: 'hiker://empty',
            col_type: 'text_center_1',
            extra: {lineVisible: false},
        })

        const models = pdfa(html, '.video-info&&.models&&a')

        models.forEach(model => {
            d.push({
                title: pdfh(model, '.rounded-circle&&title'),
                pic_url: pdfh(model, '.rounded-circle&&src') + "@Referer=https://jable.tv/",
                url: $(pdfh(model, 'a&&href')).rule(() => {
                    eval(fetch("hiker://files/TyrantG/GHS/jable.js"))
                    baseParse()
                }),
                col_type: 'avatar',
            })
        })
    } catch (e) {
    }

    setResult(d);
}

const makeTags = () => {
    const list = pdfa(getResCode(), 'nav.app-nav&&.container&&.col-6');
    log(list.map(item => pdfh(item, 'a&&Text')).join('&'))
    log(list.map(item => pdfh(item, 'a&&href').slice(17)).join('&'))

    // 黑絲&過膝襪&運動裝&肉絲&絲襪&眼鏡娘&獸耳&漁網&水着&校服&旗袍&婚紗&女僕&和服&吊帶襪&兔女郎&Cosplay&黑肉&長身&軟體&貧乳&蘿莉&美腿&美尻&紋身&短髮&白虎&熟女&巨乳&少女&顏射&腳交&肛交&痙攣&潮吹&深喉&接吻&口爆&口交&乳交&中出&露出&輪姦&調教&綑綁&瞬間插入&痴漢&痴女&男M&泥醉&泡姬&母乳&放尿&按摩&強姦&多P&刑具&凌辱&一日十回&3P&黑人&醜男&誘惑&童貞&時間停止&復仇&年齡差&巨漢&媚藥&夫目前犯&出軌&催眠&偷拍&不倫&下雨天&NTR&風俗娘&醫生&逃犯&護士&老師&空姐&球隊經理&未亡人&搜查官&情侶&家政婦&家庭教師&偶像&人妻&主播&OL&魔鏡號&電車&處女&監獄&溫泉&洗浴場&泳池&汽車&廁所&學校&圖書館&健身房&便利店&錄像&處女作/引退作&綜藝&節日主題&感謝祭&4小時以上
    // tags/black-pantyhose/&tags/knee-socks/&tags/sportswear/&tags/flesh-toned-pantyhose/&tags/pantyhose/&tags/glasses/&tags/kemonomimi/&tags/fishnets/&tags/swimsuit/&tags/school-uniform/&tags/cheongsam/&tags/wedding-dress/&tags/maid/&tags/kimono/&tags/stockings/&tags/bunny-girl/&tags/Cosplay/&tags/suntan/&tags/tall/&tags/flexible-body/&tags/small-tits/&tags/loli/&tags/beautiful-leg/&tags/beautiful-butt/&tags/tattoo/&tags/short-hair/&tags/hairless-pussy/&tags/mature-woman/&tags/big-tits/&tags/girl/&tags/facial/&tags/footjob/&tags/anal-sex/&tags/spasms/&tags/squirting/&tags/deep-throat/&tags/kiss/&tags/cum-in-mouth/&tags/blowjob/&tags/tit-wank/&tags/creampie/&tags/outdoor/&tags/gang-rape/&tags/tune/&tags/bondage/&tags/quickie/&tags/chikan/&tags/chizyo/&tags/masochism-guy/&tags/crapulence/&tags/soapland/&tags/breast-milk/&tags/piss/&tags/massage/&tags/rape/&tags/gangbang/&tags/torture/&tags/insult/&tags/10-times-a-day/&tags/3p/&tags/black/&tags/ugly-man/&tags/temptation/&tags/virginity/&tags/time-stop/&tags/avenge/&tags/age-difference/&tags/giant/&tags/love-potion/&tags/sex-beside-husband/&tags/affair/&tags/hypnosis/&tags/hidden-cam/&tags/incest/&tags/rainy-day/&tags/ntr/&tags/club-hostess-and-sex-worker/&tags/doctor/&tags/fugitive/&tags/nurse/&tags/teacher/&tags/flight-attendant/&tags/team-manager/&tags/widow/&tags/detective/&tags/couple/&tags/housewife/&tags/private-teacher/&tags/idol/&tags/wife/&tags/female-anchor/&tags/ol/&tags/magic-mirror/&tags/tram/&tags/first-night/&tags/prison/&tags/hot-spring/&tags/bathing-place/&tags/swimming-pool/&tags/car/&tags/toilet/&tags/school/&tags/library/&tags/gym-room/&tags/store/&tags/video-recording/&tags/debut-retires/&tags/variety-show/&tags/festival/&tags/thanksgiving/&tags/more-than-4-hours/
}