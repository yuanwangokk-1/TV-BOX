const at = {
    d: [],
    empty: 'hiker://empty',
    cdn_url: 'hiker://empty',
    ua: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
    files: {
        channels: 'hiker://files/rules/TyrantG/local/at_channels.txt',
    },
    tab: ['游戏', '娱乐', '体育', '视频'],
    boraTab: [
        {title: '聊天', no: '00130000'},
        {title: '旅游', no: '00740000'},
        {title: '音乐', no: '00030001,00030002,00030003'},
        {title: '吃播', no: '00330000'},
        {title: '宠物直播', no: '00580000'},
        {title: '生活/百科', no: '00020000,00020004,00020006,00020007,00020008,00020009,00020010,00020011'},
        {title: '教育/学习', no: '00290000,00290001,00290002,00290005,00290006,00290007'},
        {title: 'Virtual', no: '00810000'},
        {title: '配音/广播', no: '00590000'},
        {title: '金融', no: '0027000,00270001,00270002,00270003,00270004,00270005,00270006,00270007'},
    ],
    vodTab: [
        {title: '新人主播', no: '00000002'},
        {
            title: '游戏',
            no: '00040000,00040118,00040121,00040131,00040019,00040075,00040066,00040070,00040001,00040005,00040128,00040058,00040032,00040067,00040110,00040016,00040002,00040061,00040014,00040039,00040130,00040127,00040125,00040123,00040122,00040132,00040096,00040105,00040086,00040079,00040004,00040080,00040138,00040082,00040081,00040020,00040093,00040094,00040103,00040012,00040088,00040040,00040017,00040089,00040111,00040090,00040065,00040042,00040022,00040119,00040033,00040133,00040097,00040113,00040106,00040007,00040095,00040015,00040077,00040126,00040092,00040115,00040073,00040112,00040083,00040091,00040076,00040098,00040011,00040102,00040137,00040107,00040087,00040120,00040135,00040035,00040078,00040136,00040108,00040057,00040043,00040099,00040074,00040134,00040117,00040069,00040084,00040114,00040129,00040085,00040124,00040116,00040050,00040109,00040008,00040010,00040009,00040055,00049999,00360000,00360003,00360056,00360031,00360022,00360073,00360077,00360079,00360067,00360080,00360076,00360081,00360060,00360046,00360062,00360057,00360069,00360070,00360082,00360078,00360075,00360084,00360072,00360083,00360071,00360068,00360064,00360030,00360059,00360041,00360047,00360058,00360066,00360028,00360085,00360037,00360021,00360050,00360012,00360054,00360053,00360043,00360014,00360035,00360048,00360052,00360033,00360049,00360026,00360034,00360063,00360065,00360051,00360055,00360061,00360042,00360044,00360018,00360036,00360038,00360020,00360074,00360029,00360040,00369999,00720000'
        },
        // {title: '体育', no: '00400000,00780000,00480000,00730000,00670000,00660000,00710000,00140000,00140001,00140002,00140003,00140004,00140005,00140006,00140007,00140008,00140010,00140011,00140009,00180000,00170000,00370000,00370012,00370013,00370011,00370010,00370007,00060000,00060001,00060002,00690000,00100000,00640000,00810000,00190000,00790000,00650000,00750000,00570000,00570004,00570002,00570008,00570003,00570006,00570007,00570009,00570010,00570012,00570013,00570005,00300000'},
        {
            title: '聊天',
            no: '00830000,00840000,00770000,00130000,00820000,00740000,00030000,00030001,00030002,00030003,00330000,00020000,00020007,00020009,00020006,00020008,00020011,00020012,00020010,00020004,00580000,00390000,00390001,00390025,00390026,00390027,00290000,00290005,00290002,00290001,00290006,00290007,00590000,00270000,00270008,00270009,00270006,00350000,00350038,00350026,00350031,00350037,00350001,00350025,00350013,00350002,00350027,00350035,00350036,00350033,00350018,00350034,00350032,00350004,00600000,00800000,99980000'
        },
        // {title: '360', no: '00000003'},
    ],
    data: {
        tab_selected: getMyVar('tg.at.class.tab_selected', '0'),
        sub_tab_selected: getMyVar('tg.at.class.sub_tab_selected', '0'),
    },
    baseParse: () => {
        const page = parseInt(MY_URL.split('##')[1])
        let selectValue, listJsonCallback, listJson, list = []

        if (page === 1) {
            at.tab.forEach((item, index) => {
                at.d.push({
                    title: at.data.tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + item + '</font></strong>' : item,
                    url: $(at.empty).lazyRule((index) => {
                        putMyVar('tg.at.class.tab_selected', index)
                        putMyVar('tg.at.class.sub_tab_selected', '0')
                        refreshPage(false)
                        return 'hiker://empty'
                    }, index.toString()),
                    col_type: 'scroll_button',
                })
            })
            at.d.push({
                col_type: 'blank_block',
            })
        }

        switch (parseInt(at.data.tab_selected)) {
            case 0:
                if (page === 1) {
                    let classListJson = fetch('https://res.afreecatv.com/main/main_gamecategory_viewer.js')
                    let classList = JSON.parse(classListJson).DATA
                    classList.forEach((item, index) => {
                        if (item.cate_name_zh_cn) {
                            let title = item.cate_name_zh_cn
                            at.d.push({
                                title: at.data.sub_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + title + '</font></strong>' : title,
                                url: $(at.empty).lazyRule((index) => {
                                    putMyVar('tg.at.class.sub_tab_selected', index)
                                    refreshPage(false)
                                    return 'hiker://empty'
                                }, index.toString()),
                                col_type: 'scroll_button',
                            })
                        }
                    })
                    at.d.push({
                        col_type: 'blank_block',
                    })

                    selectValue = classList[at.data.sub_tab_selected].broad_cate_no
                }

                try {
                    listJsonCallback = fetch('https://live.afreecatv.com/api/main_broad_list_api.php?callback=jQuery&selectType=cate&selectValue=' + encodeURI(selectValue) + '&orderType=view_cnt&pageNo=' + page + '&lang=zh_CN&szActionType=2&_=' + new Date().getTime())
                    list = JSON.parse(listJsonCallback.slice(7).slice(0, -1)).broad
                } catch (e) {
                }

                list.forEach(item => {
                    at.d.push({
                        title: item.broad_title,
                        url: $('https://play.afreecatv.com/' + item.user_id + '/' + item.broad_no).lazyRule((user_id, broad_no) => {
                            const at = $.require('hiker://page/at')
                            return at.liveParse(user_id, broad_no)
                        }, item.user_id, item.broad_no),
                        pic_url: 'https:' + item.broad_thumb,
                        desc: item.user_nick,
                        col_type: 'movie_2',
                    })
                })
                break
            case 1:
                if (page === 1) {
                    at.boraTab.forEach((item, index) => {
                        at.d.push({
                            title: at.data.sub_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + item.title + '</font></strong>' : item.title,
                            url: $(at.empty).lazyRule((index) => {
                                putMyVar('tg.at.class.sub_tab_selected', index)
                                refreshPage(false)
                                return 'hiker://empty'
                            }, index.toString()),
                            col_type: 'scroll_button',
                        })
                    })
                    at.d.push({
                        col_type: 'blank_block',
                    })

                    selectValue = at.boraTab[at.data.sub_tab_selected].no
                }

                try {
                    listJsonCallback = fetch('https://live.afreecatv.com/api/main_broad_list_api.php?callback=jQuery&selectType=cate&selectValue=' + encodeURI(selectValue) + '&orderType=view_cnt&pageNo=' + page + '&lang=zh_CN&szActionType=2&_=' + new Date().getTime())
                    list = JSON.parse(listJsonCallback.slice(7).slice(0, -1)).broad
                } catch (e) {
                }

                list.forEach(item => {
                    at.d.push({
                        title: item.broad_title,
                        url: $('https://play.afreecatv.com/' + item.user_id + '/' + item.broad_no).lazyRule((user_id, broad_no) => {
                            const at = $.require('hiker://page/at')
                            return at.liveParse(user_id, broad_no)
                        }, item.user_id, item.broad_no),
                        pic_url: 'https:' + item.broad_thumb,
                        desc: item.user_nick,
                        col_type: 'movie_2',
                    })
                })
                break
            case 2:
                selectValue = '00140000,00170000,00180000,00370000,00190000,00060000,00060001,00060002,00060003,00060004,00060005,00060006,00060007,00060008,00060009,00060010,00060011,00570000,00140001,00140002,00140003,00140004,00140005,00140006,00140007,00140008,00140010,00140011,00140009,00370001,00370002,00370003,00370004,00370005,00370006,00370009,00370007,00370008,00640000,00370010,00370011,00650000,00660000,00570001,00670000,003700,00370012,00370013,00690000,00700000,00750000,00570012,00570005,00570013,00780000'

                try {
                    listJsonCallback = fetch('https://live.afreecatv.com/api/main_broad_list_api.php?callback=jQuery&selectType=cate&selectValue=' + encodeURI(selectValue) + '&orderType=view_cnt&pageNo=' + page + '&lang=zh_CN&szActionType=2&_=' + new Date().getTime())
                    list = JSON.parse(listJsonCallback.slice(7).slice(0, -1)).broad
                } catch (e) {
                }

                list.forEach(item => {
                    at.d.push({
                        title: item.broad_title,
                        url: $('https://play.afreecatv.com/' + item.user_id + '/' + item.broad_no).lazyRule((user_id, broad_no) => {
                            const at = $.require('hiker://page/at')
                            return at.liveParse(user_id, broad_no)
                        }, item.user_id, item.broad_no),
                        pic_url: 'https:' + item.broad_thumb,
                        desc: item.user_nick,
                        col_type: 'movie_2',
                    })
                })
                break
            case 3:
                if (page === 1) {
                    at.vodTab.forEach((item, index) => {
                        at.d.push({
                            title: at.data.sub_tab_selected === index.toString() ? '‘‘’’<strong><font color="#5FCC97">' + item.title + '</font></strong>' : item.title,
                            url: $(at.empty).lazyRule((index) => {
                                putMyVar('tg.at.class.sub_tab_selected', index)
                                refreshPage(false)
                                return 'hiker://empty'
                            }, index.toString()),
                            col_type: 'scroll_button',
                        })
                    })
                    at.d.push({
                        col_type: 'blank_block',
                    })

                    selectValue = at.boraTab[at.data.sub_tab_selected].no
                }

                listJson = post('https://sch.afreecatv.com/api.php', {
                    body: {
                        m: 'vodList',
                        szCateNo: selectValue,
                        szFileType: '',
                        szOrder: 'reg_date',
                        szTerm: 'all',
                        nPageNo: page,
                        nListCnt: 60,
                        szPlatform: 'pc',
                        v: '3.0',
                    }
                })

                list = JSON.parse(listJson).DATA

                list.forEach(item => {
                    // if (item.file_type !== 'REVIEW') {
                    at.d.push({
                        title: item.title,
                        url: $(item.url).lazyRule((title_no) => {
                            const at = $.require('hiker://page/at')
                            return at.vodParse(title_no)
                        }, item.title_no),
                        pic_url: item.thumbnail_path.replace('http', 'https'),
                        desc: item.user_nick,
                        col_type: 'movie_2',
                    })
                    // }
                })
                break
        }

        setResult(at.d)
    },
    searchParse: () => {
        const [empty, word, page] = MY_URL.split('##')
        const listJsonCallback = fetch('https://sch.afreecatv.com/api.php?callback=jQuery&m=liveSearch&v=1.0&szOrder=&c=UTF-8&szKeyword=' + word + '&nPageNo=' + page + '&nListCnt=40&hl=1&onlyParent=1&tab=LIVE&location=total_search&_=' + new Date().getTime())
        const list = JSON.parse(listJsonCallback.slice(7).slice(0, -1)).REAL_BROAD

        list.forEach(item => {
            at.d.push({
                title: item.broad_title,
                url: $('https://play.afreecatv.com/' + item.user_id + '/' + item.broad_no).lazyRule((user_id, broad_no) => {
                    const at = $.require('hiker://page/at')
                    return at.liveParse(user_id, broad_no)
                }, item.user_id, item.broad_no),
                pic_url: item.broad_img,
                desc: item.user_nick,
                col_type: 'movie_2',
            })
        })

        setResult(at.d)
    },
    liveParse: (user_id, broad_no) => {
        const aidJSON = post('https://live.afreecatv.com/afreeca/player_live_api.php?bjid=' + user_id, {
            body: {
                bid: user_id,
                bno: broad_no,
                type: 'aid',
                pwd: '',
                player_type: 'html5',
                stream_type: 'common',
                quality: 'master',
                mode: 'landing',
                from_api: '0',
            },
        })

        const aid = JSON.parse(aidJSON).CHANNEL.AID

        const m3u8JSON = fetch('https://livestream-manager.afreecatv.com/broad_stream_assign.html?return_type=gcp_cdn&use_cors=true&cors_origin_url=play.afreecatv.com&broad_key=' + broad_no + '-common-master-hls&time=7207.738263306774')
        return JSON.parse(m3u8JSON).view_url + '?aid=' + aid
    },
    vodParse: (title_no) => {
        const json = post('https://api.m.afreecatv.com/station/video/a/view', {
            body: {
                nTitleNo: title_no,
                nApiLevel: '10',
            },
        })

        if (JSON.parse(json).data.files.length > 0) {
            const file = JSON.parse(json).data.files[0]

            return JSON.stringify({urls: file.quality_files, names: file.quality})
        } else {
            return 'toast://无法解析视频'
        }
    },
}

$.exports = at
