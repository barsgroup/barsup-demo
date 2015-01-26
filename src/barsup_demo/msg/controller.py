# coding: utf-8
from barsup.controller import Controller, DictController
from yadic.container import Injectable


class MsgUsers(Controller, metaclass=Injectable):
    depends_on = ('user_service', )


    @staticmethod
    def _add_leaf(node):
        node['leaf'] = True
        return node

    def read(
        self,
        uid: 'int',
        node: 'int',
        start: 'int'=None,
        limit: 'int'=None,
        page: 'int'=None,
        query: 'str'=None,
        filter: 'json'=None,
        group: 'str'=None,
        sort: 'json'=None
    ) -> r'/read':
        result = self.user_service().filters(
            filter or []
        ).sorts(
            sort or []
        ).limiter(
            start, limit
        ).read()

        return map(self._add_leaf, result)


class Message(DictController):
    depends_on = ('service', )

    def read(
        self,
        uid: 'int',
        start: 'int'=None,
        limit: 'int'=None,
        page: 'int'=None,
        query: 'str'=None,
        filter: 'json'=None,
        group: 'str'=None,
        sort: 'json'=None
    ) -> r'/read':
        new_filter = filter or []
        new_filter.append({'property': 'from_user_id',
                           'operator': 'eq', 'value': uid})

        return super().read(
            start,
            limit,
            page,
            query,
            new_filter,
            group,
            sort
        )

    def create(
        self,
        uid: 'int',
        data: "dict"
    ) -> r"/create":
        data['from_user_id'] = uid
        return self.service.create(**data)