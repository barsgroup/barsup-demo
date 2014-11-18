#!/usr/bin/env bash

# package install/upgrade
apt-get update
apt-get install -y --force-yes python-dev python-pip mercurial postgresql postgresql-client postgresql-server-dev-9.1 python-psycopg2 build-essential
easy_install -U pip

# BUP_PATH for SSH-sessions
echo "export BUP_PATH=/vagrant/src/barsup_demo" >> /home/vagrant/.bashrc

# path to ExtJS
cd /vagrant/src/barsup_demo/static/barsup
ln -s ../../../../vendor/ext-5.0.1 ext

# project installation
pip install --upgrade -r /vagrant/REQUIREMENTS
pip install hg+https://bitbucket.org/barsgroup/barsup-core

# installation/start of daemon confidurations
cp /vagrant/scripts/*.conf /etc/init
start bup_server
start bup_worker

