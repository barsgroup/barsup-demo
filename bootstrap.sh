#!/usr/bin/env bash

apt-get update
apt-get install -y --force-yes python-dev python-pip mercurial postgresql-server-dev-9.1 python-psycopg2 build-essential
easy_install -U pip

echo "export BUP_PATH=/vagrant/src/barsup_demo" >> /home/vagrant/.bashrc

cd /vagrant/src/barsup_demo/static/barsup
ln -s ../../../../vendor/ext-5.0.1 ext

pip install --upgrade -r REQUIREMENTS
pip install hg+https://bitbucket.org/barsgroup/barsup-core

