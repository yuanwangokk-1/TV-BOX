let d = []
const empty = "hiker://empty"

const makeScroll = (url, cate_level) => {
    let json = fetch(url)
    let data = JSON.parse(json).data
    if (data) {
        let arr = data.files
        let first = arr[0]
        let cate_select = getVar("tyrantgenesis.images.cate_select_" + cate_level)
        let type = true
        let hasName = false
        arr.forEach(item => {
            if (item.type === 'FILE') type = false
            if (item.name === cate_select) hasName = true
        })
        if (!hasName) cate_select = first.name
        if (type) {
            arr.forEach(cate => {
                if (cate.type === 'FOLDER') {
                    cate.cate_level = cate_level
                    d.push({
                        title: cate_select === cate.name ? '‘‘’’<strong><font color="red">' + cate.name + '</font></strong>' : cate.name,
                        url: $(empty).lazyRule(cate => {
                            putVar("tyrantgenesis.images.cate_select_" + cate.cate_level, cate.name)
                            refreshPage(false)
                            return "hiker://empty"
                        }, cate),
                        col_type: 'scroll_button',
                    })
                }
            })
            d.push({
                col_type: "blank_block"
            })

            cate_level++
            makeScroll(url + "%2F" + encodeURIComponent(cate_select), cate_level)
        } else {
            arr.forEach(cate => {
                d.push({
                    pic_url: cate.url,
                    url: cate.url,
                })
            })
        }
    }
}

makeScroll("https://zfile.cosersets.com/api/list/1?path=", 1)

setResult(d);
