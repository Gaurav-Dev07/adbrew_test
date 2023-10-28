from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import logging
from .databases.mongodb_manager import MongoDb
from .services.todo_service import TodoService
from .validations.todo_validator import AddTodoRequestValidator
from .exceptions.custom_exceptions import ItemAlreadyExists

import logging

logger = logging.getLogger(__name__)


class TodoListView(APIView):
    def __init__(self):
        self.todo_service = TodoService(MongoDb())

    def get(self, request):
        try:
            todos_data = self.todo_service.get_todo_list()
            logger.info("Successfully retrieved todo list.")
            return Response(todos_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to retrieve todo list. Error: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:

            data = json.loads(request.body)
            self.todo_service.add_todo_item(data)
            logger.info("Todo item added successfully.")
            return Response({"message": "Todo item added successfully"}, status=status.HTTP_201_CREATED)

        except ItemAlreadyExists as e:
            logging.error(str(e))
            logger.error(f"Todo item already exists. Error: {str(e)}")
            return Response({"error": str(e.message)}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Failed to add todo item. Error: {str(e)}")
            return Response({"error": "Failed to add todo item"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
