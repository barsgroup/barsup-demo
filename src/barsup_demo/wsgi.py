# coding:utf-8

from barsup.wsgi import make_application
from barsup_swagger import with_swagger

application = with_swagger('swagger.json')(make_application())

if __name__ == '__main__':
    from wsgiref.simple_server import make_server

    httpd = make_server('', 8000, application)
    print("Serving on port 8000...")
    httpd.serve_forever()

