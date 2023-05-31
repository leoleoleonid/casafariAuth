run dev
```bash
docker-compose --env-file=./packages/packages/.env  up --build
```

run prod (only to test locally and build prod images)
```bash
docker-compose -f ./docker-compose.prod.yml --env-file=./packages/packages/.env  up -V --build
```