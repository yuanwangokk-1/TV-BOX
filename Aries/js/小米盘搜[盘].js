/*
@header({
  searchable: 1,
  filterable: 0,
  quickSearch: 1,
  title: '小米盘搜',
  lang: 'ds'
})
*/

// 注意事项：海阔不支持搜索或者一级直接push推二级，这里只好把搜索结果编码强制进二级解码后再推
// 为了同时兼容壳子和海阔。壳子本身只需要搜索结果直接push就可以了
// 海阔搜索进的二级push好像也推不了数据
var rule = {
    类型: '搜索',
    title: '小米盘搜',
    alias: '网盘搜索引擎',
    desc: '仅搜索源纯js写法',
    host: 'https://www.misou.fun',
    url: '',
    searchUrl: '/v1/search/disk',
    headers: {
        'User-Agent': 'PC_UA',
        'Content-Type': 'application/json'
    },
    searchable: 1,
    quickSearch: 1,
    filterable: 0,
    double: true,
    play_parse: true,
    limit: 10,
    class_name: '',
    class_url: '',
    lazy: async function () {
    },
    action: async function (action, value) {
        if (action === 'only_search') {
            return '此源为纯搜索源，你直接搜索你想要的就好了，比如 大奉打更人'
        }
        return `没有动作:${action}的可执行逻辑`
    },
    推荐: async function () {
        return [{
            vod_id: 'only_search',
            vod_name: '这是个纯搜索源哦',
            vod_tag: 'action'
        }]
    },
    一级: async function () {
        return []
    },
    二级: async function () {
        let {orId} = this;
        // let vod_id = orId;
        let vod_id = base64Decode(orId);
        let vod = {vod_id: vod_id.split('$$')[0]};
        vod.vod_name = vod_id.split('$$')[1];
        vod.vod_play_from = 'push';
        vod.vod_play_url = '推送观看$' + vod.vod_id;
        // log(vod);
        return vod
    },
    搜索: async function () {
        let {input, pdfa, pdfh, pd, KEY, MY_PAGE} = this;
        const postData = {
            page: MY_PAGE,
            q: KEY, // 使用用户通过 'wd' 参数传递的搜索文本
            user: '',
            // exact: true,
            exact: false,
            share_time: '',
            size: this.limit, // 最多返回10个结果
            // type: 'QUARK',
            type: ''
        };
        let html = await post(input, {data: postData});
        let json = JSON.parse(html);

        // 获取 "list" 部分的内容
        let list = json.data.list || [];

        // 循环遍历 "list"，将 "disk_name" 键名替换为 "vod_name"，将 "shared_time" 键名替换为 "vod_remarks"，将 "link" 键名替换为 "vod_id"，并设置 "disk_type" 替换为 "vod_pic"
        list = list.map((item) => {
            let vod_name = misc.stripHtmlTag(item.disk_name);
            return {
                vod_name: vod_name,
                vod_content: `上传日期: ${item.shared_time}`,
                vod_remarks: `网盘:${item.disk_type}`,
                // vod_id: `push://${item.link}`,
                vod_id: base64Encode(`push://${item.link}$$${vod_name}`),
                vod_pic: 'http://pic.uzzf.com/up/2023-7/20237261437483499.png'
            }
        });

        // 更新 "list" 部分的内容
        json.data.list = list;

        return list
    }
}
