from rest_framework import generics, views, response, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import User, Chat, Message
from .serializers import UserSerializer, ChatSerializer, MessageSerializer, UserRegisterSerializer, UserLoginSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import login
#from .model import final_result

import json

from asgiref.sync import sync_to_async
from django.http import StreamingHttpResponse

from huggingface_hub import InferenceClient
import json


class UpdateChatView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, chat_id, *args, **kwargs):
        try:
            chat = Chat.objects.get(id=chat_id, user=request.user)
        except Chat.DoesNotExist:
            return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = ChatSerializer(chat, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CreateChatView(generics.CreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        chat_title = request.data.get('title', '')[:50]  # Limit title to 50 characters

        chat_data = {
            'user': user.id,
            'title': chat_title
        }
        chat_serializer = self.get_serializer(data=chat_data)
        chat_serializer.is_valid(raise_exception=True)
        chat = chat_serializer.save()

        return Response({
            'chat': chat_serializer.data
        }, status=status.HTTP_201_CREATED)

# class ChatMessagesView(views.APIView):
#     permission_classes = [IsAuthenticated]

#     def get(self, request, chat_id):
#         try:
#             chat = Chat.objects.get(id=chat_id, user=request.user)
#         except Chat.DoesNotExist:
#             return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

#         messages = Message.objects.filter(chat=chat)
#         serializer = MessageSerializer(messages, many=True)
#         return Response(serializer.data)
    


#     def post(self, request, chat_id):
#         try:
#             chat = Chat.objects.get(id=chat_id, user=request.user)
#         except Chat.DoesNotExist:
#             return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

#         user_message_data = {
#             'chat': chat.id,
#             'user': request.user.id,
#             'role': 'user',
#             'content': request.data.get('content', '')
#         }
#         user_message_content = request.data.get('content', '')
#         print(f"User Message: {user_message_content}")  # Console print

#         user_message_serializer = MessageSerializer(data=user_message_data)
#         if user_message_serializer.is_valid():
#             user_message = user_message_serializer.save()

#             # Generate AI response (replace with actual AI logic)
#             ai_response = "This is a response from the AI."
#             ai_message_data = {
#                 'chat': chat.id,
#                 'role': 'assistant',
#                 'content': ai_response
#             }
#             ai_message_serializer = MessageSerializer(data=ai_message_data)
#             if ai_message_serializer.is_valid():
#                 ai_message = ai_message_serializer.save()

#                 # Update chat title if it's the first message
#                 if Message.objects.filter(chat=chat).count() == 2:  # 2 because we just added two messages
#                     chat.title = user_message.content[:50]  # Use first 50 chars of user message as title
#                     chat.save()

#                 return Response({
#                     'user_message': user_message_serializer.data,
#                     'ai_message': ai_message_serializer.data,
#                     'chat': ChatSerializer(chat).data
#                 }, status=status.HTTP_201_CREATED)

#         return Response(user_message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)



# above is proper working with dummy code

class ChatMessagesView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, chat_id):
        try:
            chat = Chat.objects.get(id=chat_id, user=request.user)
        except Chat.DoesNotExist:
            return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

        messages = Message.objects.filter(chat=chat)
        serializer = MessageSerializer(messages, many=True)
        print(serializer.data)
        return Response(serializer.data)
    
    
    def generate_response(self,message: str):
        # Define fixed values inside the function
        model_repo_id = "meta-llama/Meta-Llama-3-8B-Instruct"
        token = "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"
        
        # Initialize the client
        llm_client = InferenceClient(
            model=model_repo_id,
            token=token,
            timeout=120,
        )
        
        # Define the function to call the model
        def call_llm(inference_client: InferenceClient, prompt: str):
            response = inference_client.post(
                json={
                    "inputs": prompt,
                    "parameters": {"max_new_tokens": 200},
                    "task": "text-generation",
                },
            )
            return json.loads(response.decode())[0]["generated_text"]
        
        # Send the message and get the response
        return call_llm(llm_client, message)



    def post(self, request, chat_id):

       

        try:
            chat = Chat.objects.get(id=chat_id, user=request.user)
        except Chat.DoesNotExist:
            return Response({'error': 'Chat not found'}, status=status.HTTP_404_NOT_FOUND)

        user_message_data = {
            'chat': chat.id,
            'user': request.user.id,
            'role': 'user',
            'content': request.data.get('content', '')
        }
        user_message_content = request.data.get('content', '')
        print(f"User Message: {user_message_content}")  # Console print

        ans= self.generate_response(user_message_content)
        

        user_message_serializer = MessageSerializer(data=user_message_data)
        if user_message_serializer.is_valid():
            user_message = user_message_serializer.save()

            # Generate AI response (replace with actual AI logic)
            ai_response = ans
            ai_message_data = {
                'chat': chat.id,
                'role': 'assistant',
                'content': ai_response
            }
            ai_message_serializer = MessageSerializer(data=ai_message_data)
            if ai_message_serializer.is_valid():
                ai_message = ai_message_serializer.save()

                # Update chat title if it's the first message
                if Message.objects.filter(chat=chat).count() == 2:  # 2 because we just added two messages
                    chat.title = user_message.content[:50]  # Use first 50 chars of user message as title
                    chat.save()

                return Response({
                    'user_message': user_message_serializer.data,
                    'ai_message': ai_message_serializer.data,
                    'chat': ChatSerializer(chat).data
                }, status=status.HTTP_201_CREATED)

        return Response(user_message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserRegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegisterSerializer

class UserLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            user_data = {
                'id': user.id,
                'username': user.username,
                'email': user.email,
            }
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': user_data,
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminLoginView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data

            if not user.is_admin:
                return Response({"detail": "Not an admin"}, status=status.HTTP_403_FORBIDDEN)

            login(request, user)
            return Response({
                "detail": "Admin logged in successfully",
                "redirect_url": "/admin/"
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class ChatListCreateView(generics.ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)

class ChatHistoryView(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = Chat.objects.filter(user=request.user)
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)