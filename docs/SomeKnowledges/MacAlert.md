# Mac 弹出框脚本

记录一段在mac上，产生alert弹窗的小程序

<br />

主要有三种alert形式:

`with icon caution`

`with icon note`

`with icon stop`

用法：

```sh
osascript -e 'tell application (path to frontmost application as text) to display dialog "xxxxxx" buttons {"xxxx"} with icon caution'
```

<br />

另外有一个terminal的弹出框

```sh
osascript -e 'tell application "Terminal" to quit' &&
```

<br />

<br />

完整示例代码：

> 代码功能：
>
> 1. 检查本地文件是否存在，不存在则下载
> 2. 同时比对本地文件和远程文件（MD5），如果不一样则下载

``` sh

#!/bin/bash

# download files if not exist
mydir=$(cd $(dirname $BASH_SOURCE) && pwd) || {
    echo Error getting script directory >&2
    exit 1
}
echo $mydir

if [[ ! -f "$mydir/ca.crt" || ! -f "$mydir/ta.key" || ! -f "$mydir/client.ovpn" ]]; then


	osascript -e 'tell application (path to frontmost application as text) to display dialog "
Hello：

Latest files: \"ca.crt\", \"ta.key\", \"client.ovpn\" are not exist in current folder.
Please click below button to download them. 

After that.
Please check SOP for how to use it.


SOP link:

http://vpn.gengyu.ma/download/WFH%20with%20OpenVPN%20(Mac).pdf

" buttons {"Donwload config files"} with icon caution'

	curl -s http://vpn.gengyu.ma/download/ca.crt > $mydir/ca.crt
	curl -s http://vpn.gengyu.ma/download/ta.key > $mydir/ta.key
	curl -s http://vpn.gengyu.ma/download/client.ovpn > $mydir/client.ovpn

	echo “download complete”
	exit 1

else
	echo "3 confile files exist in your current folder."
fi

# check ca.crt and ta.key
web_ca=$(curl -s http://vpn.gengyu.ma/download/ca.crt | md5)
web_ta=$(curl -s http://vpn.gengyu.ma/download/ta.key | md5)
local_ca=$(md5 -q $mydir/ca.crt)
local_ta=$(md5 -q $mydir/ta.key)

if [[ $web_ca != $local_ca || web_ta != local_ta ]]; then
	curl -s http://vpn.gengyu.ma/download/ca.crt > $mydir/ca.crt
	curl -s http://vpn.gengyu.ma/download/ta.key > $mydir/ta.key
fi

# check latest config file - download it if it's not latest
web_config=$(curl -s http://vpn.gengyu.ma/download/client.ovpn | md5)

local_config=$(md5 -q $mydir/client.ovpn)


echo $web_config $local_config

if [[ $web_config == $local_config ]]; then
	osascript -e 'tell application (path to frontmost application as text) to display dialog "
It is already latest config. 

Please read the SOP for how to use it.


SOP link:

http://vpn.gengyu.ma/download/WFH%20with%20OpenVPN%20(Mac).pdf
" buttons {"OK"} with icon note'
else
	osascript -e 'tell application (path to frontmost application as text) to display dialog "
Your onfig file is out of date !!

Please click below button to download the latest one.

After that.
Please read the SOP for how to use it.


SOP link:

http://vpn.gengyu.ma/download/WFH%20with%20OpenVPN%20(Mac).pdf
" buttons {"Download latest config"} with icon stop'

curl -s http://vpn.gengyu.ma/download/client.ovpn > $mydir/client.ovpn

fi


osascript -e 'tell application "Terminal" to quit' &&
exit



```

