/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 1,
  title: '文才[资]',
  '类型': '影视',
  lang: 'ds'
})
*/

var rule = {
    模板: '采集1',
    title: '文才[资]',
    host: 'https://api.zeqaht.com',
    homeTid: '33', // 动漫
    url: '/api.php/provide/vod/?ac=detail&pg=fypage&t=fyfilter',
    filterable: 1,//是否启用筛选,
    filter_url: '{{fl.cateId}}',
    filter: 'H4sIAAAAAAAAA62Rz06DQBDG32XPHMqfQu0b+AymB6Kc1J7UxDQktgQtHNQag1qbeGqg2qR6MQqFp4FdeQuhYZllzxzn901mvm9mhETUPxihY+MS9dGhfmbsHyEBDfVTo6gzx8eWXdQX+sm5sWscltgOcisocVEgU6iotyj6KypJwN0gjReUyzUn/iz7jSoud4BPv6qlZb9aczxZE29GuQbzlzcwp8fw2nw5Hzge3+Mrj3KYT9wNid8p77L+yWPtE/xjy8WTOeUK8OlzGjrUJzPn+iF/WdF+EfaOk3yeUP/AM/s7jahPpdg7MAcCklp712uchj58TGQSrH2S3DIShMA/m+zuk5GY/zwt87cVSKrERWGkXpVGbjcNibZ/TkiX7HGuG6rW4Yw3VYk7RlOVuWRNVanCKS2/yg3w9oMu6fJ3b6gq/8uGqu0Mmv+ffU/3/AMAAA==',
    filter_def: {
        1: {cateId: '1'},
        2: {cateId: '14'},
        4: {cateId: '4'},
        3: {cateId: '69'}
    },
    class_name: '电影&电视剧&综艺&动漫',
    class_url: '1&2&3&4',
    // 清空继承模板里的动态筛选
    class_parse: '',
}