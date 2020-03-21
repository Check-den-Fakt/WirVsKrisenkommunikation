FROM python:3.8.2-buster

COPY requirements.txt /tmp/requirements.txt
RUN pip install -r /tmp/requirements.txt

RUN useradd --create-home appuser
WORKDIR /home/appuser
USER appuser

COPY src /home/appuser
RUN ls -la /home/appuser

ENV FLASK_APP /home/appuser/main.py
CMD ["flask", "run", "--host", "0.0.0.0"]
