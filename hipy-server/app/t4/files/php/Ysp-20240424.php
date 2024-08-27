<?php
    // https://github.com/wjxgzz/Any2parse/blob/main/yspweb.php
    // 央视屏网页版
    // 没有VIP 送你们玩了。
    // 真不建议频繁取串输出切片清单的玩法，容易搞死
    //!! 正确的缓存方式是缓存最后的取串地址，在有效时间内通过请求缓存的地址输出切片清单 !!//
    
    $cnlid = $_GET['vid']; //2022576803
    $pid = $_GET['pid']; //600001859


    $guid = "00000000_00000000000"; // 自己抓或生成都可以 无限制
    $salt = '0f$IVHi9Qno?G';
    $platform = "5910204";
    $key = hex2bin("48e5918a74ae21c972b90cce8af6c8be");
    $iv = hex2bin("9a7e7d23610266b1d9fbf98581384d92");
    $ts = time();
    $el = "|{$cnlid}|{$ts}|mg3c3b04ba|V1.0.0|{$guid}|{$platform}|https://www.yangshipin.c|mozilla/5.0 (windows nt ||Mozilla|Netscape|Win32|";
    
    $len = strlen($el);
    $xl = 0;
    for($i=0;$i<$len;$i++)
    {
        $xl = ($xl << 5) - $xl + ord($el[$i]);
        $xl &= $xl & 0xFFFFFFFF;
    }

    $xl = ($xl > 2147483648) ? $xl - 4294967296 : $xl; // 吊毛 64位PHP  

    $el = '|'.$xl.$el;
    $ckey = "--01".strtoupper(bin2hex(openssl_encrypt($el,"AES-128-CBC",$key,1,$iv)));

    $params = [
        "adjust"=>1,
        "appVer"=>"V1.0.0",
        "app_version"=>"V1.0.0",
        "cKey"=>$ckey,
        "channel"=>"ysp_tx",
        "cmd"=>"2",
        "cnlid"=>$cnlid,
        "defn"=>"fhd",
        "devid"=>"devid",
        "dtype"=>"1",
        "encryptVer"=>"8.1",
        "guid"=>$guid,
        "livepid"=>$pid,
        "otype"=>"ojson",
        "platform"=>$platform,
        "rand_str"=>rand_str(), // 此处为10位大小写随机字符
        "sphttps"=>"1",
        "stream"=>"2"
    ];
    
 
    $sign = md5(http_build_query($params).$salt);
    $params["signature"] = $sign;
    
    $headers = [
        
        "Referer: https://www.yangshipin.cn/",
        "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Cookie: guid={$guid}; versionName=99.99.99; versionCode=999999; vplatform=109; platformVersion=Chrome; deviceModel=122; uinfo_logintype=mobile; seqId=20; request-id=999999".rand_str().$ts."123",
        "Yspappid: 519748109",
        
    ];

    $authParm = "appid=ysp_pc&guid={$guid}&pid=0&rand_str=".rand_str();
    $authParm = $authParm."&signature=".md5($authParm."Q0uVOpuUpXTOUwRn");
    $bstrURL = "https://player-api.yangshipin.cn/v1/player/auth";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $bstrURL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch, CURLOPT_POST,true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,$authParm);
    $data = curl_exec($ch);
    curl_close($ch);
    $json = json_decode($data);

    $ysptoken = $json->data->token;
    $headers[] = "Content-Type: application/json";
    $headers[] = "Yspplayertoken: {$ysptoken}";


    $bstrURL = "https://player-api.yangshipin.cn/v1/player/get_live_info";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $bstrURL);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE); 
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE); 
    curl_setopt($ch, CURLOPT_HTTPHEADER,$headers);
    curl_setopt($ch, CURLOPT_POST,true);
    curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($params));
    $data = curl_exec($ch);
    curl_close($ch);

    $json = json_decode($data);

    $chanll = json_decode($json->data->chanll);
    $tmpcode = base64_decode($chanll->code);
    preg_match('/var des_key = "(.*?)"/',$tmpcode,$deskey);
    preg_match('/var des_iv = "(.*?)"/',$tmpcode,$desiv);
    $plain = '{"mver": "1","subver": "1.2","host": "www.yangshipin.cn/#/tv/home","referer": "","canvas": "YSPANGLE(Google,Vulkan1.3.0(SwiftShaderDevice(Subzero)(0x0000C0DE)),SwiftShaderdriver)"}';

    $revoi = openssl_encrypt($plain,"DES-EDE3-CBC",base64_decode($deskey[1]),1,base64_decode($desiv[1]));
    $revoi = strtoupper(bin2hex($revoi));

    if($json->data->iretcode == 0)
    {
        // 这里建议缓存 
        $playurl = $json->data->playurl;
        $exinfo = $json->data->extended_param;
        header("location:".$playurl."&revoi=".$revoi.$exinfo);
    }
    
    function rand_str()
    {
        $e = "ABCDEFGHIJKlMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        $i = 0;
        $str = "";
        while($i<10)
        {
            $str.= $e[mt_rand(0,61)];
            $i++;
        }
        return $str;
    }


?>