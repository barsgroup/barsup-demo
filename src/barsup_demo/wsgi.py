# coding:utf-8
import os

os.environ['BUP_CONFIG'] = os.environ.get('BUP_CONFIG') or 'worker.json'
os.environ['BUP_PATH'] = os.environ.get('BUP_PATH') or '.'

from barsup.wsgi import application

if __name__ == '__main__':
    from wsgiref.simple_server import make_server

    httpd = make_server('', 8000, application)
    print("Serving on port 8000...")
    httpd.serve_forever()