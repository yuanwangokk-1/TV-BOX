const baseParse = _ => {
    const d = []
    const list = pdfa(getResCode(), '.books&&.bk')
    const class_url = MY_RULE.class_url

    list.forEach(item => {
        let url
        if (class_url === 'dpxs/list_3' || class_url === 'cpxs/list_2') {
            url = $(pd(item, 'a&&href')).rule(() => {
                const d = []
                const list = pdfa(getResCode(), 'ul,1&&li')

                list.forEach(item => {
                    d.push({
                        title: pdfh(item, 'a&&Text'),
                        col_type: 'text_1',
                        url: $(pd(item, 'a&&href') + '#readTheme#').rule(() => {
                            const d = []
                            d.push({
                                title: pdfh(getResCode(), '#contxt&&Text'),
                                col_type: 'rich_text',
                                extra: {
                                    click: true,
                                }
                            })
                            setResult(d);
                        }),
                    })
                })

                setResult(d);
            })
        } else {
            url = $(pd(item, 'a&&href')).lazyRule(() => {
                const img_list = []
                const list = pdfa(fetch(input), 'ul,1&&li')
                list.forEach(item => {
                    let true_page = pd(item, 'a&&href')
                    let img_array = pdfa(fetch(true_page), '#htmlContent&&img')
                    img_array.forEach(img => {
                        img_list.push(pdfh(img, 'img&&src'))
                    })
                })
                return 'pics://' + img_list.join('&&')
            })
        }
        d.push({
            title: pdfh(item, 'h3&&Text'),
            pic_url: pd(item, '.pic&&img&&src'),
            desc: pdfh(item, 'span&&Text'),
            url: url,
        })
    })

    setResult(d);
}
