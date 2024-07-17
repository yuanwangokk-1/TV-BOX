export default {
    deviceid: 'TVBox_TW96aWxsYS81LjAgKFdpbmRvd3MgTlQgNi4xOyBXa',
    serverurl: '',
    userid: '',
    accesstoken: '',
    self: this,

    init: function (exten) {
        var ext = JSON.parse(exten);
        this.serverurl = ext.server;
        var data = {"Username": ext.username, "Pw": ext.password};
        var url = this.serverurl + '/Users/authenticatebyname';
        var opt = {
            'method': 'post',
            'headers': { "X-Emby-Authorization": this.getXEmbyAuthorizationWithoutToken() },
            'data': data,
            'redirect': 0
        }

        var rsp = req(url, opt);
        var rspheader = rsp.headers;
        var rspcontent = rsp.content;
        rspcontent = JSON.parse(rspcontent);
        this.accesstoken = rspcontent.AccessToken;
        this.userid = rspcontent.User.Id;
        console.log('accesstoken', this.accesstoken);
        console.log('userid', this.userid);
    },

    home: function (filter) {
        var result = { "class": [] };
        var url = "/Users/" + this.userid + "/Views";
        var views = this.get(url);
        views = views['Items'] || [];
        views.forEach(function (element) {
            result["class"].push({ "type_id": element["Id"], "type_name": element["Name"] });
        });
        result = JSON.stringify(result);
        return result
    },

    homeVod: function () {
        let result = {"list":[]};
        let homerec = this.GetLatest('');
        if(homerec){
            for(var i=0;i<homerec.length;i++){
                let v = homerec[i];
                result["list"].push({
                    "vod_id": v["Id"],
                    "vod_name": v["Name"],
                    "vod_pic": this.getPrimaryImgUrl(v),
                    "vod_remarks": ""
                });
            }
        }
        result = JSON.stringify(result);
        return result;
    },

    category: function (tid, pg, filter, obj) {
        var result = {};
        var limit = 100;
        var pageCount = 1;
        var page = pg;
        var totalCount = 0;

        if (page == 0) page = 1;
        var url = "/Users/" + this.userid + "/Items/" + tid;
        var Collection = this.get(url);
        if (!Collection) return "{}"

        var Type = Collection["CollectionType"] || '';
        var ItemsUrl = "/Users/" + this.userid + "/Items?ParentId=" + tid + "&Limit=" + limit;
        ItemsUrl += "&Recursive=true&Fields=PrimaryImageAspectRatio,BasicSyncInfo,Seasons,Episodes&ImageTypeLimit=1";
        ItemsUrl += "&EnableImageTypes=Primary,Backdrop,Banner,Thumb";
        ItemsUrl += "&SortBy=DateCreated,SortName,ProductionYear&SortOrder=Descending";

        if (Type === "tvshows") {
            ItemsUrl += "&IncludeItemTypes=Series";
        } else if (Type === "movies") {
            ItemsUrl += "&IncludeItemTypes=Movie";
        } else {
            ItemsUrl += "&IncludeItemTypes=Movie,Series";
        }
        var startIndex = page * limit - limit;
        ItemsUrl += "&StartIndex=" + startIndex;

        var Items = this.get(ItemsUrl);
        var totalCount = Items["TotalRecordCount"];
        Items = Items['Items'] || [];
        var videos = [];
        var superServerurl = this.serverurl;
        Items.forEach(function (ele) {
            var itemid = ele["Id"];
            var imgurl = ele["ImageTags"]["Primary"];
            imgurl = superServerurl + "/Items/" + itemid + "/Images/Primary?fillHeight=286&fillWidth=200&quality=96&tag=" + imgurl;
            videos.push({
                "vod_id": itemid,
                "vod_name": ele["Name"],
                "vod_pic": imgurl,
                "vod_remarks": ""
            });
        });
        result["page"] = pg;
        result["pagecount"] = Math.ceil(totalCount / limit);
        result["limit"] = limit;
        result["total"] = totalCount;
        result["list"] = videos;
        result = JSON.stringify(result);
        return result;
    },

    detail: function (ids) {
        var detailUrl = "/Users/" + this.userid + "/Items/" + ids;

        var detail = this.get(detailUrl);
        if (!detail) return "{}"

        let vodid = detail["Id"];
        let vodname = detail['Name'];
        let People = detail['People'];
        let actor = [];
        let director = [];
        let PartCount = detail['PartCount'] || 0;
        if (People) {
            People.forEach((ele) => {
                let Name = ele['Name'];
                let Type = ele['Type'];
                if (Type === 'Director') director.push(Name);
                else actor.push(Name);
            });
        }

        let vod_play_url = detail["Type"] === "Series" ? this.getEpisodes(vodid) : (vodname + "$" + vodid);

        if(PartCount > 0){
            let addPart = this.GetAddPart(vodid);
            addPart = addPart["Items"] || [];
            addPart.forEach((ele)=>{
                let apurl = ele["Name"] + "$" + ele["Id"];
                vod_play_url += "#" + apurl;
            });
        }

        let vod = {
            "vod_id": vodid,
            "vod_name": vodname,
            "vod_pic": this.getPrimaryImgUrl(detail),
            "type_name": detail["Genres"] ? detail["Genres"].join(',') : '',
            "vod_year": detail["ProductionYear"] || '',
            "vod_area": detail['ProductionLocations'] ? detail['ProductionLocations'].join(',') : '',
            "vod_remarks": detail["CommunityRating"] || '',
            "vod_actor": actor.join(','), //演员
            "vod_director": director.join(','),   //导演
            "vod_content": detail["Overview"] || '',
            "vod_play_from": "Emby",
            "vod_play_url": vod_play_url
        }

        let result = {
            "list": [vod]
        };

        result = JSON.stringify(result);
        return result;
    },

    getEpisodes: function (SeriesId) {
        let SeasonsUrl = "/Shows/" + SeriesId + "/Seasons?userId=" + this.userid;
        SeasonsUrl += "&Fields=ItemCounts,PrimaryImageAspectRatio,BasicSyncInfo,MediaSourceCount";

        let Seasons = this.get(SeasonsUrl);
        if (!Seasons) return "";

        Seasons = Seasons["Items"] || [];
        var superServerurl = this.serverurl;
        var superUserid = this.userid;
        var self = this;
        let result = [];
        Seasons.forEach((ele) => {
            let seasonName = ele["Name"];
            let seasonId = ele["Id"];
            let EpisodesUrl = "/Shows/" + SeriesId + "/Episodes?seasonId=" + seasonId;
            EpisodesUrl += "&userId=" + superUserid;
            EpisodesUrl += "&Fields=ItemCounts,PrimaryImageAspectRatio,BasicSyncInfo,CanDelete,MediaSourceCount,Overview";
            let Episodes = self.get(EpisodesUrl);
            if (!Episodes) return;
            Episodes = Episodes["Items"];
            for (var j = 0; j < Episodes.length; j++) {
                let Episode = Episodes[j];
                let EpisodeId = Episode["Id"];
                let EpisodeName = Episode["Name"];
                let PlayUrl = EpisodeId;
                result.push(seasonName + "_第" + (j + 1) + "集_" + EpisodeName + "$" + PlayUrl);
            }
        });

        result = result.join("#")
        return result;
    },

    search: function (key, quick) {
        let searchUrl = "/Users/" + this.userid + "/Items?searchTerm=" + encodeURI(key);
        searchUrl += "&Limit=24&Fields=PrimaryImageAspectRatio,CanDelete,BasicSyncInfo,MediaSourceCount";
        searchUrl += "&Recursive=true&EnableTotalRecordCount=false&ImageTypeLimit=1&IncludePeople=false";
        searchUrl += "&IncludeMedia=true&IncludeGenres=false&IncludeStudios=false&IncludeArtists=false";
        searchUrl += "&IncludeItemTypes=Movie,Series" //,Episode";

        let searchResult = this.get(searchUrl);
        let result = { "list": [] }
        if (!searchResult) return JSON.stringify(result);
        searchResult = searchResult["Items"] || [];
        for (var i = 0; i < searchResult.length; i++) {
            let v = searchResult[i];
            result["list"].push({
                "vod_id": v["Id"],
                "vod_name": v["Name"],
                "vod_pic": this.getPrimaryImgUrl(v),
                "vod_remarks": ""
            });
        }

        result = JSON.stringify(result);
        return result;
    },

    play: function (flag, id, vipFlags) {
        let playUrl = this.serverurl + "/videos/" + id + "/stream.mp4?static=true&deviceId=" + this.deviceid;
        playUrl += "&api_key=" + this.accesstoken //+ "&Tag=" + ETag
        let result = {
            "parse": 0,
            "playUrl": "",
            "url": playUrl
        }

        result = JSON.stringify(result);
        return result;
    },

     /**
     * 获取最新项目
     *
     * @param parentId
     * @param cb
     */
     GetLatest: function(parentId) {
        let lastestUrl = "/Users/" + this.userid + "/Items/Latest?";
        lastestUrl += "Limit=16&Fields=PrimaryImageAspectRatio%2CBasicSyncInfo%2CPath";
        lastestUrl += "&ImageTypeLimit=1&EnableImageTypes=Primary,Backdrop,Thumb";
        lastestUrl += "&IncludeItemTypes=Movie,Series";

        //lastestUrl += "&ParentId=" + parentId;
        let latest = this.get(lastestUrl) || [];
        return latest
    },

    /**
     * 获取项目附加部分
     */
    GetAddPart:function(itemid) {
        let AddPartUrl = "/Videos/" + itemid + "/AdditionalParts?userId=" + this.userid;
        let addPart = this.get(AddPartUrl);
        return addPart;
    },

    getPrimaryImgUrl: function (item) {
        let PrimaryUrl = item["ImageTags"]["Primary"] || "";
        let url = this.serverurl + "/Items/" + item["Id"] + "/Images/Primary";
        url += "?fillHeight=286&fillWidth=200&quality=96&tag=" + PrimaryUrl;
        return url;
    },

    getXEmbyAuthorization: function () {
        var XEmbyAuthorization = 'MediaBrowser Client="TVBox", Device="TVBox", DeviceId="' + this.deviceid + '", Version="1.0.0"';
        XEmbyAuthorization += ', Token="' + this.accesstoken + '"';
        return XEmbyAuthorization;
    },

    getXEmbyAuthorizationWithoutToken: function () {
        var XEmbyAuthorization = 'MediaBrowser Client="TVBox", Device="TVBox", DeviceId="' + this.deviceid + '", Version="1.0.0"';
        return XEmbyAuthorization;
    },

    send: function (url, data, method) {
        url = this.serverurl + url;
        var opt = {
            'method': method,
            'headers': { "X-Emby-Authorization": this.getXEmbyAuthorization() },
            'data': data,
            'redirect': 0
        }

        var rsp = req(url, opt);
        var rspheader = rsp.headers;
        var rspcontent = rsp.content;
        rspcontent = JSON.parse(rspcontent);
        return rspcontent;
    },

    get: function (url) {
        return this.send(url, null, 'get');
    },

    post: function (url, data) {
        return this.send(url, data, 'post');
    }

};