package user

import (
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
	res, err := h.Service.SaveMsg(c.Request.Context(), &msg)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)

}
func (h *Handler) GetMsgByConversation(c *gin.Context) {
	// ❌ mettre à jour rooms ID en fonction de la request ❌
	roomID := int64(0)
	var AllMessages []Message
	if err := c.ShouldBindJSON(&AllMessages); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	res, err := h.Service.GetMsgByConversation(c.Request.Context(), roomID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, res)
}
func (h *Handler) GetContact(c *gin.Context) {
	// ❌ mettre à jour user ID en fonction de la request ❌
	// TempUserId := 15
	var contactReq ContactReq
	// var contact []Contact
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
