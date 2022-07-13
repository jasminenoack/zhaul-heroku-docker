import json

from django.test import TestCase
from django.contrib.auth.models import User

from django.urls import reverse


class LoginAPIViewTestCase(TestCase):
    def test_post_logs_someone_in(self):
        user = User.objects.create(username='john')
        user.set_password('lennon')
        user.save()
        url = reverse('api-auth-login')
        result = self.client.post(url, data=json.dumps({
            "username": "john",
            "password": "lennon",
        }), content_type='json')
        assert result.status_code == 200
        assert '_auth_user_id' in self.client.session

    def test_400_if_missing_username(self):
        user = User.objects.create(username='john')
        user.set_password('lennon')
        user.save()
        url = reverse('api-auth-login')
        result = self.client.post(url, data=json.dumps({
            "password": "lennon",
        }), content_type='json')
        assert result.status_code == 400

    def test_400_if_missing_password(self):
        user = User.objects.create(username='john')
        user.set_password('lennon')
        user.save()
        url = reverse('api-auth-login')
        result = self.client.post(url, data=json.dumps({
            "username": "john",
        }), content_type='json')
        assert result.status_code == 400

    def test_400_if_invalid_credentials(self):
        user = User.objects.create(username='john')
        user.set_password('lennon')
        user.save()
        url = reverse('api-auth-login')
        result = self.client.post(url, data=json.dumps({
            "username": "john",
            "password": "wrong",
        }), content_type='json')
        assert result.status_code == 400


class LogoutAPIViewTestCase(TestCase):
    def test_post(self):
        user = User.objects.create(username='john')
        self.client.force_login(user)
        url = reverse('api-auth-logout')
        result = self.client.delete(url)
        assert result.status_code == 200
        assert not '_auth_user_id' in self.client.session


class UserInfoTestCase(TestCase):
    def test_returns_info_on_current_user(self):
        user = User.objects.create(username='john')
        self.client.force_login(user)
        url = reverse('current_user')
        result = self.client.get(url)
        assert result.status_code == 200
        assert json.loads(result.content) == {'username': 'john'}


class RegisterUserTestCase(TestCase):
    """
    Ideally this would have tests for the negative states as well.
    """
    def test_post(self):
        url = reverse('create_user')
        result = self.client.post(url, data=json.dumps({
            "username": "john",
            "password": "lennon",
        }), content_type='json')
        assert result.status_code == 200
        user = User.objects.get()
        assert user.username == 'john'
        assert '_auth_user_id' in self.client.session
