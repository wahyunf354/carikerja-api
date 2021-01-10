ROOT_DIR=$(pwd)
PG_DATA="$ROOT_DIR/data/postgres"

mkdir -p "$PG_DATA"

docker start carikerjapg || docker run -d --name carikerjapg -p 54:5432 -e POSTGRES_USER=carikerja_admin -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=carikerja_db -e PGDATA=/var/lib/postgresql/data/pgdata -v $PG_DATA:/var/lib/postgresql/data postgres:11 
