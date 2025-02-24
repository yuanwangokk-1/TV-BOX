const baseParse = _ => {
    const role_path = "hiker://files/rules/js/TyrantGenesis_永劫无间用户绑定.js"
    let d = [];
    let roleId = ''
    let empty = 'hiker://empty'

    let current_page = MY_URL.split('##')[1].toString()


    let cate_select = getVar("tyrantgenesis.naraka_score.cate_select", "1")
    let game_mode = getVar("tyrantgenesis.naraka_score.game_mode", "1")

    if (current_page === '1') {
        d.push({
            title: '添加',
            desc: '请输入游戏昵称',
            url: "input.trim() ? $('hiker://empty').lazyRule(params => {eval(fetch('hiker://files/TyrantG/TOOL/naraka_score.js'));return setRoleId(params);}, {input: input.trim()}) : 'toast://请输入游戏昵称''",
            col_type: "input"
        })
        d.push({
            title: cate_select === '1' ? '‘‘’’<strong><font color="red">最近战绩</font></strong>' : '最近战绩',
            url: $(empty).lazyRule(_ => {
                putVar("tyrantgenesis.naraka_score.cate_select", "1")
                refreshPage(true)
                return "hiker://empty"
            }),
            col_type: 'scroll_button',
        })
        d.push({
            title: cate_select === '2' ? '‘‘’’<strong><font color="red">生涯数据</font></strong>' : '生涯数据',
            url: $(empty).lazyRule(_ => {
                putVar("tyrantgenesis.naraka_score.cate_select", "2")
                refreshPage(true)
                return "hiker://empty"
            }),
            col_type: 'scroll_button',
        })
        d.push({
            title: cate_select === '3' ? '‘‘’’<strong><font color="red">角色数据</font></strong>' : '角色数据',
            url: $(empty).lazyRule(_ => {
                putVar("tyrantgenesis.naraka_score.cate_select", "3")
                refreshPage(true)
                return "hiker://empty"
            }),
            col_type: 'scroll_button',
        })
        /*d.push({
            title: cate_select === '4' ? '‘‘’’<strong><font color="red">武器数据</font></strong>' : '武器数据',
            url: $(empty).lazyRule(_ => {
                putVar("tyrantgenesis.naraka_score.cate_select", "4")
                refreshPage(true)
                return "hiker://empty"
            }),
            col_type: 'scroll_button',
        })*/
        // d.push({
        //     title: cate_select === '5' ? '‘‘’’<strong><font color="red">地图模拟器</font></strong>' : '地图模拟器',
        //     url: $(empty).lazyRule(_ => {
        //         putVar("tyrantgenesis.naraka_score.cate_select", "5")
        //         refreshPage(true)
        //         return "hiker://empty"
        //     }),
        //     col_type: 'scroll_button',
        // })
    }

    if (fetch(role_path)) {
        roleId = fetch(role_path)

        if (cate_select === '1') {
            let listData = "https://gamedb.gamersky.com/yjwujian/record/getRecentRecords?roleId=" + roleId + "&pageIndex=" + current_page + "&pageSize=20"
            let res_json = fetch(listData)
            let res = JSON.parse(res_json)
            if (res.code === 0) {
                res.data.list.forEach(item => {
                    d.push({
                        title: "‘‘’’<strong>#&nbsp;<font color=\"red\">" + item.rank + "</font></strong>",
                        url: "hiker://empty",
                        col_type: 'text_4',
                    })
                    d.push({
                        title: item.battleMode,
                        pic_url: "https:" + item.battleModeImage + "@Referer=https://www.gamersky.com/",
                        url: "hiker://empty",
                        col_type: 'icon_4',
                    })
                    d.push({
                        title: item.hero,
                        pic_url: "https:" + item.heroImage + "@Referer=https://www.gamersky.com/",
                        url: "hiker://empty",
                        col_type: 'icon_4',
                    })
                    d.push({
                        title: item.grade,
                        pic_url: "https:" + item.gradeImageUrl + "@Referer=https://www.gamersky.com/",
                        url: "hiker://empty",
                        col_type: 'icon_4',
                    })
                    d.push({
                        title: "‘‘’’<strong>分数：&nbsp;<font color=\"red\">" + item.gradeScore + "</font></strong>",
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "‘‘’’<strong>击杀：&nbsp;<font color=\"red\">" + item.killTimes + "</font></strong>",
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "‘‘’’<strong>伤害：&nbsp;<font color=\"red\">" + item.damage + "</font></strong>",
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "‘‘’’<strong>评分：&nbsp;<font color=\"red\">" + item.performScore + "</font></strong>",
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        col_type: 'line_blank'
                    })
                })
            } else {
                d.push({
                    title: res.message,
                    col_type: 'long_text',
                })
            }
        } else if (cate_select === '2') {
            if (current_page === '1') {
                d.push({
                    col_type: 'blank_block',
                })
                d.push({
                    title: game_mode === '1' ? '‘‘’’<strong><font color="red">单人</font></strong>' : '单人',
                    url: $(empty).lazyRule(_ => {
                        putVar("tyrantgenesis.naraka_score.game_mode", "1")
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                d.push({
                    title: game_mode === '2' ? '‘‘’’<strong><font color="red">三人</font></strong>' : '三人',
                    url: $(empty).lazyRule(_ => {
                        putVar("tyrantgenesis.naraka_score.game_mode", "2")
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                d.push({
                    title: game_mode === '3' ? '‘‘’’<strong><font color="red">死斗</font></strong>' : '死斗',
                    url: $(empty).lazyRule(_ => {
                        putVar("tyrantgenesis.naraka_score.game_mode", "3")
                        refreshPage(true)
                        return "hiker://empty"
                    }),
                    col_type: 'scroll_button',
                })
                let url = "https://gamedb.gamersky.com/yjwujian/career/getCareerData?gamerskyId=5861820&identity=0&roleId=" + roleId
                let res_json = fetch(url)
                let res = JSON.parse(res_json)
                let data = {}

                if (res.code === 0) {
                    if (game_mode === '1') {
                        data = res.data.single
                    } else if (game_mode === '2') {
                        data = res.data.three
                    } else if (game_mode === '3') {
                        data = res.data.chaos
                    }
                    d.push({
                        title: "场次：" + data.gameCount,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "场均击杀：" + data.avgKillTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "场均伤害：" + data.avgDamage,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "KD：" + data.kd,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        col_type: 'line_blank'
                    })
                    d.push({
                        title: "总伤害：" + data.sumDamage,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "总击杀：" + data.sumKillTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "总死亡：" + data.sumDeadTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "总救援：" + data.sumRescueTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    /*d.push({
                        title: "总振刀：" + data.sumShockCount,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })*/
                    d.push({
                        title: "总治疗：" + data.sumCure,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        col_type: 'line_blank'
                    })
                    d.push({
                        title: "最高伤害：" + data.maxDamage,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "最高击杀：" + data.maxKillTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "最高治疗：" + data.maxCure,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    /*d.push({
                        title: "最高死亡：" + data.maxDeadTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })*/
                    d.push({
                        title: "最高救援：" + data.maxRescueTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "最高生存时间：" + resultFormat(data.maxTotalLiveTime),
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        col_type: 'line_blank'
                    })
                    d.push({
                        title: "夺冠次数：" + data.rank1Count,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "夺冠率：" + data.rank1Rate,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "前五次数：" + data.rankLe5Count,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "前五率：" + data.rankLe5Rate,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                } else {
                    d.push({
                        title: res.message,
                        col_type: 'long_text',
                    })
                }
            }
        } else if (cate_select === '3') {
            if (current_page === '1') {
                let url = "https://gamedb.gamersky.com/yjwujian/hero/getHeroData?roleId=" + roleId
                let res_json = fetch(url)
                let res = JSON.parse(res_json)
                let heroBest = res.data.heroBest
                let heroList = res.data.heroList

                d.push({
                    title: "最佳英雄",
                    url: "hiker://empty",
                    col_type: 'text_1',
                })
                d.push({
                    title: heroBest.hero,
                    desc: "使用率：" + heroBest.useRate + "%",
                    pic_url: "https:" + heroBest.backImage + "@Referer=https://www.gamersky.com/",
                    url: "https:" + heroBest.backImage + "@Referer=https://www.gamersky.com/",
                    col_type: 'movie_1_left_pic'
                })
                d.push({
                    title: "胜场：" + heroBest.winRate,
                    url: "hiker://empty",
                    col_type: 'text_2',
                })
                d.push({
                    title: "场均伤害：" + heroBest.avgDamage,
                    url: "hiker://empty",
                    col_type: 'text_2',
                })
                d.push({
                    title: "K/D：" + heroBest.kd,
                    url: "hiker://empty",
                    col_type: 'text_2',
                })
                /*d.push({
                    title: "游戏时长：" + resultFormat(heroBest.playTime),
                    url: "hiker://empty",
                    col_type: 'text_2',
                })*/
                d.push({
                    col_type: 'line_blank'
                })
                d.push({
                    title: "英雄数据",
                    url: "hiker://empty",
                    col_type: 'text_1',
                })
                heroList.forEach(hero => {
                    d.push({
                        title: hero.hero,
                        desc: "使用率：" + hero.useRate + "%",
                        pic_url: "https:" + hero.backImage + "@Referer=https://www.gamersky.com/",
                        url: "https:" + hero.backImage + "@Referer=https://www.gamersky.com/",
                        col_type: 'movie_1_left_pic'
                    })
                    d.push({
                        title: "胜场：" + hero.winTimes,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "场均伤害：" + hero.avgDamage,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    d.push({
                        title: "K/D：" + hero.kd,
                        url: "hiker://empty",
                        col_type: 'text_2',
                    })
                    // d.push({
                    //     title: "游戏时长：" + resultFormat(hero.playTime),
                    //     url: "hiker://empty",
                    //     col_type: 'text_2',
                    // })
                    d.push({
                        col_type: 'line_blank'
                    })
                })
            }
        }/*  else if (cate_select === '5') {
            d.push({
                desc: '600 && float',
                url: "https://api.xiaoheihe.cn/wiki/map_v2/?wiki_id=1203220&mapId=39",
                col_type: 'x5_webview_single'
            });
        }*/

    }

    setResult(d);
}

const setRoleId = params => {
    const role_path = "hiker://files/rules/js/TyrantGenesis_永劫无间用户绑定.js"
    let res_json = fetch("https://gamedb.gamersky.com/yjwujian/search/getSearchResult?serverId=163&roleName=" + params.input)
    // let data = fetch(role_path)
    let res = JSON.parse(res_json)
    if (res.code === 0) {
        // data += (params.input+'\r\n')
        writeFile(role_path, res.data.roleId)
        refreshPage(false)
        return 'hiker://empty'
    } else {
        refreshPage(false)
        return 'toast://' + res.message
    }
}

const resultFormat = result => {
    let secondTime = parseInt(result);// 秒
    let minuteTime = 0;// 分
    let hourTime = 0;// 小时
    if (secondTime > 60) {//如果秒数大于60，将秒数转换成整数
        //获取分钟，除以60取整数，得到整数分钟
        minuteTime = parseInt(secondTime / 60);
        //获取秒数，秒数取佘，得到整数秒数
        secondTime = parseInt(secondTime % 60);
        //如果分钟大于60，将分钟转换成小时
        if (minuteTime > 60) {
            //获取小时，获取分钟除以60，得到整数小时
            hourTime = parseInt(minuteTime / 60);
            //获取小时后取佘的分，获取分钟除以60取佘的分
            minuteTime = parseInt(minuteTime % 60);
        }
    }
    let time = "" + parseInt(secondTime) + "秒";

    if (minuteTime > 0) {
        time = "" + parseInt(minuteTime) + "分" + time;
    }
    if (hourTime > 0) {
        time = "" + parseInt(hourTime) + "小时" + time;
    }
    return time;
}