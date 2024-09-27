FROM oven/bun as dev

RUN apt update && apt install -y \
    sudo

RUN groupadd -g 1002 dev && \
    useradd -m -u 1003 -g dev dev

WORKDIR /app/pulse

RUN chmod -R 777 /app/pulse


USER dev

RUN bun upgrade

CMD ["bun", "run", "dev"]