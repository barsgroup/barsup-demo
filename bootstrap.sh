#!/usr/bin/env bash

apt-get update
apt-get install -y --force-yes python-pip mercurial  postgresql-server-dev-9.1 python-psycopg2 python-zmq
easy_install -U pip

echo "export BUP_PATH=/vagrant/src/barsup_demo" >> /home/vagrant/.bashrc

cd /vagrant

pip install -r REQUIREMENTS
pip install hg+https://bitbucket.org/barsgroup/barsup-core

