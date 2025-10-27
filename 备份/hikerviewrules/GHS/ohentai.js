const baseParse = _ => {
    let d = [];
    try {
        const list = parseDomForArray(getResCode(), '.serywrapper&&.tagtext');
        for (let j in list) {
            d.push({
                title: parseDomForHtml(list[j], '.tagtext&&Text'),
                url: "https://ohentai.org/" + parseDomForHtml(list[j], 'a&&href').replace(/\s/g, '%20') + "&p=fypage"
            });
        }
    } catch (e) {
    }

    setResult(d);
}

const secParse = _ => {
    let d = [];
    try {
        const list = parseDomForArray(getResCode(), '.videobrickwrap&&.videobrick');

        for (let j in list) {
            let title = pdfh(list[j], '.videotitle&&Text')
            if (title !== 'StripChat - Live Cams') {
                d.push({
                    title: title,
                    pic_url: "https://ohentai.org/" + pdfh(list[j], 'img&&src').replace(/\s/g, '%20'),
                    url: $("https://ohentai.org/" + pdfh(list[j], 'a&&href').replace(/\s/g, '%20')).lazyRule(_ => {
                        const data = fetch(input).match(/sources: \[\{\"file\"\:\".*\"\}\],/)

                        if (data) {
                            return data[0].replace(/sources: \[\{\"file\"\:\"/, '').replace(/\"\}\],/, '')
                        } else {
                            return "取值失败"
                        }
                    }),
                    col_type: "movie_2"
                })
            }
        }
    } catch (e) {
    }

    setResult(d);
}