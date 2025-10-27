const baseParse = _ => {
    let d = [];
    const script = fetch("https://cdn.jsdelivr.net/npm/dos.zczc.cz_vue@2.3.0/dist/js/app.cf392961.js")
    const match = script.match(/a301\:.*,b479/)[0]
    const js = match.replace('a301:function(e){e.exports=', 'const json = ').replace('},b479', '')
    eval(js)
    for (let j in json) {
        d.push({
            title: j,
            // desc: parseDomForHtml(list[j], '.mvhdico&&Text'),
            pic_url: "https://cdn.jsdelivr.net/npm/dos.zczc.cz_vue/dist/static/games/img/" + j + "/" + json[j].coverFilename,
            url: $("https://dos.zczc.cz/games/" + j + "").rule(_ => {
                let res = {};
                let d = [];

                d.push({
                    desc: '100% && float',
                    url: MY_URL,
                    col_type: 'x5_webview_single'
                });

                res.data = d;
                setHomeResult(res);
            })
        });
    }

    setResult(d);
}