FROM oven/bun:1
WORKDIR /usr/src/app

COPY . .
RUN bun i

RUN apt-get update; apt-get install curl gpg -y; \
mkdir -p /etc/apt/keyrings; \
curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg; \
echo "deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_20.x nodistro main" | tee /etc/apt/sources.list.d/nodesource.list; \
apt-get update && apt-get install -y nodejs;

EXPOSE 3000
ENTRYPOINT [ "bun", "run", "dev", "--", "-H", "0.0.0.0" ]
