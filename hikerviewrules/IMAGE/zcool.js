const baseParse = _ => {
    // 初始化
    let d = [];
    const cate_url = "https://www.zcool.com.cn/p1/category/list-discover"
    const empty = "hiker://empty"
    const page = MY_URL.split('##')[1]
    const sort = [
        {title: '编辑精选', url: 'recommend_level=2&sort=9'},
        {title: '首页推荐', url: 'recommend_level=3&sort=9'},
        {title: '全部推荐', url: 'recommend_level=1&sort=9'},
        {title: '最新发布', url: 'recommend_level=0&sort=0'}]

    // 缓存
    let cate_1st = getVar("tyrantgenesis.zcool.cate_1st_select", "0")
    let cate_2nd = getVar("tyrantgenesis.zcool.cate_2nd_select", "0")
    let cate_sort = getVar("tyrantgenesis.zcool.cate_sort", "0")

    const api_url = MY_URL.split('##')[0] + "?cate=" + cate_1st + "&sub_cate=" + cate_2nd + "&has_video=0&city=0&college=0&" + sort[cate_sort].url + "&ps=20&p=" + page

    // 一级分类
    const category_json = fetch(cate_url, {headers: {"User-Agent": PC_UA}})
    const category = JSON.parse(category_json).datas

    if (parseInt(page) === 1) {

        // 一级分类
        category.forEach(cate => {
            d.push({
                title: cate_1st === cate.id.toString() ? '‘‘’’<strong><font color="red">' + cate.name + '</font></strong>' : cate.name,
                url: $(empty).lazyRule(params => {
                    putVar("tyrantgenesis.zcool.cate_1st_select", params.cate_id.toString())
                    putVar("tyrantgenesis.zcool.cate_2nd_select", "0")
                    refreshPage(true)
                    return "hiker://empty"
                }, {
                    cate_id: cate.id,
                }),
                col_type: 'scroll_button'
            })
        })
        d.push({
            col_type: 'blank_block',
        })

        // 二级分类
        let sub_category = category.find(item => item.id.toString() === cate_1st).subCateList
        d.push({
            title: cate_2nd === "0" ? '‘‘’’<strong><font color="red">全部</font></strong>' : '全部',
            url: $(empty).lazyRule(params => {
                putVar("tyrantgenesis.zcool.cate_2nd_select", "0")
                refreshPage(true)
                return "hiker://empty"
            }),
            col_type: 'scroll_button'
        })
        sub_category.forEach(cate => {
            d.push({
                title: cate_2nd === cate.id.toString() ? '‘‘’’<strong><font color="red">' + cate.name + '</font></strong>' : cate.name,
                url: $(empty).lazyRule(params => {
                    putVar("tyrantgenesis.zcool.cate_2nd_select", params.cate_id.toString())
                    refreshPage(true)
                    return "hiker://empty"
                }, {
                    cate_id: cate.id
                }),
                col_type: 'scroll_button'
            })
        })
        d.push({
            col_type: 'blank_block',
        })

        // 三级分类
        sort.forEach((item, index) => {
            d.push({
                title: cate_sort === index.toString() ? '‘‘’’<strong><font color="red">' + item.title + '</font></strong>' : item.title,
                url: $(empty).lazyRule(params => {
                    putVar("tyrantgenesis.zcool.cate_sort", params.cate_id.toString())
                    refreshPage(true)
                    return "hiker://empty"
                }, {
                    cate_id: index
                }),
                col_type: 'scroll_button'
            })
        })
        d.push({
            col_type: 'blank_block',
        })
    }

    const list_json = fetch(api_url, {headers: {"User-Agent": PC_UA}})
    const list = JSON.parse(list_json).datas

    list.forEach(item => {
        if (item.objectType === 3) {
            let obj = item.content
            d.push({
                title: obj.title,
                desc: obj.creatorObj.username,
                pic_url: obj.cover,
                url: $("https://www.zcool.com.cn/work/" + obj.idStr + ".html").rule(_ => {
                    eval(fetch('hiker://files/TyrantG/IMAGE/zcool.js'))
                    secParse(MY_URL)
                }),
                col_type: 'movie_2'
            })
        }
    })

    setResult(d);
}

const secParse = MY_URL => {
    let d = [];
    const pageContent = fetch(MY_URL, {headers: {"User-Agent": PC_UA}})
    const html = parseDomForHtml(pageContent, '.workShowBox&&Html');

    d.push({
        title: html.replace(/收藏/g, '').replace(/<script(.|\r|\n)*script>/, ''),
        col_type: 'rich_text'
    })

    setResult(d);
}

const searchParse = _ => {
    let d = [];
    const list = JSON.parse(getResCode()).datas

    list.forEach(item => {
        if (item.objectType === 3) {
            let obj = item.content
            d.push({
                title: obj.title,
                desc: obj.creatorObj.username,
                pic_url: obj.cover,
                url: $("https://www.zcool.com.cn/work/" + obj.idStr + ".html").rule(_ => {
                    eval(fetch('hiker://files/TyrantG/IMAGE/zcool.js'))
                    secParse(MY_URL)
                }),
                col_type: 'movie_2'
            })
        }
    })

    setResult(d);
}
