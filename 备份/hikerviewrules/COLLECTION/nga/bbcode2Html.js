const nodes = [
    // 基本字体样式
    {
        tag: "b",
        html_open: "<strong>",
        html_close: "</strong>"
    },
    {
        tag: "i",
        html_open: "<i>",
        html_close: "</i>"
    },
    {
        tag: "del",
        html_open: "<s>",
        html_close: "</s>"
    },
    {
        tag: "u",
        html_open: "<u>",
        html_close: "</u>"
    },
    {
        tag: "color",
        html_open: attr => `<span style="color:${attr || "black"};">`,
        html_close: "</span>"
    },
    {
        tag: "size",
        html_open: attr => `<span style="font-size: ${attr || "100%"}">`,
        html_close: "</span>"
    },

    // 折叠
    {
        tag: "collapse",
        html_open: attr => `<details><summary>${attr || '折叠内容'}</summary>`,
        html_close: "</details>"
    },

    // 引用
    {
        tag: "collapse",
        html_open: "<blockquote>",
        html_close: "</blockquote>"
    },

    // 列表
    {
        tag: "list",
        html_open: "<ul>",
        html_close: "</ul>"
    },
    {
        tag: "*",
        html_open: "<li>",
        html_close: "</li>"
    },

    // 分割线
    {
        tag: "h",
        html_open: attr => `${attr ? '<strong>' + attr + '</strong>' : ''}<hr />`,
        html_close: ""
    },

    // 注解
    // {
    //   tag: "dict",
    //   html_open: attr => {
    //
    //     return `<strong><a href="javascript:alert()">`
    //   },
    //   html_close: "</a></strong>"
    // },

    // 链接
    {
        tag: "url",
        html_open: attr => `<a href="${attr || "#"}">[`,
        html_close: "]</a>"
    },


    {
        tag: "uid",
        html_open: "<a href='javascript: void(0);'>",
        html_close: "</a>"
    },
    {
        tag: "pid",
        html_open: "<a href='javascript: void(0);'>",
        html_close: "</a>"
    },
    {
        tag: "tid",
        html_open: "<a href='javascript: void(0);'>",
        html_close: "</a>"
    },
    {
        tag: "h1",
        html_open: "<h1>",
        html_close: "</h1>"
    },
    {
        tag: "h2",
        html_open: "<h2>",
        html_close: "</h2>"
    },
    {
        tag: "h3",
        html_open: "<h3>",
        html_close: "</h3>"
    },
    {
        tag: "h4",
        html_open: "<h4>",
        html_close: "</h4>"
    },
    {
        tag: "h5",
        html_open: "<h5>",
        html_close: "</h5>"
    },
    {
        tag: "h6",
        html_open: "<h6>",
        html_close: "</h6>"
    },
    {
        tag: "center",
        html_open: `<span style="text-align: center">`,
        html_close: "</span>"
    },
    {
        tag: "list",
        html_open: "<ul>",
        html_close: "</ul>"
    },
    {
        tag: "olist",
        html_open: "<ol>",
        html_close: "</ol>"
    },
    {
        tag: "*",
        html_open: "<li>",
        html_close: "</li>"
    },
    {
        tag: "img",
        html_open: attr => `<img src="${attr || "#"}" alt="${attr || "#"}" />`,
        html_close: ""
    },
    {
        tag: "quote",
        html_open: '<quote style="background: #f9efd6; border: 1px solid #e6e1d3; margin: 0.8em; padding: 0.6em 0.8em; ">',
        html_close: "</quote><p></p>"
    },
];

function get(tag) {
    return nodes.find(node => node.tag === tag);
}

function parser(str) {
    if (!str) {
        throw "Parse string is empty";
    }

    let html = str.slice(0);

    const tags = str.match(/(\[[^\]^\s]{1,}\])/g);

    if (!tags || tags.length < 1)
        return html;

    let args;
    let closing;
    let name;
    let node;
    let attr;
    let open;
    tags.forEach(tag => {
        args = tag.slice(1, -1).split("=");
        closing = args[0].startsWith("/");
        name = closing ? args[0].slice(1) : args[0];
        attr = args[1];

        node = get(name);

        if (node) {
            open = typeof (node.html_open) === "function" ? node.html_open(attr) : node.html_open;
            html = html.replace(tag, closing ? node.html_close : open);
        }
    });

    return html.replace(/(?:\r\n|\r|\n)/g, "<p></p>");
}

$.exports = {
    parser: parser,
}
