var rule = {
    模板: "mxpro",
    title: "咖啡影视",
    host: "https://cdnbeijin-aliyun-ys1.cfys.xyz",
    url: "/vodshow/fyclassfyfilter.html",
    filterable: 1,
    filter: "H4sIAAAAAAAAAO2Z208bRxTG/xc/U2lNmkvzlvv9fk+Vh6hCatQ2lZq0UhUhAcaOIYANIjiuza3hForBXEphqeGf8eza/0XXnnO+c1w1K0uhedo3/76zszPfzC7zMfsq1unETn79KvZd16+xkzEzsOglkrGO2POnP3Rp/uXp9z93NS983pCTS/XEUkMOINbdYVWvN+v1TJBKwDUzuFStFKlGwDV/cdTs7lGNAO0wAAH0l35XdQe4Pwtcq5UWzNAy1QjQ3+CaX+EaAfqbKAa9cH8W0C69LmMhUP788T3x1wDU5l+LPwJ4KC1U92fYgwW0S43V8x+4nQW0m1oOHHM7C+2sg9e34k+Mcs0CaolBr+83rlmA972MSe6wdwtcq0+Oee/mqUaAe068rg24fE8L8Le/6o//aSrrbBGMKzJztfdYfQuojaRMZoNrFrD6B9lgDXj1LcisFr3JUcxqE1DrP/D/YCcEmIHKqL9XbBlwi9T9pHElvUbFshly1WvE3M5rZOYW6/kUD8ICpnoh7+2s8VRbkMkqe7v7mKwmYPD7I6ZQ4WFbwBJtvpUaASbyzbrUCNAuN+8VV7idBYxz+oO0I5Bl/0tqBDKWsh5LuaXdcNm4C9zOAtr1Z4KZMml+W4ThZP7Az5T8gTybAcsrPOO9OQia4S1mxhXJ7eoev1gEetlra6XaUo8sO7itZS9Uguv55hbUMkiNAEu7MSc1AixDrmKGc1IWVgulyhbUAkuNQD00qmZBLbByYkFNoVlNyBQ2oOXN2d2q7lXUm8PczhR2Op1fktb8qfQjoh/ReqfonVqPix7XuiO6o/T4V9CDn0o/IfoJrR8X/bjWj4l+TOtHRT+qdfEb137j4jeu/cbFb1z7jYvfuPYbF79x7dcRv47264hfR/t1xK+j/Tri19F+HfHraL+O+HW0X0f8OtqvI34d7dcRv47264jf4GfLg1nKeWvD6sFk/teDCVk/mKdIOAXlNCmnoZwh5QyUs6SchXKOlHNQzpNyHsoFUi5AuUjKRSiXSLkE5TIpl6FcIeUKlKukXIVyjZRrUK6Tch3KDVJuQLlJyk0ot0i5BeU2Kbeh3CHlDpS7pNyFco+Ue1Duk3IfygNSHkB5SMpDKI9IeQTlMSmPoThf8DvQ+KUfFW9kzLgZeVTArY+Kl9uu57akGEgvnwUNuIOq63rl8Zb6t89evpBNYa3fpFMt9Rff/PhTV2MsTzpiwd+tQ8r1YSksLIPbKGh6t02CB9gitZO5zeq2cbGXWGgrx4f8vxGWx8P+3whLnGH5uLo7K4mTQDJ30stzoCNAf29TkvEJVBqVOSNoN6Z8WjpNJYPrEZ+b0E5yDUugYWkxLGWGpcXQ5DpRDsKdmZzlpuBPzdlRQoySXpT0oqQXJb0o6X2+pNd5WEmv3jPgL/bw33oLOqn0T6ukEgAGuHpQK6d597GAdmMlb5DP1Ahk/0h6O5yaCGTf2azuZrHvNEGFifp7HgsBau6yWZ3imgX0V9hQp5EW0G582tvCKbQFtNvZ8dKZqjsmp4otEuZh6/cg+/E8WMA91vtqvUPc2sJnSWVBdglSCobdBLWBB1u6bOANQG1lMZharlmIskyUZfhnlGWiLBNlmViUZQ41yxw5tK/RIXkl7IuznyjVZjkDEeCeI0t+lg84CFDLTvkr+LJqQbbnj3/JrWUnayN8gkaAe87MmgL2JAu4Z8gJl1d01ddhC+gv5Nto2GmeKQfTtMX9WdC1+U1VCwDzObdf/Zu/KhOg3ci0SRe4nQV5kDZMifMfAe5ZGPTynOMIZF7WzUEO89IEtY//jydjhUrVxTGmBRUuPn6K9V85q80BRxksymBRBosyWJTBogx2SBms+x8YQNSAEygAAA==",
    filter_url: "{{fl.类型}}-{{fl.地区}}-{{fl.排序}}-{{fl.剧情}}-{{fl.语言}}-{{fl.字母}}---fypage---{{fl.年份}}",
    timeout: 5000,
    class_parse: ".navbar-items li;a&&Text;a&&href;/(\\d+).html",
    lazy: $js.toString(() => {
        input = {parse: 1, url: input, js: ''};
    }),
    double: false,
    推荐: "a.module-poster-item.module-item;.module-poster-item-title&&Text;.lazyload&&data-original;.module-item-note&&Text;a&&href",
    一级: "a.module-poster-item.module-item;a&&title;.lazyload&&data-original;.module-item-note&&Text;a&&href"
}