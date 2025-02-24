const empty = 'hiker://empty'

const baseParse = () => {
    let d = []
    const json = getResCode()
    const list = JSON.parse(json).data

    list.forEach(item => {
        d.push({
            title: item.title,
            desc: item.score + '分',
            pic_url: item.image,
            url: $(empty + '#immersiveTheme#').rule((id) => {
                require('hiker://page/one')
                secParse(id)
            }, item.ID),
        })
    })

    setResult(d)
}

const secParse = (id) => {
    let d = []
    const url = 'https://onelist.top/v1/api/video/id?id=' + id
    const json = fetch(url, {headers: {}, method: 'POST'})
    const data = JSON.parse(json).data

    const list = data.url_content.split("\n")

    d.push({
        title: '主演：' + data.authors,
        desc: '简介：' + data.content,
        pic_url: data.image,
        url: 'https://onelist.top/detail?id=' + id,
        col_type: 'movie_1_vertical_pic_blur',
    })

    d.push({
        title: '选集',
        url: "hiker://empty",
        col_type: 'text_1',
    })

    list.forEach((item, index) => {
        d.push({
            title: '第' + (index + 1) + '集',
            url: item.split('$')[1],
            col_type: 'text_4',
        })
    })

    setResult(d)
}
