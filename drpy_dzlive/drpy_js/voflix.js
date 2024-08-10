muban.mxpro.二级.desc = '.module-info-item:eq(4)&&Text;;;.module-info-item-content:eq(1)&&Text;.module-info-item-content:eq(0)&&Text';
muban.mxpro.二级.tab_text = 'body--small&&Text';
var rule = {
    title: 'voflix',
    模板: 'mxpro',
    host: 'https://voflix.fun',
    homeUrl: '/label/new.html',
    // url:'/show/fyclass--------fypage---.html',
    url: '/show/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2a61IiRxTH34XPfpjB+75BniG1H8iGqmxls6lSs1XWllXeQEADaHlZAt6yKq4RBTUGhgAvM90Db5GBPpeeDc6y0dXK1nzz9z/TPX36cs6ZxrchM/Ts27ehH6OzoWehF5GZ6Dffh4ZCryM/RV12KnWxt+rym8irX6K9B1+7soiddpZOu7ILZmhuCOTUqd0ogDzG8nZBJIsgj5PsJCpyKQbyBMvFdVGrgzxJslzIyvltfKXBnSeL3IvJY5GJd7aVRD2sj9HZxO7Dw6G5510LeP8qMj3NznPXdzvf30mAvp4C9PULoO98AvSdJoC+cwLQd14A0NYunYi1M7AB0PtSl04DbQB95xSAbMcrPE4AGkvpxG4e4FgUULv4Rif3AdspoHZ7Z+7IsZ2CQeZTLp472+toU0C2pZRc/A1tCsj3ekbEqui7ArR1djfku2OwAVCf2yvtpIV9KiD/mhfO5p+iUUEXiemJzFH7Pa2iArKl4yJzhTYFtIqtrLsGuIoKeFYLcnedZrUHZFtuOX+gJwA0A411p17wDNgj6acoMhWNaIeoUBZr1oCHyK6WRL4hjoqdXBxsHsn7XOckJ6uXnudA+qi/TFnWmt7+lETuNdOuiI4poEW83mIbAE31aoVtANRu51gWzrGdAto0+x+4HQBvjL/YBsBjKetjKXva/VoW1gm2U0DtljPuDIoEnidm8uS45WRKTjKHzhDzIT+Qqy23GZ1zZHoidmvX8egB6BtjNhqZ0jZG7cauNwbcGGEjPIIxu/unpg+zPqzrYdbDum6ybuq6wbqh6eYk6eakrk+wPqHr46yP6/oY62O6Psr6qK6zv6bur8n+mrq/Jvtr6v6a7K+p+2uyv91sqi3Td7O8SDK9IazMvxZJ7tx2dm6gg5mX7qN04ixLljfB8sPLmWneYZfLIoGnevrFz1PR7lufD4XC96w/tNyeb9hWkdOwNkFuVHDPvGYa0Q9q9wiyiZdBnhe70YBNvHKOdSYaW05yBUdhfnRKuVV3vz5UleGTE/wyu0pMYuFWLGU8uQqkQaoYcXErrBLaFAxYHdxZxfhVB35VjF/+88vWdu2Q8x8AVwAxmcN0AkDv24pzxQGg5UaeM4BBQ+Kj5cpP58BBc6pf7vLLef459u685ptjt8tuGhK7h1RjIQc5KchJ98hJw3pOuke87swnneI8HhYFerxZ3tfijQs0sItWu5zATa+A2m2UZArrdAA+gDFZxdgHwAf32q5l6eD2QDucnfc4FgA9013soU0BvS9/pX3hKKB2m/vyhr5QFXA6rspExrY2+EvFI9E83PzuRnCcBwXUR2WxvbCGrRU8UGwV8Zj7PH0m9cBbSdCge+AtJTj+dcFbS6BNQRCJgkj0iUg08kCRyC/a+N0lOUul9iFGMADqM33qZHHQAGTL7jnndNeigI/X3Xc77exuO41VLAD1eXAo8liBAgxSZcqCpd0XKaD3+dyW+FXUouxOEy4ygG47vtZsLtB8HjXtv/GeCYCr2n2RyFNV2wPeOleihNEbgPrMp2QOozAAz0tFtHZoXnrwaNWpp44cqErsGyWDWi6IoP89gprDwQVDcMHwhoFsX8EFg9/PFk95+fCYYdmjB2H5c8Iy6Qb7a+j+GuyvoftrsF+G7pfBfhm6Xwb7ZYw8bToYDdJBkA6CdPCQ6eCzf+sMqvb/RXp4yjA9FoTpIEx/pWH6C4Ziv5/Z/H5K8/u3k+BfP4Ig/wWC/Nw/nMdLLnwqAAA=',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        4: {cateId: '4'},
        3: {cateId: '3'},
        13: {cateId: '13'},
        15: {cateId: '15'},
        16: {cateId: '16'}
    },
    tab_remove: ['夸克网盘'],
    class_parse: '.navbar-items&&li;a&&Text;a&&href;/(\\d+).html',
    lazy: `js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if (html.encrypt == '1') {
            url = unescape(url)
        } else if (html.encrypt == '2') {
            url = unescape(base64Decode(url))
        }
        if (/\\.m3u8|\\.mp4/.test(url)) {
            input = {
                jx: 0,
                url: url,
                parse: 0
            }
        } else {
            input
        }
    `,

    // searchUrl:'/search/**----------fypage---.html',
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/detail/fyid.html', //非必填,二级详情拼接链接
    搜索: 'json:list;name;pic;;id',
}