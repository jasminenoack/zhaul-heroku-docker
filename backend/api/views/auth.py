from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from rest_framework import permissions

from rest_framework.views import APIView
from ..serializers import UserSerializer, UserCreateSerializer


class LoginAPIView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        Logs someone into the site

        returns a 400 if username or password is missing or if the credentials are incorrect
        """
        data = request.data
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
        """
        Logs someone out of the site by removing their session
        """
        logout(request)
        return JsonResponse({"success": "User has been logged out"})


class UserInfo(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        """
        Gets the username of the current user.

        This tells us
        1. if someone is logged in
        2. how to address the person
        """
        return JsonResponse(UserSerializer(request.user).data)


class RegisterUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        """
        Creates a new user with the username and password provided
        This does not do a verification with the password typed twice, but probably should do that
        either here or in the front end.
        This also logs the user in directly it doesn't require a secondary verification such as email. 
        """
        data = request.data
        username = data.get('username')
        password = data.get('password')
        serializer = UserCreateSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        user = User.objects.create(username=username)
        user.set_password(password)
        user.save()
        # confirm we can use the username and password
        authenticate(username=username, password=password)
        login(request, user)
        return JsonResponse({})
