FROM python:3.12

ENV PORT 8080

WORKDIR /hackathon-server/

COPY ./src/ /hackathon-server/src/
COPY ./requirements.txt /hackathon-server/requirements.txt

RUN pip3 install --no-cache-dir --upgrade -r /hackathon-server/requirements.txt

CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8080"]
