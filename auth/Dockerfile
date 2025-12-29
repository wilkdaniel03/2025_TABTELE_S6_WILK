FROM astral/uv:python3.13-alpine AS UV
WORKDIR /app
ADD .python-version pyproject.toml ./
ADD src ./src/
RUN uv sync
RUN uv build

FROM python:3.13.11-alpine
ARG VERSION
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB_DBNAME

ENV VERSION=$VERSION
ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_DBNAME=$DB_DBNAME

RUN apk add openssl
WORKDIR /app
COPY --from=UV /app/dist/auth-$VERSION.tar.gz ./app.tar.gz
RUN tar -xvf ./app.tar.gz
WORKDIR /app/auth-$VERSION
ADD *csv ./
RUN printf 'from setuptools import setup\nsetup()\n' > setup.py
RUN python3 -m venv .venv
RUN .venv/bin/pip3 install setuptools
RUN .venv/bin/pip3 install .
RUN openssl rand -base64 -out secret 32

CMD [".venv/bin/python3","./src/main.py"]
