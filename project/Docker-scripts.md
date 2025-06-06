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
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env up -d
```
## Stop docker mongo user:

```shell
docker compose --file ./apps/blog/docker-compose.dev.yml --project-name "readme-blog" --env-file ./apps/blog/blog.env down
```
## Check helth docker postgres blog:

```shell
docker inspect --format="{{json .State.Health}}" readme.blog.postgres
```


