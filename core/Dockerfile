FROM astral/uv:python3.13-alpine AS UV
WORKDIR /shared
ADD ./shared/.python-version ./shared/pyproject.toml ./
ADD ./shared/src ./src/
WORKDIR /app
ADD ./core/.python-version ./core/pyproject.toml ./
ADD ./core/src ./src/
RUN uv sync
RUN uv build

FROM python:3.13.11-alpine
ARG VERSION
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB_DBNAME
ARG AUTH_HOST
ARG AUTH_PORT
ARG GATEWAY_HOST
ARG GATEWAY_PORT

ENV VERSION=$VERSION
ENV DB_HOST=$DB_HOST
ENV DB_USER=$DB_USER
ENV DB_PASS=$DB_PASS
ENV DB_DBNAME=$DB_DBNAME
ENV AUTH_HOST=$AUTH_HOST
ENV AUTH_PORT=$AUTH_PORT
ENV GATEWAY_HOST=$GATEWAY_HOST
ENV GATEWAY_PORT=$GATEWAY_PORT

WORKDIR /app
COPY --from=UV /app/dist/core-$VERSION.tar.gz ./app.tar.gz
RUN tar -xvf ./app.tar.gz
WORKDIR /app/core-$VERSION
COPY --from=UV /shared/src/shared ./src/shared/
ADD *csv ./
RUN printf 'from setuptools import setup\nsetup()\n' > setup.py
RUN python3 -m venv .venv
RUN .venv/bin/pip3 install setuptools
RUN .venv/bin/pip3 install .

CMD [".venv/bin/python3","./src/main.py"]
