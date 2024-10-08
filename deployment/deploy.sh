#!/bin/bash

FRONTEND_IMAGE="the-college-store-web"
BACKEND_IMAGE="the-college-store-backend"
MONGO_IMAGE="mongo:latest"
MONGO_CONTAINER="mongo"
FRONTEND_CONTAINER="the-college-store-web"
BACKEND_CONTAINER="the-college-store-backend"

echo "=== Loading Docker images === "
if docker load -i the-college-store-web.tar; then
    echo "Loaded frontend image successfully."
else
    echo "Failed to load frontend image."
    exit 1
fi

if docker load -i the-college-store-backend.tar; then
    echo "Loaded backend image successfully."
else
    echo "Failed to load backend image."
    exit 1
fi

echo "=== Init MongoDB container === "
if docker run -d --name $MONGO_CONTAINER -p 27017:27017 $MONGO_IMAGE; then
    echo "MongoDB container started successfully."
else
    echo "Failed to start MongoDB container."
    exit 1
fi

echo "=== Init backend container === "
if docker run -d --name $BACKEND_CONTAINER --link $MONGO_CONTAINER \
  -e MONGO_URL=mongodb://mongo:27017 \
  -p 4000:4000 $BACKEND_IMAGE; then
    echo "Backend container started successfully."
else
    echo "Failed to start backend container."
    exit 1
fi

echo "=== Init frontend container === "
if docker run -d --name $FRONTEND_CONTAINER -p 3000:3000 $FRONTEND_IMAGE; then
    echo "Frontend container started successfully."
else
    echo "Failed to start frontend container."
    exit 1
fi

echo "=== Containers UP === "

echo " === Running Migrations === "

echo "Installing dependencies!"
if npm install; then
    echo "Dependencies installed successfully."
else
    echo "Failed to install dependencies."
    exit 1
fi

echo "Running migration files"
if node run-migrations.js; then
    echo "Migrations ran successfully."
else
    echo "Failed to run migrations."
    exit 1
fi