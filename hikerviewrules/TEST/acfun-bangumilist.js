const baseParse = _ => {
    let d = []
    const category_html = getResCode()
    const categories = parseDomForArray(category_html, '.ac-menu&&.ac-menu-filter')
    let category_list = []

    const base_url = MY_URL.split('?')[0]

    const pageNum = getUrlParams(MY_URL, base_url, 'pageNum')

    const true_url = addUrlPara(getVar('tab-url') || MY_URL, 'pageNum', pageNum)

    const filters = getUrlParams(true_url, base_url, 'filters') || ''

    categories.forEach(category => {
        let sub_list = []
        let category_sub = parseDomForArray(category, '.ac-menu-filter-content&&.ac-menu-filter-item')
        category_sub.forEach(sub => {
            sub_list.push({
                id: parseDomForHtml(sub, '.ac-menu-filter-item&&data-id'),
                name: parseDomForHtml(sub, '.ac-menu-filter-item&&Text'),
            })
        })
        category_list.push({
            name: parseDomForHtml(category, '.ac-menu-filter-title&&Text').slice(0, -1),
            list: sub_list
        })
    })

    putVar('tab-panel', JSON.stringify(category_list))

    d.push({
        desc: '118 && float',
        url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/category.html?filters=' + filters,
        col_type: "x5_webview_single"
    })

    const list = parseDomForArray(fetch(true_url, {headers: {"User-Agent": PC_UA}}), '.ac-mod-ul&&.ac-mod-li')

    list.forEach(item => {
        d.push({
            title: parseDomForHtml(item, '.ac-mod-title&&title'),
            pic_url: parseDomForHtml(item, 'img&&src'),
            url: parseDomForHtml(item, '.ac-mod-link&&href'),
        })
    })

    setResult(d);
}

const secParse = _ => {
    var res = {};
    var d = [];
    var url = MY_URL != getVar('url', MY_URL).split('_')[0] ? MY_URL : getVar('url', MY_URL);
    var title = getVar('title');
    var code = request(url, {headers: {"User-Agent": PC_UA}});
    try {
        var rurl = code.replace(/\\/g, '').split('backupUrl":["')[1].split('"')[0];
    } catch (e) {
        var rurl = url
    }
    d.push({
        title: "““当前集数:" + title,
        url: rurl,
        col_type: "text_1"
    });


    d.push({
        title: "选集",
        col_type: "rich_text"
    });
    var json = code.split('window.bangumiList = ')[1].split('};')[0] + '}';
    var jsons = JSON.parse(json);
    var list = jsons.items;
    for (let x of list) {
        var a = MY_URL + '_36188_' + x.itemId;
        var b = x.title;
        var c = a + '&&' + b;
        d.push({
            title: b == title ? '““' + x.episodeName + '””' : x.episodeName,
            img: x.image,
            url: $("#noLoading#").lazyRule((c) => {
                putVar("url", c.split('&&')[0]);
                putVar("title", c.split('&&')[1]);
                refreshPage(false);
                var url = MY_URL != getVar('url', MY_URL).split('_')[0] ? MY_URL : getVar('url', MY_URL);
                var title = getVar('title');
                var code = request(url, {headers: {"User-Agent": PC_UA}});
                try {
                    var rurl = code.replace(/\\/g, '').split('backupUrl":["')[1].split('"')[0];
                } catch (e) {
                    var rurl = url
                }
                return rurl;
                return "hiker://empty"
            }, c),
            col_type: 'text_3'
        });

    }
    res.data = d;
    setResult(res);
}

const searchParse = _ => {
    var res = {};
    var d = [];
    var code = request(MY_URL, {});
    var bgm = JSON.parse(code).bgmList;
    for (let x of bgm) {
        d.push({
            title: x.bgmTitle,
            img: x.coverImageH,
            desc: x.contentCount,
            content: x.bgmIntro,
            url: 'https://www.acfun.cn/bangumi/aa' + x.bgmId,
            col_type: 'movie_1_left_pic'
        });
    }
    res.data = d;
    setResult(res);
}

const getUrlParams = (url, baseUrl, name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
    let r = url.replace(baseUrl, '').substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

const addUrlPara = (url, name, value) => {
    let currentUrl = url.split('#')[0];
    if (/\?/g.test(currentUrl)) {
        if (/name=[-\w]{4,25}/g.test(currentUrl)) {
            currentUrl = currentUrl.replace(/name=[-\w]{4,25}/g, name + "=" + value);
        } else {
            currentUrl += "&" + name + "=" + value;
        }
    } else {
        currentUrl += "?" + name + "=" + value;
    }
    return currentUrl
}