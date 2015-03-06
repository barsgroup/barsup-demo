#!/usr/bin/env bash

# Поддержка utf-8
locale-gen ru_RU.UTF-8
update-locale LANG=ru_RU.UTF-8 LC_CTYPE="ru_RU.UTF-8" LC_NUMERIC="ru_RU.UTF-8" LC_TIME="ru_RU.UTF-8" LC_COLLATE="ru_RU.UTF-8" LC_MONETARY="ru_RU.UTF-8" LC_MESSAGES="ru_RU.UTF-8"  LC_PAPER="ru_RU.UTF-8" LC_NAME="ru_RU.UTF-8" LC_ADDRESS="ru_RU.UTF-8" LC_TELEPHONE="ru_RU.UTF-8" LC_MEASUREMENT="ru_RU.UTF-8" LC_IDENTIFICATION="ru_RU.UTF-8" LC_ALL=ru_RU.UTF-8
export LANG="ru_RU.UTF-8" LC_CTYPE="ru_RU.UTF-8" LC_NUMERIC="ru_RU.UTF-8" LC_TIME="ru_RU.UTF-8" LC_COLLATE="ru_RU.UTF-8" LC_MONETARY="ru_RU.UTF-8" LC_MESSAGES="ru_RU.UTF-8"  LC_PAPER="ru_RU.UTF-8" LC_NAME="ru_RU.UTF-8" LC_ADDRESS="ru_RU.UTF-8" LC_TELEPHONE="ru_RU.UTF-8" LC_MEASUREMENT="ru_RU.UTF-8" LC_IDENTIFICATION="ru_RU.UTF-8" LC_ALL="ru_RU.UTF-8"

# Установка python 3.4
apt-get update
apt-get install -y --force-yes software-properties-common python-software-properties
add-apt-repository ppa:fkrull/deadsnakes -y

# package install/upgrade
echo "Updating & Installing packages"
apt-get update
apt-get install -y --force-yes unzip python3.4 python3.4-dev python-pip mercurial postgresql postgresql-client postgresql-server-dev-all build-essential

# installing pip
wget -q -o https://bootstrap.pypa.io/get-pip.py -O /tmp/get-pip.py
python3.4 /tmp/get-pip.py
pip3.4 install --upgrade pip

# BUP_PATH for SSH-sessions
export BUP_PATH=/vagrant/src/barsup_demo
export BUP_CONFIG=/vagrant/src/barsup_demo/container.json
export BUP_SCHEMA=/vagrant/src/barsup_demo/schema.json

echo "BUP_PATH=/vagrant/src/barsup_demo" >> /etc/environment
echo "BUP_CONFIG=/vagrant/src/barsup_demo/container.json" >> /etc/environment
echo "BUP_SCHEMA=/vagrant/src/barsup_demo/schema.json" >> /etc/environment

# project installation
echo "Installing project dependencies"

pip3.4 install --upgrade -r /vagrant/REQUIREMENTS

# enable bash autocompleteon
echo "complete -C \"bup_cli --complete\" bup_cli" >> $HOME/.bashrc
echo "complete -C \"bup_manage --complete\" bup_manage" >> $HOME/.bashrc

# Установка ExtJS
ext_version="5.1.0"
if [ ! -d "/vagrant/src/barsup_demo/static/barsup/ext/ext-$ext_version/" ]; then
    cd /vagrant/src/barsup_demo/static/barsup

    echo "Downloading ExtJS $ext_version ..."
    wget -q -o /dev/null http://cdn.sencha.com/ext/gpl/ext-$ext_version-gpl.zip

    echo "Installing ExtJS $ext_version ..."
    unzip -qq ext-$ext_version-gpl.zip -d ext
    rm ext-$ext_version-gpl.zip
fi

# Создание бд и пользователи
echo "Creating user & database"
sudo -u postgres psql -c "CREATE USER barsup WITH PASSWORD 'barsup';"
sudo -u postgres createdb -O barsup -E UTF8 -T template0 --locale=ru_RU.utf8 barsup

# Миграции
echo "Upgrading migrations (don't worry: red color - normal output)"
cd /vagrant/src/barsup_demo
alembic upgrade head

# Создание пользователя и роли для администратора
rm /usr/bin/python
ln -s /usr/bin/python3.4 /usr/bin/python
export PYTHONPATH=$PYTHONPATH:/vagrant/src/
bup_manage create_user_role Admin admin@localhost.notfound admin admin "SuperRole" yes

uwsgi wsgi.ini

