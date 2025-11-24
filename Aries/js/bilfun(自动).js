/*
@header({
  searchable: 0,
  filterable: 1,
  quickSearch: 0,
  title: 'bilfun(自动)',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: '自动',
    模板修改: $js.toString(() => {
        muban.自动.二级.tabs = '.module-tab-item.tab-item';
    }),
    title: 'bilfun(自动)',
    host: 'http://bilfun.cc',
    url: '/bilfunshow/fyclassfyfilter.html',
    class_parse: '.navbar-items li:gt(1):lt(9);a&&Text;a&&href;/bilfun/(\\d+).html',
    filterable: 1,
    filter_url: '-{{fl.地区}}-{{fl.排序}}-{{fl.剧情}}-{{fl.语言}}-{{fl.字母}}---fypage---{{fl.年代}}',
    filter: 'H4sIAAAAAAAAA+2ZW08bRxTH3/spIj9TiYXcmrfc7/d7qjxEFVKjtqnUpJWqCAkwdgwB2yCC49rcGm6hGMylFJYafxnPrv0tMvac8z/jtqyslqQv6yf//mdn9syZnZ2/Zg+9/OyQ/kWcyIkvX0a+6fo5ciKiBha8aCzSFnn25Lsum3968u2PXY0Ln9Xl2GItuliXNUS620gdz+vrSSXgmJ9Yo44EOOb1pr2ecYoRoM/BxUopz30aQJ8LI2pnl/s0gHZIXAD3S7ytuAN8PwMcqxbm1dASxQhwv8FVv8QxAitPf2xX8qwDYnOvJE8C5FKYr+xNcy4G0C4+Wsu+53YG0G5ySWfO7Qy0Uk+vb9kfH+GYAcSig17fLxwzgLHvplRsm8dugGO1iVHv7RzFCNDn+KvqgMt9GsD49lb8sd9VaY2HCMYVqdnqO8yiAcSScZVa55gBzGI5reeAZ9GAVDXvTYygqg1ArL/s/8YjIUAFSiP+br4p4Sap+3H9SlpG+aIacq1lxNzSMppdqGXjnIQBlHo+622vcqkNSLGK3s4eitUAJL+XVLkSp20AU7TxRmIEKOTrNYkRoF1mzssvczsDyHPqvbQjkGn/Q2IEkkvRzqXY1G64qNx5bmcA7fpTulIqwatFGCOZK/upgj+Q5cGAZQlPe6/LuhlWMTOuiG1VdnlhEdjTXl0tVBd7ZNrBLU17rqSv584NWNMgMQJM7fqsxAgwDZmSGs5IWNiaKCtswJpgiRFYD40VM2BNsDUSA1YJ1UpUSliHppWzs1nZLVkrh7mVEna0dxwmrfHX0jtF77T1DtE7bN0R3bH1dtHbLd35Arr+a+nHRT9u68dEP2brR0U/autHRD9i6zJexx6vI+N17PE6Ml7HHq8j43Xs8ToyXv23aaIKGW912Joo5r9MFGR7ok6ScBLKKVJOQTlNymkoZ0g5A+UsKWehnCPlHJTzpJyHcoGUC1AuknIRyiVSLkG5TMplKFdIuQLlKilXoVwj5RqU66Rch3KDlBtQbpJyE8otUm5BuU3KbSh3SLkD5S4pd6HcI+UelPuk3IfygJQHUB6S8hDKI1IeQWn/nNdA84PiJUeVm5IHBdz8oHiZrVpmU4JaevFUN+DuK67rFcea4l8/ffFcXpGr/SoRb4o//+r7H7rquTxuM06348CcboAvCXKXxhyp3i0V5SSbpFactFrZUi7ergZadKj7OukghxrkpIM8WJBjrOzMiAcjEBca87JscQhwvzdxcb0Elj+TmhG0unH/N78Wj+nrYSgb0IoP+rdeLsh3Bfu8/b1VoM8bL2orpCZm4OKZQ1/0N18U+ptI6G9CfxMJ/c3/4G86D8rf1HoG/IUefvsZsPfn/ilrf9aAJFfK1WKC38cG0G604A3y2QqBvFFj3jZ7BQJ5E29UdtJ4EzfA2u5q7zgXAsTcJbUyyTEDuF9u3TqVMoB2Y1PeJk4VDaDd9raXSFXcUTldapJQh81ftePhOhhAH2t91d4hbm3gk3gR7S+0k0DaDbC2NL3JyZZWB8SWF3RpOWYg3N3D3T0S7u7h7h7u7p9sdz98ULt70A4e9E3NjxaqM+wKCNBnctFP80cLAsTSk/4yvjkZkA1r/29c1fRENcknKQToc3pG5fCWNoA+A046vLxrfTczgPsFfDUKOtVRRV2mTb6fATs2t2HFNKCes3uVP/l7GwHaJadUIsftDMjDtK4K7IgI0Gdu0MuysyGQuqypcgZ1aYC1s33EE5JcqeLiOMuAtd3ue5rxj86jxYRDVxK6ktCVhK4kdCUfyZVoU9L9ATsDmPVDJAAA',
    filter_def: {
        动漫: {类型: '4'},
        电影: {类型: '1'},
        连续剧: {类型: '2'},
        综艺: {类型: '3'},
        爽文短剧: {类型: '22'},
        纪录片: {类型: '19'},
        体育赛事: {类型: '20'},
        影视解说: {类型: '21'}
    },
    searchUrl: '/bilfunsearch/**----------fypage---.html',
}