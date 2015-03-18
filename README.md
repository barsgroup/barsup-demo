![](http://online.swagger.io/validator/?url=https://raw.githubusercontent.com/barsgroup/barsup-demo/master/src/barsup_demo/swagger.json)
# Demo

Демо представляет собой проект с декларативном описанием набора сущностей вида:

* Авторы, Книги, Пользователи, Выданные книги;
* Физ. лица и их автомобили.

### Установка

Как перестать беспокоиться и начать жить - [разворачиваем demo на Vagrant'e за 5 минут](https://bitbucket.org/barsgroup/barsup-demo/wiki/vagrant)

###  Описание конфигурационных файлов 

В корне проекта находятся три файла, через которое происходит конфигурирование:

* schema.json - описание структуры хранения таблиц в базе данных;
* container.json - описание логики взаимодействия уровней контроллеров, сервисов и моделей, и т.д;
* swagger.json - конфигурация API на базу [swagger](http://swagger.io/)-a

### schema.json

* [Подробное описание формата](https://bitbucket.org/barsgroup/barsup-core/wiki/db-schema)
* [Пример из demo](https://github.com/barsgroup/barsup-demo/blob/master/src/barsup_demo/schema.json)


### container.json

* [Подробное описание формата](https://bitbucket.org/barsgroup/barsup-core/wiki/Home#markdown-header-description)
* [Пример из demo](https://github.com/barsgroup/barsup-demo/blob/master/src/barsup_demo/container.json)

### swagger.json
* [Загрузка и редактирование схемы](http://editor.swagger.io/)
* [Документация по формату](https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md)
* [Пример из демо](https://github.com/barsgroup/barsup-demo/blob/master/src/barsup_demo/swagger.json)

### Работа с миграциями

Для запуска миграций:
```bash
$ alembic upgrade head
```

Для генерирования миграции:
```bash
$ alembic revision --autogenerate -m '<Migration message>'
```

### Swagger UI
После запуска в контейнере Vagrant, UI будет доступен по ссылке [http://localhost:8000/swagger/](http://localhost:8000/swagger/)