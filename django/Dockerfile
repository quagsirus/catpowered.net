FROM python:3.13-bookworm

WORKDIR /opt/www

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

EXPOSE 8000
CMD python3 manage.py migrate ; exec gunicorn
