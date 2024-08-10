var rule = {
    title: "看呀看",
    host: "https://kankan-tv.com",
    url: "/fyclass/fyfilter",
    searchUrl: "",
    searchable: 1,
    quickSearch: 0,
    filterable: 1,
    filter: "H4sIAAAAAAAAAO1WXU8aQRT9L/vY8DCD9QP/SuMDDzyQVkyqJWkMiUpEFmmRxtCixL7UrlpaMP0IsMKvYXflX3R1du89F+2LvtiEtz3nnp2ZM3vnzG5aq2v5bGbdWn6xab3MvLWWreDS9U72rYSVS69mEOfTr95kboW5kPbtLb9le8PLwN67KYbUM6uQMEXPdvziLlcYk6JyNh62QEGYFKUPk+Y5KAiT4qDqbzmgIEyKRiucGhSESXG65/VdUBCOFf72gb/VYAVjUuy0g0YdFIRJUaz4O0egIBwrgu3R5GjECsakKF+KPWVMikonGF6AgjApnLpwyxi+S3DoBoe/wy/Ln4YpcvS9el0+AUeESVH+NB7YoCBMq3Fr3m4PVkOYFMN64LbEagRVWLlRmr71Wl2vOuC+JXxv31JR9K3fdoLR+3jBBtDOfHEmzVK8JwbEtcnXpt/rRLUI0JgfT/1WOx7TAHrv87l3PIzfM4Dmq3X9/iiezwAas9GdnNOYBlDtZ5fHjACNufvH+1GMxzRA7GH/19gdwh7G+N49pKLYw6RKPo/I20fg55ifQz7JfBJ5zbxGXjGvgNcp4sNH4JeYX0J+kflF5BeYX0B+nvl55NmvRr+a/Wr0q9mvRr+a/Wr0q9mvRr+K/Sr0q9ivQr+K/Sr0q9ivQr+K/Sr0q9ivQr+K/Sr0q9ivQr+K/Sr0q9ivEn7VuL/v2e+iqk6lUjfdu5Kw1jOvH3OJ2c7kuHSnkcODMx44YTE+L4TpqPU6XI4AHm2qRQAiAd4zAI8v1wyASIDl1ETNpBW8SliGBigIQzyM3QZMQXgWErOQ+N9DIp8OQ2LjETkRuFfX9t2fBpMLoigoTItaV+gEJX8KhE5Q8sdCjoeUTAapQ0rmQxg5UjrFyqyQrpGaJcaTSYykOBEmN25PRDqXXU1vZNdyD786K2f+1bd//EeLoqBkC0sdUvJICJ2gpq5s1AlKHkU5L1JTF6IYD6lZkz+ZJp9diw+6Fgt/AWk+z+0CEgAA",
    filter_url: "{{fl.类型 or '*'}}/{{fl.地区 or '*'}}/{{fl.年份 or '*'}}?page=fypage",
    filter_def: {},
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 5000,
    class_parse: ".top-menu a;a&&Text;a&&href;/(\\w+)$",
    cate_exclude: "豆瓣",
    play_parse: true,
    lazy: $js.toString(() => {
        let m3u8 = /url:'(.*?)'/g.exec(fetch(input))[1];
        input = {parse: 0, url: m3u8};
    }),
    double: false,
    推荐: "body&&.module:eq(0);*;*;*;*;*",
    一级: ".video-frame;.title&&Text;img&&data-src;.label-remarks&&Text;a&&href",
    二级: {
        title: ".title&&Text;tr:eq(4)&&Text",
        img: ".lazyload&&data-original",
        //主要信息;年代;地区;演员;导演
        desc: "tr:eq(7)&&Text;tr:eq(6)&&Text;tr:eq(2)&&Text;tr:eq(0)&&Text;tr:eq(1)&&Text;tr:eq(0)&&Text",
        content: ".vod-story&&Text",
        tabs: "",
        lists: $js.toString(() => {
            LISTS = [];
            let list = pdfa(html, ".vod-playlist&&option");
            if (list.length == 0) {
                LISTS.push(["1$" + MY_URL + "/1"])
            } else {
                list = list.map(it => pdfh(it, 'Text') + "$" + pd(it, 'option&&value', MY_URL));
                LISTS.push(list)
            }
            // log(LISTS);
        }),
    },
    搜索: "*"
}