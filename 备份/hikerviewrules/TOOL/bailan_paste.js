addListener("onRefresh", $.toString(() => {
    clearVar('cate');
    clearVar('content');
    clearVar('password');
    clearVar('time_limit');
}))
let d = [];
const cate = getItem('cate', '1')
d.push({
    title: cate === '1' ? '‘‘’’<strong><font color="red">导入</font></strong>' : '导入',
    url: $().lazyRule(_ => {
        setItem('cate', '1')
        refreshPage(true)
        return "hiker://empty"
    }),
    col_type: 'scroll_button'
})
d.push({
    title: cate === '2' ? '‘‘’’<strong><font color="red">创建</font></strong>' : '创建',
    url: $().lazyRule(_ => {
        setItem('cate', '2')
        refreshPage(true)
        return "hiker://empty"
    }),
    col_type: 'scroll_button'
})

if (cate === '1') {
    d.push({
        title: '导入',
        desc: '请粘贴内容',
        col_type: 'input',
        url: $.toString(() => {
            const res = input.split(' ')
            let path, password
            if (res.length === 2) {
                path = res[0].split('/').pop()
                password = res[1]
            } else {
                path = res[0].split('/').pop()
            }

            const json = request("https://pasteme.tyrantg.com/api/getContent/" + path + '@' + password)
            const result = JSON.parse(json)

            if (result.return_code !== 0) {
                log(result)
                refreshPage(true)
                return "toast://" + result.message
            }

            result.data = decodeURIComponent(result.data)
            if (result.data.startsWith('海阔视界'))
                return result.data
            else
                return "copy://" + result.data
        })
    })
} else if (cate === '2') {
    d.push({
        title: '',
        desc: '请输入内容',
        col_type: 'input',
        extra: {
            type: 'textarea',
            titleVisible: false,
            height: 3,
            onChange: $.toString(_ => {
                setItem('content', input.trim())
            })
        }
    })
    d.push({
        title: '',
        desc: '请输入自定义密码（不输入会自动生成）',
        col_type: 'input',
        extra: {
            titleVisible: false,
            onChange: $.toString(_ => {
                setItem('password', input.trim())
            })
        }
    })
    d.push({
        title: '',
        desc: '请输入限制时间（分钟）',
        col_type: 'input',
        extra: {
            titleVisible: false,
            onChange: $.toString(_ => {
                setItem('time_limit', input.trim())
            })
        }
    })
    d.push({
        col_type: 'line_blank'
    })
    d.push({
        title: '提交',
        col_type: 'text_center_1',
        url: $().lazyRule(_ => {
            const obj2strUrl = (obj) => {
                let str = "";
                for (let key in obj) {
                    str += key + '=' + encodeURIComponent(obj[key]) + '&'
                }
                str = str.substring(0, str.length - 1);
                return str;
            }
            const param_body = {}
            const content = getItem('content', '')
            const password = getItem('password', '')
            const time_limit = getItem('time_limit', '')

            if (content === '') {
                refreshPage(true)
                return "toast://请输入内容"
            }
            param_body.content = content

            if (password !== '')
                param_body.password = password
            else
                param_body.auto_password = 1

            if (time_limit !== '') param_body.time_limit = time_limit

            const json = request("https://pasteme.tyrantg.com/api/create", {
                body: obj2strUrl(param_body),
                method: 'POST'
            })
            const res = JSON.parse(json)

            if (res.return_code !== 0) {
                log(res)
                refreshPage(true)
                return "toast://" + res.message
            }

            let result = "https://pasteme.tyrantg.com/" + res.data.path

            if (res.data.password) result += ' ' + res.data.password

            copy(result)
            refreshPage(true)
            return "toast://已复制到剪贴板"
        })
    })
}

setResult(d)