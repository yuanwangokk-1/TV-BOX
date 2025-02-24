const baseParse = _ => {
    addListener('onClose', $.toString(() => {
        clearItem('maofly.true_url')
        clearItem('maofly.tab_params')
        clearItem('maofly.fold')
    }))
    let d = [];
    let [base_url, page] = MY_URL.split('###')
    page = parseInt(page)
    const empty = 'hiker://empty'
    const url = getItem('maofly.true_url', base_url.replace('.html', ''))
    const fold = getItem('maofly.fold', '1')
    const tab_params_json = getItem('maofly.tab_params', JSON.stringify([0, 0, 0, 0, 0, 0]))
    const tab_params = JSON.parse(tab_params_json)

    const html = fetch(url + '-page-' + page + '.html', {headers: {'User-Agent': PC_UA}})

    if (page === 1) {
        d.push({
            title: fold === '1' ? '折叠' : '展开',
            url: $(empty).lazyRule((fold) => {
                setItem('maofly.fold', fold === '1' ? '0' : '1')
                refreshPage(true)
                return 'hiker://empty'
            }, fold),
            col_type: 'scroll_button',
        }, fold)
        d.push({
            title: '重置筛选',
            url: $(empty).lazyRule(() => {
                clearItem('maofly.true_url')
                clearItem('maofly.tab_params')
                refreshPage(true)
                return 'hiker://empty'
            }),
            col_type: 'scroll_button',
        })
        d.push({
            col_type: 'blank_block',
        })

        if (fold === '1') {
            const tab_list = pdfa(html, '.search_div&&.mt-4')

            tab_list.forEach((item, row_index) => {
                let row = pdfa(item, '.row&&a')
                let tab_params_index = tab_params[row_index]
                row.forEach((tab, col_index) => {
                    let title = pdfh(tab, 'a&&Text')
                    d.push({
                        title: tab_params_index === col_index + 1 ? '‘‘’’<strong><font color="red">' + title + '</font></strong>' : title,
                        url: $(pdfh(tab, 'a&&href')).lazyRule((row_string, col_string, tab_params) => {
                            tab_params[parseInt(row_string)] = parseInt(col_string) + 1
                            setItem('maofly.true_url', input.replace('.html', ''))
                            setItem('maofly.tab_params', JSON.stringify(tab_params))
                            refreshPage(false)
                            return 'hiker://empty'
                        }, row_index.toString(), col_index.toString(), tab_params),
                        col_type: 'scroll_button',
                    })
                })
                d.push({
                    col_type: 'blank_block',
                })
            })
        }
    }

    const content = pdfa(html, '.comic-main-section&&.comic-book-unit')
    content.forEach(item => {
        d.push({
            title: pdfh(item, 'h2&&a&&Text'),
            url: pdfh(item, 'h2&&a&&href') + '#immersiveTheme#',
            desc: pdfh(item, '.list-inline&&Text'),
            pic_url: pdfh(item, '.comic-book-cover&&src'),
            col_type: 'movie_3',
        })
    })

    setResult(d);
}

