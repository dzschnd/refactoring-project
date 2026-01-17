# refactoring-project

## Docker (stack)

Services:
- Traefik reverse proxy (routes `/api` to backend, `/` to frontend)
- Backend
- Frontend
- Postgres

### Prereqs
- Docker
- Set Gmail and Google app pass in environment (for email verification)
  - `EMAIL`, `EMAIL_PASS`, `EMAIL_FROM`

### Run (local)
```bash
./scripts/docker-up.sh
```

Open:
- http://localhost (frontend)
- API at http://localhost/api

### Stop
```bash
./scripts/docker-down.sh
```

### Logs
```bash
./scripts/docker-logs.sh
```
