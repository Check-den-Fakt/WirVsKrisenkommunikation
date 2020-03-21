# Overview

Python Flask Backend with configuration via environment variables or .env file.

# Configuration
~~~~
DATABASE_URL=dummy
HYSCORE_API_KEY=secretkey

# Build

docker image build -t known_fakes:1.0 .

# Run

docker container run --publish 5000:5000 --detach --name known_fakes known_fakes:1.0
docker logs known_fakes
docker container stop known_fakes
