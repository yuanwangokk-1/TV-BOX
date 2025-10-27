const DY5 = {
    name: '555电影',
    empty: 'hiker://empty',
    baseUrl: 'https://www.555dy.fun',
    dom: [],
    category: [
        {
            type: 'vodtype',
            name: '电影',
            url: '/vodshow/1-----------.html',
        },
        {
            type: 'vodtype',
            name: '连续剧',
            url: '/vodshow/2-----------.html',
        },
        {
            type: 'vodtype',
            name: '综艺纪录',
            url: '/vodshow/3-----------.html',
        },
        {
            type: 'vodtype',
            name: '动漫',
            url: '/vodshow/4-----------.html',
        },
        {
            type: 'label',
            subType: 'week',
            name: '追剧周表',
            url: '/label/week.html',
        },
        {
            type: 'label',
            subType: 'new',
            name: '今日更新',
            url: '/label/new.html',
        },
        {
            type: 'label',
            subType: 'topic',
            name: '专题列表',
            url: '/label/topic.html',
        },
    ],
    categorySelect: getItem('categorySelect', '0'),
    baseParse: () => {
        const page = parseInt(MY_URL.split('##')[1])
        const currentCategoryItem = DY5.category[parseInt(DY5.categorySelect)]
        if (page === 1) {
            DY5.categoryParse()
            if (currentCategoryItem.type === 'vodtype') {
                DY5.vodTypeCateParse(currentCategoryItem)
            }
        }
        setResult(DY5.dom)
    },
    categoryParse: () => {
        DY5.category.forEach((item, index) => {
            DY5.dom.push({
                title: parseInt(DY5.categorySelect) === index ? '‘‘’’<strong><font color="red">' + item.name + '</font></strong>' : item.name,
                url: $(DY5.empty).lazyRule((index) => {
                    setItem('categorySelect', index)
                    refreshPage(false)
                    return 'hiker://empty'
                }, index.toString()),
                col_type: 'scroll_button',
            })
        })
    },
    vodTypeCateParse: (currentCategoryItem) => {

    },
}

$.exports = DY5
