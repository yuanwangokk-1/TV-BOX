echo "用户："$(whoami)

if pgrep -x "sshd" >/dev/null
  then
    echo "sshd运行中..."
  else
    sshd
    echo "自动启动sshd"
fi
debian 
