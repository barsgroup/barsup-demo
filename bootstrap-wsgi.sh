#!/usr/bin/env bash

# Поддержка utf-8
locale-gen en_US.UTF-8
update-locale LANG=en_US.UTF-8 LC_CTYPE="en_US.UTF-8" LC_NUMERIC="en_US.UTF-8" LC_TIME="en_US.UTF-8" LC_COLLATE="en_US.UTF-8" LC_MONETARY="en_US.UTF-8" LC_MESSAGES="en_US.UTF-8"  LC_PAPER="en_US.UTF-8" LC_NAME="en_US.UTF-8" LC_ADDRESS="en_US.UTF-8" LC_TELEPHONE="en_US.UTF-8" LC_MEASUREMENT="en_US.UTF-8" LC_IDENTIFICATION="en_US.UTF-8" LC_ALL=en_US.UTF-8

# Установка python 3.4
apt-get update
apt-get install -y --force-yes software-properties-common python-software-properties
add-apt-repository ppa:fkrull/deadsnakes -y

# package install/upgrade
echo "Updating & Installing packages"
apt-get update
apt-get install -y --force-yes unzip python3.4 python3.4-dev python-pip mercurial postgresql postgresql-client postgresql-server-dev-all python-psycopg2 build-essential

# installing pip
wget https://bootstrap.pypa.io/get-pip.py -O /tmp/get-pip.py
python3.4 /tmp/get-pip.py
pip3.4 install --upgrade pip

# installing virtualenv
# pip3.4 install --upgrade virtualenv

# BUP_PATH for SSH-sessions
export BUP_PATH=/vagrant/src/barsup_demo
export BUP_CONFIG=/vagrant/src/barsup_demo/container.json
export BUP_SCHEMA=/vagrant/src/barsup_demo/schema.json

echo "BUP_PATH=/vagrant/src/barsup_demo" >> /etc/environment
echo "BUP_CONFIG=/vagrant/src/barsup_demo/container.json" >> /etc/environment
echo "BUP_SCHEMA=/vagrant/src/barsup_demo/schema.json" >> /etc/environment

# project installation
echo "Installing project dependencies"
# virtualenv -p /usr/bin/python3.4 py3env
# source py3env/bin/activate

pip3.4 install --upgrade -r /vagrant/REQUIREMENTS

# Установка ExtJS
if [ ! -d "/vagrant/src/barsup_demo/static/barsup/ext/ext-5.0.1" ]; then
    cd /vagrant/src/barsup_demo/static/barsup/ext
    echo "Downloading ExtJS 5.0.1..."
    wget -q -o /dev/null http://cdn.sencha.com/ext/gpl/ext-5.0.1-gpl.zip

    echo "Installing ExtJS 5.0.1..."
    unzip -qq ext-5.0.1-gpl.zip
    rm ext-5.0.1-gpl.zip
fi

# Создание бд и пользователи
echo "Creating user & database"
sudo -u postgres psql -c "CREATE USER barsup WITH PASSWORD 'barsup';"
sudo -u postgres createdb -O barsup -E UTF8 -T template0 --locale=en_US.utf8 barsup

# Миграции
echo "Upgrading migrations (don't worry: red color - normal output)"
cd /vagrant/src/barsup_demo
alembic upgrade head

# Создание пользователя и роли для администратора
sudo -u postgres psql -d barsup -c "
BEGIN TRANSACTION;

INSERT INTO barsup.public.user (name, email, login, password) VALUES ('Administrator', 'adm@adm.ru', 'admin', 'admin');
INSERT INTO barsup.public.role (name, is_super) VALUES ('Everything', true);
INSERT INTO barsup.public.user_role (user_id, role_id) VALUES (1, 1);

COMMIT;
"
echo 'For access use login "admin" and password "admin"'

# installation/start of daemon configurations
export PYTHONPATH=/vagrant/src:$PYTHONPATH
export PYTHONPATH=/usr/lib/python3.4/site-packages:$PYTHONPATH

# uwsgi --uid=vagrant --daemonize =/tmp/uwsgi.log wsgi.ini
python3.4 wsgi.py