package user

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

type Handler struct {
	Service
}

func NewHandler(s Service) *Handler {
	return &Handler{
		Service: s,
	}
}
func (h *Handler) CreateUser(c *gin.Context) {
	var u CreateUserReq
	if err := c.ShouldBindJSON(&u); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.Service.CreateUser(c.Request.Context(), &u)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)

}
func (h *Handler) SaveMsg(c *gin.Context) {
	var msg SaveMsgReq
	if err := c.ShouldBindJSON(&msg); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	fmt.Println(msg.ConversationId)
	res, err := h.Service.SaveMsg(c.Request.Context(), &msg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)

}
func (h *Handler) GetMsgByConversation(c *gin.Context) {
	// ❌ mettre à jour rooms ID en fonction de la request ❌
	var conv GetMessageReq
	if err := c.ShouldBindJSON(&conv); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"errrrrror": err.Error()})
		return
	}
	fmt.Println(conv.ConvId)
	res, err := h.Service.GetMsgByConversation(c.Request.Context(), &conv)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	// fmt.Println("RESULT :", res)
	c.JSON(http.StatusOK, res)
}
func (h *Handler) GetContact(c *gin.Context) {

	var contactReq ContactReq
	if err := c.ShouldBindJSON(&contactReq); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"erreeeeeor": err.Error()})
		return
	}
	res, err := h.Service.GetContact(c.Request.Context(), contactReq)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, res)
}
func (h *Handler) AddContact(c *gin.Context) {
	var contact AddContactReq
	if err := c.ShouldBindJSON(&contact); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.Service.AddContact(c.Request.Context(), contact)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.JSON(http.StatusOK, res)
}
func (h *Handler) Login(c *gin.Context) {

	var user LoginUserReq
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	u, err := h.Service.Login(c.Request.Context(), &user)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
	c.SetCookie("jwt", u.AccessToken, 3600, "/", "localhost", false, true)
	res := &LoginUserRes{
		Username: u.Username,
		ID:       u.ID,
	}
	c.JSON(http.StatusOK, res)
}

func (h *Handler) Logout(c *gin.Context) {
	c.SetCookie("jwt", "", -1, "", "", false, true)
	c.JSON(http.StatusOK, gin.H{"message": "logout successful"})
}
