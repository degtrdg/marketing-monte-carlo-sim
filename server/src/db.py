from sqlitedict import SqliteDict


class Database:
    @classmethod
    def initialize(cls, filename):
        cls.db = SqliteDict(filename, autocommit=True)

    @classmethod
    def set(cls, key, value):
        cls.db[key] = value

    @classmethod
    def get(cls, key, default=None):
        return cls.db.get(key, default)

    @classmethod
    def delete(cls, key):
        del cls.db[key]

    @classmethod
    def keys(cls):
        return cls.db.keys()

    @classmethod
    def values(cls):
        return cls.db.values()

    @classmethod
    def items(cls):
        return cls.db.items()

    @classmethod
    def close(cls):
        cls.db.close()
