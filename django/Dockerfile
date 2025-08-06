FROM python:3.13-bookworm

WORKDIR /opt/www

COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .

COPY --chmod=755 <<EOT /entrypoint.sh
#!/usr/bin/env bash
set -e
python3 manage.py migrate
exec gunicorn
EOT

EXPOSE 8000
ENTRYPOINT ["/entrypoint.sh"]
