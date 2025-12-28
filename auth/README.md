# 2025_TABTELE_S6_WILK / web

### Setup
```bash
uv sync
uv run main.py
```

### Docker build
```bash
docker build --build-arg VERSION=$(cat pyproject.toml | awk '/^version/ { print $3 }' | tr -d '\"') -t api-auth:1.0 .
```

### HTTP Format
*GET /token*
```bash
{
    token: str
}
```

*GET /authorize*
```bash
{
    status: int 
}
```

*ERROR*
```bash
{
    detail: str
}
```
