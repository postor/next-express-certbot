# next-express-certbot

free certification from letsencrypt/certbot and serve http2 with express and next.js | next.js+express的免费的证书和http2服务

## server prepare | 服务端准备

- [point your domain to your server | 将域名指向要部署的服务器](https://github.com/postor/certbot-express/blob/master/docs/point-domain-to-server.md)

- [install certbot](https://github.com/postor/certbot-express/blob/master/docs/install-certbot.md)

## generate certification | 生成证书

```
certbot certonly

```
[see full conversation here | 查看命令对话详情](https://github.com/postor/certbot-express/blob/master/docs/generate-certification-certonly.md)


## start service | 启动服务

```
npm run build
npm run start
```

## renew certification | 更新证书

this will shut down your service and restart it after certification renew | 这将会关闭你的服务并在证书更新后重启

```
npm run renew
```

you can add this to your cron job

```
sudo crontab -e
```

and append this line 

```
30     1     *     *     *         cd /project/path && npm run renew
```

## all in one script | 傻瓜式一键部署脚本

**Note** [point your domain to your server | 将域名指向要部署的服务器](https://github.com/postor/certbot-express/blob/master/docs/point-domain-to-server.md)

for ubuntu 16.04 only, you may need to run one line after another for some command may break while others may ask you questions

仅限 ubuntu 16.04，你可能需要一行一行的执行，有的命令会导致后面的命令不执行，也有一些会需要你确认或回答

```
# root user and root path | 使用root用户和/root路径
sudo -i
cd /root

# you may need this line if apt update stucks | 如果apt update卡住的话你可能需要用到这命令
#echo 'Acquire::ForceIPv4 "true";' | sudo tee /etc/apt/apt.conf.d/99force-ipv4

# certbot
apt-get update
sudo apt-get install software-properties-common -y

sudo add-apt-repository ppa:certbot/certbot

sudo apt-get update
sudo apt-get install certbot -y

# node and git
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install nodejs python2.7 make build-essential git -y

# checkout
git clone https://github.com/postor/http-to-http2.git
cd http-to-http2/nodejs
npm install



```


