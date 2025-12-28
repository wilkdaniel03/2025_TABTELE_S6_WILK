# 2025_TABTELE_S6_WILK / web

### Setup
```bash
uv sync
uv run main.py
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
