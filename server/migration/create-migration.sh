#!/bin/bash

if [ -z "$1" ]
  then
    echo "Give the name of the migration as parameter"
    exit 2
fi

. .env
db-migrate --config server/migration/database.json --migrations-dir server/migration/migrations create $1 --sql-file
