const secParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();

    const des_title = parseDomForHtml(html, 'h1&&Text');
    const des_pic = parseDom(html, 'img[title]&&src');
    const des_desc = parseDomForHtml(html, '[id=fileDescription]&&Text');

    const fetch_video = fetch(parseDomForHtml(html, 'iframe&&src'))

    const src = fetch_video.match(/src: '(.*?)',/)[1]

    d.push({
        title: des_title,
        desc: des_desc,
        pic_url: des_pic,
        url: src + "#isVideo=true#",
        col_type: 'pic_1'
    });

    res.data = d;
    setHomeResult(res);
}
