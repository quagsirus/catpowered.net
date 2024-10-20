# catpowered.net
## Running locally (without docker)
1. Create `secrets/django.yml` and populate it based on the template (`django.template.yml`)
2. Set the environment variable `DJANGO_SECRET_FILE` accordingly
```bash
$ export DJANGO_SECRET_FILE=../secrets/django.yml
```
3a. Setup a python virtual environment
```bash
$ cd django
$ python3 -m venv venv
$ source venv/bin/activate
```
3b. Install python dependencies
```bash
$ python3 -m pip install -r requirements.txt
```
4. Setup the sqlite database
```bash
$ python3 manage.py migrate
```
5. Run the webserver
```bash
$ DJANGO_DEBUG=true python3 manage.py runserver
```
6. Navigate to [localhost:8000](http://localhost:8000)
