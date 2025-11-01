


var rule = {
    title: '瓜子',
    host: 'https://api.gudvxty.com',
    url: '/App/IndexList/indexList',
    //   homeUrl: 'http://124.222.116.5/homedata/home.json',
    searchUrl: '/App/Index/findMoreVod#**',
    searchable: 0,
    quickSearch: 1,
    filterable: 1,
    class_name: '电影&电视剧&动漫&综艺&短剧',
    class_url: '1&2&4&3&64',
    filter:'H4sIAAAAAAAAA+2a7U4aQRSG/3sVht/bZHf5WnorjWlo4YfphwlqE2NMtGoLWIsmFbRi2qYqoBgxtVVR8GZ2duUuOmchfuDuDHI2xJhD4hGYyTzv7hlm57yZ6aFh/gpogefDL5y38Jq+fuc0vklO8eZAPJWMB5S7Te/j75JebR/ibyeTd8Z1H/9mMBiJLZZb8+WusW7GhC5q4F7jzP3+Qsh2qbXxSQjpdMGSWrsb1umhkNTpgr6mXM06a4qvqd0FS7KqJbv5VUgyLxfsRsHKHyos+9NauuR3U2HNE7bZUKyFHP/E0hXF+rPmfOEMp/A/+HS1dOT827m0cwd2ZgOvtrBjFatCtZ0u6Fz/qHDp4ly3u2BJ5mmRLRfM+ndxupdrrL6rWPkaTwLb+sVveA3ubatStbZ2+B2GAdDTbvGfeZ4X62h3uU+6883I9adbCtxXoqlkPOW1Erm1PeKVSFf1kBDhdPCBEpRRgn5QdBlF94OiySiaHxRVRvEj+1pMQuEdfKAYMorhByUqo0T9oERklAiaoqnPtDA7O5aRwgoPIQhBCDoEDQJ+aqgq55vnvyUSVJXjVGCqQFdBhwqKVNCmRiBEIRgQ8HMp1ossLRZTFR40CDqEIIQQhDCECIQoBAMCXpbRmywDZBkgywBZBsgyQJYBsgyQZYAsA2QZeFnW5rFVqIhT6ONzcXzylddj0aXpET8VWbZsNop25rOIE0Zn52PVzq9KKHoMfTH5IsuUJJgIlmKnj6z5RQkliqaUVtnZuYRioBMzt2LN5iUUfF4yJfkd01T0xaTXzXpGhtF8+MnY32SZCeKnWX2PNdZkvxn0TbPnmq3vTdnVoCeanT20G3uyn6ZLbvpeocdSE55LtEtbf2u0fX7BVtLCNTrxcjSBf7wVZ3lxKeHEE4mJUX6FPsDs+QMJbPz1WAqPau2vs7TYHvJGeU0N591Ie0z+1H80fluxxr7UyW8jv438Nk8S+W2D8NugghOnk/y2Lgr5bQ+kkN9GfpurBPLbHiKL/LaB+W2bDbNeYpmS0D7Q/dk3yzBBfzbNMkzInx2zDIM3EJ19rAyD9lzam1gZBu3tWX9P2HZehsGbe86mWIZBu3vXu3ChteOC6XsxIGsHAXs61k6IrJ0uCFk7niSydtxJZO146CBrxxNC1g5ZO0IKWTvdFLJ2bkkga4esnYFaO+bpAVTC2bJ1sS8854A/g9I2KuQk9DGU4Y71Ike5eEl9J4tKbwTs6ZTeQSq9uyBUenuSqPR2J1Hp7aGDSm9PCJXeVHoLKVR6d1Oo9L4lgUpvKr0He6rC2Rfziu4qI9yl6+iDFXCqIlfrgYQ+W8H3f3xj1gPJp+MVPZBcTlj0PSuoxkfAnkCNPzTzH+StPxCsRAAA',
    // limit: 6,
    //double: false,
    play_parse: true,
    lazy: $js.toString(() => {
        let d = [];
        //console.log("wangzhi==="+input)
        var vod_id = input.split("/")[0];
        var vurl_id = input.split("/")[1];
        var resolution=input.split("?")[1]
        function Encrypt(plainText) {
            let key = CryptoJS.enc.Utf8.parse("d6NYvF46X6WCePXs");
            let iv = CryptoJS.enc.Utf8.parse("SJx5AhSfmfS8FKYN");
            // 将文本加密为 AES/CBC/PKCS5Padding 格式
            let encrypted = CryptoJS.AES.encrypt(plainText, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // 获取加密结果并转为 Hex 格式
            let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return encryptedHex.toUpperCase(); // 返回大写 Hex 格式
        }
        function Decrypt(word, key, iv) {
            let encryptedHexStr = CryptoJS.enc.Hex.parse(word);

            // 使用AES/CBC/PKCS5Padding模式进行解密
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC, // 使用CBC模式
                padding: CryptoJS.pad.Pkcs7 // 使用PKCS#7填充
            });

            // 将解密后的数据转换为原始文本
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

            // 返回解密后的文本
            return decryptedStr;
        }
        var timestamp = new Date().getTime() / 1000; //log(timestamp)
        var t = timestamp.toString().split('.')[0]; //log(t)
        var request_key = JSON.stringify({
            "domain_type": "8",
            "vod_id": vod_id,
            "type": "play",
            "resolution": resolution,
            "vurl_id": vurl_id
        }); //log(request_key)
        var request_key2 = Encrypt(request_key); //log(request_key2)
        var signature = 'token_id=,token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9,phone_type=1,request_key=' + request_key2 + ',app_id=1,time=' + t + ',keys=fr8yBcz8w6W2LpIy3Or5jw2CHQaJTQOFVc66Lw5+/oN9hbS2bAtI6ixSVRLKIYzRJY9kM2QN6TJaLR+v2SMTkMdkMp7kVJ5eZSH/FfQ/CF9Nnn34rkHw36AjGURt825XsmfmNYlgBffUfVA2+VxRNJ2KuShSE+8MnzNNBfCVu6c=*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br'; //log(signature)
        var signature2 = md5(signature); //log(signature2)
        var body = 'token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9&token_id=&phone_type=1&time=' + t + '&phone_model=xiaomi-22021211rc&keys=fr8yBcz8w6W2LpIy3Or5jw2CHQaJTQOFVc66Lw5%2B%2FoN9hbS2bAtI6ixSVRLKIYzRJY9kM2QN6TJaLR%2Bv2SMTkMdkMp7kVJ5eZSH%2FFfQ%2FCF9Nnn34rkHw36AjGURt825XsmfmNYlgBffUfVA2%2BVxRNJ2KuShSE%2B8MnzNNBfCVu6c%3D&request_key=' + request_key2 + '&signature=' + signature2 + '&app_id=1&ad_version=1'; //log(body)

        var html = fetch('https://api.gudvxty.com/App/Resource/VurlDetail/showOne', {
            headers: {
                'Cache-Control': 'no-cache',
                'Version': '2412021',
                'PackageName': 'com.eb9e6ade81.ja4f9c8233.r1f05873c420241229',
                'Ver': '1.9.3.11',
                'Referer': 'https://api.gudvxty.com',
                'X-Customer-Client-Ip': '127.0.0.1',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Host': 'api.gudvxty.com',
                'Connection': 'Keep-Alive',
                //'Accept-Encoding': 'gzip',
                'User-Agent': 'okhttp/3.12.0'
            },
            body: body,
            method: 'POST',           
            rejectCoding: true
        }); //log(html)

        var data = JSON.parse(html).data;
        // //console.log("dddddd====="+JSON.stringify(data))
        var response_key = data.response_key; //log(response_key)
        var keys = data.keys; //log(keys)

        var bodykey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA=="; //log(bodykey)
        var bodykeyiv = JSON.parse(RSA.decode(keys, bodykey)); //log(bodykeyiv)
        var key = CryptoJS.enc.Utf8.parse(bodykeyiv.key); //log(key)
        var iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv); //log(iv)
        var html2 = Decrypt(response_key, key, iv); //log(html2)
        var url = JSON.parse(html2).url; //log(url)
        input = {
            url: url,
            parse: 0,
            header: rule.headers
        }
        setResult(d)
    }),
    //   推荐: $js.toString(() => {
    //     let d = [];
    //     let data = JSON.parse(request(input))
    //     data.forEach(item => {
    //       item.datas.forEach(it => {
    //         let id = `http://114.132.55.23/bl/mb/api.php/provide/vod/?ac=videolist&wd=${it.title}&`;
    //         d.push({
    //           url: id,
    //           title: it.title,
    //           img: it.pic,
    //           desc: it.acr,
    //         })
    //       });
    //     });
    //     setResult(d)
    //   }),
    一级: $js.toString(() => {
        let d = [];
        function Encrypt(plainText) {
            let key = CryptoJS.enc.Utf8.parse("d6NYvF46X6WCePXs");
            let iv = CryptoJS.enc.Utf8.parse("SJx5AhSfmfS8FKYN");
            // 将文本加密为 AES/CBC/PKCS5Padding 格式
            let encrypted = CryptoJS.AES.encrypt(plainText, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // 获取加密结果并转为 Hex 格式
            let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return encryptedHex.toUpperCase(); // 返回大写 Hex 格式
        }
        function Decrypt(word, key, iv) {
            let encryptedHexStr = CryptoJS.enc.Hex.parse(word);

            // 使用AES/CBC/PKCS5Padding模式进行解密
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC, // 使用CBC模式
                padding: CryptoJS.pad.Pkcs7 // 使用PKCS#7填充
            });

            // 将解密后的数据转换为原始文本
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

            // 返回解密后的文本
            return decryptedStr;
        }
        function getbody3(key, t) {
            var signature = 'token_id=,token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9,phone_type=1,request_key=' + key + ',app_id=1,time=' + t + ',keys=fC1DDZLEFRWERdASYMbWhi1WiPzIS/jNb5sFD/RBpP4HnV53tntnUfj2JoK5stKUM7ud89VLrWjcaupFCOzsIAfTszMMAO/kUuSZDsI3hiNMqQuyNOMVmsa3BqSge8vMxNPjl/jN/HGKxKAx/DxiiZZoU/AobtF+uPSbILKLv10=*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br'; //log(signature)
            var signature2 = md5(signature).toUpperCase(); //log(signature2)
            var body = 'token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9&token_id=&phone_type=1&time=' + t + '&phone_model=xiaomi-22021211rc&keys=fC1DDZLEFRWERdASYMbWhi1WiPzIS%2FjNb5sFD%2FRBpP4HnV53tntnUfj2JoK5stKUM7ud89VLrWjcaupFCOzsIAfTszMMAO%2FkUuSZDsI3hiNMqQuyNOMVmsa3BqSge8vMxNPjl%2FjN%2FHGKxKAx%2FDxiiZZoU%2FAobtF%2BuPSbILKLv10%3D&request_key=' + key + '&signature=' + signature2 + '&app_id=1&ad_version=1';
            return body
        }
        const bodykey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA==";
        function gethtml(u, body, headers) {
            var hd = fetch(u, {
                headers: headers,
                body: body,
                method: 'POST',
                rejectCoding: true
            });
            var banner = JSON.parse(hd).data;
            var response_key = banner.response_key; //log()
            var keys = banner.keys; //log(keys)
            var bodykeyiv = JSON.parse(RSA.decode(keys, bodykey));
            var key = CryptoJS.enc.Utf8.parse(bodykeyiv.key);
            var iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv);
            var html = Decrypt(response_key, key, iv);
            return html
        }
        function hqsub(MY_CATE) {
            var subs = ["5", "12", "30", "22", ""]
            var tids = ["1", "2", "4", "3", "64"]
            let index = tids.indexOf(MY_CATE);
            if (index !== -1) {
                return subs[index];
            }
            return ""; // 或者根据需要返回其他值
        }
        var headers = {
            'Cache-Control': 'no-cache',
            'Version': '2412021',
            'PackageName': 'com.eb9e6ade81.ja4f9c8233.r1f05873c420241229',
            'Ver': '1.9.3.11',
            'Referer': 'https://api.gudvxty.com',
            'X-Customer-Client-Ip': '127.0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.gudvxty.com',
            'Connection': 'Keep-Alive',
            //'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.0'
        }
        var tid = MY_CATE;
        var sub = hqsub(MY_CATE)
        var timestamp = new Date().getTime() / 1000;
        var t = timestamp.toString().split('.')[0];
        var request_key = JSON.stringify({ "area": (MY_FL.area || 0).toString(), "sub": (MY_FL.sub || sub).toString(), "year": (MY_FL.year || 0).toString(), "pageSize": "30", "sort": (MY_FL.sort || "d_id").toString(), "page": MY_PAGE, "tid": tid });
        var request_key2 = Encrypt(request_key);
        var body = getbody3(request_key2, t)
        var html2 = gethtml("https://api.gudvxty.com/App/IndexList/indexList", body, headers)
        //console.log("tttttlieb=="+html2)
        var list = JSON.parse(html2).list; //log(list)
        list.forEach(data => {
            d.push({
                title: data.vod_name,
                desc: data.vod_continu == 0 ? '电影' : '更新至'+data.vod_continu+'集',
                year: data.vod_scroe,
                img: data.vod_pic,
                url: `${data.vod_id}/${data.vod_continu}`,
            })
        })
        setResult(d)
    }),
    二级: $js.toString(() => {
        // var d = [];
        function Encrypt(plainText) {
            let key = CryptoJS.enc.Utf8.parse("d6NYvF46X6WCePXs");
            let iv = CryptoJS.enc.Utf8.parse("SJx5AhSfmfS8FKYN");
            // 将文本加密为 AES/CBC/PKCS5Padding 格式
            let encrypted = CryptoJS.AES.encrypt(plainText, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // 获取加密结果并转为 Hex 格式
            let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return encryptedHex.toUpperCase(); // 返回大写 Hex 格式
        }
        function Decrypt(word, key, iv) {
            let encryptedHexStr = CryptoJS.enc.Hex.parse(word);

            // 使用AES/CBC/PKCS5Padding模式进行解密
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC, // 使用CBC模式
                padding: CryptoJS.pad.Pkcs7 // 使用PKCS#7填充
            });

            // 将解密后的数据转换为原始文本
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

            // 返回解密后的文本
            return decryptedStr;
        }
        function getbody2(key, t) {
            var signature = 'token_id=,token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9,phone_type=1,request_key=' + key + ',app_id=1,time=' + t + ',keys=tfej6qUtK9u6iUGYhZ/iNM1Egd4RSrYp1pI2wPMqAcuDVmzEWdbLsw5fQm6iltHFBeQM+aQFIoo/8lFO7QidsbJc6+YgI5DisOZ0qqZfH39Rz8fAEImqB/uTDgbBESS6CL7r4NV3MPzNAOKZVdG/kgnzR4SgXRlHaGJ+bGeGSf4=*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br'; //log(signature)
            var signature2 = md5(signature); //log(signature2)
            var body = 'token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9&token_id=&phone_type=1&time=' + t + '&phone_model=xiaomi-22021211rc&keys=tfej6qUtK9u6iUGYhZ%2FiNM1Egd4RSrYp1pI2wPMqAcuDVmzEWdbLsw5fQm6iltHFBeQM%2BaQFIoo%2F8lFO7QidsbJc6%2BYgI5DisOZ0qqZfH39Rz8fAEImqB%2FuTDgbBESS6CL7r4NV3MPzNAOKZVdG%2FkgnzR4SgXRlHaGJ%2BbGeGSf4%3D&request_key=' + key + '&signature=' + signature2 + '&app_id=1&ad_version=1'; //log(body)
            return body
        }
        const bodykey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA==";
        function gethtml(u, body, headers) {
            var hd = fetch(u, {
                headers: headers,
                body: body,
                method: 'POST',
                rejectCoding: true
            });
            var banner = JSON.parse(hd).data;
            var response_key = banner.response_key; //log()
            var keys = banner.keys; //log(keys)
            var bodykeyiv = JSON.parse(RSA.decode(keys, bodykey));
            var key = CryptoJS.enc.Utf8.parse(bodykeyiv.key);
            var iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv);
            var html = Decrypt(response_key, key, iv);
            return html
        }
        const headers = {
            'Cache-Control': 'no-cache',
            'Version': '2412021',
            'PackageName': 'com.eb9e6ade81.ja4f9c8233.r1f05873c420241229',
            'Ver': '1.9.3.11',
            'Referer': 'https://api.gudvxty.com',
            'X-Customer-Client-Ip': '127.0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.gudvxty.com',
            'Connection': 'Keep-Alive',
            //'Accept-Encoding': 'gzip',
            'User-Agent': 'okhttp/3.12.0'
        }
        // var MY_URL = MY_URL.split("##")[1]; //log(MY_URL)
        input = input.replace('https://api.gudvxty.com/', '');
        //console.log("input----===="+input)

        // var vod_continu = input.split("/")[1]; //log(vod_id)
        var vod_id = input.split("/")[0];
        //console.log("vod----===="+vod_id)
        var timestamp = new Date().getTime() / 1000;
        var t = timestamp.toString().split('.')[0];
        var request_key = JSON.stringify({
            "token_id": "393668",
            "vod_id": vod_id,
            "mobile_time": t,
            "token": "67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9"
        });
        var request_key2 = Encrypt(request_key);
        var body = getbody2(request_key2, t)
        var html = gethtml("https://api.gudvxty.com/App/IndexPlay/playInfo", body, headers)
        var data2 = JSON.parse(html).vodInfo; //console.log("hwudwudg-===="+JSON.stringify(data2))
        var request_key3 = JSON.stringify({
            "vurl_cloud_id": "2",
            "vod_d_id": vod_id
        }); //log(request_key3)
        var request_key4 = Encrypt(request_key3); //log(request_key4)
        var body2 = getbody2(request_key4, t)

        var html3 = gethtml("https://api.gudvxty.com/App/Resource/Vurl/show", body2, headers); //log(html3)

        var list = JSON.parse(html3).list;
        let nnnmm = [];
        list.forEach(item => {
            // 获取play对象的所有值
            const playParams = Object.values(item.play);
            let lastParam = null;

            // 从数组的最后一个元素开始，向前查找，直到找到一个非空的param值
            for (let i = playParams.length - 1; i >= 0; i--) {
                if (playParams[i].param) {
                    lastParam = playParams[i].param;
                    break;
                }
            }

            // 使用正则表达式匹配vurl_id
            const vurlIdMatch = lastParam.match(/vurl_id=(\d+)/);
            const resolution=lastParam.match(/resolution=(\d+)/);
            // 如果匹配成功，将title和vurl_id组合后push到result数组
            if (vurlIdMatch) {
                nnnmm.push(`${item.title}$${vod_id}/${vurlIdMatch[1]}?${resolution[1]}`);
            }
        });
        VOD = {
            title: data2.vod_name,
            type: data2.videoTag.toString(),
            desc: data2.vod_use_content,
            vod_actor: data2.vod_actor,
            vod_area: data2.vod_area,
            vod_director: data2.vod_director,
            img: data2.vod_pic,
            vod_play_from: '拾光┃专线',
            vod_play_url: nnnmm.join('#')
        }
    }),
    搜索: $js.toString(() => {
        let d = [];
        function Encrypt(plainText) {
            let key = CryptoJS.enc.Utf8.parse("d6NYvF46X6WCePXs");
            let iv = CryptoJS.enc.Utf8.parse("SJx5AhSfmfS8FKYN");
            // 将文本加密为 AES/CBC/PKCS5Padding 格式
            let encrypted = CryptoJS.AES.encrypt(plainText, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            });

            // 获取加密结果并转为 Hex 格式
            let encryptedHex = encrypted.ciphertext.toString(CryptoJS.enc.Hex);
            return encryptedHex.toUpperCase(); // 返回大写 Hex 格式
        }
        function Decrypt(word, key, iv) {
            let encryptedHexStr = CryptoJS.enc.Hex.parse(word);

            // 使用AES/CBC/PKCS5Padding模式进行解密
            let decrypt = CryptoJS.AES.decrypt({
                ciphertext: encryptedHexStr
            }, key, {
                iv: iv,
                mode: CryptoJS.mode.CBC, // 使用CBC模式
                padding: CryptoJS.pad.Pkcs7 // 使用PKCS#7填充
            });

            // 将解密后的数据转换为原始文本
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);

            // 返回解密后的文本
            return decryptedStr;
        }
        function getbody3(key, t) {
            var signature = 'token_id=,token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9,phone_type=1,request_key=' + key + ',app_id=1,time=' + t + ',keys=wO+cY1PR2IhWbxyQYyW/vBjFVZO/2EfRN5+Mw2KIiiprdIQ4rPSNMQr1CszeXqqltypYdDQdL/QH7Pby4v46RCiRt5yC1utJRLYb8+isvakfidsMDmNgDxvIKfIFL4mMbc3LUF/LnMKdfKAEKLIby33z5k5HYzbLMo+88Gl6K08=*&zvdvdvddbfikkkumtmdwqppp?|4Y!s!2br'; //log(signature)
            var signature2 = md5(signature); //log(signature2)
            var body = 'token=67361949d9e064a822937ad97dba1a06.6c9f4d488acfee00b79db1a32c86289cc36df31794aa3435fbb2af7db397b8f21fa622f33e8d24a8ed85ff09727e86ca348502da5dcc7055b241c687747c2dc94550ac31ffe64f85f6ee38d9003b658675e0b729058686d0e867e905e7973238fb4a8da50ffd4f792ab79e424df2f580fdb09aa408cb4a6135957e4a0e28c08e7ab8d99b08b1dc7f30db12557d250050.c8252ccde5b1b0e534b7388d32a3848dc65d5bd835bc056f4ce2679662cc0ae9&token_id=&phone_type=1&time=' + t + '&phone_model=xiaomi-22021211rc&keys=wO%2BcY1PR2IhWbxyQYyW%2FvBjFVZO%2F2EfRN5%2BMw2KIiiprdIQ4rPSNMQr1CszeXqqltypYdDQdL%2FQH7Pby4v46RCiRt5yC1utJRLYb8%2BisvakfidsMDmNgDxvIKfIFL4mMbc3LUF%2FLnMKdfKAEKLIby33z5k5HYzbLMo%2B88Gl6K08%3D&request_key=' + key + '&signature=' + signature2 + '&app_id=1&ad_version=1';
            return body
        }
        const bodykey = "MIICdgIBADANBgkqhkiG9w0BAQEFAASCAmAwggJcAgEAAoGAe6hKrWLi1zQmjTT1ozbE4QdFeJGNxubxld6GrFGximxfMsMB6BpJhpcTouAqywAFppiKetUBBbXwYsYU1wNr648XVmPmCMCy4rY8vdliFnbMUj086DU6Z+/oXBdWU3/b1G0DN3E9wULRSwcKZT3wj/cCI1vsCm3gj2R5SqkA9Y0CAwEAAQKBgAJH+4CxV0/zBVcLiBCHvSANm0l7HetybTh/j2p0Y1sTXro4ALwAaCTUeqdBjWiLSo9lNwDHFyq8zX90+gNxa7c5EqcWV9FmlVXr8VhfBzcZo1nXeNdXFT7tQ2yah/odtdcx+vRMSGJd1t/5k5bDd9wAvYdIDblMAg+wiKKZ5KcdAkEA1cCakEN4NexkF5tHPRrR6XOY/XHfkqXxEhMqmNbB9U34saTJnLWIHC8IXys6Qmzz30TtzCjuOqKRRy+FMM4TdwJBAJQZFPjsGC+RqcG5UvVMiMPhnwe/bXEehShK86yJK/g/UiKrO87h3aEu5gcJqBygTq3BBBoH2md3pr/W+hUMWBsCQQChfhTIrdDinKi6lRxrdBnn0Ohjg2cwuqK5zzU9p/N+S9x7Ck8wUI53DKm8jUJE8WAG7WLj/oCOWEh+ic6NIwTdAkEAj0X8nhx6AXsgCYRql1klbqtVmL8+95KZK7PnLWG/IfjQUy3pPGoSaZ7fdquG8bq8oyf5+dzjE/oTXcByS+6XRQJAP/5ciy1bL3NhUhsaOVy55MHXnPjdcTX0FaLi+ybXZIfIQ2P4rb19mVq1feMbCXhz+L1rG8oat5lYKfpe8k83ZA==";
        function gethtml(u, body, headers) {
            var hd = fetch(u, {
                headers: headers,
                body: body,
                method: 'POST',
                rejectCoding: true
            });
            var banner = JSON.parse(hd).data;
            var response_key = banner.response_key; //log()
            //console.log("response_key=="+response_key)
            var keys = banner.keys; //log(keys)
            var bodykeyiv = JSON.parse(RSA.decode(keys, bodykey));
            //console.log("rsaxxxx=="+JSON.stringify(bodykeyiv))
            var key = CryptoJS.enc.Utf8.parse(bodykeyiv.key);
            var iv = CryptoJS.enc.Utf8.parse(bodykeyiv.iv);
            var html = Decrypt(response_key, key, iv);
            //console.log("nskjsnwkjdnejd===qqxxxq="+JSON.stringify(html))
            return html
        }
        var timestamp = new Date().getTime() / 1000;
        var t = timestamp.toString().split('.')[0];
        var url = input.split("#")[0];//url
        var request_key11 = input.split("#")[1]

        var request_key = JSON.stringify({ "keywords": request_key11, "order_val": "1" })
        //console.log("nskjsnwkjdnejd===qqxxxq=tttt"+request_key)
        var request_key2 = Encrypt(request_key);
        var body = getbody3(request_key2, t)
        var headers = {
            'Cache-Control': 'no-cache',
            'Version': '2412021',
            'PackageName': 'com.eb9e6ade81.ja4f9c8233.r1f05873c420241229',
            'Ver': '1.9.3.11',
            'Referer': 'https://api.gudvxty.com',
            'X-Customer-Client-Ip': '127.0.0.1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Host': 'api.gudvxty.com',
            'Connection': 'Keep-Alive',
            'User-Agent': 'okhttp/3.12.0'
        }
        var html = gethtml(url, body, headers)
        //console.log("nskjsnwkjdnejd===="+html)

        var list = JSON.parse(html).list; //log(list)
        //console.log("nskjsnwkjdnejd===qqqqq="+list)
        list.forEach(data => {
            d.push({
                title: data.vod_name,
                desc: data.vod_continu == 0 ? '电影' : '更新至'+data.vod_continu+'集',
                content: data.vod_addtime,
                img: data.vod_pic,
                url: `${data.vod_id}/${data.vod_continu}`,
            })
        })
        setResult(d)
    }),
}