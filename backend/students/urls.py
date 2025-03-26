from django.urls import path
from .views import StudentListCreateView, StudentRetrieveUpdateDestroyView
from . import views  # ✅ This import is required

urlpatterns = [
    path('students/', StudentListCreateView.as_view(), name='student-list-create'),
    path('students/<int:pk>/', StudentRetrieveUpdateDestroyView.as_view(), name='student-rud'),
    path('register/', views.register_view, name='register'),
    path('login/', views.login_view, name='login'),
]
