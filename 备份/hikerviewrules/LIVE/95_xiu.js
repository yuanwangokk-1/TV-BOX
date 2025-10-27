const baseParse = _ => {
    let d = [];
    const html = getResCode()
    const list = parseDomForArray(html, 'html&&li');

    list.forEach(item => {
        let uid = parseDomForHtml(item, 'a&&href').match(/\/(.*?)\./)[1]
        d.push({
            title: parseDomForHtml(item, '.pane_mm_name&&Text'),
            url: "http://play.95xiu.com/app/" + uid + ".flv",
            pic_url: parseDomForHtml(item, 'img&&src'),
            col_type: 'movie_2'
        });
    })


    setResult(d);
}

const searchParse = _ => {
    let d = [];
    const html = getResCode()
    const list = parseDomForArray(html, 'html&&li');

    list.forEach(item => {
        let uid = parseDomForHtml(item, 'a&&href').match(/\/(.*?)\./)[1]
        d.push({
            title: parseDomForHtml(item, '.pane_mm_name&&Text'),
            url: "http://play.95xiu.com/app/" + uid + ".flv",
            desc: "404就是没开播",
            pic_url: parseDomForHtml(item, 'img&&src'),
            col_type: 'movie_2'
        });
    })


    setResult(d);
}