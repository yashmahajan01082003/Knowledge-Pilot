from django.urls import path
from .views import (
    UserRegisterView,
    UserLoginView,
    AdminLoginView,
    UserListCreateView,
    ChatListCreateView,
    
    ChatHistoryView,
    ChatMessagesView,
    CreateChatView,
    UpdateChatView,
)

urlpatterns = [
    # Authentication
    path('auth/register/', UserRegisterView.as_view(), name='register'),
    path('auth/login/', UserLoginView.as_view(), name='login'),
    path('auth/admin-login/', AdminLoginView.as_view(), name='admin-login'),

    # Chats
    path('chats/create/', CreateChatView.as_view(), name='create-chat'),
    path('chats/', ChatListCreateView.as_view(), name='chat-list-create'),
    path('chats/<uuid:user_id>/history/', ChatHistoryView.as_view(), name='chat-history'),
    path('chats/<uuid:chat_id>/', UpdateChatView.as_view(), name='update-chat'),


    # Messages
    # path('messages/', MessageListCreateView.as_view(), name='message-list-create'),
    path('chats/<uuid:chat_id>/messages/', ChatMessagesView.as_view(), name='chat-messages'),

    # Users
    path('users/', UserListCreateView.as_view(), name='user-list-create'),
]
