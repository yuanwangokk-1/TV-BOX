// 地址发布页 https://ikyy.app/
// 搜索验证
muban.海螺3.二级.title = '.hl-dc-title&&Text;.hl-data-xs&&Text';
muban.海螺3.二级.desc = '.hl-col-xs-12:eq(2)&&Text;;;.hl-col-xs-12--em:eq(3)&&Text;.hl-col-xs-12--em:eq(4)&&Text';
var rule = {
    title: '爱看影院',
    模板: '海螺3',
    // host: 'https://ikyy.tv',
    host: 'https://ikyy.app',
    hostJs: 'print(HOST);let html=request(HOST,{headers:{"User-Agent":PC_UA}});let src = jsp.pdfh(html,".go:eq(0)&&a&&href");print("爱看影院跳转地址 =====> " + src);HOST=src',//网页域名根动态抓取js代码。通过HOST=赋值
    // url: '/v_show/fyclass--------fypage---.html',
    url: '/v_show/fyclassfyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '-{{fl.area}}-{{fl.by or "time"}}-{{fl.class}}-{{fl.lang}}-{{fl.letter}}---fypage---{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+3UuUoDURQG4He5dYrciXunxn3f4oZFlEFFjaBRCBIQXBBEBVGmsLBRiIXGDcVIfBpnTN7CifPPOUdsxMridnO+/ybhzEz+DaVVw+SGWrAzqkFl7OSKiqhUcsn2J/fl8f216M/rycU1++tYqsI7ufJWrsL+oLKRQK2oVQX7uhQeY49Jt9gt6ZpdS4+yR4XrenL/Ungde530WvZa6TXsNdKr2aul875a7qt5Xy331byvlvtq3lfLfTXv619mpypJ8JgWk6lZfkyl/HUpt/nLx+SeFf3zUAxhVtq/4wxDmH3cX3CGIczKTtE9cDjmmU6cX4k4GMLMcy45w0DZw6nIgoE2eXsWmwQDZTtP7s1WmAXDtxtop9O2fNOvHS9/8Mtb2AhoJGmCNJE0Q5pJ4pA4SQukhaQV0krSBmkjaYe0k3RAOkg6IZ0kXZAukm5IN0kPpIekF9JL0gfpI+mH9JMMQAZIBiGDJEOQIZJhyDDJCGSEJAFJkIxCRknGIGMk45BxkgnIxLeXYjrDL4R3eOwWjn68EJ7zVHYe8en0vH80/Mr3QsG7PUEyN59e5X9Vftvd20WyOrO8Yld+dSqiLFO8pnj/afGaAjUF+u8LNGYK1BSoKVBToKZA/1agVaZATYGaAjUFagr0LwWa/QRmukciPRUAAA==',
    class_parse: '.hl-menus&&a;span&&Text;a&&href;.*/(\\d+).html',

    // searchUrl:'/v_search/**----------fypage---.html',
    searchUrl: '/index.php/ajax/suggest?mid=1&wd=**&limit=50',
    detailUrl: '/v_detail/fyid.html', //非必填,二级详情拼接链接
    搜索: 'json:list;name;pic;;id',
}