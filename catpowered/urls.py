"""catpowered URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.shortcuts import redirect
from django.urls import path
from . import views as custom_views
from django.contrib.auth import views as auth_views
from django.contrib.auth.decorators import login_required

urlpatterns = [
    # path('timer', custom_views.timer),
    path('login', auth_views.LoginView.as_view(), name='login'),
    path('logout', auth_views.LogoutView.as_view(), name='logout'),
    path('robots.txt', custom_views.auto_template, {'resource': 'indexing/robots.txt',
        'modify': False, 'content_type': 'text/plain; charset=utf-8'}),
    path('sitemap.xml', custom_views.auto_template, {'resource': 'indexing/sitemap.xml',
        'modify': False, 'content_type': 'application/xml; charset=utf-8'}),
    path('favicon.ico', lambda _: redirect('https://cdn.catpowered.net/site/icons/favicon.ico')),
    path('discord', lambda _: redirect('https://discord.com/invite/tmKsfvn')),
    path('minecraft/map', login_required(custom_views.auto_template), {'resource': 'minecraft/map'}),
    path('', custom_views.auto_template, {'resource': 'index.html', 'modify': False}),
    path('<path:resource>', custom_views.auto_template),
    path('<str:resource>', custom_views.auto_template)
]
