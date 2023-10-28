from rest.exceptions.custom_exceptions import ItemAlreadyExists
import logging

logger = logging.getLogger(__name__)

class TodoService:
    def __init__(self, db_connector):
        self.db = db_connector.get_instance()

    def get_todo_list(self):
        todos_pipeline = [
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "title": 1 
                }
            }
        ]

        todos_data = list(self.db.todos.aggregate(todos_pipeline))
        return todos_data

    def add_todo_item(self, data):
        existing_item = self.db.todos.find_one({"title": data['title']})
        if existing_item:  
            raise ItemAlreadyExists("This todo item already exists.")
        else:
            self.db.todos.insert_one(data)
            logger.info("Todo item added to the database.")