# 2025_TABTELE_S6_WILK / core

### Setup
```bash
uv sync
uv run main.py
```

### Docker build
```bash
docker build --build-arg VERSION=$(cat pyproject.toml | awk '/^version/ { print $3 }' | tr -d '\"') -t api-core:1.0 .
```
