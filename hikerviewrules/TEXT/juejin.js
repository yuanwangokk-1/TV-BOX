addListener("onClose", $.toString(() => {
    clearItem('cate_level_1_id')
    clearItem('cate_level_2_id')
    clearItem('cursor')
}))
const d = []
const EMPTY = 'hiker://empty'
const CATE_URL = 'https://juejin.cn'
const SEC_CARE_API = 'https://api.juejin.cn/recommend_api/v1/tag/recommend_tag_list'
const CONTENT_LIST_API = 'https://api.juejin.cn/recommend_api/v1/article/recommend_cate_tag_feed'
const CURRENT_PAGE = MY_URL.split('##')[1].toString()
const CATE_LEVEL_1_ID = getItem('cate_level_1_id', '')
const CATE_LEVEL_2_ID = getItem('cate_level_2_id', '')

const CATE_LEVEL_1_ARRAY = pdfa(fetch(CATE_URL, {headers: {"User-Agent": PC_UA}}), '.view-nav&&a')

if (CURRENT_PAGE === '1') {
    clearItem('cursor')
    CATE_LEVEL_1_ARRAY.forEach(item => {
        let id = pdfh(item, '.category-popover-box&&st:state') || ''
        let title = pdfh(item, '.category-popover-box&&Text')

        d.push({
            title: id === CATE_LEVEL_1_ID ? '‘‘’’<strong><font color="red">' + title + '</font></strong>' : title,
            url: $(EMPTY).lazyRule(params => {
                setItem('cursor', '0')
                setItem('cate_level_1_id', params.id)
                setItem('cate_level_2_id', '')
                refreshPage(true)
                return 'hiker://empty'
            }, {
                id: id
            }),
            col_type: 'scroll_button'
        })
    })
    d.push({
        col_type: "blank_block"
    })

    if (CATE_LEVEL_1_ID) {
        d.push({
            title: CATE_LEVEL_2_ID === '' ? '‘‘’’<strong><font color="red">全部</font></strong>' : '全部',
            url: $(EMPTY).lazyRule(_ => {
                setItem('cate_level_2_id', '')
                refreshPage(true)
                return 'hiker://empty'
            }),
            col_type: 'scroll_button'
        })
        let data = {"cate_id": CATE_LEVEL_1_ID}

        let headers = {
            "User-Agent": PC_UA,
            "Content-Type": 'application/json',
            "Referer": 'https://juejin.cn/',
        }
        const CATE_LEVEL_2_JSON = fetch(SEC_CARE_API, {headers: headers, method: 'POST', body: JSON.stringify(data)})
        const CATE_LEVEL_2_RESULT = JSON.parse(CATE_LEVEL_2_JSON)

        if (CATE_LEVEL_2_RESULT && CATE_LEVEL_2_RESULT.err_no === 0) {
            const CATE_LEVEL_2_ARRAY = CATE_LEVEL_2_RESULT.data
            CATE_LEVEL_2_ARRAY.forEach(item => {
                d.push({
                    title: CATE_LEVEL_2_ID === item.tag_id.toString() ? '‘‘’’<strong><font color="' + item.color + '">' + item.tag_name + '</font></strong>' : item.tag_name,
                    url: $(EMPTY).lazyRule(params => {
                        setItem('cursor', '0')
                        setItem('cate_level_2_id', params.id)
                        refreshPage(true)
                        return 'hiker://empty'
                    }, {
                        id: item.tag_id
                    }),
                    col_type: 'scroll_button'
                })
            })
            d.push({
                col_type: "blank_block"
            })
        }
    }
}

const CURSOR = getItem('cursor', '0')
data = {
    cate_id: "6809637769959178254",
    cursor: CURSOR,
    id_type: 2,
    limit: 20,
    sort_type: 200,
}
if (CATE_LEVEL_1_ID) data.cate_id = CATE_LEVEL_1_ID
if (CATE_LEVEL_2_ID) data.tag_id = CATE_LEVEL_2_ID

headers = {
    "User-Agent": PC_UA,
    "Content-Type": 'application/json',
    "Referer": 'https://juejin.cn/',
}
const LIST_JSON = fetch(CONTENT_LIST_API, {headers: headers, method: 'POST', body: JSON.stringify(data)})
const LIST_RESULT = JSON.parse(LIST_JSON)

if (LIST_RESULT && LIST_RESULT.err_no === 0) {
    setItem('cursor', LIST_RESULT.cursor)
    const LIST = LIST_RESULT.data
    LIST.forEach(item => {
        d.push({
            title: item.article_info.title,
            desc: item.article_info.brief_content,
            pic_url: item.article_info.cover_image,
            url: $(CATE_URL + '/post/' + item.article_id).rule(_ => {
                const d = []
                const html = fetch(MY_URL, {headers: {"User-Agent": PC_UA}})
                const data_json = html.match(/{layout(.*?)globalRefs:{}}/)
                let a, b, c, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D = {}
                let data = {}
                eval('data = ' + data_json[0])
                d.push({
                    title: data.state.view.column.entry.content,
                    col_type: 'rich_text',
                })

                setResult(d)
            }),
            col_type: 'movie_1'
        })
    })
}

setResult(d)
