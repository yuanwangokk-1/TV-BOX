const baseParse = _ => {
    let d = [];
    const list = parseDomForArray(getResCode(), '.content&&.grid_item');
    for (let j in list) {
        d.push({
            title: parseDomForHtml(list[j], '.description&&Text'),
            desc: parseDomForHtml(list[j], '.num&&Text'),
            pic_url: parseDom(list[j], 'img&&src'),
            url: $(parseDom(list[j], 'a&&href')).lazyRule(_ => {
                const html = fetch(input)
                const script = parseDomForHtml(html, '.bofang_box&&script&&Html')
                eval(script)
                return player_data.url
            })
        })
    }

    setResult(d);
}