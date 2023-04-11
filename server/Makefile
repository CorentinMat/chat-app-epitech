postgresinit : 
	docker run --name postgres15 -p5433:5432 -e POSTGRES_USER=root -e POSTGRES_PASSWORD=password -d postgres:15-alpine
createDb : 
	docker exec -it postgres15 createdb --username=root --owner=root chat-app
postgres : 
	docker exec -it postgres15 psql
dropDb : 
	docker exec -it postgres15 dropdb chat-app
migratedown: 
	 migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose down
migrateup: 
	 migrate -path db/migrations -database "postgresql://root:password@localhost:5433/go-chat?sslmode=disable" -verbose up
.PHONY: postgresinit createDb postgres dropDb migrateup migratedown