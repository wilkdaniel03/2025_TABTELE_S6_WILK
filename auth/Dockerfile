ARG VERSION

FROM astral/uv:python3.13-alpine AS UV
WORKDIR /app
ADD ./* ./
RUN uv sync
RUN uv build
RUN echo "$VERSION"
