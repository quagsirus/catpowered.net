import requests
from django.contrib.auth.models import User
import yaml
from yaml import CLoader as Loader
class DiscordBackend:
    def exchange_code(self, code):
        data = {
        'client_id':'CLIENT_ID',
        'client_secret':'CLIENT_SECRET',
        'grant_type':'authorization_code',
        'code':code,
        'redirect_uri':'https://catpowered.net/login'
        }
        r = requests.post('https://discordapp.com/api/oauth2/token',data=data)
        return r.json()
    def authenticate(self, request, username=None, password=None):
        if request.GET.get('code'):
            code = request.GET.get('code')
            try:
                auth_token = self.exchange_code(code)
                auth_token = auth_token['access_token']
            except KeyError:
                return None
            discord_details = requests.get('https://discordapp.com/api/users/@me', headers={'Authorization': 'Bearer ' + auth_token}).json()
            with open('data/users/' + discord_details['id'] + '.yml', 'w') as f:
                yaml.dump(discord_details, f)
            try:
                return User.objects.get(username=discord_details['id'])
            except:
                User.objects.create_user(discord_details['id'])
                return User.objects.get(username=discord_details['id'])
        else:
            return None
    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except:
            return None

def get_userdata(userid):
    try:
        with open('data/users/' + str(userid) + '.yml', 'r') as f:
            userdata = yaml.load(f, Loader=Loader)
    except FileNotFoundError:
        userdata = {}
    return userdata

def context(request):
    if hasattr(request, 'user'):
        user = request.user
    else:
        from django.contrib.auth.models import AnonymousUser
        user = AnonymousUser()
    userdata = get_userdata(user.username)
    return {
        'user': user,
        'userdata': userdata,
    }
