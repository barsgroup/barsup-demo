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
        ).join(
            self.db_mapper.user
        ).join(
            self.db_mapper.book
        )