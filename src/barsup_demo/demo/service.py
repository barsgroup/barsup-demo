# coding: utf-8
from datetime import date

from barsup.service import Service


class IndividualService(Service):
    def query(self, *args):
        self._queryset = self.session.get().query(
            self.model
        ).outerjoin(self.db_mapper.auto)


class UserBookService(Service):
    def query(self, *args):
        self._queryset = self.session.get().query(
            self.model
        ).outerjoin(
            self.db_mapper.user
        ).outerjoin(
            self.db_mapper.book
        )

    def create(self, **kwargs):
        return_date = date.fromtimestamp(float(kwargs.get('return_date')))
        kwargs['return_date'] = return_date
        return super(UserBookService, self).create(**kwargs)

    def update(self, *args, **kwargs):
        if kwargs.get('return_date'):
            return_date = date.fromtimestamp(float(kwargs.get('return_date')))
            kwargs['return_date'] = return_date
        return super(UserBookService, self).update(*args, **kwargs)