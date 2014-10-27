# coding: utf-8

from barsup.service import Service


class IndividualService(Service):
    def query(self, *args):
        self._queryset = self.session.get().query(
            self.model
        ).outerjoin(self.db_mapper.auto)
