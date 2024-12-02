from django.shortcuts import render
from .serializers import (
    UserRegistrationSerializer,
    UserLoginSerializer,
    CustomUserSerializer,
    ChatSerializer,
    MessageSerializer
)
from rest_framework.generics import GenericAPIView, RetrieveAPIView, CreateAPIView, ListCreateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .models import Chat, Message
from django.contrib.auth import login
import json
from huggingface_hub import InferenceClient


# User Authentication Views

class UserRegistrationAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserRegistrationSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = RefreshToken.for_user(user)
        data = serializer.data
        data["token"] = {
            "refresh": str(token),
            "access": str(token.access_token)
        }
        return Response(data, status=status.HTTP_201_CREATED)


class UserLoginAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        
        # Generate tokens
        token = RefreshToken.for_user(user)
        access_token = str(token.access_token)

        # Serialize user data
        user_data = CustomUserSerializer(user).data
        user_data["tokens"] = {
            "refresh": str(token),
            "access": access_token
        }
        
        # Create a new chat for the session
        new_chat = Chat.objects.create(user=user, title="New Chat")
        user_data["new_chat_id"] = new_chat.id  # Optionally add new chat ID to response data
        
        return Response(user_data, status=status.HTTP_200_OK)


class UserLogoutAPIView(GenericAPIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class UserInfoAPIView(RetrieveAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        serializer = CustomUserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.validated_data
            
            # Check if user has admin privileges
            if not user.is_staff:
                return Response(
                    {"detail": "Not an admin"}, 
                    status=status.HTTP_403_FORBIDDEN
                )
            
            # Generate tokens (same as UserLoginAPIView)
            token = RefreshToken.for_user(user)
            access_token = str(token.access_token)
            
            # Serialize user data (same as UserLoginAPIView)
            user_data = CustomUserSerializer(user).data
            user_data["tokens"] = {
                "refresh": str(token),
                "access": access_token
            }
            new_chat = Chat.objects.create(user=user, title="New Chat")
            user_data["new_chat_id"] = new_chat.id  # Optionally add new chat ID to response data
        
            
            # Log in user
            login(request, user)
            
            return Response(
                user_data,
                status=status.HTTP_200_OK
            )
            
        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )


# Chat and Message Views
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

class CreateChatView(CreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        user = request.user
        chat_title = request.data.get('title', '')[:10] 

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


class ChatMessagesView(APIView):
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
        # model_repo_id = "komalpotdar/1-bit-llm"
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
                    chat.title = user_message.content[:10]  
                    chat.save()

                return Response({
                    'user_message': user_message_serializer.data,
                    'ai_message': ai_message_serializer.data,
                    'chat': ChatSerializer(chat).data
                }, status=status.HTTP_201_CREATED)

        return Response(user_message_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class ChatListCreateView(ListCreateAPIView):
    serializer_class = ChatSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Chat.objects.filter(user=self.request.user)

class ChatHistoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        chats = Chat.objects.filter(user=request.user)
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data)
