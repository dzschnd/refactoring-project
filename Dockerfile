FROM postgres:16-alpine

# Defaults; override via docker-compose.yml or environment.
ENV POSTGRES_DB=eventess \
    POSTGRES_USER=eventess \
    POSTGRES_PASSWORD=eventess

EXPOSE 5432
