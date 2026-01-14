FROM astral/uv:python3.13-alpine AS UV
WORKDIR /app
ADD .python-version pyproject.toml ./
ADD src ./src/
RUN uv sync
RUN uv build

FROM python:3.13.11-alpine
ARG VERSION

ENV VERSION=$VERSION

WORKDIR /app
COPY --from=UV /app/dist/core-$VERSION.tar.gz ./app.tar.gz
RUN tar -xvf ./app.tar.gz
WORKDIR /app/core-$VERSION
ADD *csv ./
RUN printf 'from setuptools import setup\nsetup()\n' > setup.py
RUN python3 -m venv .venv
RUN .venv/bin/pip3 install setuptools
RUN .venv/bin/pip3 install .

CMD [".venv/bin/python3","./main.py"]
