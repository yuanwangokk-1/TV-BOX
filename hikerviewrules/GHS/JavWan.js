const wan = {
    d: [],
    baseParse: () => {
        const html = getResCode()
        wan.listParse(html)
        setResult(wan.d)
    },
    listParse: (html) => {
        const list = pdfa(html, '#main&&a')

        list.forEach(item => {
            try {
                let title = pdfh(item, 'a&&span&&Text')
                let img = pdfh(item, '.post-list-image&&img&&src')
                wan.d.push({
                    title: title,
                    desc: pdfh(item, '.post-list-duration&&Text'),
                    pic_url: img,
                    url: $(pdfh(item, 'a&&href') + '#immersiveTheme#').rule((title, img) => {
                        const wan = $.require('hiker://page/wan')
                        wan.videoParse(title, img)
                        setResult(wan.d)
                    }, title, img),
                    col_type: 'movie_2',
                })
            } catch (e) {
            }
        })
    },
    videoParse: (title, img) => {
        setPageTitle(title)
        const html = getResCode()
        const info = pdfh(html, '#post-data&&Html')

        let url = 'hiker://empty'
        const player = pdfh(info, '#player-width&&Html')
        const iframe = player.match(/id="iframe"/)
        if (iframe) {
            let iframe_context = ''
            let iframe_src = ''
            let script = pdfh(player, 'script&&Html').replace('return p', 'iframe_context = p')
            eval(script)
            try {
                iframe_src = iframe_context.match(/src="(.*?)"/)[1]
            } catch (e) {
            }

            if (iframe_src) {
                url = pdfh(fetch(iframe_src), 'meta[property="og:video:url"]&&content')
            }
        } else {
            let context = ''
            let script = pdfh(player, 'script,2&&Html').replace('return p', 'context = p')
            eval(script)
            try {
                url = context.match(/video.src='(.*?)';/)[1]
            } catch (e) {
            }
        }

        wan.d.push({
            title: title,
            desc: pdfh(info, '.post-content&&Text'),
            pic_url: img,
            url: MY_URL,
            col_type: 'movie_1_vertical_pic_blur'
        })

        wan.d.push({
            col_type: 'line_blank'
        })

        wan.d.push({
            title: '播放',
            url: url,
            col_type: 'text_center_1',
            extra: {lineVisible: false},
        })

        wan.d.push({
            col_type: 'line_blank'
        })

        wan.listParse(html)
    },
}

$.exports = wan
