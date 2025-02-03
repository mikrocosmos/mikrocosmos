docker compose down medn-disp
npm run build
docker compose build
docker compose up -d
docker system prune -a
