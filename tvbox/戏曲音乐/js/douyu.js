var rule = {
    title: '斗鱼直播',
    host: 'https://m.douyu.com',
    homeUrl: '/api/home/mix',//网站的首页链接,用于分类获取和推荐获取
    // url:'/api/room/list?page=fypage&type=fyclass',
    url: '/api/room/list?page=fypage&type=fyfilter',
    filterable: 1,//是否启用分类筛选,
    filter_url: '{{fl.cateId}}',
    filter: {
        "PCgame": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "PCgame"}, {"n": "英雄联盟", "v": "LOL"}, {
                "n": "热门游戏",
                "v": "rmyx"
            }, {"n": "穿越火线", "v": "CF"}, {"n": "超击突破", "v": "SuperPeople"}, {
                "n": "CFHD",
                "v": "CFHD"
            }, {"n": "使命召唤", "v": "COD"}, {"n": "DNF", "v": "DNF"}, {"n": "DOTA2", "v": "DOTA2"}, {
                "n": "炉石传说",
                "v": "How"
            }, {"n": "CS:GO", "v": "CSGO"}, {"n": "无畏契约", "v": "VALORANT"}, {
                "n": "lol云顶之弈",
                "v": "ydzhy"
            }, {"n": "魔兽争霸", "v": "mszb"}, {"n": "魔兽怀旧服", "v": "wowclassic"}, {
                "n": "自走棋",
                "v": "dota2rpg"
            }, {"n": "传奇", "v": "cq"}, {"n": "跑跑卡丁车", "v": "Popkart"}, {
                "n": "网易游戏",
                "v": "wyyx"
            }, {"n": "星际争霸", "v": "SC"}, {"n": "格斗游戏", "v": "FTG"}, {
                "n": "守望先锋",
                "v": "Overwatch"
            }, {"n": "DOTA", "v": "DOTA"}, {"n": "魔兽世界", "v": "WOW"}, {"n": "剑网3", "v": "JX3"}, {
                "n": "魔域",
                "v": "EudemonsOnline"
            }, {"n": "我的世界", "v": "MC"}, {"n": "超激斗梦境", "v": "cjdmj"}, {
                "n": "冒险岛",
                "v": "mxd"
            }, {"n": "三国杀", "v": "sanguosha"}, {"n": "梦幻西游", "v": "MHXYOL"}, {
                "n": "天涯明月刀",
                "v": "tianya"
            }, {"n": "街头篮球", "v": "jtlq"}, {"n": "NBA2KOL2", "v": "NBA2KOL2"}, {
                "n": "QQ飞车端游",
                "v": "qqfcdy"
            }, {"n": "战地之王", "v": "AVA"}, {"n": "军事游戏", "v": "jsyx"}, {
                "n": "棋牌娱乐",
                "v": "qipai"
            }, {"n": "FIFAONLINE4", "v": "FOL4"}, {"n": "热门网游", "v": "rmwy"}, {
                "n": "诛仙世界",
                "v": "zxsj"
            }, {"n": "千古风流", "v": "qgflpc"}, {"n": "APEX", "v": "APEX"}, {
                "n": "流放之路POE",
                "v": "PathofExile"
            }, {"n": "剑网3缘起", "v": "JW3YQ"}, {"n": "逆水寒", "v": "nsh"}, {
                "n": "风暴英雄",
                "v": "HOTS"
            }, {"n": "逆战", "v": "NZ"}, {"n": "坦克世界", "v": "TKSJ"}, {
                "n": "战舰世界",
                "v": "wfws"
            }, {"n": "巫师之昆特牌", "v": "wszktp"}, {"n": "反恐精英Online", "v": "CS"}, {
                "n": "暗黑破坏神",
                "v": "DIABLO"
            }, {"n": "梦三国2", "v": "msg2"}, {"n": "传奇世界", "v": "cqsj"}, {
                "n": "方舟：生存进化",
                "v": "fzscjh"
            }, {"n": "神武4电脑版", "v": "swdnb"}, {"n": "群雄逐鹿", "v": "qxzl"}, {
                "n": "堡垒之夜",
                "v": "blzy"
            }, {"n": "无限法则", "v": "roe"}, {"n": "问道电脑版", "v": "wddnb"}, {
                "n": "西山居游戏",
                "v": "Seasun"
            }, {"n": "最终幻想14", "v": "FF14"}, {"n": "战意", "v": "WYZY"}, {
                "n": "剑灵",
                "v": "BladeSoul"
            }, {"n": "星际战甲", "v": "Warframe"}, {"n": "龙之谷", "v": "DragonNest"}, {
                "n": "铁甲雄兵",
                "v": "tjxb"
            }, {"n": "古剑奇谭网络版", "v": "gjqtwlb"}, {"n": "轩辕传奇", "v": "XYCQ"}, {
                "n": "神途",
                "v": "shentu"
            }, {"n": "激战2", "v": "GuildWars2"}, {"n": "高达文化区", "v": "gdyxq"}, {
                "n": "忍者村大战2",
                "v": "rzcdz2"
            }, {"n": "RPG网游专区", "v": "rpgwyzq"}, {"n": "诛仙3", "v": "zhuxian3"}, {
                "n": "笑傲江湖OL",
                "v": "xajhol"
            }, {"n": "冒险岛2", "v": "MXD2"}, {"n": "无尽战区", "v": "WJZQ"}, {
                "n": "永恒之塔",
                "v": "AION"
            }, {"n": "竞速游戏", "v": "jingsu"}, {"n": "九阴真经", "v": "JYZJ"}, {
                "n": "FPS综合网游",
                "v": "FPSOL"
            }, {"n": "劲舞团", "v": "jwt"}, {"n": "天下", "v": "tianxai"}, {
                "n": "火箭联盟",
                "v": "hjlm"
            }, {"n": "泡泡堂", "v": "ppt"}, {"n": "音乐游戏", "v": "MG"}, {
                "n": "新倩女幽魂",
                "v": "ONLINE"
            }, {"n": "创世战车", "v": "cszc"}, {"n": "天谕", "v": "tianyu"}, {
                "n": "征途2",
                "v": "zhengtu2"
            }, {"n": "QQ炫舞", "v": "qqxw"}, {"n": "泰亚史诗", "v": "tyss"}, {
                "n": "大唐无双",
                "v": "dtws"
            }, {"n": "怪物猎人ol", "v": "MHol"}, {"n": "星战前夜：晨曦", "v": "EVE"}, {
                "n": "热血传奇怀旧版",
                "v": "rxcqhjsgb"
            }, {"n": "仙侠世界2", "v": "xxsj2"}, {"n": "枪火重生", "v": "qhcs"}, {
                "n": "彩虹岛",
                "v": "CHD"
            }, {"n": "御龙在天", "v": "YLZT"}, {"n": "英魂之刃", "v": "YHZR"}, {
                "n": "自由篮球",
                "v": "ZYLQ"
            }, {"n": "洛奇英雄传", "v": "LQYXZ"}, {"n": "封印者", "v": "FYZ"}, {
                "n": "合金弹头",
                "v": "HJDT"
            }, {"n": "新英雄年代", "v": "XYXSD"}, {"n": "星尘传说", "v": "XCCS"}, {
                "n": "盛趣游戏",
                "v": "SQYX"
            }, {"n": "新热血英豪", "v": "XRXYH"}, {"n": "沙盒游戏", "v": "SHYX"}, {
                "n": "我的世界：地下城",
                "v": "MD"
            }, {"n": "恐鬼症", "v": "KGZ"}, {"n": "领地人生", "v": "LDRS"}, {
                "n": "梦塔防",
                "v": "TDOTK"
            }, {"n": "重生边缘", "v": "CSBYOL"}, {"n": "大话西游2", "v": "dhxy2"}, {
                "n": "猎人",
                "v": "lr"
            }, {"n": "天子剑", "v": "tianzijian"}, {"n": "热血江湖online", "v": "rxjhol"}, {
                "n": "千年3",
                "v": "qn3"
            }, {"n": "天空之城", "v": "tkzc"}, {"n": "诺亚传说", "v": "nycs"}, {
                "n": "鹿鼎记",
                "v": "ldj"
            }, {"n": "新桃花源记", "v": "xthyj"}, {"n": "武魂2电脑版", "v": "wh2pc"}, {
                "n": "奇迹世界sun",
                "v": "qjsjsun"
            }, {"n": "地城之光", "v": "dczg"}, {"n": "剑侠世界2电脑版", "v": "jxsj2pc"}, {
                "n": "斩魂",
                "v": "zhpc"
            }, {"n": "大唐2", "v": "dt2pc"}, {"n": "幻想神域电脑版", "v": "hxsypc"}, {
                "n": "蜀山：初章",
                "v": "ssczpc"
            }, {"n": "狼人对决网游", "v": "lrdjpc"}, {"n": "武林群侠传", "v": "wlqxzpc"}, {
                "n": "卡拉彼丘",
                "v": "klbq"
            }, {"n": "破天一剑", "v": "ptyj"}, {"n": "剑雨江湖", "v": "jyjh"}, {
                "n": "四国军棋",
                "v": "sgjq"
            }, {"n": "命运方舟", "v": "LostArk"}, {"n": "新大话西游3", "v": "xy3"}, {
                "n": "暴雪游戏综合",
                "v": "g_bliz"
            }, {"n": "Battlebit", "v": "BBR"}, {"n": "长尾4部虚拟分区", "v": "cw4bxnfq"}, {
                "n": "幕后高手",
                "v": "VEILEDEXPERTS"
            }, {"n": "燕云十六声", "v": "WHEREWINDSMEET"}, {"n": "THEFINALS", "v": "THEFINALS"}, {
                "n": "NBA2KOnline",
                "v": "NBA2KOL"
            }, {"n": "塔瑞斯世界", "v": "Tarisland"}, {"n": "跑跑卡丁车：漂移", "v": "KartRiderDrift"}, {
                "n": "传奇永恒",
                "v": "EternalLegend"
            }, {"n": "权力的游戏凛冬将至页游", "v": "GOTPC"}, {"n": "全境封锁2", "v": "TheDivision2"}, {
                "n": "落日余晖",
                "v": "Farlight84"
            }]
        }],
        "djry": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "djry"}, {"n": "主机游戏", "v": "TVgame"}, {
                "n": "刺客信条:英灵殿",
                "v": "AC"
            }, {"n": "马里奥制造", "v": "Mario"}, {"n": "逃离塔科夫", "v": "EFT"}, {
                "n": "命运2",
                "v": "MY2"
            }, {"n": "EvilDead", "v": "EvilDead"}, {"n": "恐怖游戏", "v": "Horror"}, {
                "n": "荒野大镖客",
                "v": "hydbk"
            }, {"n": "九劫曲", "v": "jjq"}, {"n": "灵魂筹码", "v": "lhcm"}, {
                "n": "骑马与砍杀",
                "v": "MountAndBlade"
            }, {"n": "只狼", "v": "ZL"}, {"n": "饥荒", "v": "DontStarve"}, {
                "n": "全境封锁",
                "v": "qjfs"
            }, {"n": "怀旧游戏", "v": "classic"}, {"n": "NBA2K", "v": "NBA2K"}, {
                "n": "八方旅人",
                "v": "OT"
            }, {"n": "血污：夜之仪式", "v": "Blood"}, {"n": "人类一败涂地", "v": "Human"}, {
                "n": "挺进地牢",
                "v": "Enter"
            }, {"n": "环世界", "v": "RimWorld"}, {"n": "古墓丽影", "v": "gmly"}, {
                "n": "鬼泣",
                "v": "DMC"
            }, {"n": "往日不再", "v": "WRBZ"}, {"n": "仙剑奇侠传", "v": "PAL"}, {
                "n": "神秘海域",
                "v": "Uncharted"
            }, {"n": "塞尔达系列", "v": "TLoZ"}, {"n": "僵尸世界大战", "v": "WWZ"}, {
                "n": "足球游戏",
                "v": "zq"
            }, {"n": "橙光", "v": "cg"}, {"n": "了不起的修仙模拟器", "v": "ACS"}, {
                "n": "女神异闻录",
                "v": "P5"
            }, {"n": "斯普拉遁", "v": "Splatoon"}, {"n": "超级马里奥", "v": "SMO"}, {
                "n": "三国志系列",
                "v": "Sangokushi"
            }, {"n": "星际公民", "v": "StarCitizen"}, {"n": "最终幻想", "v": "FF"}, {
                "n": "中土世界：战争之影",
                "v": "MiddleEarth"
            }, {"n": "流放者柯南", "v": "Conan"}, {"n": "深海迷航", "v": "Subnautica"}, {
                "n": "三国群英传",
                "v": "SANGO"
            }, {"n": "腐烂国度", "v": "SoD2"}, {"n": "无主之地", "v": "Bor"}, {
                "n": "圣女战旗",
                "v": "Banner"
            }, {"n": "哆啦A梦：牧场物语", "v": "Doraemon"}, {"n": "太吾绘卷", "v": "twhj"}, {
                "n": "SCUM",
                "v": "Scum"
            }, {"n": "以撒的结合", "v": "Isaac"}, {"n": "文明", "v": "CVI"}, {"n": "仁王", "v": "NIOH"}, {
                "n": "缺氧",
                "v": "ONI"
            }, {"n": "JUMP大乱斗", "v": "JUMPDLD"}, {"n": "皇牌空战", "v": "hpkz"}, {
                "n": "体育游戏",
                "v": "tyyx"
            }, {"n": "海岛大亨", "v": "hddh"}, {"n": "植物大战僵尸:花园战争系列", "v": "PvsZ"}, {
                "n": "蜘蛛侠",
                "v": "Spide"
            }, {"n": "战国无双", "v": "ZGWS"}, {"n": "勇者斗恶龙：建造者2", "v": "DQB2"}, {
                "n": "遗迹：灰烬重生",
                "v": "Rem"
            }, {"n": "血源", "v": "BB"}, {"n": "旺达与巨像", "v": "SotC"}, {
                "n": "死亡搁浅",
                "v": "DS"
            }, {"n": "模拟人生", "v": "Sims"}, {"n": "空洞骑士", "v": "HKS"}, {
                "n": "极品飞车",
                "v": "jpfc"
            }, {"n": "地铁:离去", "v": "ME"}, {"n": "孢子", "v": "Spore"}, {
                "n": "暗黑地牢",
                "v": "DD"
            }, {"n": "生死狙击2", "v": "ssjjtwo"}, {"n": "三国战纪", "v": "sgzj"}, {
                "n": "怀旧FC",
                "v": "edwcy"
            }, {"n": "经典单机", "v": "jddj"}, {"n": "英雄无敌", "v": "HoMM"}, {
                "n": "街机游戏",
                "v": "jjyx"
            }, {"n": "合金装备", "v": "MetalGear"}, {"n": "红色警戒", "v": "hsjj"}, {
                "n": "星球大战系列",
                "v": "StarWars"
            }, {"n": "镜之边缘", "v": "MsE"}, {"n": "大将军：罗马", "v": "Rome"}, {
                "n": "火焰纹章系列",
                "v": "FireEmblem"
            }, {"n": "星露谷物语", "v": "Stardew"}, {"n": "火炬之光", "v": "Torchlight"}, {
                "n": "赛博朋克2077",
                "v": "Cyberpunk"
            }, {"n": "中国式家长", "v": "CP"}, {"n": "精灵宝可梦系列", "v": "Pokemon"}, {
                "n": "地牢围攻",
                "v": "DS3"
            }, {"n": "奇异人生", "v": "LiS"}, {"n": "少数幸运儿", "v": "WHF"}, {
                "n": "无人深空",
                "v": "NMS"
            }, {"n": "GT赛车7", "v": "GT"}, {"n": "超级机器人大战", "v": "SRW"}, {
                "n": "信长之野望",
                "v": "KOEINOBU"
            }, {"n": "这是我的战争", "v": "TWoM"}, {"n": "杀戮尖塔", "v": "sljt"}, {
                "n": "帝国时代",
                "v": "AoEIV"
            }, {"n": "死亡空间", "v": "swkj"}, {"n": "杀手", "v": "Hitman"}, {
                "n": "MUGEN",
                "v": "mugen"
            }, {"n": "足球经理", "v": "Football"}, {"n": "亿万僵尸", "v": "Billions"}, {
                "n": "一起玩农场",
                "v": "Farm"
            }, {"n": "武装突袭", "v": "ArmA"}, {"n": "荣耀战魂", "v": "Honor"}, {
                "n": "欧洲卡车模拟器",
                "v": "Truck"
            }, {"n": "漫漫长夜", "v": "mmcy"}, {"n": "永恒轮回", "v": "Survival"}, {
                "n": "孤岛惊魂",
                "v": "FarCry"
            }, {"n": "福尔摩斯", "v": "Holmes"}, {"n": "都市：天际线", "v": "Skylines"}, {
                "n": "盗贼之海",
                "v": "hdzh"
            }, {"n": "raft", "v": "raft"}, {"n": "Dayz", "v": "DayZ"}, {"n": "60秒", "v": "60S"}, {
                "n": "俄罗斯钓鱼",
                "v": "RF"
            }, {"n": "猎人：荒野的召唤", "v": "theHunter"}, {"n": "失落城堡", "v": "LC"}, {
                "n": "恐怖黎明",
                "v": "GD"
            }, {"n": "看门狗", "v": "kmg"}, {"n": "真三国无双", "v": "DW"}, {
                "n": "泰拉瑞亚",
                "v": "Terraria"
            }, {"n": "底特律:变人", "v": "Detroit"}, {"n": "恶魔城", "v": "Castlevania"}, {
                "n": "毁灭战士",
                "v": "Doom"
            }, {"n": "坎巴拉太空计划", "v": "Kerbal"}, {"n": "模拟山羊", "v": "GoatSim"}, {
                "n": "欧陆风云",
                "v": "EU"
            }, {"n": "乞丐模拟器", "v": "HoboToughLife"}, {"n": "小偷模拟器", "v": "ThiefSimulator"}, {
                "n": "逆转裁判",
                "v": "AceA"
            }, {"n": "深岩银河", "v": "DRGD"}, {"n": "植物大战僵尸", "v": "PvZ"}, {
                "n": "最后的绿洲",
                "v": "LO"
            }, {"n": "大富翁", "v": "RichMan"}, {"n": "英雄连", "v": "yxl"}, {
                "n": "永劫无间",
                "v": "NB"
            }, {"n": "破败王者", "v": "RK"}, {"n": "新世界", "v": "NW"}, {
                "n": "部落与弯刀",
                "v": "BLYWD"
            }, {"n": "森林", "v": "Forest"}, {"n": "kenshi", "v": "kenshi"}, {
                "n": "一起开火车！",
                "v": "Unrailed"
            }, {"n": "主机其他游戏", "v": "OG"}, {"n": "战场兄弟", "v": "ZCXD"}, {
                "n": "军团战争",
                "v": "jtzz"
            }, {"n": "人间地狱", "v": "RJDY"}, {"n": "战术小队", "v": "Squad"}, {
                "n": "弹丸论破",
                "v": "dwlp"
            }, {"n": "基佬大乱斗", "v": "jldld"}, {"n": "僵尸毁灭工程", "v": "jshmgc"}, {
                "n": "泰坦之旅",
                "v": "TTZL"
            }, {"n": "妖精的尾巴", "v": "FT"}, {"n": "超级兔子人", "v": "Bunny"}, {
                "n": "健身环大冒险",
                "v": "RFA"
            }, {"n": "冬日计划", "v": "drjh"}, {"n": "泰坦陨落", "v": "Titanfall"}, {
                "n": "四海兄弟",
                "v": "shxd"
            }, {"n": "创世理想乡", "v": "Craftopia"}, {"n": "地平线", "v": "Horizon"}, {
                "n": "幽灵线：东京",
                "v": "GTO"
            }, {"n": "生化危机4重制版", "v": "ResidentEvil"}, {"n": "怪物火车", "v": "GWHC"}, {
                "n": "瑞奇与叮当",
                "v": "RCL"
            }, {"n": "Grounded", "v": "Grounded"}, {"n": "小小梦魇", "v": "XXMM"}, {
                "n": "糖豆人",
                "v": "FallGuys"
            }, {"n": "盗贼遗产", "v": "TVV"}, {"n": "英灵神殿", "v": "Valheim"}, {
                "n": "部落：原始建造者",
                "v": "Tribe"
            }, {"n": "动物派对", "v": "Animals"}, {"n": "暗影火炬城", "v": "FIST"}, {
                "n": "阿尔比恩",
                "v": "Albion"
            }, {"n": "鬼谷八荒", "v": "GGBH"}, {"n": "极限竞速：地平线4", "v": "FH4"}, {
                "n": "恐惧之间",
                "v": "Fearsurrounds"
            }, {"n": "孤岛惊魂6", "v": "FarCry6"}, {"n": "怪物猎人", "v": "MonsterHunterRise"}, {
                "n": "仁王2",
                "v": "Nioh2"
            }, {"n": "三国志14", "v": "THREEKINGDOMSXIV"}, {
                "n": "神界：原罪2",
                "v": "DivinityOS2"
            }, {"n": "狙击手：幽灵战士契约2", "v": "SniperContracts2"}, {
                "n": "全面战争",
                "v": "TotalWarWARHAMMER"
            }, {"n": "战争机器：战术小队", "v": "GearsTactics"}, {
                "n": "侠之道",
                "v": "PathOfWuxia"
            }, {"n": "海绵宝宝：比奇堡的冒险", "v": "BattleforBikini"}, {
                "n": "奇妙探险队2",
                "v": "CuriousExpedition2"
            }, {"n": "刺客信条：奥德赛", "v": "Odyssey"}, {
                "n": "丧尸围城4",
                "v": "DeadRising4"
            }, {"n": "神秘海域2：纵横四海", "v": "AmongThieves"}, {
                "n": "神秘海域3：德雷克的诡计",
                "v": "DrakesDeception"
            }, {"n": "星球大战：前线", "v": "Battlefront"}, {"n": "灵魂旅人", "v": "SpiritFarerlhlr"}, {
                "n": "面容",
                "v": "Visage"
            }, {"n": "俄罗斯方块效应：连接", "v": "TetrisEffect"}, {
                "n": "SD高达G世纪：起源",
                "v": "SDGundamG"
            }, {"n": "Fate/EXTELLA", "v": "FateEXTELLA"}, {"n": "妖精剑士F", "v": "FairyFencerF"}, {
                "n": "荒神",
                "v": "Aragami"
            }, {"n": "晚班", "v": "LateShift"}, {"n": "光环战争", "v": "HaloWars"}, {
                "n": "子弹风暴",
                "v": "Bulletstorm"
            }, {"n": "暗黑迷途", "v": "2Dark"}, {"n": "巡警", "v": "BeatCop"}, {
                "n": "狙击精英4",
                "v": "SniperElite4"
            }, {"n": "三国志13：威力加强版", "v": "Sangokushi13"}, {
                "n": "热血物语：地下世界",
                "v": "RiverCityRansom"
            }, {"n": "史诗战争模拟器", "v": "BattleSimulator"}, {"n": "银河护卫队", "v": "Guardians"}, {
                "n": "讨鬼传2",
                "v": "Toukiden2"
            }, {"n": "闪乱神乐：少女们的选择", "v": "SenranKagura"}, {
                "n": "幽灵行动：荒野",
                "v": "GhostReconWildland"
            }, {"n": "白色情人节", "v": "WhiteDay"}, {
                "n": "美国职业摔角联盟2K17",
                "v": "WWE2K"
            }, {"n": "苏菲的炼金工房", "v": "AtelierSophie"}, {"n": "喷射侠", "v": "Splasher"}, {
                "n": "双截龙4",
                "v": "DoubleDragon4"
            }, {"n": "地下蚁国", "v": "Undergrowth"}, {"n": "九张羊皮纸", "v": "NineParchments"}, {
                "n": "咒语力量3",
                "v": "Spellforce3"
            }, {"n": "小兵大战", "v": "Warpips"}, {"n": "维京人人中之狼", "v": "VikingsWofM"}, {
                "n": "你好邻居",
                "v": "Helloneighbor"
            }, {"n": "寻找天堂", "v": "findparadise"}, {"n": "画中世界", "v": "Gorogoa"}, {
                "n": "桥梁工程师传送门",
                "v": "bridgecons"
            }, {"n": "现代战争", "v": "ModernCombat"}, {"n": "SCP：秘密实验室", "v": "scpsl"}, {
                "n": "绯红结系",
                "v": "SCARLETNEXUS"
            }, {"n": "罪恶装备：STRIVE", "v": "GuiltyGear"}, {
                "n": "涅克罗蒙达：赏金猎人",
                "v": "NHiredGun"
            }, {"n": "骑士精神2", "v": "Chivalry2"}, {"n": "最后的咒语", "v": "TheLastSpell"}, {
                "n": "真女神转生3",
                "v": "ShinMegami3"
            }, {"n": "工业崛起", "v": "RiseIndustry"}, {"n": "征服的荣耀：围城", "v": "SIEGE"}, {
                "n": "前往中世纪",
                "v": "GoMedieval"
            }, {"n": "伊始之地", "v": "TerraNil"}, {
                "n": "二之国2：亡灵之国",
                "v": "NinoKuniII"
            }, {"n": "二之国：白色圣灰的女王", "v": "NinoKuni"}, {
                "n": "进击的巨人2",
                "v": "AttackonTitan2"
            }, {"n": "航海日记2", "v": "hhrj2"}, {"n": "隐龙传：影踪", "v": "HiddenDragon"}, {
                "n": "魔域之书",
                "v": "Bookofdevil"
            }, {"n": "诸神灰烬：救赎", "v": "AshofGods"}, {"n": "自由人：游击战争", "v": "Freeman"}, {
                "n": "战国无双5",
                "v": "SWarriors5"
            }, {"n": "宇宙主义", "v": "TheUniversim"}, {"n": "死亡教堂", "v": "DeathCathedral"}, {
                "n": "灵魂能力6",
                "v": "SoulCalibur6"
            }, {"n": "不要喂食猴子", "v": "NotFeedMonkeys"}, {"n": "古剑奇谭3", "v": "GuJianqitan3"}, {
                "n": "日落过载",
                "v": "SunsetOverdrive"
            }, {"n": "幻影深渊", "v": "PhantomAbyss"}, {"n": "迷城重生", "v": "RebornCity"}, {
                "n": "剑士",
                "v": "KenshiJS"
            }, {"n": "GRIS", "v": "GRIS"}, {"n": "古剑奇谭：永夜", "v": "gujianyongye"}, {
                "n": "核爆RPG",
                "v": "ATOMRPG"
            }, {"n": "嗜血印", "v": "BloodySpell"}, {"n": "伊苏9", "v": "Ys9"}, {
                "n": "兽人必须死3",
                "v": "OrcsDie3"
            }, {"n": "狙击精英VR", "v": "SniperEliteVR"}, {"n": "遗忘之城", "v": "ForgotCity"}, {
                "n": "异种",
                "v": "Quarantine"
            }, {"n": "二人世界", "v": "WorldforTwo"}, {"n": "石炉", "v": "Stonehearth"}, {
                "n": "上帝之城：监狱帝国",
                "v": "CityofGod"
            }, {"n": "狂热运输2", "v": "TransportFever2"}, {"n": "机甲战士5", "v": "MechWarrior5"}, {
                "n": "DJMAX致敬",
                "v": "DJMAXRESPECT"
            }, {"n": "分手装修", "v": "ToolUP"}, {"n": "PICOPARK", "v": "PICOPARK"}, {
                "n": "光明记忆：无限",
                "v": "Brightmemory"
            }, {"n": "死亡之门", "v": "DeathsDoor"}, {"n": "侠盗公司", "v": "RogueCompany"}, {
                "n": "英雄传说：创之轨迹",
                "v": "HajimariNOKiseki"
            }, {"n": "战地系列", "v": "Battlefiel"}, {
                "n": "塞尔达传说：天空之剑HD",
                "v": "SkywardSword"
            }, {"n": "脑航员2", "v": "Psychonauts2"}, {"n": "12分钟", "v": "TwelveMinutes"}, {
                "n": "九十六号公路",
                "v": "Road96"
            }, {"n": "FORECLOSED", "v": "FORECLOSED"}, {"n": "黑书", "v": "theblackbook"}, {
                "n": "喋血复仇",
                "v": "Back4Blood"
            }, {"n": "死寂", "v": "DeathlyStillness"}, {"n": "审判之逝", "v": "Lostjudgment"}, {
                "n": "帝国神话",
                "v": "mythofempires"
            }, {"n": "艾尔登法环", "v": "ELDENRING"}, {"n": "互动派对", "v": "INTERACTIVEPARTY"}, {
                "n": "极限国度",
                "v": "RidersRepublic"
            }, {"n": "极限竞速：地平线5", "v": "ForzaHorizon5"}, {
                "n": "使命召唤系列",
                "v": "CALLOFDUTYCOD"
            }, {"n": "网吧模拟器", "v": "InternetCS"}, {"n": "文字游戏", "v": "WordGame"}, {
                "n": "消逝的光芒2",
                "v": "DyingLight2"
            }, {"n": "战神：诸神黄昏", "v": "GodofWarRagnarok"}, {"n": "师父", "v": "SIFU"}, {
                "n": "恶月十三",
                "v": "Undecember"
            }, {"n": "海上狼人杀", "v": "DreadHunger"}, {
                "n": "最终幻想：起源",
                "v": "STRANGEROFPARADISE"
            }, {"n": "地心护核者", "v": "CoreKeeper"}, {"n": "霍格沃茨之遗", "v": "HogwartsLegacy"}, {
                "n": "午夜猎魂",
                "v": "MidnightGhostHunt"
            }, {"n": "生死轮回", "v": "Loopmancer"}, {"n": "隐秘的角落", "v": "YinMiDeJiaoLuo"}, {
                "n": "江湖客栈",
                "v": "TheJianghu"
            }, {"n": "Overprime", "v": "Overprime"}, {"n": "森林之子", "v": "SonsOfTheForest"}, {
                "n": "弈仙牌",
                "v": "yixianpai"
            }, {"n": "夜族崛起", "v": "VRising"}, {"n": "漫威SNAP", "v": "MarvelSnap"}, {
                "n": "伏魔录",
                "v": "SoulDossier"
            }, {"n": "魔力宝贝", "v": "CrossGate"}, {"n": "弹幕互动玩法", "v": "DMHDXY"}, {
                "n": "木卫四协议",
                "v": "CallistoProtocol"
            }, {"n": "罗马复兴", "v": "RomanRenaissance"}, {"n": "风暴之门", "v": "StormGate"}, {
                "n": "游戏王：大师决斗",
                "v": "MasterDuel"
            }, {"n": "暗邪西部", "v": "EvilWest"}, {"n": "战锤40K：暗潮", "v": "40KDarktide"}, {
                "n": "索尼克未知边境",
                "v": "SonicFrontiers"
            }, {"n": "漂泊牧歌", "v": "WanderingVillage"}, {
                "n": "塞尔达传说：王国之泪",
                "v": "TEARSKINGDOM"
            }, {"n": "破碎线", "v": "Shatterline"}, {"n": "卧龙：苍天陨落", "v": "Wolong"}, {
                "n": "卡库远古封印",
                "v": "KAKU"
            }, {"n": "原子之心", "v": "AtomicHeart"}, {"n": "霓虹入侵者", "v": "FromSpace"}, {
                "n": "Warhaven",
                "v": "Warhaven"
            }, {"n": "宝可梦：朱/紫", "v": "ScarletandViolet"}, {
                "n": "第一后裔",
                "v": "TheFirstDescendant"
            }, {"n": "铳墓G.O.R.E.", "v": "GUNGRAVEGORE"}, {
                "n": "漫威暗夜之子",
                "v": "MarvelMidnightSuns"
            }, {"n": "奇怪的RPG", "v": "WeirdRPG"}, {"n": "东方：平野孤鸿", "v": "MomentinEast"}, {
                "n": "冰封之焰",
                "v": "FrozenFlame"
            }, {"n": "神之天平", "v": "ASTLIBRARevision"}, {"n": "伊克西翁", "v": "IXION"}, {
                "n": "主机一起看",
                "v": "zjyqk"
            }, {"n": "社交互动游戏", "v": "SJHDYX"}, {"n": "至暗时刻", "v": "DarkandDarker"}, {
                "n": "江湖十一",
                "v": "Jianghu11"
            }, {"n": "XDefiant", "v": "XDefiant"}, {"n": "狂野之心", "v": "WildHearts"}, {
                "n": "最终幻想16",
                "v": "FinalFantasyXVI"
            }, {"n": "街头霸王", "v": "StreetFighter"}, {"n": "零～月蚀的假面～", "v": "FATALFRAME"}, {
                "n": "魔戒：咕噜",
                "v": "Gollum"
            }, {"n": "幻兽帕鲁", "v": "Palworld"}, {"n": "沙盒与副本：英勇之地", "v": "HerosLand"}, {
                "n": "永恒天空",
                "v": "ForeverSkies"
            }, {"n": "逆光迷途", "v": "LostinDarklight"}, {"n": "迷瘴纪事", "v": "MiasmaChronicles"}, {
                "n": "蓝色协议",
                "v": "lansexieyi"
            }, {"n": "上古卷轴OL", "v": "TheElderScrolls"}, {"n": "OnlyUp", "v": "onlyup"}, {
                "n": "波斯王子：失落王冠",
                "v": "TheLostCrown"
            }]
        }],
        "syxx": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "syxx"}, {"n": "王者荣耀", "v": "wzry"}, {
                "n": "LOL手游",
                "v": "LOLM"
            }, {"n": "崩坏：星穹铁道", "v": "bhxqtd"}, {"n": "和平精英", "v": "hpjy"}, {
                "n": "暗区突围",
                "v": "aqtw"
            }, {"n": "幻塔", "v": "ht"}, {"n": "火影忍者", "v": "hyrz"}, {
                "n": "逆水寒手游",
                "v": "NSHM"
            }, {"n": "COD手游", "v": "smzhsy"}, {"n": "哈利波特：魔法觉醒", "v": "HarryPotter"}, {
                "n": "lol电竞经理",
                "v": "EGAME"
            }, {"n": "DNF手游", "v": "mdnf"}, {"n": "金铲铲之战", "v": "JGAME"}, {
                "n": "天刀手游",
                "v": "tdsy"
            }, {"n": "原神", "v": "yuanshen"}, {"n": "航海王热血航线", "v": "HHWRXHX"}, {
                "n": "万国觉醒",
                "v": "wgjx"
            }, {"n": "鸿图之下", "v": "htzx"}, {"n": "欢乐麻将", "v": "HLMJ"}, {
                "n": "王者模拟战",
                "v": "wzrpg"
            }, {"n": "中国象棋", "v": "ZGXQ"}, {"n": "天谕手游", "v": "tysy"}, {
                "n": "巅峰坦克",
                "v": "DFTK"
            }, {"n": "新游中心", "v": "xyzx"}, {"n": "热门手游", "v": "phone"}, {
                "n": "梦幻手游",
                "v": "mhxy"
            }, {"n": "QQ飞车", "v": "qqfcsy"}, {"n": "第五人格", "v": "dwrg"}, {
                "n": "欢乐斗地主",
                "v": "hlddz"
            }, {"n": "荒野乱斗", "v": "hyld"}, {"n": "阴阳师", "v": "yys"}, {
                "n": "狼人杀",
                "v": "LRS"
            }, {"n": "JJ斗地主", "v": "jj"}, {"n": "梦幻新诛仙", "v": "mhxzx"}, {
                "n": "街霸对决",
                "v": "jbdj"
            }, {"n": "一人之下", "v": "yrzx"}, {"n": "多多自走棋", "v": "zzq"}, {
                "n": "崩坏3",
                "v": "bhxl"
            }, {"n": "风云岛行动", "v": "fydxd"}, {"n": "云游戏", "v": "cloudgame"}, {
                "n": "跑跑手游",
                "v": "PPKDCSY"
            }, {"n": "率土之滨", "v": "stzb"}, {"n": "灌篮高手", "v": "glgs"}, {
                "n": "皇室战争",
                "v": "hszz"
            }, {"n": "忍者必须死3", "v": "rzbxs3"}, {"n": "神武4手游", "v": "sw3"}, {
                "n": "梦幻模拟战",
                "v": "mhmnz"
            }, {"n": "实况足球", "v": "skzq"}, {"n": "剑与远征", "v": "jyyz"}, {
                "n": "航海王：燃烧意志",
                "v": "hhwrsyz"
            }, {"n": "球球大作战", "v": "qqdzz"}, {"n": "英雄杀", "v": "yxs"}, {
                "n": "魔域口袋版",
                "v": "mykdb"
            }, {"n": "口袋新旅程", "v": "KDXLC"}, {"n": "剑网3：指尖江湖", "v": "jw3zjjh"}, {
                "n": "部落冲突",
                "v": "blct"
            }, {"n": "剑与家园", "v": "jyjy"}, {"n": "新笑傲江湖", "v": "xxajh"}, {
                "n": "猫和老鼠",
                "v": "mhls"
            }, {"n": "猎人手游", "v": "lrlr"}, {"n": "明日之后", "v": "mrzh"}, {
                "n": "影之诗",
                "v": "yzs"
            }, {"n": "决战平安京", "v": "jzpaj"}, {"n": "决斗之城", "v": "JDZC"}, {
                "n": "魂斗罗归来",
                "v": "DLHGL"
            }, {"n": "圣斗士星矢", "v": "sdsxs"}, {"n": "魔力宝贝手游", "v": "mlbbsy"}, {
                "n": "热血街篮",
                "v": "rxjl"
            }, {"n": "手游推广", "v": "rmsy"}, {"n": "魔灵召唤", "v": "mlzh"}, {
                "n": "香肠派对",
                "v": "xcpd"
            }, {"n": "迷你世界", "v": "MNSJ"}, {"n": "荒野行动", "v": "hyxd"}, {
                "n": "战双帕弥什",
                "v": "zspms"
            }, {"n": "大话西游2口袋版", "v": "dhxy2kdb"}, {"n": "FIFA足球世界", "v": "fifazqsj"}, {
                "n": "街篮",
                "v": "jl"
            }, {"n": "一起来捉妖", "v": "yiqilaizhuoyao"}, {"n": "明日方舟", "v": "mrfz"}, {
                "n": "自由幻想手游",
                "v": "zyhx"
            }, {"n": "一梦江湖", "v": "ymjh"}, {"n": "完美世界手游", "v": "wmsjsy"}, {
                "n": "拳皇98OL",
                "v": "kof98"
            }, {"n": "赛尔号", "v": "srh"}, {"n": "猎魂觉醒", "v": "lhjx"}, {
                "n": "仙境传说",
                "v": "xjcs"
            }, {"n": "流星群侠传", "v": "liuxinghudiejian"}, {"n": "特色手游", "v": "tssy"}, {
                "n": "逃跑吧少年",
                "v": "tpbsn"
            }, {"n": "弹弹堂", "v": "TTT"}, {"n": "石器时代", "v": "sqsd"}, {
                "n": "RPG手游",
                "v": "rpgsy"
            }, {"n": "英魂之刃口袋版", "v": "yh"}, {"n": "拉结尔", "v": "lje"}, {
                "n": "倩女幽魂手游",
                "v": "qnyhsy"
            }, {"n": "决斗之城2", "v": "jdzc2"}, {"n": "传奇手游", "v": "cqsy"}, {
                "n": "雀魂",
                "v": "Majsoul"
            }, {"n": "二次元手游", "v": "ecysy"}, {"n": "天龙八部online", "v": "tianlongbabuonline"}, {
                "n": "征途2手游",
                "v": "zt2sy"
            }, {"n": "万王之王3D", "v": "wwzw3D"}, {"n": "武林外传", "v": "wlwz"}, {
                "n": "我叫MT4",
                "v": "MT4"
            }, {"n": "元气骑士", "v": "yuanqiqishi"}, {"n": "红警OL手游", "v": "hjolsy"}, {
                "n": "植物大战僵尸手游",
                "v": "ZWDZJS"
            }, {"n": "龙之谷手游", "v": "lzgsy"}, {"n": "创造与魔法", "v": "ccymf"}, {
                "n": "境界-死神激斗",
                "v": "jjssjd"
            }, {"n": "奇迹觉醒", "v": "qjjx"}, {"n": "光遇", "v": "skygy"}, {
                "n": "游戏王：决斗链接",
                "v": "yxwjdlj"
            }, {"n": "巅峰战舰", "v": "dfzj"}, {"n": "绝世战魂", "v": "jszh"}, {
                "n": "雷霆游戏",
                "v": "ltyx"
            }, {"n": "寻仙", "v": "xunxian"}, {"n": "天天象棋", "v": "ttxq"}, {
                "n": "王国纪元",
                "v": "wgjy"
            }, {"n": "梦幻诛仙", "v": "mhzx"}, {"n": "雪鹰领主", "v": "xylz"}, {
                "n": "贪婪洞窟2",
                "v": "tldk2"
            }, {"n": "龙族幻想", "v": "lzhx"}, {"n": "妖精的尾巴：魔导少年", "v": "YJDWB"}, {
                "n": "剑网3指尖对弈",
                "v": "jwszjdy"
            }, {"n": "三国杀移动版", "v": "SGSSY"}, {"n": "罗布乐思", "v": "Roblox"}, {
                "n": "足球手游",
                "v": "zqsy"
            }, {"n": "蜀门", "v": "sm"}, {"n": "全民枪战2", "v": "qmqz2"}, {
                "n": "秦时明月世界",
                "v": "qsmysj"
            }, {"n": "独立手游", "v": "dlsy"}, {"n": "神都夜行录", "v": "sdyxl"}, {
                "n": "风之大陆",
                "v": "fzdl"
            }, {"n": "金属对决", "v": "jsdj"}, {"n": "轩辕剑龙舞云山", "v": "xyjlwys"}, {
                "n": "微乐棋牌",
                "v": "WLQP"
            }, {"n": "街篮2", "v": "jl2"}, {"n": "赛尔号手游", "v": "srhsy"}, {
                "n": "极光计划",
                "v": "jgjh"
            }, {"n": "不良人3", "v": "blr3"}, {"n": "镇魔曲手游", "v": "zmq"}, {
                "n": "武侠乂手游",
                "v": "wxysy"
            }, {"n": "永恒纪元", "v": "yhjy"}, {"n": "乱世王者", "v": "lswz"}, {
                "n": "仙剑4",
                "v": "xjqxz4"
            }, {"n": "长安幻世绘", "v": "cahsh"}, {"n": "篮球手游", "v": "lqsy"}, {
                "n": "鬼泣-巅峰之战",
                "v": "gqdfzz"
            }, {"n": "射击类手游", "v": "qtsy"}, {"n": "权力与纷争", "v": "qlyfz"}, {
                "n": "命运歌姬",
                "v": "mygj"
            }, {"n": "项羽传", "v": "xyz"}, {"n": "暗黑不朽", "v": "diabloimmortal"}, {
                "n": "妖神记",
                "v": "ysj"
            }, {"n": "新神魔大陆", "v": "xsmdl"}, {"n": "公主连结Re:Dive", "v": "gzlj"}, {
                "n": "三国志战略版",
                "v": "sgzzlb"
            }, {"n": "口袋觉醒", "v": "kdjx"}, {"n": "天地劫：幽城再临", "v": "tdj"}, {
                "n": "凹凸世界",
                "v": "atsj"
            }, {"n": "云上城之歌", "v": "ysczg"}, {"n": "荣誉指挥官", "v": "ryzhg"}, {
                "n": "天龙八部手游",
                "v": "tlbbsy"
            }, {"n": "五子棋", "v": "wzq"}, {"n": "围棋", "v": "wq"}, {
                "n": "梦想新大陆",
                "v": "mxxdl"
            }, {"n": "三国志幻想大陆：国创加强版", "v": "sgzhxdl"}, {"n": "造梦无双", "v": "zmws"}, {
                "n": "全球行动",
                "v": "qqxd"
            }, {"n": "放学别跑", "v": "FXBP"}, {"n": "诛仙手游", "v": "zxsy"}, {
                "n": "妄想山海",
                "v": "wxsh"
            }, {"n": "黎明觉醒：生机", "v": "lmjx"}, {"n": "龙之谷2手游", "v": "lzg2sy"}, {
                "n": "庆余年",
                "v": "QYN"
            }, {"n": "我的侠客", "v": "wdxk"}, {"n": "真三国无双霸", "v": "zsgwsb"}, {
                "n": "大话西游手游",
                "v": "dhxysy"
            }, {"n": "影之刃3", "v": "YZR3"}, {"n": "开心消消乐", "v": "kxxxl"}, {
                "n": "战争怒吼",
                "v": "zznh"
            }, {"n": "忘川风华录", "v": "wcfhl"}, {"n": "新剑侠情缘手游", "v": "xjxqysy"}, {
                "n": "超凡先锋",
                "v": "cfxf"
            }, {"n": "重生细胞", "v": "csxb"}, {"n": "一念逍遥", "v": "ynxy"}, {
                "n": "坦克世界闪击战",
                "v": "SJZ"
            }, {"n": "汉家江湖", "v": "HJJH"}, {"n": "海岛奇兵", "v": "hdqb"}, {
                "n": "阴阳师：妖怪小班",
                "v": "bgyry"
            }, {"n": "仙剑奇侠传九野", "v": "xjqxzjy"}, {"n": "魔域手游", "v": "mysy"}, {
                "n": "大唐无双手游",
                "v": "dtwssy"
            }, {"n": "泰拉瑞亚手游", "v": "tlrysy"}, {"n": "地铁跑酷", "v": "dtpk"}, {
                "n": "战舰世界闪击战",
                "v": "zjsjsjz"
            }, {"n": "狂暴之翼", "v": "kbzy"}, {"n": "西游女儿国", "v": "xyneg"}, {
                "n": "少年三国志",
                "v": "snsgz"
            }, {"n": "钢琴师", "v": "gqs"}, {"n": "节奏大爆炸", "v": "jzdbz"}, {
                "n": "喵斯快跑",
                "v": "mskp"
            }, {"n": "双子", "v": "sz"}, {"n": "小美斗地主", "v": "xmddz"}, {
                "n": "全民奇迹2",
                "v": "qmqj2"
            }, {"n": "地下城堡2：黑暗觉醒", "v": "dxcb2"}, {"n": "梦想世界3手游", "v": "mxsj3"}, {
                "n": "有杀气童话2",
                "v": "YSQTH2"
            }, {"n": "镇魂街：武神躯", "v": "zhjwsq"}, {
                "n": "斗罗大陆：斗神再临",
                "v": "dldldszl"
            }, {"n": "斗罗大陆：武魂觉醒", "v": "dldlwhjx"}, {
                "n": "斗罗大陆2绝世唐门",
                "v": "dldl2jstm"
            }, {"n": "战神觉醒", "v": "zsjx"}, {"n": "荣耀大天使", "v": "rydts"}, {
                "n": "蓝月传奇",
                "v": "lycq"
            }, {"n": "凡人修仙传挂机版H5", "v": "frxxzgjbh5"}, {"n": "谁是首富H5", "v": "sssfh5"}, {
                "n": "攻城掠地",
                "v": "gcld"
            }, {"n": "盗墓笔记", "v": "dmbj"}, {"n": "剑与轮回", "v": "jylh"}, {
                "n": "混沌起源",
                "v": "hdqy"
            }, {"n": "大天使之剑", "v": "dtszj"}, {"n": "战斗少女跑酷", "v": "zdsnpk"}, {
                "n": "绝世仙王",
                "v": "jsxw"
            }, {"n": "一刀传世", "v": "ydcs"}, {"n": "斗罗大陆", "v": "dldl"}, {
                "n": "破雪刃",
                "v": "pxr"
            }, {"n": "JJ象棋", "v": "jjxq"}, {"n": "天姬变", "v": "tjb"}, {"n": "剑玲珑", "v": "jll"}, {
                "n": "火线精英",
                "v": "hxjy"
            }, {"n": "造梦西游OL", "v": "zmxyol"}, {"n": "热血神剑", "v": "rxsj"}, {
                "n": "奥奇传说手游",
                "v": "aqcssy"
            }, {"n": "战斗吧龙魂", "v": "zdblh"}, {"n": "猫猫咖啡屋", "v": "mmkfw"}, {
                "n": "猫之宿约者",
                "v": "mzsyz"
            }, {"n": "最终幻想：勇气启示录幻影战争", "v": "hyzz"}, {"n": "葫芦娃兄弟", "v": "hlwxd"}, {
                "n": "造梦西游4",
                "v": "zmxy4"
            }, {"n": "漫威超级战争", "v": "MarvelSuperWar"}, {"n": "比特小队", "v": "btxd"}, {
                "n": "战舰联盟",
                "v": "zjlm"
            }, {"n": "另一个伊甸：超越时空的猫", "v": "lygyd"}, {"n": "少女前线", "v": "snqx"}, {
                "n": "胡莱三国3",
                "v": "hlsg3"
            }, {"n": "灵魂宝戒", "v": "lhbj"}, {"n": "奥拉星", "v": "alx"}, {
                "n": "诸神皇冠",
                "v": "zswg"
            }, {"n": "不休的乌拉拉", "v": "bqdwll"}, {"n": "先游云游戏", "v": "Gamer"}, {
                "n": "万象物语手游",
                "v": "wxwy1"
            }, {"n": "绿茵信仰", "v": "lyxy"}, {"n": "烟雨江湖", "v": "yyjhsy"}, {
                "n": "文明与征服",
                "v": "wmyzf"
            }, {"n": "神角技巧", "v": "SJJQ"}, {"n": "碧蓝航线手游", "v": "blhxsy"}, {
                "n": "300大作战",
                "v": "300dzz"
            }, {"n": "2047", "v": "2047"}, {"n": "机动战队大作战", "v": "jdzddzz"}, {
                "n": "第七史诗",
                "v": "dqss"
            }, {"n": "活下去", "v": "hxq"}, {"n": "宝可梦大集结", "v": "PokemonUNITE"}, {
                "n": "无极仙途",
                "v": "wjxt"
            }, {"n": "元素方尖", "v": "ysfj"}, {"n": "汉末霸业", "v": "hmby"}, {
                "n": "EVE星战前夜：无烬星河",
                "v": "evexzqywjxh"
            }, {"n": "弹力果冻", "v": "tlgd"}, {"n": "七雄纷争", "v": "qxfz"}, {
                "n": "放置江湖",
                "v": "fzjh"
            }, {"n": "火力苏打（T3）", "v": "T3"}, {"n": "植物大战僵尸2", "v": "zwdzjs2"}, {
                "n": "魔神英雄传",
                "v": "msyxz"
            }, {"n": "球球英雄", "v": "qqyx"}, {"n": "悠长假期", "v": "ycjq"}, {
                "n": "无悔华夏",
                "v": "whrhx"
            }, {"n": "猫之城", "v": "mzc"}, {"n": "墨斗", "v": "modou"}, {
                "n": "圣斗士星矢：正义传说",
                "v": "sdsxszyz"
            }, {"n": "未定事件簿", "v": "wdsjp"}, {"n": "白夜极光", "v": "byjg"}, {
                "n": "ProjectGAIA",
                "v": "projectgaia"
            }, {"n": "斗罗大陆：魂师对决", "v": "dldlhsdj"}, {
                "n": "古墓丽影传说：迷踪",
                "v": "gmlycsmz"
            }, {"n": "漫威对决", "v": "mwdj"}, {"n": "道友请留步", "v": "dyqlb"}, {
                "n": "我是航海家",
                "v": "wshhj"
            }, {"n": "军团战棋英雄时代", "v": "jtzqyxsd"}, {"n": "闪烁之光", "v": "syzg"}, {
                "n": "牧羊人之心",
                "v": "myrzx"
            }, {"n": "老农种树", "v": "lnzs"}, {"n": "苍蓝境界", "v": "cljj"}, {
                "n": "偶像梦幻祭2",
                "v": "oxmhj2"
            }, {"n": "卡卡保皇", "v": "kkbh"}, {"n": "灵猫传", "v": "lmz"}, {
                "n": "还有这种操作2",
                "v": "hyzzcz"
            }, {"n": "剑侠世界3", "v": "jxsj3"}, {"n": "召唤与合成2", "v": "zhyhc2"}, {
                "n": "上古王冠",
                "v": "sgwg"
            }, {"n": "萌宠大战僵尸", "v": "mcdzjs"}, {"n": "像素时代", "v": "xssd"}, {
                "n": "仙侠第一放置",
                "v": "xxdyfz"
            }, {"n": "无尽的拉格朗日", "v": "wjdlglr"}, {"n": "弓箭手大作战", "v": "gjsdzz"}, {
                "n": "挨饿荒野",
                "v": "aehy"
            }, {"n": "诺亚之心", "v": "nyzx"}, {"n": "闪耀暖暖", "v": "synn"}, {
                "n": "青鸾繁华录",
                "v": "qlfhl"
            }, {"n": "物种起源", "v": "wzqy"}, {"n": "模拟城市：我是市长", "v": "mncswssc"}, {
                "n": "重返帝国",
                "v": "cfdg"
            }, {"n": "太古仙尊", "v": "tgxz"}, {"n": "长安幻想", "v": "cahx"}, {
                "n": "火炬之光：无限",
                "v": "hjzgwx"
            }, {"n": "富豪闯三国", "v": "fhcsg"}, {"n": "魔戒战争", "v": "mjzz"}, {
                "n": "拂晓",
                "v": "fx"
            }, {"n": "古剑奇谭木语人", "v": "gjqtmyr"}, {
                "n": "火影忍者：忍者新世代",
                "v": "hyrzrzxsd"
            }, {"n": "末日远征", "v": "mryz"}, {"n": "滚动的天空", "v": "gddtk"}, {
                "n": "新斗罗大陆",
                "v": "xdldl"
            }, {"n": "登山赛车", "v": "dssc"}, {"n": "荒野乱斗（腾讯版）", "v": "hyldtxb"}, {
                "n": "小冰冰传奇",
                "v": "xbbcq"
            }, {"n": "三国战纪2手游", "v": "sgzj2"}, {"n": "冒险公社手游", "v": "mxgs"}, {
                "n": "古荒遗迹",
                "v": "ghyj"
            }, {"n": "纪念碑谷2", "v": "jnbg2"}, {"n": "大航海探险物语", "v": "dhhtxwy"}, {
                "n": "航海日记",
                "v": "hhrj"
            }, {"n": "一拳超人：最强之男", "v": "yqcrzqzn"}, {"n": "王国保卫战4", "v": "wgbwz4"}, {
                "n": "半世界之旅",
                "v": "bsjzl"
            }, {"n": "奥特曼宇宙英雄", "v": "atmyzyx"}, {"n": "新三国杀", "v": "xsgs"}, {
                "n": "奶块",
                "v": "nk"
            }, {"n": "策魂三国", "v": "chsg"}, {"n": "奥特曼系列OL", "v": "atmxlol"}, {
                "n": "洪荒文明",
                "v": "hhwm"
            }, {"n": "决战羽毛球", "v": "jzymq"}, {"n": "街头足球", "v": "jtzq"}, {
                "n": "同人圣三国蜀汉传",
                "v": "trssgshc"
            }, {"n": "零之战线", "v": "lzzx"}, {"n": "火影忍者：巅峰对决", "v": "hyrzdfdj"}, {
                "n": "元气骑士新作",
                "v": "yqqsxz"
            }, {"n": "塔防之光", "v": "tfzg"}, {"n": "小小五千年", "v": "xxwqn"}, {
                "n": "牌师",
                "v": "ps"
            }, {"n": "代号MA", "v": "dhma"}, {"n": "时空猎人", "v": "sklr"}, {
                "n": "星际逆战",
                "v": "xjnz"
            }, {"n": "钓鱼大对决", "v": "dyddj"}, {"n": "羽毛球高高手", "v": "ymqggs"}, {
                "n": "LoveLive!学园偶像祭",
                "v": "lovelivexyoxj"
            }, {"n": "黑色沙漠手游", "v": "hesmsy"}, {"n": "魔力宝贝：旅人", "v": "mlbblr"}, {
                "n": "玄中记",
                "v": "xzj"
            }, {"n": "大家饿餐厅", "v": "dject"}, {"n": "画境长恨歌", "v": "hjchg"}, {
                "n": "盾之勇者成名录：浪潮",
                "v": "dzyzcmllc"
            }, {"n": "幻兽爱合成", "v": "hsahc"}, {"n": "魔力宝贝归来", "v": "mlbbgl"}, {
                "n": "荣耀新三国",
                "v": "ryxsg"
            }, {"n": "巅峰极速", "v": "dfjs"}, {"n": "蛋仔派对", "v": "dzpd"}, {
                "n": "新盗墓笔记",
                "v": "xdmbj"
            }, {"n": "萤火突击国际服", "v": "yhtj"}, {"n": "卧龙吟2", "v": "wly2"}, {
                "n": "地下城堡3：魂之诗",
                "v": "dxcb3hzs"
            }, {"n": "武林闲侠", "v": "wlxx"}, {"n": "淘米游戏", "v": "tmyx"}, {
                "n": "无期迷途",
                "v": "wqmt"
            }, {"n": "重返未来：1999", "v": "cfwl1999"}, {"n": "逆光潜入", "v": "ngqr"}, {
                "n": "深空之眼",
                "v": "skzy"
            }, {"n": "CF手游", "v": "CFSY"}, {"n": "新天龙八部手游", "v": "xtlbbsy"}, {
                "n": "无神之界",
                "v": "wszj"
            }, {"n": "时空猎人3", "v": "sklr3"}, {"n": "原始征途", "v": "yszt"}, {
                "n": "全民大灌篮",
                "v": "qmdgl"
            }, {"n": "枪火重生手游", "v": "GunfireReborn"}, {"n": "火影三国志", "v": "g_hysg"}, {
                "n": "网易其它组",
                "v": "g_wyqt"
            }, {"n": "三国战纪手游", "v": "sgzjsy"}, {"n": "重返CODM", "v": "RECODM"}, {
                "n": "综合手游",
                "v": "zhsy"
            }, {"n": "IP游戏", "v": "ipyx"}, {"n": "鸣潮", "v": "cm"}, {
                "n": "棋牌游戏",
                "v": "QPYX"
            }, {"n": "奥比岛：梦想国度", "v": "abdmxgd"}, {"n": "九灵神域", "v": "jlsy"}, {
                "n": "TapTap新游",
                "v": "taptapxy"
            }, {"n": "我叫MT：归来", "v": "wjmtgl"}, {"n": "代号破晓", "v": "dhpx"}, {
                "n": "赛尔计划",
                "v": "srjh"
            }, {"n": "SLG综合", "v": "SLG"}, {"n": "代号：伙伴", "v": "DHGB"}, {
                "n": "天使之战",
                "v": "tszz"
            }, {"n": "全明星街球派对", "v": "hoopheroes"}, {"n": "合金弹头：觉醒", "v": "MetalSlug"}, {
                "n": "白荆回廊",
                "v": "BJHL"
            }, {"n": "战地无疆", "v": "zdwj"}, {"n": "三国志战棋版", "v": "g_sgzzqb"}, {
                "n": "一拳超人：世界",
                "v": "yqcrsj"
            }, {"n": "鹅鸭杀手游", "v": "GooseDuck"}, {"n": "忍者龟：归来", "v": "rzggl"}, {
                "n": "太空行动",
                "v": "SuperSus"
            }, {"n": "天龙八部2：飞龙战天", "v": "tlbb2flzt"}, {"n": "墨武侠", "v": "mwx"}, {
                "n": "大话西游：归来",
                "v": "dhxygl"
            }, {"n": "战火勋章", "v": "zhxz"}, {"n": "决胜巅峰", "v": "jueshengdianfeng"}, {
                "n": "这个地下城有点怪",
                "v": "strangedungeon"
            }, {"n": "冒险岛：枫之传说", "v": "MapleStory"}, {"n": "仙剑世界", "v": "xjsj"}, {
                "n": "战之刃：幸存者",
                "v": "a3stillalive"
            }]
        }],
        "yl": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "yl"}, {"n": "二次元", "v": "ecy"}, {"n": "一起看", "v": "yqk"}, {
                "n": "音乐",
                "v": "music"
            }, {"n": "户外", "v": "HW"}, {"n": "美食", "v": "ms"}, {"n": "原创IP", "v": "ip"}, {
                "n": "心动派对",
                "v": "xdpd"
            }, {"n": "音遇恋人", "v": "yinyu"}, {"n": "星秀", "v": "xingxiu"}, {
                "n": "趣生活",
                "v": "QSH"
            }, {"n": "心动FM", "v": "dtxs"}, {"n": "娱乐推荐", "v": "yltj"}]
        }],
        "kjwh": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "kjwh"}, {"n": "文化", "v": "wh"}, {
                "n": "企鹅直播",
                "v": "qezb"
            }, {"n": "数码科技", "v": "smkj"}, {"n": "社会人文", "v": "shrw"}, {"n": "汽车", "v": "car"}, {
                "n": "科普",
                "v": "kepu"
            }, {"n": "纪录片", "v": "jlp"}, {"n": "斗鱼购物", "v": "DYGW"}, {"n": "成年教育", "v": "jiaoyu"}]
        }],
        "yp": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "yp"}, {"n": "派对", "v": "paidui"}, {
                "n": "心动FM.",
                "v": "DIANT"
            }, {"n": "一起玩", "v": "yiqiwan"}]
        }],
        "voice": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "voice"}, {"n": "语音交友", "v": "yyjy"}, {
                "n": "音乐之声",
                "v": "yyzs"
            }, {"n": "连麦互动", "v": "lianmaihudong"}, {"n": "娱乐开黑", "v": "ylkh"}]
        }],
        "znl": [{
            "key": "cateId",
            "name": "类型",
            "value": [{"n": "全部", "v": "znl"}, {"n": "星星点灯", "v": "xxdd"}, {"n": "正能量", "v": "znl"}]
        }]
    },
    filter_def: {
        PCgame: {cateId: 'LOL'},
        djry: {cateId: 'AC'},
        syxx: {cateId: 'wzry'},
        yl: {cateId: 'yqk'},
        yz: {cateId: 'yz'},
        kjwh: {cateId: 'smkj'},
        yp: {cateId: 'yiqiwan'},
        voice: {cateId: 'yyzs'},
        znl: {cateId: 'znl'},
        scjj: {cateId: 'znl'}
    },
    class_name: '娱乐天地&网游竞技&单机热游&手游休闲&颜值&科技文化&语音互动&语音直播&正能量&赛车竞技',// /api/cate/list
    class_url: 'yl&PCgame&djry&syxx&yz&kjwh&yp&voice&znl&scjj',
    // detailUrl:'/fyid',//二级详情拼接链接(json格式用)
    detailUrl: 'http://live.yj1211.work/api/live/getRoomInfo?uid=&platform=douyu&roomId=fyid',// JustLive
    searchUrl: '/api/search/liveRoom?#did=10000000000000000000000000001501&limit=20&offset=0&sk=**;post',
    searchable: 2,
    quickSearch: 0,
    headers: {
        'User-Agent': 'MOBILE_UA'
    },
    timeout: 5000,
    limit: 8,
    play_parse: true,
    // lazy:"js:function getSign(script,rid,did,tt){let result=script.match(/(function ub98484234.*)\\s(var.*)/)[0];log('result------>'+result);let func_ub9=result.replace(/eval.*;}/,'strc;}',result);log('func_ub9------>'+func_ub9);eval(func_ub9);let res=ub98484234();let v=res.match(/v=(\\d+)/)[0].replace('v=','');let rb=md5(rid+did+tt+v);let func_sign=res.replace(/return rt;}\\);?/,'return rt;}');func_sign=func_sign.replace('(function (','function sign(');func_sign=func_sign.replace('CryptoJS.MD5(cb).toString()','\\\"'+rb+'\\\"');eval(func_sign);let params=sign(rid,did,tt)+'&ver=219032101&rid={}&rate=-1&rid='+rid;return params}let html=fetch(input);let rid=html.match(/rid\\\":(.*?),\\\"vipId/)[1];let tt=Date.parse(new Date()).toString().substr(0,10);let did='10000000000000000000000000001501';let param_body=getSign(html,rid,did,tt);let stream_json=fetch('https://m.douyu.com/api/room/ratestream',{headers:{'content-type':'application/x-www-form-urlencoded'},body:param_body,method:'POST',});let stream=JSON.parse(stream_json).data;input=stream.url;",
    lazy: '',
    推荐: 'json:data;list;*;*;*;*',
    double: true,
    一级: 'json:data.list;roomName;roomSrc;nickname;rid',
    // 二级:'*',
    二级: 'js:var d=[];var jo=JSON.parse(request(input)).data;VOD={vod_id:jo.roomId,vod_name:jo.roomName,vod_pic:jo.roomPic,type_name:jo.platForm.replace("douyu","斗鱼")+"."+jo.categoryName,vod_content:"🏷分区："+jo.platForm.replace("douyu","斗鱼")+"·"+jo.categoryName+" 🏷UP主："+jo.ownerName+" 🏷人气："+jo.online+(jo.isLive===1?" 🏷状态：正在直播":"状态：未开播"),};var playurl=JSON.parse(request("http://live.yj1211.work/api/live/getRealUrl?platform="+jo.platForm+"&roomId="+jo.roomId)).data;var name={OD:"JustLive",FD:"流畅",LD:"标清",SD:"高清",HD:"JustLive(预览)","2K":"2K","4K":"4K",FHD:"全高清",XLD:"极速",SQ:"普通音质",HQ:"高音质",};Object.keys(playurl).forEach(function(key){if(!/ayyuid|to/.test(key)){d.push({title:name[key],url:playurl[key]})}});d.push({title:"斗鱼解析1",url:"http://epg.112114.xyz/douyu/"+jo.roomId},{title:"斗鱼解析2",url:"https://www.aois.eu.org/live/douyu/"+jo.roomId},{title:"斗鱼解析3",url:"https://www.goodiptv.club/douyu/"+jo.roomId});VOD.vod_play_from="播放源";VOD.vod_play_url=d.map(function(it){return it.title+"$"+it.url}).join("#");setResult(d);',
    搜索: 'json:data.list;*;*;*;roomId',
}