eval(getCryptoJS())
const baseParse = _ => {
    let d = [];
    let tasks = []
    let [empty, fyclass, page] = MY_URL.split('$$')
    fyclass = parseInt(fyclass)
    page = parseInt(page)

    let list = []
    switch (fyclass) {
        case 1: {
            list = getList(2, "addTimeStamp", '', page)
            break
        }
        case 2: {
            list = getList(1, "addTimeStamp", '', page)
            break
        }
        case 3: {
            list = getList(1, "seeCount", '', page)
            break
        }
        case 4: {
            list = getList(1, "hot", '', page)
            break
        }
        case 5: {
            list = getList(1, "collectionCount", '', page)
            break
        }
        case 6: {
            list = getFind(page)
            break
        }
        case 7: {
            list = getListByTypeId(4, '', page)
            break
        }
        case 8: {
            list = getListByTypeId(11, '', page)
            break
        }
        case 9: {
            list = getListByTypeId(17, '', page)
            break
        }
        case 10: {
            list = getListByTypeId(23, '', page)
            break
        }
        case 11: {
            list = getListByTypeId(29, '', page)
            break
        }
    }

    if (list.length > 0) {
        list.forEach(item => {
            let id = item.id.toString()
            d.push({
                title: item.name,
                desc: item.tags,
                pic_url: '',
                url: $(empty).lazyRule((id) => {
                    const params = {
                        "videoId": parseInt(id),
                    }

                    const video_json = fetch("https://www.hxc-api.com/videos/getPreUrl", {
                        headers: {
                            auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
                            'Content-Type': 'application/json',
                            'user-agent': PC_UA
                        },
                        method: 'POST',
                        body: params
                    })
                    log(video_json)
                    const video = JSON.parse(video_json)

                    if (video.code === 0) {
                        let m3u8Url = video.data.url
                        let splited = m3u8Url.split("?")
                        let m3u8UrlParams = splited[1].split('&')
                        // urlSearchParams.delete("start")
                        // urlSearchParams.delete("end")
                        return splited[0] + "?" + m3u8UrlParams.pop()
                    } else {
                        const video_free_json = fetch("https://www.hxc-api.com/videos/getUrl", {
                            headers: {
                                auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
                                'Content-Type': 'application/json',
                                'user-agent': PC_UA
                            },
                            method: 'POST',
                            body: params
                        })
                        const video_free = JSON.parse(video_free_json)
                        if (video_free.code === 0) {
                            return video_free.data.url
                        } else {
                            return 'toast://解析失败'
                        }
                    }
                }, id),
                col_type: 'movie_2',
                extra: {
                    id: id,
                }
            })
            tasks.push({
                func: () => picUrlDecode(item.coverImgUrl, id)
            })
        })
    }

    setResult(d);
    be(tasks)
}

const searchParse = () => {
    let d = [];
    // let tasks = []
    let [empty, search, page] = MY_URL.split('$$')
    page = parseInt(page)

    let list = getList(1, "addTimeStamp", search, page)

    if (list.length > 0) {
        list.forEach(item => {
            let id = item.id.toString()
            d.push({
                title: item.name,
                desc: item.tags,
                // pic_url: '',
                url: $(empty).lazyRule((id) => {
                    const params = {
                        "videoId": parseInt(id),
                    }

                    const video_json = fetch("https://www.hxc-api.com/videos/getPreUrl", {
                        headers: {
                            auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
                            'Content-Type': 'application/json',
                            'user-agent': PC_UA
                        },
                        method: 'POST',
                        body: params
                    })
                    const video = JSON.parse(video_json)

                    if (video.code === 0) {
                        let m3u8Url = video.data.url
                        let splited = m3u8Url.split("?")
                        let m3u8UrlParams = splited[1].split('&')
                        // urlSearchParams.delete("start")
                        // urlSearchParams.delete("end")
                        return splited[0] + "?" + m3u8UrlParams.pop()
                    } else {
                        const video_free_json = fetch("https://www.hxc-api.com/videos/getUrl", {
                            headers: {
                                auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
                                'Content-Type': 'application/json',
                                'user-agent': PC_UA
                            },
                            method: 'POST',
                            body: params
                        })
                        const video_free = JSON.parse(video_free_json)
                        if (video_free.code === 0) {
                            return video_free.data.url
                        } else {
                            return 'toast://解析失败'
                        }
                    }
                }, id),
                col_type: 'movie_2',
                /*extra: {
                    id: id,
                }*/
            })
            /*tasks.push({
                func: () => picUrlDecode(item.coverImgUrl, id)
            })*/
        })
    }

    setResult(d);
    // be(tasks)
}

const getList = (type, column, searchText, page) => {
    const params = {
        "page": page,
        "length": 10,
        "type": type,
        "searchText": searchText,
        "orderText": [
            {
                "dir": "desc",
                "column": column
            }
        ]
    }

    const list_json = fetch("https://www.hxc-api.com/videos/getList", {
        headers: {
            auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
            'Content-Type': 'application/json',
            'user-agent': PC_UA
        },
        method: 'POST',
        body: params
    })

    const list = JSON.parse(list_json)

    if (list.code === 0) {
        return list.data.list
    } else {
        toast(list.msg)
        return []
    }
}

const getListByTypeId = (getListByTypeId, searchText, page) => {
    const params = {
        "page": page,
        "length": 10,
        "type": 1,
        "typeId": getListByTypeId,
        "searchText": searchText,
        "orderText": [
            {
                "dir": "desc",
                "column": "addTimeStamp"
            }
        ]
    }

    const list_json = fetch("https://www.hxc-api.com/videos/getList", {
        headers: {
            auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
            'Content-Type': 'application/json',
            'user-agent': PC_UA
        },
        method: 'POST',
        body: params
    })

    const list = JSON.parse(list_json)

    if (list.code === 0) {
        return list.data.list
    } else {
        toast(list.msg)
        return []
    }
}

const getFind = (page) => {
    const params = {
        "page": page,
        "length": 10,
    }

    const list_json = fetch("https://www.hxc-api.com/videos/getFind", {
        headers: {
            auth: "MmMwNTAxNzBiYWNlZGY0ZDQxZjExN2M0OGQ3NjhiOGZ8NTc0MDQ0NDM=",
            'Content-Type': 'application/json',
            'user-agent': PC_UA
        },
        method: 'POST',
        body: params
    })

    const list = JSON.parse(list_json)

    if (list.code === 0) {
        return list.data.list
    } else {
        toast(list.msg)
        return []
    }
}

const picUrlDecode = (pic_url, id) => {
    const base64PicUrl = CryptoJS.AES.decrypt(fetch(pic_url), CryptoJS.enc.Utf8.parse("46cc793c53dc451b"), {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    }).toString(CryptoJS.enc.Utf8)
    updateItem({
        pic_url: base64PicUrl,
        extra: {
            id: id
        }
    })
}

baseParse()
