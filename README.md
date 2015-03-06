# Demo

Демо представляет собой проект с декларативном описанием набора сущностей вида:

* Авторы, Книги, Пользователи, Выданные книги;
* Физ. лица и их автомобили.

### Установка

Как перестать беспокояться и начать жить - [разворачиваем demo на Vagrant'e за 5 минут](https://bitbucket.org/barsgroup/barsup-demo/wiki/vagrant)

###  Описание конфигурационных файлов 

В корне проекта находятся три файла, через которое происходит конфигурирование:

* schema.json - описание структуры хранения таблиц в базе данных;
* container.json - описание логики взаимодействия уровней контроллеров, сервисов и моделей, и т.д;
* swagger.json - конфигурация API на базу [swagger](http://swagger.io/)-a

### schema.json

* [Подробное описание формата](https://bitbucket.org/barsgroup/barsup-core/wiki/db-schema)
* [Пример из demo](https://bitbucket.org/barsgroup/barsup-demo/src/2bf5ee34eb5ff65114d35045a4393139569145bc/src/barsup_demo/schema.json?at=default)


### container.json

* [Подробное описание формата](https://bitbucket.org/barsgroup/barsup-core/wiki/Home#markdown-header-description)
* [Пример из demo](https://bitbucket.org/barsgroup/barsup-demo/src/2bf5ee34eb5ff65114d35045a4393139569145bc/src/barsup_demo/container.json?at=default)

### Работа с миграциями

Для запуска миграций:
```bash
$ alembic upgrade head
```

Для генерирования миграции:
```bash
$ alembic revision --autogenerate -m '<Migration message>'
```