# Примеры запусков скриптов docker

## Run docker mongo user:

```shell
docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env up -d
```
## Stop docker mongo user:

```shell
docker compose --file ./apps/user/docker-compose.dev.yml --project-name "readme-user" --env-file ./apps/user/user.env down
```
## Check helth docker mongo user:

```shell
docker inspect --format="{{json .State.Health}}" readme.user.mongo
```
--------------------------------------------------
## Run docker postgres blog:

```shell
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog"  --env-file ./apps/blog/blog.env up -d
```
## Stop docker mongo user:

```shell
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env down
```
## Check helth docker postgres blog:

```shell
docker inspect --format="{{json .State.Health}}" readme.blog.postgres
```
--------------------------------------------------

## Run docker file-vault:
```shell
docker compose --file ./apps/file-vault/file-vault.compose.dev.yml --project-name "readme-file-vault" --env-file ./apps/file-vault/file-vault.env up -d
```

-------------------------------------------------

## Run docker readme-notify:
```shell
docker compose --file ./apps/notify/notify.compose.dev.yml --project-name "readme-notify" --env-file ./apps/notify/notify.env up -d
```