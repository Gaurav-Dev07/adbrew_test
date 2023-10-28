from pymongo import MongoClient
import os
from rest.interfaces.database_connector import DataBaseConnector

class MongoDb(DataBaseConnector):
    def __init__(self):
        mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
        self.db = MongoClient(mongo_uri)['test_db']

    def get_instance(self):
        return self.db

