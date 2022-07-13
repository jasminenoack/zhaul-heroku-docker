from django.test import TestCase

from django.contrib.auth.models import User
from ..user import UserSerializer, UserCreateSerializer


class UserSerializerTestCase(TestCase):
    def test_serializes_object(self):
        user = User(
            username='john',
            password='password',
        )
        serializer = UserSerializer(user)
        assert serializer.data == {
            'username': 'john',
        }


class UserCreateSerializerTestCase(TestCase):
    def test_invalid_with_blank_username(self):
        serializer = UserCreateSerializer(data={'password': 'password'})
        assert not serializer.is_valid()

    def test_invalid_with_blank_password(self):
        serializer = UserCreateSerializer(data={'username': 'john'})
        assert not serializer.is_valid()
