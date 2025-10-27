const streamLab = {
    d: [],
    empty: 'hiker://empty',
    streamNameList: [
        {title: '斗鱼', key: 'douyu',},
        {title: '虎牙', key: 'huya',},
    ],
    streamKey: getItem('TyrantGenesis.streamLab.streamKey', 'douyu'),
    baseParse: () => {
        addListener('onClose', $.toString(() => {
            clearItem('TyrantGenesis.streamLab.streamKey')
            clearItem('TyrantGenesis.streamLab.FirstCate')
            clearItem('TyrantGenesis.streamLab.SecondCate')
        }))
        const page = MY_URL.split('##')[1]
        if (page === '1') {
            streamLab.d.push({
                title: 'Search',
                col_type: 'icon_1_search',
            })
            streamLab.d.push({
                title: '⚙',
                col_type: 'scroll_button',
            })
            streamLab.streamNameList.forEach((stream, index) => {
                streamLab.d.push({
                    title: streamLab.streamKey === stream.key ? '‘‘’’<b><span style="color: #FF0000">' + stream.title + '</span></b>' : stream.title,
                    url: $(streamLab.empty).lazyRule((key) => {
                        setItem('TyrantGenesis.streamLab.streamKey', key)
                        refreshPage(true)
                        return 'hiker://empty'
                    }, stream.key),
                    col_type: 'scroll_button',
                })
            })
            streamLab.d.push({
                col_type: 'blank_block',
            })
            streamLab.categoryLoad()
        }
        streamLab.baseParseLoad(page)
        setResult(streamLab.d);
    },
    categoryLoad: () => {
        switch (streamLab.streamKey) {
            case 'douyu': {
                $.require('hiker://page/douyu').categoryLoad(streamLab.d)
            }
        }
    },
    baseParseLoad: (page) => {
        switch (streamLab.streamKey) {
            case 'douyu': {
                $.require('hiker://page/douyu').baseParseLoad(streamLab.d, page)
            }
        }
    },
}

$.exports = streamLab
