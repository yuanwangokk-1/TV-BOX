addListener('onRefresh', $.toString(() => {
    putMyVar('ChilloutMix.TG.cursor', '0')
}))
const d = []
const empty = 'hiker://empty'
const categoryIndex = getMyVar('ChilloutMix.TG.categoryIndex', 'all')
const cursor = getMyVar('ChilloutMix.TG.cursor', '0')
const page = parseInt(MY_PAGE) || 1


if (page === 1) {
    const categories = [
        {id: 'all', title: '全部'},
        {id: '<lora:koreanDollLikeness_v15', title: '韩国风'},
        {id: '<lora:japaneseDollLikeness_v10', title: '日本风'},
        {id: '<lora:taiwanDollLikeness_v10', title: '台湾风'},
    ]

    categories.forEach(category => {
        d.push({
            title: categoryIndex === category.id ? '‘‘’’<strong><font color="#5FCC97">' + category.title + '</font></strong>' : category.title,
            url: $(empty).lazyRule((id) => {
                putMyVar("ChilloutMix.TG.categoryIndex", id)
                putMyVar("ChilloutMix.TG.cursor", '0')
                refreshPage(true)
                return "hiker://empty"
            }, category.id),
            col_type: 'scroll_button',
        })
    })
    d.push({
        col_type: 'blank_block',
    })
}

const input = {0: {json: {style: categoryIndex, template_name: "chilloutmix", cursor: parseInt(cursor)}}}
const url = "https://chilloutai.com/api/trpc/task.allpic?batch=1&input=" + encodeURIComponent(JSON.stringify(input))

try {
    const result = JSON.parse(fetch(url))
    log(result)
    const list = result[0].result.data.json
    const data = list.data
    putMyVar("ChilloutMix.TG.cursor", list.nextCursor.toString())

    data.forEach(item => {
        d.push({
            pic_url: item.image_url,
            url: item.image_url,
            col_type: 'pic_2_card',
        })
    })
} catch (e) {
}


setResult(d)