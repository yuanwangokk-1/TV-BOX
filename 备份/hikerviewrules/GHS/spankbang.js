const videoSource = (stream_data, d) => {
    d.push({
        pic_url: stream_data.cover_image,
        col_type: 'pic_1'
    });


    if (stream_data['240p'].length > 0) {
        d.push({
            title: '240p',
            url: stream_data['240p'][0],
            col_type: 'text_2'
        });
    }
    if (stream_data['320p'].length > 0) {
        d.push({
            title: '320p',
            url: stream_data['320p'][0],
            col_type: 'text_2'
        });
    }
    if (stream_data['480p'].length > 0) {
        d.push({
            title: '480p',
            url: stream_data['480p'][0],
            col_type: 'text_2'
        });
    }
    if (stream_data['720p'].length > 0) {
        d.push({
            title: '720p',
            url: stream_data['720p'][0],
            col_type: 'text_2'
        });
    }
    if (stream_data['1080p'].length > 0) {
        d.push({
            title: '1080p',
            url: stream_data['1080p'][0],
            col_type: 'text_2'
        });
    }
    if (stream_data['4k'].length > 0) {
        d.push({
            title: '4k',
            url: stream_data['4k'][0],
            col_type: 'text_2'
        });
    }
}

const baseParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();

    const list = parseDomForArray(html, '.video-list&&.video-item');

    if (Number(MY_PAGE) === 1) {
        d.push({
            title: '分类',
            col_type: 'text_center_1',
            url: $("https://spankbang.com/categories").rule(_ => {
                var d = [];

                var list = parseDomForArray(getResCode(), '#categories&&a');
                list.forEach(item => {
                    d.push({
                        title: parseDomForHtml(item, 'a&&Text'),
                        pic_url: parseDomForHtml(item, '.cover&&src'),
                        url: $("https://spankbang.com" + parseDomForHtml(item, 'a&&href').replace(/\?.*/, '') + "/fypage/").rule(_ => {
                            let d = [];
                            let html = getResCode();
                            let list = parseDomForArray(html, '.video-list&&.video-item');

                            list.forEach(item => {
                                d.push({
                                    title: parseDomForHtml(item, '.name&&Text'),
                                    desc: parseDomForHtml(item, '.l&&Text'),
                                    pic_url: parseDom(item, '.cover&&data-src'),
                                    url: $(parseDom(item, 'a&&href')).rule(_ => {
                                        eval(fetch('hiker://files/TyrantG/GHS/spankbang.js'))
                                        secParse()
                                    }),
                                    col_type: 'movie_3',
                                });
                            })

                            setResult(d)
                        }),
                        col_type: 'movie_3',
                    });
                })
                setResult(d)
            })
        })
    }

    list.forEach(item => {
        d.push({
            title: parseDomForHtml(item, '.name&&Text'),
            desc: parseDomForHtml(item, '.l&&Text'),
            pic_url: parseDom(item, '.cover&&data-src'),
            url: parseDom(item, 'a&&href'),
            col_type: 'movie_3',
        });
    })

    res.data = d;
    setHomeResult(res);
}

const secParse = _ => {
    let res = {};
    let d = [];
    const html = getResCode();

    const script = parseDomForHtml(html, '#inner_content&&script&&Html');
    eval(script)

    videoSource(stream_data, d)

    res.data = d;
    setHomeResult(res);
}

const searchParse = () => {
    let res = {};
    let d = [];
    const html = getResCode();

    const list = parseDomForArray(html, '.video-list&&.video-item');
    list.forEach(item => {
        d.push({
            title: parseDomForHtml(item, '.name&&Text'),
            desc: parseDomForHtml(item, '.l&&Text'),
            pic_url: parseDom(item, '.cover&&data-src'),
            url: parseDom(item, 'a&&href'),
            col_type: 'movie_2',
        });
    })

    res.data = d;
    setHomeResult(res);
}