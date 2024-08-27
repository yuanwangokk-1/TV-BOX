js:
//加了 _pdfh，_pd，_pdfa，_pdfl，joinUrl
require = requirejs
const drpy = require('http://hipy.no.press:5707/files/drpy3_libs/drpy3.js')
let d = [];
log(typeof (drpy))
log(typeof (Object.keys(drpy)))
d.push({
    title: 'DRPY TEST',
    col_type: 'rich_text'
});
setResult(d)