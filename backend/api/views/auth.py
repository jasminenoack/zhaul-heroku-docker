import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import permissions


from rest_framework.views import APIView
from ..serializers import UserSerializer


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        data = json.loads(request.body)
        username = data.get('username')
        password = data.get('password')
        if username is None:
            return JsonResponse({
                "errors": {
                    "detail": "Please enter username"
                }
            }, status=400)
        elif password is None:
            return JsonResponse({
                "errors": {
                    "detail": "Please enter password"
                }
            }, status=400)
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": "User has been logged in"})
        return JsonResponse(
            {"errors": "Invalid credentials"},
            status=400,
        )


class LogoutAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request):
        logout(request)
        return JsonResponse({"success": "User has been logged out"})


class UserInfo(APIView):
    permission_classes = [permissions.AllowAny]
    def get(self, request):
        return JsonResponse(UserSerializer(request.user).data)