const secParse = _ => {
    addListener('onClose', $.toString(() => {
        clearItem('maofly.sort')
    }))
    let d = [];
    const empty = 'hiker://empty'
    const html = getResCode()
    const sort = getItem('maofly.sort', '1')
    const comic_info = pdfh(html, '.comic-meta-data-table&&Html')
    const info_title = pdfh(html, 'h1&&Text')
    const info_pic = pdfh(comic_info, 'img&&src')

    d.push({
        title: info_title,
        url: MY_URL,
        desc: pdfh(html, '.comic_story&&Text'),
        pic_url: info_pic,
        col_type: 'movie_1_vertical_pic_blur',
    })
    d.push({
        col_type: 'line_blank',
    })

    const list = pdfa(html, '#comic-book-list&&.tab-pane')
    list.forEach(item => {
        let title = pdfh(item, '.comic_version_title&&Text')
        let select_arr = pdfa(item, 'ol&&li')
        if (sort === '1') select_arr = select_arr.reverse()
        const download_arr = select_arr.map(item => {
            return {
                url: pdfh(item, 'a&&href'),
                title: pdfh(item, 'a&&Text'),
            }
        })
        d.push({
            title: title,
            url: empty,
            col_type: 'text_1',
        })
        d.push({
            col_type: 'line',
        })
        d.push({
            title: sort === '1' ? '倒序' : '正序',
            url: $(empty).lazyRule((sort) => {
                setItem('maofly.sort', sort === '1' ? '0' : '1')
                refreshPage(false)
                return 'hiker://empty'
            }, sort),
            col_type: 'text_2',
        })
        d.push({
            title: '下载',
            url: "hiker://page/download.view#noHistory##noRecordHistory##noRefresh#?rule=本地资源管理",
            extra: {
                chapterList: download_arr,
                info: {
                    bookName: info_title,
                    ruleName: MY_RULE.title,
                    bookTopPic: info_pic,
                    parseCode: $.toString(() => {
                        const LZString = function () {
                            function o(o, r) {
                                if (!t[o]) {
                                    t[o] = {};
                                    for (var n = 0; n < o.length; n++) t[o][o.charAt(n)] = n
                                }
                                return t[o][r]
                            }

                            var r = String.fromCharCode,
                                n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                                e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = {
                                    compressToBase64: function (o) {
                                        if (null == o) return "";
                                        var r = i._compress(o, 6, function (o) {
                                            return n.charAt(o)
                                        });
                                        switch (r.length % 4) {
                                            default:
                                            case 0:
                                                return r;
                                            case 1:
                                                return r + "===";
                                            case 2:
                                                return r + "==";
                                            case 3:
                                                return r + "="
                                        }
                                    }, decompressFromBase64: function (r) {
                                        return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
                                            return o(n, r.charAt(e))
                                        })
                                    }, compressToUTF16: function (o) {
                                        return null == o ? "" : i._compress(o, 15, function (o) {
                                            return r(o + 32)
                                        }) + " "
                                    }, decompressFromUTF16: function (o) {
                                        return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
                                            return o.charCodeAt(r) - 32
                                        })
                                    }, compressToUint8Array: function (o) {
                                        for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
                                            var s = r.charCodeAt(e);
                                            n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256
                                        }
                                        return n
                                    }, decompressFromUint8Array: function (o) {
                                        if (null === o || void 0 === o) return i.decompress(o);
                                        for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) n[e] = 256 * o[2 * e] + o[2 * e + 1];
                                        var s = [];
                                        return n.forEach(function (o) {
                                            s.push(r(o))
                                        }), i.decompress(s.join(""))
                                    }, compressToEncodedURIComponent: function (o) {
                                        return null == o ? "" : i._compress(o, 6, function (o) {
                                            return e.charAt(o)
                                        })
                                    }, decompressFromEncodedURIComponent: function (r) {
                                        return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
                                            return o(e, r.charAt(n))
                                        }))
                                    }, compress: function (o) {
                                        return i._compress(o, 16, function (o) {
                                            return r(o)
                                        })
                                    }, _compress: function (o, r, n) {
                                        if (null == o) return "";
                                        var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [],
                                            m = 0, v = 0;
                                        for (i = 0; i < o.length; i += 1) if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else {
                                            if (Object.prototype.hasOwnProperty.call(p, a)) {
                                                if (a.charCodeAt(0) < 256) {
                                                    for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                                                    for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                                } else {
                                                    for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                                                    for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                                }
                                                l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
                                            } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                            l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u)
                                        }
                                        if ("" !== a) {
                                            if (Object.prototype.hasOwnProperty.call(p, a)) {
                                                if (a.charCodeAt(0) < 256) {
                                                    for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                                                    for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                                } else {
                                                    for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                                                    for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                                }
                                                l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
                                            } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                            l--, 0 == l && (l = Math.pow(2, h), h++)
                                        }
                                        for (t = 2, e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                        for (; ;) {
                                            if (m <<= 1, v == r - 1) {
                                                d.push(n(m));
                                                break
                                            }
                                            v++
                                        }
                                        return d.join("")
                                    }, decompress: function (o) {
                                        return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
                                            return o.charCodeAt(r)
                                        })
                                    }, _decompress: function (o, n, e) {
                                        var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [],
                                            A = {val: e(0), position: n, index: 1};
                                        for (i = 0; 3 > i; i += 1) f[i] = i;
                                        for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                        switch (t = p) {
                                            case 0:
                                                for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                l = r(p);
                                                break;
                                            case 1:
                                                for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                l = r(p);
                                                break;
                                            case 2:
                                                return ""
                                        }
                                        for (f[3] = l, s = l, w.push(l); ;) {
                                            if (A.index > o) return "";
                                            for (p = 0, c = Math.pow(2, m), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                            switch (l = p) {
                                                case 0:
                                                    for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                    f[d++] = r(p), l = d - 1, h--;
                                                    break;
                                                case 1:
                                                    for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                    f[d++] = r(p), l = d - 1, h--;
                                                    break;
                                                case 2:
                                                    return w.join("")
                                            }
                                            if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else {
                                                if (l !== d) return null;
                                                v = s + s.charAt(0)
                                            }
                                            w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++)
                                        }
                                    }
                                };
                            return i
                        }();
                        "function" == typeof define && define.amd ? define(function () {
                            return LZString
                        }) : "undefined" != typeof module && null != module && (module.exports = LZString);
                        const html = fetch(input, {headers: {'User-Agent': PC_UA}})
                        const img_data = html.match(/let img_data = "(.*?)"/)[1]
                        const img_data_arr = LZString.decompressFromBase64(img_data).split(',').map(item => 'https://mao.mhtupian.com/uploads/' + item)
                        return 'pics://' + img_data_arr.join('&&')
                    })
                },
                defaultView: "1"
            },
            col_type: 'text_2',
        })
        select_arr.forEach(sel => {
            d.push({
                title: pdfh(sel, 'a&&Text'),
                url: $(pdfh(sel, 'a&&href')).lazyRule(() => {
                    const LZString = function () {
                        function o(o, r) {
                            if (!t[o]) {
                                t[o] = {};
                                for (var n = 0; n < o.length; n++) t[o][o.charAt(n)] = n
                            }
                            return t[o][r]
                        }

                        var r = String.fromCharCode,
                            n = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
                            e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", t = {}, i = {
                                compressToBase64: function (o) {
                                    if (null == o) return "";
                                    var r = i._compress(o, 6, function (o) {
                                        return n.charAt(o)
                                    });
                                    switch (r.length % 4) {
                                        default:
                                        case 0:
                                            return r;
                                        case 1:
                                            return r + "===";
                                        case 2:
                                            return r + "==";
                                        case 3:
                                            return r + "="
                                    }
                                }, decompressFromBase64: function (r) {
                                    return null == r ? "" : "" == r ? null : i._decompress(r.length, 32, function (e) {
                                        return o(n, r.charAt(e))
                                    })
                                }, compressToUTF16: function (o) {
                                    return null == o ? "" : i._compress(o, 15, function (o) {
                                        return r(o + 32)
                                    }) + " "
                                }, decompressFromUTF16: function (o) {
                                    return null == o ? "" : "" == o ? null : i._decompress(o.length, 16384, function (r) {
                                        return o.charCodeAt(r) - 32
                                    })
                                }, compressToUint8Array: function (o) {
                                    for (var r = i.compress(o), n = new Uint8Array(2 * r.length), e = 0, t = r.length; t > e; e++) {
                                        var s = r.charCodeAt(e);
                                        n[2 * e] = s >>> 8, n[2 * e + 1] = s % 256
                                    }
                                    return n
                                }, decompressFromUint8Array: function (o) {
                                    if (null === o || void 0 === o) return i.decompress(o);
                                    for (var n = new Array(o.length / 2), e = 0, t = n.length; t > e; e++) n[e] = 256 * o[2 * e] + o[2 * e + 1];
                                    var s = [];
                                    return n.forEach(function (o) {
                                        s.push(r(o))
                                    }), i.decompress(s.join(""))
                                }, compressToEncodedURIComponent: function (o) {
                                    return null == o ? "" : i._compress(o, 6, function (o) {
                                        return e.charAt(o)
                                    })
                                }, decompressFromEncodedURIComponent: function (r) {
                                    return null == r ? "" : "" == r ? null : (r = r.replace(/ /g, "+"), i._decompress(r.length, 32, function (n) {
                                        return o(e, r.charAt(n))
                                    }))
                                }, compress: function (o) {
                                    return i._compress(o, 16, function (o) {
                                        return r(o)
                                    })
                                }, _compress: function (o, r, n) {
                                    if (null == o) return "";
                                    var e, t, i, s = {}, p = {}, u = "", c = "", a = "", l = 2, f = 3, h = 2, d = [], m = 0,
                                        v = 0;
                                    for (i = 0; i < o.length; i += 1) if (u = o.charAt(i), Object.prototype.hasOwnProperty.call(s, u) || (s[u] = f++, p[u] = !0), c = a + u, Object.prototype.hasOwnProperty.call(s, c)) a = c; else {
                                        if (Object.prototype.hasOwnProperty.call(p, a)) {
                                            if (a.charCodeAt(0) < 256) {
                                                for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                                                for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                            } else {
                                                for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                                                for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                            }
                                            l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
                                        } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                        l--, 0 == l && (l = Math.pow(2, h), h++), s[c] = f++, a = String(u)
                                    }
                                    if ("" !== a) {
                                        if (Object.prototype.hasOwnProperty.call(p, a)) {
                                            if (a.charCodeAt(0) < 256) {
                                                for (e = 0; h > e; e++) m <<= 1, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++;
                                                for (t = a.charCodeAt(0), e = 0; 8 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                            } else {
                                                for (t = 1, e = 0; h > e; e++) m = m << 1 | t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t = 0;
                                                for (t = a.charCodeAt(0), e = 0; 16 > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1
                                            }
                                            l--, 0 == l && (l = Math.pow(2, h), h++), delete p[a]
                                        } else for (t = s[a], e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                        l--, 0 == l && (l = Math.pow(2, h), h++)
                                    }
                                    for (t = 2, e = 0; h > e; e++) m = m << 1 | 1 & t, v == r - 1 ? (v = 0, d.push(n(m)), m = 0) : v++, t >>= 1;
                                    for (; ;) {
                                        if (m <<= 1, v == r - 1) {
                                            d.push(n(m));
                                            break
                                        }
                                        v++
                                    }
                                    return d.join("")
                                }, decompress: function (o) {
                                    return null == o ? "" : "" == o ? null : i._decompress(o.length, 32768, function (r) {
                                        return o.charCodeAt(r)
                                    })
                                }, _decompress: function (o, n, e) {
                                    var t, i, s, p, u, c, a, l, f = [], h = 4, d = 4, m = 3, v = "", w = [],
                                        A = {val: e(0), position: n, index: 1};
                                    for (i = 0; 3 > i; i += 1) f[i] = i;
                                    for (p = 0, c = Math.pow(2, 2), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                    switch (t = p) {
                                        case 0:
                                            for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                            l = r(p);
                                            break;
                                        case 1:
                                            for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                            l = r(p);
                                            break;
                                        case 2:
                                            return ""
                                    }
                                    for (f[3] = l, s = l, w.push(l); ;) {
                                        if (A.index > o) return "";
                                        for (p = 0, c = Math.pow(2, m), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                        switch (l = p) {
                                            case 0:
                                                for (p = 0, c = Math.pow(2, 8), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                f[d++] = r(p), l = d - 1, h--;
                                                break;
                                            case 1:
                                                for (p = 0, c = Math.pow(2, 16), a = 1; a != c;) u = A.val & A.position, A.position >>= 1, 0 == A.position && (A.position = n, A.val = e(A.index++)), p |= (u > 0 ? 1 : 0) * a, a <<= 1;
                                                f[d++] = r(p), l = d - 1, h--;
                                                break;
                                            case 2:
                                                return w.join("")
                                        }
                                        if (0 == h && (h = Math.pow(2, m), m++), f[l]) v = f[l]; else {
                                            if (l !== d) return null;
                                            v = s + s.charAt(0)
                                        }
                                        w.push(v), f[d++] = s + v.charAt(0), h--, s = v, 0 == h && (h = Math.pow(2, m), m++)
                                    }
                                }
                            };
                        return i
                    }();
                    "function" == typeof define && define.amd ? define(function () {
                        return LZString
                    }) : "undefined" != typeof module && null != module && (module.exports = LZString);
                    const html = fetch(input, {headers: {'User-Agent': PC_UA}})
                    const img_data = html.match(/let img_data = "(.*?)"/)[1]
                    const img_data_arr = LZString.decompressFromBase64(img_data).split(',').map(item => 'https://mao.mhtupian.com/uploads/' + item)
                    return 'pics://' + img_data_arr.join('&&')
                }),
                col_type: 'text_4',
            })
        })
        d.push({
            col_type: 'line_blank',
        })
    })

    setResult(d);
}
