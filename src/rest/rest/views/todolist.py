from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import json
import logging
from ..databases.mongodb_manager import MongoDb
from ..services.todo_service import TodoService
from ..exceptions.custom_exceptions import ItemAlreadyExists
from ..constants import ERROR_MESSAGES,SUCCESS_MESSAGES
import logging

logger = logging.getLogger(__name__)


class TodoListView(APIView):
    def __init__(self):
        self.todo_service = TodoService(MongoDb())

    def get(self, request):
        try:
            todos_data = self.todo_service.get_todo_list()
            logger.info(SUCCESS_MESSAGES['RETRIEVED_TODO'])
            return Response(todos_data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"{ERROR_MESSAGES['RETRIEVE_TODO_FAILED']}: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            data = json.loads(request.body)
            self.todo_service.add_todo_item(data)
            logger.info(SUCCESS_MESSAGES['TODO_ADDED'])
            return Response({"message": SUCCESS_MESSAGES['TODO_ADDED']}, status=status.HTTP_201_CREATED)

        except ItemAlreadyExists as e:
            logger.error(f"{ERROR_MESSAGES['TODO_EXISTS']} Error: {str(e)}")
            return Response({"error": ERROR_MESSAGES['TODO_EXISTS']}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"{ERROR_MESSAGES['ADD_TODO_FAILED']}: {str(e)}")
            return Response({"error": ERROR_MESSAGES['ADD_TODO_FAILED']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
