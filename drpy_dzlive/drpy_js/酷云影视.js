muban.mxone5.二级.title = 'h1&&Text;.video-info-aux&&Text';
muban.mxone5.二级.desc = '.video-info-items:eq(4)&&Text;;;.video-info-actor:eq(1)&&Text;.video-info-actor:eq(0)&&Text';
var rule = {
    title: '酷云影视',
    模板: 'mxone5',
    host: 'https://sc1080.top',
    url: '/index.php/vod/show/id/fyfilter.html',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}{{fl.letter}}/page/fypage{{fl.year}}',
    filter: 'H4sIAAAAAAAAA+2a2U4bSRSG38XXjNxNyHqXfd/3jHLhRNZMNAwjATMSipAAY8cQsA0iOI7NlrAPxmYZBpoxfhlXt/0W03aVT1f/jUQjcYNUl/7+36eqThXtc6j+GNADl37+GPgt3BO4FHjfHurqCrQEOkK/h+2PbGjJjETtz3+F2v8MN3wddRxdrkWW69j+EOhtEXQyZ/sFDTYiBQVrWqz4hojnWARrWsz+lNk36bYIRgMNL1dKORiIMxpoaYzt7cNAnFEUWpsUhTOaS/xrxRiCuXDWtFTzi2xk1W0RjOYyXLBKYBFMWpE1se9ZUZ2RZeGTZ0WC0XTzi5WDWZguZxQlNl7LrEAUzijK9Kq9RojC2TH2yBxYsybHwMIZWSLD5sA3sHBGqdtPsugupI6zpqU2NW5+XXBbBKOBJj9VhwwYiDPKy8G6NfEPK21AagiTMTlf/YGnhjOyJGIsuQkWzujUlFP29sKp4czZqZw5NYY71WBkGSxbf8PSBaMElsas/dxhS3MpvW/rX+CPgFBnOCQ9AXJFNmL4fQLML9UyseY49UBBgWi3FjPmbsHlEMhJcNHcO3DH4IjWdJBg2ZLLIRBt+NYXdAhEG/B5Ax0CUYz0gplbc8fgiNYys4IxBHJO1b/oEMiZadE706IrxmiRGYvuGBxRjMGknWUWX3GHIUprXihbybw1lHEvm6jzMJo1P5ftL7sHJUq+6E5lf9Jt4kg+Tu2hjl+c41Qt5KvLfX6PU7Zk+5sD1AMFBZK2ER0C0WHZnEeHQLSN6RIbTaPJodJ2e0wcSUcGHQJJB9Pj4Eg6Mp41cySlna1H3A6O5LT3hEOdTtrN9E4tve0z7a1a65lm+HqYYANIaiuqrbKqo6rLqoaqJqn6RVBtIKkXUL0gq+dRPS+r51A9J6tnUT0rq22otskq5kqXc6VjrnQ5VzrmSpdzpWOudDlXGuZKk3OlYa40OVcaZkOTs6FhNjQ5Gxpmwwauv/dwd3dYOnosnzYLoz6P3mU61o0owcukXAHlCilXQblKyjVQrpFyHZTrpNwA5QYpN0G5ScotUG6RchuU26TcAeUOKXdBuUvKPVDukXIflPukPADlASkPQXlIyiNQHpHyGJTHpDwB5QkpT0F5SsozUJ6R8hyU56S8AOUFKS9BeUnKK1BekfIalNekvAHlDSnaTxdBqxP5T+Bdj/TkTYwzI+k5/s4DuR7nXU+w+4Ntbw5RMQyzOCGpv37o7nJ+9AqDLB6T1K73f3SG6zN42xJoPalm7ug610d3xAtx1r/DIsnDSnShHKODZOs7zMiDhbPj9VtHdZA++i0fHaSPXsBHj1PZm/P0AoI5zVTUzBRgMzijuXyJeRo7waR2wbMBgh1e9Yko3rJPdRGqi1BdhOoiVBehugjVRaguQnURp6mLOHNCXUStb8ha6oPKnzO5cB2c8RauNqOprperxbjbIhhFGc+bw/CvcMGc39WouQt1tmDOj/NWZS8F0+VMKhtrP2C6gpHFWGXr02DhjOaS3fTeSHBGUSZmzG28weKMouzumvFkxRj33CW4FErj9ne7r4A0ckYRNwaq/SMQizNV3KviXhX3qrhXxb0q7lVxr4p7Vdyf1uK+7YSKex+Vu4/XsKxIvjoHLYJgNFBi2UrFYCDOyJKattbwdSPO6Efx6FefqqmpagJuNASjgWbnWBbuHwRziqMjLxfMnOF9x4ozmsvRrwj5uIBhRTvZ2zAXzmTLwpbXYjPao/mDyn/wppZgFCUxw+JZiMKZc2Q3WR66K8FooOywmYG+SDAnuxusnMbsNtjhVae6olBdjOpiAqqLUV2M6mJUF6O6GNXFnP4upvd/koFWT7cyAAA=',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '2'},
        3: {cateId: '3'},
        4: {cateId: '4'}
    },
    searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
    headers: {
        'User-Agent': 'PC_UA',
    },
    class_parse: '.nav-menu-items&&li:lt(5);a&&Text;a&&href;/(\\d+).html',
    lazy: `js:
        var html = JSON.parse(request(input).match(/r player_.*?=(.*?)</)[1]);
        var url = html.url;
        if (html.encrypt == "1") {
            url = unescape(url)
        } else if (html.encrypt == "2") {
            url = unescape(base64Decode(url))
        }
        if (/m3u8|mp4/.test(url)) {
            input = url
        } else {
            input
        }
    `,
}