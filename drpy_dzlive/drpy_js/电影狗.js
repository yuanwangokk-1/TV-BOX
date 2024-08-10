var rule = {
    模板: "mxpro",
    title: "电影狗",
    host: "https://www.dydog.vip",
    url: "/vodshow/fyclassfyfilter",
    searchUrl: "/vodsearch/page/fypage/wd/**/",
    searchable: 2,
    quickSearch: 0,
    filterable: 1,
    filter: "H4sIAAAAAAAAA+2WWU8TURiG/8tcY3oGF8A7QVwQd9zjRcUmNgJNaK0hhkRZamlUFoG6VLnABQhIUdJAseHP9My0/8LOOaXfMsRQ05iQnMt5n7dzvnlnPnifWf2ReDhknbz3zHocGrJOWnLiuzM6bjVZA8H+EL6OB/ueaOOAJ48vlUeXPLlyEYhHHkYfRZ4G1M0C1nCTNrnJjepvPVNvXzAaDWgNPHLyS2mRebSGPKmlYiHDPEoDT/H3N3cqQT1aA48zsurOT1OP1tDMqXW3sMJmVhp4StnXTvId9WgNzfwmISd/spmVhjzzmUq8zKM05Pn6Um7vMI/SkOdHTubXmEdp4Cl/mnHefaUeraH71N41uo/SkCcxU36/zDxKQxnmV2RhjmWoNPJO3Vn+XEpD7zSfdyfYWVpD73T+pXw1z96p0tBZ47niDvNoreK577mq3/72ZnGngL79vet/+PabRfOxqmUoFBwMeNeEHmX0KKHNjDYTajNqEyoYFZjabZTabYS2MtpKaAujLYSeYPQEoccZPU4oy8omWdksK5tkZbOsbJKVzbKySVY2y8omWQmWlSBZCZaVIFkJlpUgWQmWlSBZCZaVIFkJlpUgWQmWlSBZCZaVIFkJlpUgWQmWlUBZtQm1K4vYsaeBq3UfV6vP1bKPq8XnIjutPPtu9FraWX+NNnrvmm10Tf7LRp+q8r5QLBYaDJwC0k5JO5AOSjqAnKbkNJBOSjqBnKHkDJCzlJwFco6Sc0DOU3IeSBclXUAuUHIBSDcl3UAuUnIRyCVKLgG5TMllIFcouQLkKiVXgVyj5BqQ65RcB9JDSQ+QG5TcAHKTkptAblFyC8htSm4DuUPJHSB3KbkLRBxpo6wi0I1w3szI/CRsRO2aboSTzpXTmwC9vXgwFIiFKz9C/56d7KzP8ygci0JVWh+TyYTPE+2NDIa8ue43WbF4o+pnLN747nmQzlgeLcitEdatlFZf16sUyGJ+gp2ltPo62oG63gH6qVuY9s2stTr76QE6o0xtyN0074OeVl83l3MJXzfXGsr5xZTznHdGpaGzlndLuRQ7S2n4uTLOp2n+XJ5WX4etzFfc+uCbuaKheWYXnE2Ws9b+c8/FS2ZKrim5puQe6pKL19k0XNNwTcNtfMONBwfDodhQo2pu9Xaoz2xtOcna4dU+ozTwlMY25OSi+/05tdVk1B4XfhW3p1h7VBo6cXTcGVtgJyqtvsZSevFKZvJsJKWh+2QWvMLEJ6/JaKqpz+4q7+pKw39SV92PrNdpDU01kXcy62wqpSHPj91SNsk8SkOTf0w579nTaQ31w8Lb0gjr4VpDM2en5dgum1lp6NnTOZllHVJrdXbR/9EhfV+wKZKmSJoieaiLpG+nTZs0bdK0yca3yY5If7i3UV1S3cw0SdMkD2mTZN+v6ZGmR5oeeah7JNto0yJNizQtstEtcvgPfoUtf/kpAAA=",
    filter_url: "{{fl.排序}}{{fl.剧情}}{{fl.字母}}/page/fypage/{{fl.年份}}",
    headers: {
        "User-Agent": "MOBILE_UA"
    },
    timeout: 5000,
    class_parse: ".navbar-items&&li:lt(6);a&&Text;a&&href;.*/(.*?)/",
    cate_exclude: "",
    play_parse: true,
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: true
}