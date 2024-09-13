FROM python:3.12

ENV PYTHONUNBUFFERED=1
WORKDIR /app

RUN apt-get update \
  && apt-get install python3-dev default-libmysqlclient-dev gcc -y

RUN pip install --upgrade pip 
RUN pip install pipenv

COPY Pipfile Pipfile.lock /app/
RUN pipenv install --system --dev
RUN pip install watchdog

COPY . .

EXPOSE 8000
