const baseParse = _ => {
    let res = {};
    let d = [];

    d.push({
        desc: '96 && float',
        url: 'file:///storage/emulated/0/Android/data/com.example.hikerview/files/Documents/TyrantG/public/douyu-search.html?time=' + (new Date()).getTime(),
        col_type: "x5_webview_single",
    })

    res.data = d;
    setHomeResult(res);
}