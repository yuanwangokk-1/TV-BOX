const bt = {
    empty: 'hiker://empty',
    d: [],
    data: {
        currentTab: getItem('bt.currentTab', '0'),
        settingToolTab: getItem('bt.settingToolTab', '0'),
        settingToolSelectedServer: getItem('bt.settingToolSelectedServer', '0'),
    },
    plugins: {
        serverSavePath: "hiker://files/rules/js/TyrantGenesis_宝塔绑定.js",
    },
    fetch: (url, data) => {
        const api_sk = 'PnGw5A1WV6ySHCr4YufMu2OOUu5a8TxA'
        data.request_time = (new Date().getTime() / 1000).toFixed(0)
        data.request_token = md5(data.request_time + md5(api_sk))

        const responseJson = post('http://124.223.179.189:8888/' + url, {body: data})

        try {
            const response = JSON.parse(responseJson)
            if (response.status === false) {
                toast(response.msg)
                return ''
            } else {
                return response
            }
        } catch (e) {
            toast('请求异常，请检查面板设置')
            return ''
        }
    },
    /*baseParse: () => {
        const res = bt.fetch('system?action=GetSystemTotal', {})
        bt.d.push({
            title: res,
            col_type: 'long_text',
        })
        setResult(bt.d)
    },*/
    getServerInfo: () => {
        try {
            const response = fetch(bt.plugins.serverSavePath)
            if (response) {
                const response_row = response.split('\n')
                let response_arr = []
                response_row.forEach(row => {
                    response_arr.push(row.split('|$#$|'))
                })
                return response_arr
            } else {
                return []
            }
        } catch (e) {
            return []
        }
    },
    baseParse: () => {
        const tabs = bt.getServerInfo();

        bt.d.push({
            title: '🌐 设置',
            url: $(bt.empty).rule(() => {
                const bt = $.require('hiker://page/bt')
                bt.settingParse()
                setResult(bt.d)
            }),
            col_type: 'scroll_button',
        })

        if (tabs.length > 0) {
            tabs.forEach((tab, index) => {
                bt.d.push({
                    title: bt.data.currentTab === index.toString() ? '‘‘’’<strong><font color="#ff1493">' + tab[0] + '</font></strong>' : tab[0],
                    url: $(bt.empty).lazyRule((index) => {
                        setItem('bt.currentTab', index.toString())
                        refreshPage(false)
                        return 'hiker://empty'
                    }, index),
                    col_type: 'scroll_button',
                })
            })

            bt.d.push({
                col_type: 'blank_block'
            })


        }

        setResult(bt.d)
    },
    settingParse: () => {
        const tabs = bt.getServerInfo();

        ['排序', '删除'].forEach((item, index) => {
            bt.d.push({
                title: bt.data.settingToolTab === index.toString() ? '‘‘’’<strong><font color="#ff1493">' + item + '</font></strong>' : item,
                url: $(bt.empty).lazyRule((index) => {
                    setItem('bt.settingToolTab', index.toString())
                    refreshPage(false)
                    return 'hiker://empty'
                }, index),
                col_type: 'text_2',
            })
        })

        tabs.forEach((tab, index) => {
            bt.d.push({
                title: bt.data.settingToolSelectedServer === index.toString() ? '‘‘’’<strong><font color="#ff1493">' + tab[0] + '</font></strong>' : tab[0],
                url: $(bt.empty).lazyRule((index) => {
                    setItem('bt.settingToolSelectedServer', index.toString())
                    refreshPage(false)
                    return 'hiker://empty'
                }, index),
                col_type: 'text_2',
            })
        })

        bt.d.push({
            title: '绑定新面板',
            url: $(bt.empty).rule(() => {
                const bt = $.require('hiker://page/bt')
                bt.bindParse()
                setResult(bt.d)
            }),
            col_type: 'text_center_1',
            /*extra: {
                lineVisible: false,
            }*/
        })
    },
    bindParse: () => {
        bt.d.push({
            desc: '请输入面板标题',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('bt.serverName', input)
                })
            }
        })
        bt.d.push({
            desc: '请输入面板地址',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('bt.serverURL', input)
                })
            }
        })
        bt.d.push({
            desc: '请输入面板API密钥',
            col_type: 'input',
            extra: {
                titleVisible: false,
                onChange: $.toString(() => {
                    if (input) setItem('bt.serverPassword', input)
                })
            }
        })
        bt.d.push({
            title: '绑定',
            url: $(bt.empty).lazyRule(() => {
                const bt = $.require('hiker://page/bt')
                const serverInfo = fetch(bt.plugins.serverSavePath)

                let serverInfoRow = []
                if (serverInfo) serverInfoRow = serverInfo.split('\n')

                serverInfoRow.push(getItem('bt.serverName', '') + '|$#$|' + getItem('bt.serverURL', '') + '|$#$|' + getItem('bt.serverPassword', ''))
                const info = serverInfoRow.join('\n')
                writeFile(bt.plugins.serverSavePath, info)
                toast('绑定成功')
                back(true)
                return bt.empty
            }),
            col_type: 'text_center_1',
            extra: {
                lineVisible: false,
            }
        })
    },
}

$.exports = bt
