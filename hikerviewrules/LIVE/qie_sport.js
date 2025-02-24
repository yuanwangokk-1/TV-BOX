const baseParse = _ => {
    let d = [];
    const category_json = fetch("https://live.qq.com/api/ajax/get_column_category")
    const page = MY_URL.match(/\?page\=(.*?)\&/)[1]
    const category = JSON.parse(category_json).data.leftNav
    const current = getMyVar("tyrantgenesis.qie_sport.current_tab") || 0;
    const current_child = getMyVar("tyrantgenesis.qie_sport.current_child_tab") || '';

    const child_cate_url = "https://live.qq.com/app_api/v10/getChildList?short_name=" + category[current].short_name
    const child_category_json = fetch(child_cate_url)
    const child_list = JSON.parse(child_category_json).data

    const data_url = "https://live.qq.com/api/live/vlist?page_size=16&page=" + page + "&shortName=" + category[current].short_name + "&child_id=" + current_child
    const data_json = fetch(data_url)
    const list = JSON.parse(data_json).data.result

    if (parseInt(page) === 1) {
        category.forEach((item, index) => {
            d.push({
                title: index == current ? "““" + item.tag_name + "””" : item.tag_name,
                url: $("#noLoading#").lazyRule((index) => {
                    putMyVar("tyrantgenesis.qie_sport.current_tab", index);
                    putMyVar("tyrantgenesis.qie_sport.current_child_tab", '');
                    refreshPage(false);
                    return "hiker://empty"
                }, index)
            });
        })
        d.push({
            col_type: "blank_block"
        });
        d.push({
            title: current_child === '' ? "““全部””" : "全部",
            url: $("#noLoading#").lazyRule(_ => {
                putMyVar("tyrantgenesis.qie_sport.current_child_tab", '');
                refreshPage(false);
                return "hiker://empty"
            })
        });
        child_list.forEach((child, key) => {
            d.push({
                title: child.child_id == current_child ? "““" + child.child_name + "””" : child.child_name,
                url: $("#noLoading#").lazyRule((key) => {
                    putMyVar("tyrantgenesis.qie_sport.current_child_tab", key);
                    refreshPage(false);
                    return "hiker://empty"
                }, child.child_id)
            });
        })
    }

    list.forEach(video => {
        d.push({
            title: video.room_name,
            url: $('https://m.live.qq.com/' + video.room_id).lazyRule((id) => {
                const api_url = "https://live.qq.com/api/h5/room?room_id=" + id
                const res = JSON.parse(fetch(api_url)).data
                // return res.rtmp_url.replace('http', 'https') + '/' + res.rtmp_live
                return res.hls_url
                // return html.match(/"hls_url":"(.*?)","use_p2p"/)[1]+"@Referer="
            }, video.room_id),
            pic_url: video.room_src + "@Referer=",
            col_type: 'movie_2'
        });
    })


    setResult(d);
}

const searchParse = _ => {
    let d = [];
    const list = JSON.parse(getResCode()).room

    list.forEach(video => {
        d.push({
            title: video.room_name,
            url: $('https://m.live.qq.com/' + video.room_id).lazyRule((id) => {
                const api_url = "https://live.qq.com/api/h5/room?room_id=" + id
                const res = JSON.parse(fetch(api_url)).data
                // return res.rtmp_url.replace('http', 'https') + '/' + res.rtmp_live
                return res.hls_url
                // const html = fetch(input)
                // return html.match(/"hls_url":"(.*?)","use_p2p"/)[1]+"@Referer="
            }, video.room_id),
            desc: video.nickname,
            pic_url: video.room_src + "@Referer=",
        });
    })

    setResult(d);
}
