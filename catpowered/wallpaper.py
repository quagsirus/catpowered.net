from django.conf import settings
import os
import shutil
from yaml import load
from yaml import CLoader as Loader

def list(_):
    with open(settings.DATA_DIR / 'wallpapers.yml', 'r') as f:
        wallpapers = load(f, Loader=Loader)
    return {
        'wallpapers': wallpapers
    }

if not os.path.isfile(settings.DATA_DIR / 'wallpapers.yml'):
    shutil.copy(settings.BASE_DIR / 'wallpapers.yml', settings.DATA_DIR / 'wallpapers.yml')
