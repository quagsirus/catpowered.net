from yaml import load
from yaml import CLoader as Loader

def list(_):
    with open('data/wallpapers.yml', 'r') as f:
        wallpapers = load(f, Loader=Loader)
    return {
        'wallpapers': wallpapers
    }