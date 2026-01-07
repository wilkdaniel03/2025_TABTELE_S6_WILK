# 2025_TABTELE_S6_WILK / auth

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
*POST /token*
```bash
Request:

Body:
{
    username: str
    password: str
}

Response

Body:
{
    token: str
}
```

*GET /authorize*
```bash
Request:

Headers:
{
    Authorization: Bearer <token>
}

Response:

Body:
{
    status: int 
}
```

*ERROR*
```bash
body:

{
    detail: str
}
```
