FROM python:3.12
WORKDIR /server
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY main.py ./
EXPOSE 8000
CMD ["fastapi", "run"]
