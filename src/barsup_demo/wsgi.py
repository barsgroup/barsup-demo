# coding:utf-8


if __name__ == '__main__':
    import os

    os.environ['BUP_CONFIG'] = 'worker.json'
    os.environ['BUP_PATH'] = '.'

    from wsgiref.simple_server import make_server
    from barsup.wsgi import application

    httpd = make_server('', 8000, application)
    print("Serving on port 8000...")
    httpd.serve_forever()