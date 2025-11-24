/*
@header({
  searchable: 2,
  filterable: 1,
  quickSearch: 1,
  title: 'Zero影视',
  '类型': '影视',
  lang: 'dr2'
})
*/

var rule = {
    title: 'Zero影视',
    host: 'http://ldys.sq1005.top',
    url: '/api/v1/app/screen/screenMovie',
    searchUrl: '/api/v1/app/search/searchMovie#keywords=**;post',
    searchable: 2,
    quickSearch: 1,
    filterable: 1,
    headers: {
        'HOST': 'ldys.sq1005.top',
        'User-Agent': 'okhttp/4.12.0',
        'client': 'app',
        'deviceType': 'Android',
        'Referer': ''
    },
    class_parse: $js.toString(() => {
        let html = request(HOST + '/api/v1/app/screen/screenType', {
            headers: rule.headers,
            method: 'POST'
        });

        let content = JSON.parse(html);
        let classes = [];
        let filterObj = {};

        content.data.forEach(mainCate => {
            classes.push({
                type_id: mainCate.id,
                type_name: mainCate.name
            });

            let filters = [];
            mainCate.children.forEach(subCate => {
                let filterType = '';
                switch (subCate.name) {
                    case '类型':
                        filterType = 'type';
                        break;
                    case '地区':
                        filterType = 'area';
                        break;
                    case '年份':
                        filterType = 'year';
                        break;
                }

                let filter = {
                    key: filterType,
                    name: subCate.name,
                    value: subCate.children.map(item => ({
                        n: item.name,
                        v: item.name
                    })),
                    init: subCate.children[0].name
                };
                filters.push(filter);
            });

            // 统一添加排序筛选器
            filters.push({
                key: 'sort',
                name: '排序',
                init: 'HOT',
                value: [{
                        n: '最新',
                        v: 'NEWEST'
                    },
                    {
                        n: '热门',
                        v: 'HOT'
                    },
                    {
                        n: '收藏',
                        v: 'COLLECT'
                    }
                ]
            });

            filterObj[mainCate.id] = filters;
        });

        //classes.unshift({ type_id: '-1', type_name: '全部' });
        input = classes;
        homeObj.filter = filterObj;
    }),

    预处理: $js.toString(() => {
        function getdid() {
            let did = getItem('ldid');
            if (!did) {
                const hex = '0123456789abcdef';
                did = Array.from({
                    length: 16
                }, () => hex[Math.floor(Math.random() * 16)]).join('');
                setItem('ldid', did);
            }
            return did;
        }
        let dd = getdid();

        function gettk() {
            let res = JSON.parse(request(HOST + '/api/v1/app/user/visitorInfo', {
                headers: {
                    'HOST': 'ldys.sq1005.top',
                    'User-Agent': 'okhttp/4.12.0',
                    'client': 'app',
                    'deviceType': 'Android',
                    'Referer': '',
                    'deviceId': dd
                }
            }));
            return res.data.token;
        }
        let token = gettk();
        rule.headers['deviceId'] = dd;
        rule.headers['token'] = token;
        log("rule.headers>>>>>" + rule.headers);
        rule.privateKey = `MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCquQQ5r6+yJI8CDFkXRp8vUsdD45ov8EP12ooLs56ca2DQXaSNGS9910bAPVA9chkp0mKIvKqjAsHz5Tl9EeNPblarGEeJUIxpxZtiSqNTpvtiD/TjhpzuHYic7RAfQ/h7p/ypE8ymU42pYjsB5t26Mv6XgkLV+jzrSf73HlCuS0iMyLmt6zz3Mw9izM13EpB8iFLtfbbYymycKTx4RAmPQLwhNGex/AlUIYxXP4R2yyaa4W6mEtc6aME2QuzJFxPgP3HJ9NBx/LWVn4skxWjZ7zg+VRQRHnjyVaSLu3Z5gN5ITWCyE32qaHJa6WBahZj5jWhRyAG1bQ+xKJa8lBL5AgMBAAECggEAUwv9SjJ0PSwbhNuM2w23kcWquROWhYtTA91zGY4esehqB/IFgb2mpIh8Gje5OKqwIu/8jpd4SiOlRYdUF8sD0DfUYRZGdj2AkFNX6tBz8tVfo6wvbB6naA1lzzBij1L5JO3qsjS3cJFkb+kg2yP66AC2Z+0tpfk8eRhdtshAZwfcd1DEGt1uAvYL1eaUK9HRvpt9lPeGcHERDl2hBd4uyaF0K1O+zF9y59nYbTySWPxRZq3sFEE85xRMlstD7YZi7W2gKvMFRD4/FKmrZ3m7aKJRITtyKOyyPcYmepNv3Qv7kk59Pg38n2WWQ0Ra/bCH3E48YNCnQvZMpitkTfJhoQKBgQDbnROOYTP8OTJ6f/qhoGjxeO3x1VOaOp8l0x7b0SCfoqNGS0Cyiqj72BmJtPMPqSTjn6MmNzqbg1KOdhXyzNozs+i5ccW1M56j96mr5I/Z0FpE3oyIHNfDDBlf9M8YQqEF9oYxniYYft9oapO7cRQkHER6qpvnHTavwlv4m78CXwKBgQDHAjs2YlpKDdI1lcbZJCc7TwtH+Pd2bUki8YXafWNcPhITQHbOZjr310eK1QJC6GJncjkOqbX7yv3ivvTO35FZTQhuA1xEG1P00FG8bE0tHYPIwQHi9y0eA5cieMdo8E6XYria1mw/3fqSQEsfZyJlR32JQIoGAipM8iO1X2nZpwKBgDkMFIhnt5lNQk+P7wsNIDWZtDWdtJnboHuy29E+Abt2A/O+mI/IdRz2hau/1WO8DFkUnszOi+rZshhPlGP90rCbi1igtTrcrdjp/KkqNjPea5R4OwkgdOu1uOG0NheXNzzVTQaWjk7Opjn5dWa7eP/oV+GFb/oZHJuLYVizHGsBAoGADA7rjZEKDYCm4w5PPSr+oY5ZjaPdQrS+gLqHtMRyN82fBMGcMUdqfUfzEstzVqCEDeaS5HuOBlK3bXzKkppjUTjksN3NQmcxgBz7RuJ9DqXCLXDcb2cwuafYCYOt+YLOEEgwDVm+t2P44dG5e46hO+fICH/7nP+WlpD5buz4GfMCgYB57r3g/6hi9WUDnfc7ZAzWMqR0EhJVYKYy+KFEtdIPzhkkIHq5RASe88E9kzoGoZFdb3tIjvGZWcHerirrqWkMsuQtP/Qi0zjieid5tAPj+r4kbiCVTw0E0jnmPBzGInQi7lpeTTKnG1fbyS5lBS+WmHfIuzpECgCkxhaT+LJJkg==`;
        rule.publicKey = `MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCoYt0BP77U+DM08BiI/QbSRIfxijXo85BTPqIM1Ow8BNwhLETzRIZ+dEwdWDbydG/PspgBAfRpGaYVdJYtvaC2JnoO8+Ik6qMWojfEJxSFLa0Pb0A892tun4gsxoEMjcreZ+YGyaBxAfqX0BSMfdrOgIYaZQjYrw9TRLlUT31QoQIDAQAB`;
        rule.options = {
            block: true,
            long: 2,
            type: 1
        };
    }),

    一级: $js.toString(() => {
        let params = {
            condition: {
                sreecnTypeEnum: 'NEWEST',
                typeId: MY_CATE
            },
            pageNum: MY_PAGE,
            pageSize: 40
        };
        let data = JSON.parse(request(HOST + '/api/v1/app/screen/screenMovie', {
            headers: rule.headers,
            body: params,
            method: 'POST'
        })).data;

        let d = data.records.map(item => ({
            title: item.name,
            desc: item.totalEpisode,
            pic_url: item.cover,
            url: HOST + '/api/v1/app/play/movieDesc' + '#' + item.id + '#' + item.typeId
        }));
        setResult(d);
    }),

    二级: $js.toString(() => {
        console.log("input>>>>>" + input);
        let [url, id, typeId] = MY_URL.split('#');
        console.log("id>>>>>" + id);
        console.log("typeId>>>>>" + typeId);

        // 获取详情信息
        let detailParams = {
            "id": parseInt(id),
            "typeId": typeId
        };

        let detailRes = request(HOST + '/api/v1/app/play/movieDesc', {
            headers: rule.headers,
            body: detailParams,
            method: "POST"
        });
        let detail = JSON.parse(detailRes).data;
        log("movieDesc:" + JSON.stringify(detail));

        // 获取播放列表
        let playParams = {
            "key": rsaEncrypt(JSON.stringify({
                "id": parseInt(id),
                "source": 0,
                "typeId": typeId
            }), rule.publicKey, rule.options)
        };

        let playDataRes = request(HOST + '/api/v1/app/play/movieDetails', {
            headers: rule.headers,
            body: playParams,
            method: "POST"
        });

        let playData = JSON.parse(playDataRes).data;
        
        let decryptedData = JSON.parse(rsaDecrypt(playData, rule.privateKey, rule.options));
        log("movieDetails:" + decryptedData);

        // 处理播放列表
        let playMap = {};
        decryptedData.moviePlayerList.forEach(player => {
            let episodeParams = {
                "key": rsaEncrypt(JSON.stringify({
                    "id": parseInt(id),
                    "source": 0,
                    "typeId": typeId,
                    "playerId": player.id
                }), rule.publicKey, rule.options)
            };

            let episodeRes = request(HOST + '/api/v1/app/play/movieDetails', {
                headers: rule.headers,
                body: episodeParams,
                method: "POST"
            });

            let episodeData = JSON.parse(episodeRes).data;

            let decryptedEpisode = JSON.parse(rsaDecrypt(episodeData, rule.privateKey, rule.options));

            playMap[player.id] = decryptedEpisode.episodeList.map(ep => {
                let param = {
                    id,
                    typeId,
                    playerId: player.id,
                    episodeId: ep.id
                };
                return ep.episode + '$' + btoa(unescape(encodeURIComponent(JSON.stringify(param))));
            }).join('#');
        });

        VOD = {
            vod_name: detail.name,
            vod_pic: detail.cover,
            vod_year: detail.year,
            vod_area: detail.area,
            vod_remarks: detail.totalEpisode,
            vod_actor: detail.star,
            vod_content: detail.introduce,
            vod_play_from: decryptedData.moviePlayerList.map(p => p.moviePlayerName).join('$$$'),
            vod_play_url: Object.values(playMap).join('$$$')
        };
    }),

    搜索: $js.toString(() => {
        let params = {
            condition: {
                value: KEY
            },
            pageNum: MY_PAGE,
            pageSize: 40
        };
        let data = JSON.parse(request(HOST + '/api/v1/app/search/searchMovie', {
            headers: rule.headers,
            body: params,
            method: 'POST'
        })).data;
        log("data>>>>>" + data)
        let d = data.records.map(item => ({
            title: item.name,
            desc: item.totalEpisode,
            pic_url: item.cover,
            url: HOST + '/api/v1/app/play/movieDesc' + '#' + item.id + '#' + item.typeId
        }));
        setResult(d);
    }),

    play_parse: true,
    lazy: $js.toString(() => {
        let param = JSON.parse(input);
        log("param>>>>>" + JSON.stringify(param));
        log("id>>>>>" + param.id);
        let urlParams = {
            "key": rsaEncrypt(JSON.stringify({
                "id": param.id,
                "source": 0,
                "typeId": param.typeId,
                "playerId": param.playerId,
                "episodeId": param.episodeId
            }), rule.publicKey, rule.options)
        };

        const postData = request(`${HOST}/api/v1/app/play/movieDetails`, {
            headers: rule.headers,
            body: urlParams,
            method: 'POST'
        });

        const encryptedUrl = JSON.parse(postData).data;
        const playerUrl = JSON.parse(rsaDecrypt(encryptedUrl, rule.privateKey, rule.options)).url;
        log("playerUrl>>>>>" + playerUrl);

        const getResponse = request(HOST + '/api/v1/app/play/analysisMovieUrl?playerUrl=' + encodeURIComponent(playerUrl) + '&playerId=' + param.playerId, {
            headers: rule.headers
        });

        const player = JSON.parse(getResponse).data;
        input = {
            parse: 0,
            url: player
        };
    }),
}