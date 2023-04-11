package router

import (
	"chat-app/internal/user"
	"chat-app/internal/ws"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler) {
	r = gin.Default()
	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)
	r.GET("/logout", userHandler.Logout)

	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("ws/joinRoom/:roomId", wsHandler.JoinRoom)
}

func StartRouter(addr string) error {
	return r.Run(addr)
}
