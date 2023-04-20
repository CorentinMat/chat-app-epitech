package router

import (
	"chat-app/internal/user"
	"chat-app/internal/ws"

	"github.com/gin-gonic/gin"
)

var r *gin.Engine

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		// à modifier car je laisse tout rentrere là
		c.Header("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Header("Access-Control-Allow-Methods", "POST,HEAD,PATCH, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func InitRouter(userHandler *user.Handler, wsHandler *ws.Handler) {
	r = gin.Default()
	r.Use(CORSMiddleware())

	r.POST("/signup", userHandler.CreateUser)
	r.POST("/login", userHandler.Login)
	r.GET("/logout", userHandler.Logout)
	r.POST("/saveMsg", userHandler.SaveMsg)

	r.GET("/getMsg", userHandler.GetMsgByConversation)

	r.POST("/ws/createRoom", wsHandler.CreateRoom)
	r.GET("ws/joinRoom/:roomId", wsHandler.JoinRoom)

}

func StartRouter(addr string) error {
	return r.Run(addr)
}
