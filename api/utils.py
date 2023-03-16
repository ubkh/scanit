from django.conf import settings
from datetime import datetime, timedelta
import jwt
from django.contrib.auth import get_user_model


def generate_access_token(user):
    payload = {
        'user_id': user.user_id,
        'exp': datetime.utcnow() + timedelta(days=1, minutes=0),
        'iat': datetime.utcnow(),
    }
    access_token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return access_token

def get_logged_in_user(user_token):
    payload = jwt.decode(user_token, settings.SECRET_KEY, algorithms=['HS256'])
    user_model = get_user_model()
    user = user_model.objects.filter(user_id=payload['user_id']).first()
    if user:
        return user
    return None