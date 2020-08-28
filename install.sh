docker run --rm --interactive --tty --volume $PWD/:/app --workdir /app node:14.5.0-alpine sh -c "npm install"

docker-compose up --build
