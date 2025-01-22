docker compose down smoky-moon
docker compose down minio
npm run build
docker compose build
docker compose up -d
docker system prune -a
