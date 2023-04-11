package main

import (
	"chat-app/db"
	"chat-app/internal/user"
	"chat-app/internal/ws"
	"chat-app/router"
	"log"

	_ "github.com/lib/pq"
)

func main() {
	dbConn, err := db.NewDatabase()
	if err != nil {
		log.Fatal("DataBase connection does'nt work ", err)
	}
	userRepo := user.NewRepository(dbConn.GetDB())
	userService := user.NewService(userRepo)
	userHandler := user.NewHandler(userService)

	hub := ws.NewHub()
	wsHandler := ws.NewHandler(hub)
	go hub.Run()

	router.InitRouter(userHandler, wsHandler)
	router.StartRouter("0.0.0.0:8080")

}
