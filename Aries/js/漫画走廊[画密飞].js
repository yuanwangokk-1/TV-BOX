/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 0,
  title: '[漫]漫画走廊',
  '类型': '漫画',
  lang: 'ds'
})
*/

var _0x5281 = ["\x66\x72\x6F\x6D\x43\x68\x61\x72\x43\x6F\x64\x65", "\x6C\x65\x6E\x67\x74\x68", "\x63\x68\x61\x72\x43\x6F\x64\x65\x41\x74", "\x61", "\x41", "\x63\x68\x61\x72\x41\x74", "", "\x6A\x6F\x69\x6E", "\x63", "\x3C\x64\x69\x76\x3E\x3C\x69\x6D\x67\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x61\x7A\x79\x22\x20\x64\x61\x74\x61\x2D\x6F\x72\x69\x67\x69\x6E\x61\x6C\x3D\x22", "\x22\x20\x73\x72\x63\x3D\x22", "\x22\x20\x73\x74\x79\x6C\x65\x3D\x22\x6D\x61\x78\x2D\x77\x69\x64\x74\x68\x3A\x38\x30\x25\x22\x3E\x3C\x2F\x64\x69\x76\x3E", "\x69\x6E\x6E\x65\x72\x48\x54\x4D\x4C", "\x64", "\x67\x65\x74\x45\x6C\x65\x6D\x65\x6E\x74\x42\x79\x49\x64", "\x3C\x69\x6D\x67\x20\x63\x6C\x61\x73\x73\x3D\x22\x6C\x61\x7A\x79\x22\x20\x64\x61\x74\x61\x2D\x6F\x72\x69\x67\x69\x6E\x61\x6C\x3D\x22", "\x22\x3E"];

function ee1(_0x601dx2, _0x601dx3, _0x601dx4) {
    return String[_0x5281[0]](((_0x601dx2 - _0x601dx3 + _0x601dx4) % (_0x601dx4 * 2)) + _0x601dx3)
}

function ee2(_0x601dx6) {
    var _0x601dx7 = [], _0x601dx8, _0x601dx9 = _0x601dx6[_0x5281[1]], _0x601dxa = _0x5281[3][_0x5281[2]](),
        _0x601dxb = _0x601dxa + 26, _0x601dxc = _0x5281[4][_0x5281[2]](), _0x601dxd = _0x601dxc + 26;
    while (_0x601dx9--) {
        _0x601dx8 = _0x601dx6[_0x5281[2]](_0x601dx9);
        if (_0x601dx8 >= _0x601dxa && _0x601dx8 < _0x601dxb) {
            _0x601dx7[_0x601dx9] = ee1(_0x601dx8, _0x601dxa, 13)
        } else {
            if (_0x601dx8 >= _0x601dxc && _0x601dx8 < _0x601dxd) {
                _0x601dx7[_0x601dx9] = ee1(_0x601dx8, _0x601dxc, 13)
            } else {
                _0x601dx7[_0x601dx9] = _0x601dx6[_0x5281[5]](_0x601dx9)
            }
        }
    }
    ;
    return _0x601dx7[_0x5281[7]](_0x5281[6])
}

function dd0(_0x601dxf, _0x601dx10) {
    try {
        var _0x601dx11 = ee2(_0x601dxf);
        var _0x601dx12 = atob(_0x601dx11);
        var _0x601dx13 = ee2(_0x601dx12);
        return _0x601dx13
    } catch (err) {
        return _0x601dx10
    }
}

globalThis._0x5281 = _0x5281;
globalThis.dd0 = dd0;
var rule = {
    类型: '漫画',//影视|听书|漫画|小说
    title: '[漫]漫画走廊',
    host: 'https://mhzl.fun',
    url: '/booklist?page=fypage&tag=fyfilter',
    searchUrl: '/search?keyword=**',
    searchable: 2,
    headers: {'User-Agent': PC_UA},
    quickSearch: 0,
    filterable: 1,
    class_name: '全部&韩国&日本&香港&台湾&亚洲&中国',
    class_url: '-1&11&12&13&14&15&16',
    filter_url: '{{fl.tag}}&area=fyclass&end={{fl.end}}',
    filter: 'H4sIAAAAAAAAA+2YzUoCURTH3+WuFZqsFi6jRYveIFwMNbTILOgDRARDtLEPG8OMUDTpQyMVhAgaU1/GuXd8i2a895yxTS/g2fk7/3POnTvMb2OKaRqLbqfYvpFkUXai77EQS+gHhgeOmRf9gcdnevzUmHUl/HKuPc22/XIA6ZDKCi2ezUEmATJ+fiXMvsoU4Fz+bvr4DnMSIFvfUnXvB+6y6qJTgl0SgnMsnqngOTPA7KnpVLuQScBnuGxPhjV4BgmY5b4mgwreeQaQiVbJ+R6oTAHO3b5Mn4swJwHnzH7wrhRgVm7wT9wpAXdaRaf3ATsl4Fy26zYzMCcBs1pjYtuQScCdN/e81tnkP7g3KGDPhS0KJn94neuaL0HfzuHxUVxPilHRqY5U498adEY2vDlRhnsipmN+h/wijcRu8EW646pjv/3/RYY13O+O6+5wqOpLwUV619y0VFnzT4uFmLZMGpAGpEGENCANSIMV0oA0IA1WSQPSgDRYIw1Ig4XXIEz/FJEGi65B+hdgksEKMhUAAA==',
    limit: 6,
    play_parse: true,
    lazy: $js.toString(() => {
        let _url = input;
        let html = request(_url);
        try {
            let conf = html.match(/var _conf =(.*?);/)[1];
            // log(conf);
            let json = JSON5.parse(conf);
            let imgs = json.a.map(it => urljoin(_url, dd0(it, json.c)));
            log(imgs);
            input = {url: 'pics://' + imgs.join('&&')};
        } catch (e) {
            input = {url: '', msg: e.message.toString()}
        }
    }),
    double: true,
    推荐: 'ul.mh-list;li;h2&&a&&Text;*;;*;.chapter&&Text',
    一级: '.box-body&&ul&&li;a&&title;.mh-cover&&style;;a&&href',
    二级: {
        title: '.info&&h1&&Text;.tip:eq(1)&&.block&&Text',
        img: '.banner_border_bg&&img&&src',
        desc: '.tip&&.block:eq(0)&&Text;.tip&&.block:eq(2)&&Text;.tip&&.block:eq(1)&&Text;;.info&&.subtitle:eq(1)&&Text;.tip&&.subtitle:eq(1)&&Text;',
        content: '.info&&.content&&Text',
        tabs: '',
        lists: 'ul#detail-list-select&&li',
    },
    搜索: '*',
}