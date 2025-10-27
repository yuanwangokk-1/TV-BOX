const baseParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();
    const list = parseDomForArray(html, "#post-list-posts&&li");

    list.forEach(element => {
        d.push({
            pic_url: parseDomForHtml(element, ".preview&&src"),
            url: $("https://yande.re" + parseDomForHtml(element, "a&&href")).lazyRule(_ => parseDomForHtml(fetch(input), ".highres-show&&href")),
            col_type: 'pic_3'
        })
    });

    res.data = d;
    setHomeResult(res);
}

const secParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();

    d.push({
        pic_url: parseDomForHtml(html, ".highres-show&&href"),
        url: parseDomForHtml(html, ".highres-show&&href"),
        col_type: 'image_1_full'
    })
    res.data = d;
    setHomeResult(res);
}

const searchParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();
    const list = parseDomForArray(html, "#post-list-posts&&li");

    list.forEach(element => {
        d.push({
            title: '',
            desc: '',
            pic_url: parseDomForHtml(element, ".preview&&src"),
            url: "https://yande.re" + parseDomForHtml(element, "a&&href")
        })
    });

    res.data = d;
    setHomeResult(res);
}