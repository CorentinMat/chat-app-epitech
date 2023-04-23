package user

import (
	"chat-app/util"
	"context"
	"log"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt/v4"
)

type service struct {
	Repository
	timeout time.Duration
}
type MyJWTClaims struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	jwt.RegisteredClaims
}

const (
	// TODO varianl env
	secretKey = "secret"
)

// buisness logic here :)
func NewService(repository Repository) Service {
	return &service{repository, time.Duration(2) * time.Second}
}

// ----------------------------- test 	--------------------------------------------------------------------------------------------
func (s *service) SaveMsg(c context.Context, req *SaveMsgReq) (*Message, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()
	msg := &Message{
		FromUser:     req.FromUser,
		MessageText:  req.MessageText,
		SentDateTime: req.SentDateTime,
	}
	r, err := s.Repository.SaveMsg(ctx, msg)
	if err != nil {
		return &Message{}, err
	}
	res := &Message{
		MessageId:      r.MessageId,
		FromUser:       r.FromUser,
		MessageText:    r.MessageText,
		SentDateTime:   r.SentDateTime,
		ConversationId: r.ConversationId,
	}
	log.Println(r)
	return res, nil
}

// ----------------------------- test 	--------------------------------------------------------------------------------------------

func (s *service) CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error) {
	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()

	// TODO HASH PASSWORD
	hashedPassword, err := util.HashPassword(req.Password)
	if err != nil {
		return nil, err
	}
	u := &User{
		Username: req.Username,
		Email:    req.Email,
		Password: hashedPassword,
	}
	r, err := s.Repository.CreateUser(ctx, u)
	if err != nil {
		return nil, err
	}
	res := &CreateUserRes{
		ID:       strconv.Itoa(int(r.ID)),
		Username: r.Username,
		Email:    r.Email,
	}
	return res, nil
}

func (s *service) Login(c context.Context, req *LoginUserReq) (*LoginUserRes, error) {

	ctx, cancel := context.WithTimeout(c, s.timeout)
	defer cancel()
	u, err := s.Repository.GetUserByEmail(ctx, req.Email)
	if err != nil {
		return &LoginUserRes{}, err
	}
	err = util.CheckPassword(req.Password, u.Password)
	if err != nil {
		return &LoginUserRes{}, err
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, MyJWTClaims{
		ID:       strconv.Itoa(int(u.ID)),
		Username: u.Username,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    strconv.Itoa(int(u.ID)),
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
		},
	})
	ss, err := token.SignedString([]byte(secretKey))
	if err != nil {
		return &LoginUserRes{}, err

	}

	return &LoginUserRes{AccessToken: ss, Username: u.Username, ID: strconv.Itoa(int(u.ID))}, nil
}
