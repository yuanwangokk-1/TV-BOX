import * as cheerio from 'cheerio';

export function joinUrl(base, url) {
    base = base || '';
    url = url || '';
    let baseU = new Uri(base.trim().rstrip('/'));
    url = url.trim().rstrip('/');
    let u = undefined;
    if (url.startsWith('http://') || url.startsWith('https://')) {
        u = new Uri(url);
    } else if (url.startsWith('://')) {
        u = new Uri(baseU.protocol() + url);
    } else if (url.startsWith('//')) {
        u = new Uri(baseU.protocol() + ':' + url);
    } else {
        u = new Uri(baseU.protocol() + '://' + baseU.host() + (baseU.port() ? ':' + baseU.port() : '') + '/' + url);
    }
    if ((!u.path() || u.path().trim().length === 0) && baseU.path())
        u.path(baseU.path());
    if (!u.query() && baseU.query())
        u.query(baseU.query());
    return u.toString();
}

const DOM_CHECK_ATTR = /(url|src|href|-original|-src|-play|-url|style)$/;
const SELECT_REGEX = /:eq|:lt|:gt|#/g;
const SELECT_REGEX_A = /:eq|:lt|:gt/g;

export function pdfh(html, parse, base_url) {
    if (!parse || !parse.trim()) {
        return ''
    }
    let eleFind = typeof html === 'object';
    let option = undefined;
    if (eleFind && parse.startsWith('body&&')) {
        parse = parse.substr(6);
        if (parse.indexOf('&&') < 0) {
            option = parse.trim();
            parse = '*=*';
        }
    }
    if (parse.indexOf('&&') > -1) {
        let sp = parse.split('&&');
        option = sp[sp.length - 1];
        sp.splice(sp.length - 1);
        if (sp.length > 1) {
            for (let i in sp) {
                if (!SELECT_REGEX.test(sp[i])) {
                    sp[i] = sp[i] + ':eq(0)';
                }
            }
        } else {
            if (!SELECT_REGEX.test(sp[0])) {
                sp[0] = sp[0] + ':eq(0)';
            }
        }
        parse = sp.join(' ');
    }
    let result = '';
    const $ = eleFind ? html.rr : cheerio.load(html);
    let ret = eleFind ? ((parse === '*=*' || $(html.ele).is(parse)) ? html.ele : $(html.ele).find(parse)) : $(parse);
    if (option) {
        if (option === 'Text') {
            result = $(ret).text();
        }
        else if (option === 'Html') {
            result = $(ret).html();
        }
        else {
            result = $(ret).attr(option);
        }
        if (result && base_url && DOM_CHECK_ATTR.test(option)) {
            if (/http/.test(result)) {
                result = result.substr(result.indexOf('http'));
            } else {
                result = joinUrl(base_url, result)
            }
        }
    } else {
        result = $(ret).toString();
    }
    return result;
}

export function pdfa(html, parse) {
    if (!parse || !parse.trim()) {
        return [];
    }
    let eleFind = typeof html === 'object';
    if (parse.indexOf('&&') > -1) {
        let sp = parse.split('&&');
        for (let i in sp) {
            if (!SELECT_REGEX_A.test(sp[i]) && i < sp.length - 1) {
                sp[i] = sp[i] + ':eq(0)';
            }
        }
        parse = sp.join(' ');
    }
    const $ = eleFind ? html.rr : cheerio.load(html);
    let ret = eleFind ? ($(html.ele).is(parse) ? html.ele : $(html.ele).find(parse)) : $(parse);
    let result = [];
    if (ret) {
        ret.each(function (idx, ele) {
            result.push({ rr: $, ele: ele });
        });
    }
    return result;
}

export function pd(html,parse,uri){
        let ret = pdfh(html,parse);
        if(typeof(uri)==='undefined'||!uri){
            uri = '';
        }
        if(DOM_CHECK_ATTR.test(parse)){
            if(/http/.test(ret)){
                ret = ret.substr(ret.indexOf('http'));
            }else{
                ret = joinUrl(MY_URL,ret)
            }
        }
        return ret
}