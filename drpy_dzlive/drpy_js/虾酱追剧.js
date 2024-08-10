var rule = {
    模板: 'mxpro',
    title: '虾酱追剧',
    host: 'https://www.xiajiangzj.top',
    url: '/index.php/vod/show/id/fyclassfyfilter.html',
    filterable: 1,
    filter_url: '{{fl.area}}{{fl.by}}{{fl.class}}{{fl.lang}}/page/fypage',
    filter: 'H4sIAAAAAAAAA+2Y3U4aQRTH32WvTUg/LlpfpfGCGtKaWpsU28QYExRBoJavIGhB0SqK1gVBSnEp8DI7s8tbdOEMZ5ezJC6Nl3O5v/3vzJkzM/85s5vKM2XxzabyIbChLCosfsXDEWVBWfN/DDifv/pXvwTGwrURjlSH4eoIWw/K1oKg+ZKlF9S3vOoPBn2CTSRGrCHasyWCTSR8O81D+WmJYNhRoqr3SqQjYNjRVYY9dElHwLAVHJujFWAYS+xQ1+IkFmATialesv2baYlgGEuibvSIRDDHiIxc1zWiEUNJZc81IsEwXPVS75+ScIFhK9Hs8OiatAIMWzm5scZIWgE2xxzxnVsjnyESYCgJJ/jODyIBhqnrplikQ1IHbCIZHmf5YWVaIhh2lN8z4xrpCBjmpV8zcr9Zr0FSgxiFqQvznK4aYChJRlmqSSTAcNUM0tb0klUDzJ6pEj/O0JkaM5TsDoxfZOiCYQJ7GaNbmjW0qTdbS6MPwAPMumpWQ7YH4LMnDyj2LP2kp1X/2jufQDj0bw2qEAhjbl5QhUA454Ue+16gIpuirnztEgHCpVGoUIVAqLg/cCkA2Wvnj2vMgFARabNaeFoByJl4nswyLWUnHp+nE88L7WGhZb8cNfl2w7e+Yn006VDXNH6Xc2ner6wH7Ymo77JY1KUJLn/6HBjFtbSgPH+yo+HxXePBa2Fbs+02C6dmbXjxZo7ziNXaTFOJBNh87v3YeeTBvT2cRx6cxYNj6g9nLmcRzLbmCD+qU2seM4zlIOo6JgRzmI9rAgRz7Ay9S04SwaQnSU+a4UkvnsqThqG4cRUiPgLMuQ12y+5tYDGMuDYw72LkJAeGrWRVniDHtGD2lEd4h+xawex1c68/pEm4wHCR9pPDcxKuYCjRbljthEiAYSzFprtaAoat5Mq8RatrYNhKp8NjKV3LuuqcqTeYxtZPy6VIGoFhi40dc3uftAVMWoW0ihlW8fKprMKDD3i4cBph1TwjhiMYdpSsGuko6QgYStInxi29WAGb45Jnpo/NJKm2BMOOTs9YkdRGgs1R+PCS5r5NApvjMuShOGR3VrJbJBZgTknl3i2xGM7RRV//S+6kgtlFWJnFirQIGzN7/TaZSrxaMOyomOBHxGUFs7PbYIMCze6YyfJJeuJ/Xuleyd998nef/N0nf/fJs0GeDeRseC0LZlkwy4JZmqI0RWGKW/8AiqgzpyAfAAA=',
    searchUrl: '/vod/search//page/fypage/wd/**.html',
    class_parse: '.navbar-items li:gt(1):lt(8);a&&Text;a&&href;/(\\d+).html',
}