from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json, logging, os
from pymongo import MongoClient

mongo_uri = 'mongodb://' + os.environ["MONGO_HOST"] + ':' + os.environ["MONGO_PORT"]
db = MongoClient(mongo_uri)['test_db']

class TodoListView(APIView):

    def get(self, request):
        
        todos_pipeline = [
            {
                "$project": {
                    "_id": {"$toString": "$_id"},
                    "title": 1 
                }
            }
        ]

        try:
            todos_data = list(db.todos.aggregate(todos_pipeline))

            return Response(todos_data, status=status.HTTP_200_OK, content_type='application/json')

        except Exception as e:
            logging.error(str(e))
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


        
    def post(self, request):
        try:
            data = json.loads(request.body)
            print('data',data)
            db.todos.insert_one(data)
            return Response({"message": "Todo item added successfully"}, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error(str(e))
            return Response({"error": "Failed to add todo item"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

