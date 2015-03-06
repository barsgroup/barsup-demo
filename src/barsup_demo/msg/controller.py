# coding: utf-8
from barsup.controller import Controller, DictController
from yadic.container import Injectable


class MsgUsers(Controller, metaclass=Injectable):
    depends_on = ('user_service', )


    @staticmethod
    def _add_leaf(node):
        node['leaf'] = True
        return node

    def read(self, _uid, node, start=None, limit=None, page=None, query=None,
             filter=None, group=None, sort=None):
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

    def read(self, _uid, start=None, limit=None, page=None, query=None,
             filter=None, group=None, sort=None):
        new_filter = filter or []
        new_filter.append({'property': 'from_user_id',
                           'operator': 'eq', 'value': _uid})

        return super().read(
            start,
            limit,
            page,
            query,
            new_filter,
            group,
            sort
        )

    def create(self, _uid, data):
        data['from_user_id'] = _uid
        return self.service.create(**data)
