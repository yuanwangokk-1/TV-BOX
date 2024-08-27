const baseParse = _ => {
    let res = {};
    let d = [];

    d.push({
        title: '我的歌单',
        pic_url: "https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/icons/list.png",
        url: $("hiker://empty").lazyRule(_ => {
            refreshPage()
            return input
        }),
        col_type: 'icon_round_4'
    });
    d.push({
        title: '搜索',
        pic_url: "https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/icons/search.png",
        col_type: 'icon_round_4'
    });
    d.push({
        title: '导入',
        pic_url: "https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/icons/turn.png",
        col_type: 'icon_round_4'
    });
    d.push({
        title: '设置',
        pic_url: "https://git.tyrantg.com/tyrantgenesis/hikerViewRules/raw/master/assets/icons/setting.png",
        col_type: 'icon_round_4'
    });

    const list_json = request("hiker://files/TyrantG/data/music_list.json")
    const list = JSON.parse(list_json)

    list.forEach(item => {
        d.push({
            title: item.name,
            desc: item.desc,
            pic_url: item.cover_image,
            url: $("hiker://empty").rule(param => {
                let d = [];
                const list = param.list
                list.forEach(music => {
                    d.push({
                        title: music.name,
                        desc: music.author,
                        url: music.url,
                        pic_url: music.cover_image,
                    })
                })

                setResult(d);
            }, {list: item.list}),
            col_type: 'movie_1_vertical_pic'
        });
    })

    res.data = d;
    setHomeResult(res);
}

const secParse = _ => {
    let res = {};
    let d = [];


    res.data = d;
    setHomeResult(res);
}