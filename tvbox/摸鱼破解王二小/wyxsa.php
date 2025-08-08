

<!DOCTYPE html>
<html>
<head>
    <title>无意云卡密签到</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <style>
        .image-section {
            text-align: center;
            margin: 30px 0;
        }
        .image-section img {
            max-width: 80%;
            height: auto;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .button-group {
            display: flex;
            justify-content: space-around;
            align-items: center;
            margin-top: 30px;
            gap: 20px;
        }
        .action-btn {
            flex: 1;
            min-width: 150px;
            padding: 10px;
            background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.3s ease;
            text-align: center;
        }
        .action-btn:hover { transform: scale(1.02); }

        body {
            margin: 0;
            padding: 20px 10px;
            min-height: 100vh;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 1000px; 
            margin: 40px auto;
            padding: 25px;
            box-sizing: border-box;
            border-radius: 10px;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
        }
        h2 {
            text-align: center;
            color: #333;
            margin-bottom: 20px;
            font-size: 18px;
        }
        .form-group, #user-info, #parse-url {
            text-align: center;
            margin-bottom: 20px;
            background: rgba(255,255,255,0.9);  /* 关键修复：半透明白色背景 */
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 5px rgba(0,0,0.1);
        }
        label { 
            display: block;
            margin-bottom: 8px;
            color: #555;
            font-size: 14px;
        }
        .input-box {
            display: block;
            width: 80%;
            max-width: 400px;
            margin: 0 auto 15px;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 5px;
            font-size: 14px;
        }
        .form-group button, .copy-btn {
            padding: 12px 24px;
            display: block;
            margin: 0 auto;
            background: linear-gradient(45deg, #4ecdc4, #ff6b6b);
            color: white;
            border: none;
            border-radius: 5px;
            font-size: 14px;
            cursor: pointer;
            transition: transform 0.3s ease;
        }
        .copy-btn {
            margin-top: 10px;
        }
        .message { 
            text-align: center;
            margin: 20px 0;
            color: #666;
            padding: 10px;
            border-radius: 5px;
        }
        #user-info {
            padding: 15px;
            line-height: 1.5;
        }

        #parse-url {
            padding: 20px;
        }

        /* 移动端适配 */
        @media (max-width: 768px) {
            .container {
                padding: 15px;
            }
            .input-box {
                width: 90%;
            }
            .action-btn {
                min-width: 120px;
                font-size: 13px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>无意云卡密签到</h2>
        
                
        <div id="user-info">
            <p>当前次数：<span id="remaining-count">8</span></p>
            <p>当前IP：<span id="user-ip">183.209.100.102</span> <button class="copy-btn" onclick="copyIP()">复制IP</button></p>
        </div>

        <form method="post">
            <div class="form-group">
                <label for="card">卡密输入：</label>
                <input type="text" id="card" name="card" required class="input-box">
                <button type="submit">提交卡密</button>
            </div>
        </form>

        <div id="parse-url">
            <label for="parse-link">无意接口：</label>
            <input type="text" id="parse-link" readonly class="input-box" value="https://ym.wya6.cn/">
            <button class="copy-btn" onclick="copyLink(this)">复制链接</button>
        </div>

        <div id="parse-url">
            <label for="parse-link2">解析接口：</label>
            <input type="text" id="parse-link2" readonly class="input-box" value="https://ym.wya6.cn/qdjx/parse.php?url=">
            <button class="copy-btn" onclick="copyLink(this)">复制链接</button>
        </div>
        
        <div class="button-group">
                        <a href="https://qm.qq.com/q/UDNa8hY6ae" class="action-btn" target="_blank">交流Q群</a>
            <a href="https://fs-im-kefu.7moor-fs1.com/ly/4d2c3f00-7d4c-11e5-af15-41bf63ae4ea0/1746248086897/%E8%A7%A3%E6%9E%90%E7%AD%BE%E5%88%B0%E5%8D%A1%E5%AF%86%E8%8E%B7%E5%8F%96.jpg" class="action-btn" target="_blank">卡密获取</a>
        </div>
    </div>

    <script>
        function getRemainingCount() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'get_count.php', true);
            xhr.onload = function() {
                if (xhr.status === 200) {
                    document.getElementById('remaining-count').textContent = xhr.responseText;
                }
            };
            xhr.send();
        }

        function copyLink(button) {
            const input = button.previousElementSibling;
            input.select();
            document.execCommand('copy');
            alert('解析接口已复制！');
        }
        
        function copyIP() {
            const ipText = document.getElementById('user-ip').textContent;
            const tempInput = document.createElement('input');
            tempInput.value = ipText;
            document.body.appendChild(tempInput);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);
            alert('IP已复制！');
        }

        window.onload = function() {
            getRemainingCount();
        };
    </script>
</body>
</html>