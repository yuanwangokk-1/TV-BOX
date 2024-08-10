var rule = {
    title: '美剧星球',
    host: 'https://www.kmeiju.cc',
    url: '/Show/fyfilter.html',
    searchUrl: '/Search/**----------fypage---.html',
    searchable: 2,
    quickSearch: 0,
    "filterable": 1,
    "filter": "H4sIAAAAAAAAA+2Xz08aQRTH/5c9e9hd/H20sWkTo5eaNGk4ePDU1lubNIYERRSoATStVqFSbQloRUGJwUXwn9mdhf+iu8z7MbbUkMhxb/P5vn0z+97Me7O7qhna9JtV7e3yJ21ac2tN5+izNqKtLL1fVvnj0rsPy70HVzzZiZe7sbIve2BokRGQU2W7lQd5nOW9vJMsgTxBspuoiVgc5EmWSzvObRPkKZLFWlZE93BJnSdPlngWg99FJL7ZVhJ1k/W7306rBrrJurvW7h62UQ9pkbBvkVmhNSArvOb/s0ITz8w8A8kfofpiZgFUf0Tq4twiyv4Q9YX5WZD9Earzs6+ez718DRakvpsB0HdHAPpuCwDZUpdu6wxtEvpuBAAlPZYS64dgA+i7sQBkWz9393bQJoHWK27xOQEYJPYH5wuA/DZ3uwen6CeBbBc3jlVBm4S+hweA/LLbIkq5lvDgcN3W7WZLOVzIgxwuUzdH8cz6Q0UPsR5SdZN1U9UN1g1V11nXFd2YIt2YUvVJ1idVfYL1CVUfZ31c1cdYH1N1jtdQ4zU4XkON1+B4DTVeg+M11HgNjtfvMuFIeEQzn9gheV0n1+LCU95TNC6dTBV1jkvsF7sFPJBKHsR5yW2nUee8iesqz2/qQRcLuljQxYIuRrrO8epqvDrHq6vx6hyvrsarc7y6Gq/O8XpD2T1DSvd8Ug/qRpNuKQoqANdmXGwUqDZ7gLbOxX2nmgAbAPntVkSqiH4SuPnGRaOBNgn0LoVr+zaL7yKB6qid7v7EdwEgm3XmXByhTQKtl7vqJC1cTwL5fSmIOtW7BL48GiKRsa1dr0egtypRHuonbjODeZBAc9TWO2vb6C1hiPUd1NNQ6ol1jtcbyjobHVadPVZLj907bqzSOcb6BKA502U3u4lzSiBb9sg9p/tRwiB3WSf7vZPGXzwAmvPHsZPDew5gkHtV5C3vzxH9JNB691muMIC+v5sAtF7VS1Md15Og2orXis0Dyuevtn2H3xsA5JcuOIkc+klAm21dORXsTQA0Zy4lDrDHAHBeas79PuWlB2SL39hN/L4BCO7/oF8NcP+bxrAak5sv2JbF3wDM6vXa+uomt5QbVvI/T/ieydO/nwN1sJ+T/j9Fna0zd+MG24QELttNJ3NFZdsDbpEnbv2EWmQPghILSmyQEhvztj8c+QN+mQHlzBUAAA==",
  "filter_url": "{{fl.类型}}---{{fl.剧情}}-----fypage---{{fl.年份}}",
  "filter_def": {
    "1": {
      "类型": "1"
    },
    "2": {
      "类型": "2"
    },
    "3": {
      "类型": "3"
    },
    "4": {
      "类型": "4"
    },
    "21": {
      "类型": "21"
    },
    "25": {
      "类型": "25"
    }
  },
    headers: {
        'User-Agent': 'MOBILE_UA',
    },
    timeout: 5000,
    class_parse: '.navbar-nav&&li;a&&Text;a&&href;(\\d+)',
    cate_exclude: '',
    play_parse: true,
    lazy: $js.toString(() => {
        function getrandom(str) {
            let string = str.substring(8, str.length);
            let substr = atob(string);
            return decodeURIComponent(substr.substring(8, substr.length - 8))
        }

        var src = jsp.pdfh(request(input), 'iframe&&src')
        log(src)
        var pconfig = jsp.pdfh(request(HOST + src), 'body&&script,0&&Html').match(/config = {[\s\S]*?}/)[0];
        log(pconfig)
        var config = {};
        eval(pconfig);
        var purl = config.url
        log(purl)
        input = {parse: 0, url: purl, js: 0};
    }),
    double: true,
    推荐: '*',
    一级: 'body&&.col-sm-3;h6&&a&&Text;img&&data-original;.text-truncate&&Text;a&&href',
    二级: {
        title: 'h1&&Text;.info.info-tags&&Text',
        img: 'img&&data-original',
        desc: '.excerpt-remark&&Text;.excerpt-year&&Text;.excerpt-area&&Text;.info.info-stars&&Text;.info.info-directed&&Text',
        content: '.info-content&&Text',
        tabs: '.swiper-wrapper a',
        lists: '#playsx:eq(#id)&&a',
        list_text: 'body&&Text',
        list_url: 'a&&href'
    },
    搜索: '*',
}