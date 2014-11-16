#!/usr/bin/env bash

# Установка зависимых пакетов
echo "Update & Install packages"
apt-get update
apt-get install -y --force-yes unzip python-dev python-pip mercurial postgresql postgresql-client-9.1 postgresql-server-dev-9.1 python-psycopg2 build-essential
easy_install -U pip

echo "export BUP_PATH=/vagrant/src/barsup_demo" >> /home/vagrant/.bashrc

# Установка зависимостей проекта
echo "Install project dependencies"
pip install --upgrade -r /vagrant/REQUIREMENTS

# Установка ExtJS
if [ ! -d "/vagrant/src/barsup_demo/static/barsup/ext/ext-5.0.1" ]; then
    cd /vagrant/src/barsup_demo/static/barsup/ext
    echo "Download ExtJS 5.0.1"
    wget -q -o /dev/null http://cdn.sencha.com/ext/trial/ext-5.0.1-trial.zip

    echo "Install ExtJS 5.0.1"
    unzip -qq ext-5.0.1-trial.zip
    rm ext-5.0.1-trial.zip
fi

# Создание бд и пользователи
echo "Create user & database"
sudo -u postgres psql -c "CREATE USER barsup WITH PASSWORD 'barsup';"
sudo -u postgres psql -c "CREATE DATABASE barsup OWNER barsup;"

# Миграции
echo "Upgrade migrations (don't worry: red color - normal output)"
cd /vagrant/src/barsup_demo
alembic upgrade head

# Запуск торнадо для вебсокетов и воркера для синхронных задач
echo "Start worker"
bup_start worker >/tmp/worker.log 2>&1 &
echo "Start server"
bup_start server >/tmp/server.log 2>&1 &