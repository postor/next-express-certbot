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

alough we run it at 1:30 everyday, it wonly renew certification when needed, once around 20 days, and when no need to renew service will continue without stop/start

虽然我们设置为每天都运行这段命令，但是它只在有需要的时候才会真的更新证书，大约每20天一次，当它不更新证书的时候也不会打断我们的服务

## all in one script | 傻瓜式一键部署脚本

**Note** [point your domain to your server | 将域名指向要部署的服务器](https://github.com/postor/certbot-express/blob/master/docs/point-domain-to-server.md)

for ubuntu 16.04 only, you may need to run one line after another for some command may break while others may ask you questions, make sure not to miss any of them

仅限 ubuntu 16.04，你可能需要一行一行的执行，有的命令会导致后面的命令不执行，也有一些会需要你确认或回答，注意不要漏掉某个命令

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

# generate
sudo certbot certonly

#How would you like to authenticate with the ACME CA?
#-------------------------------------------------------------------------------
#1: Spin up a temporary webserver (standalone)
#2: Place files in webroot directory (webroot)
#-------------------------------------------------------------------------------
#Select the appropriate number [1-2] then [enter] (press 'c' to cancel): 1

#Enter email address (used for urgent renewal and security notices) (Enter 'c' to
#cancel): postor@gmail.com
#Please read the Terms of Service at
#https://letsencrypt.org/documents/LE-SA-v1.2-November-15-2017.pdf. You must
#agree in order to register with the ACME server at
#https://acme-v01.api.letsencrypt.org/directory
#-------------------------------------------------------------------------------
#(A)gree/(C)ancel: A

#Would you be willing to share your email address with the Electronic Frontier
#Foundation, a founding partner of the Let's Encrypt project and the non-profit
#organization that develops Certbot? We'd like to send you email about EFF and
#our work to encrypt the web, protect its users and defend digital rights.
#-------------------------------------------------------------------------------
#(Y)es/(N)o: Y

#Please enter in your domain name(s) (comma and/or space separated)  (Enter 'c'
#to cancel): test.i18ntech.com

# checkout
git clone https://github.com/nextjs-boilerplate/next-express-certbot.git
cd next-express-certbot

# modify your domain and certDir
vi server.js
#const domain = `test.i18ntech.com`
#const certDir = `/etc/letsencrypt/live/${domain}/`

# start
npm install
npm build
npm run start

# renew certfication in crontab
sudo crontab -e
#30     1     *     *     *         cd /root/next-express-certbot && npm run renew

```
