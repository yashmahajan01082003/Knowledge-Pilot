from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", UserRegistrationAPIView.as_view(), name='user-registration'),
    path("login/", UserLoginAPIView.as_view(), name='user-login'),
    path("logout/", UserLogoutAPIView.as_view(), name='user-logout'),
    path("token/refresh/", TokenRefreshView.as_view(), name='token-refresh'),
    path("user/", UserInfoAPIView.as_view(), name='user-info'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('admin_login/', AdminLoginView.as_view(), name='admin-login'),


    
    path('chats/create/', CreateChatView.as_view(), name='create-chat'),
    path('chats/', ChatListCreateView.as_view(), name='chat-list-create'),
    path('chats/<uuid:user_id>/history/', ChatHistoryView.as_view(), name='chat-history'),
    path('chats/<uuid:chat_id>/', UpdateChatView.as_view(), name='update-chat'),
    path('chats/<uuid:chat_id>/messages/', ChatMessagesView.as_view(), name='chat-messages'),
]
