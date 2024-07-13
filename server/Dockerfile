FROM python:3.12

ENV PORT 8080

WORKDIR /agihouse-server/

COPY ./src/ /agihouse-server/src/
COPY ./requirements.txt /agihouse-server/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /agihouse-server/requirements.txt

CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8080"]
