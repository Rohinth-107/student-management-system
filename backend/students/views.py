from rest_framework import generics
from .models import Student
from .serializers import StudentSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password


class StudentListCreateView(generics.ListCreateAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

class StudentRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User
import json
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import User
import json

@csrf_exempt
def register_view(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            email = data.get('email')
            password = data.get('password')

            if User.objects.filter(username=username).exists():
                return JsonResponse({'message': '❌ Username already exists'}, status=400)

            User.objects.create(username=username, email=email, password=password)
            return JsonResponse({'message': '✅ Registration successful'}, status=201)

        except Exception as e:
            return JsonResponse({'message': str(e)}, status=400)
    return JsonResponse({'message': 'Invalid request method'}, status=405)


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')

        if User.objects.filter(username=username, password=password).exists():
            return JsonResponse({"message": "✅ Login successful"}, status=200)
        else:
            return JsonResponse({"message": "❌ Invalid username or password"}, status=400)
    return JsonResponse({"message": "Invalid request"}, status=400)