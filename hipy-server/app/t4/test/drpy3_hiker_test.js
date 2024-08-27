js:
//加了 _pdfh，_pd，_pdfa，_pdfl，joinUrl
require = requirejs
const 模板 = require('http://hipy.no.press:5707/files/drpy3_libs/%E6%A8%A1%E6%9D%BF.js')
// const CryptoJS = require('http://hipy.no.press:5707/files/drpy3_libs/crypto-js.js')
const gbkTool = require('http://hipy.no.press:5707/files/drpy3_libs/gbk.js')
// const cheerio = require('http://hipy.no.press:5707/files/drpy3_libs/cheerio.min.js')
let d=[];
let muban = 模板.getMubans();
// log(muban);
log(typeof (console.log))
console.log(1111111111)
console.log(typeof CryptoJS)
console.log(typeof gbkTool)
strTool = gbkTool()
log(typeof (strTool))
log(Object.keys(strTool))
log(typeof _pdfh)
log(typeof _pd)
log(typeof _pdfa)
log(typeof _pdfl)
log(typeof joinUrl)
// log(Object.keys(cheerio))
d.push({
    title:JSON.stringify(muban),
    col_type:'rich_text'
});
setResult(d)