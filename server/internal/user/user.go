package user

import "context"

type User struct {
	ID       int64  `json:"id" db:"id"`
	Username string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}

type CreateUserReq struct {
	Username string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}
type CreateUserRes struct {
	ID       string `json:"id" db:"id"`
	Username string `json:"username" db:"username"`
	Email    string `json:"email" db:"email"`
}
type Repository interface {
	SaveMsg(ctx context.Context, msg *SaveMsgReq) (*Message, error)
	CreateUser(ctx context.Context, user *User) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)

	CreateConversation(ctx context.Context, req *CreateConv) (*CreateConv, error)
	GetMsgByConversation(ctx context.Context, conv *GetMessageReq) (*[]Message, error)

	GetContact(ctx context.Context, user_id ContactReq) (*[]Contact, error)
	AddContact(ctx context.Context, req AddContactReq) (*Contact, error)
}
type Service interface {
	CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error)
	Login(c context.Context, req *LoginUserReq) (*LoginUserRes, error)
	SaveMsg(c context.Context, req *SaveMsgReq) (*Message, error)

	GetMsgByConversation(ctx context.Context, conv *GetMessageReq) (*[]Message, error)
	CreateConversation(ctx context.Context, req *CreateConv) (*CreateConv, error)

	GetContact(ctx context.Context, user_id ContactReq) (*[]Contact, error)
	AddContact(ctx context.Context, req AddContactReq) (*Contact, error)
}

type LoginUserReq struct {
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}
type LoginUserRes struct {
	AccessToken string
	ID          string `json:"id" db:"id"`
	Username    string `json:"username" db:"username"`
}

type SaveMsgReq struct {
	FromUser       string `json:"from_user" db:"from_user"`
	MessageText    string `json:"message_text" db:"message_text"`
	SentDateTime   string `json:"sent_datetime" db:"sent_datetime"`
	ConversationId int    `json:"conversation_id" db:"conversation_id"`
}
type GetMessageReq struct {
	ConvId int `json:"conversation_id" db:"conversation_id"`
}
type CreateConv struct {
	Conv_name string `json:"conversation_name" db:"conversation_name"`
	Conv_id   int    `json:"conversation_id" db:"conversation_id"`
}

type Message struct {
	MessageId      int    `json:"id" db:"message_id"`
	FromUser       string `json:"username" db:"from_user"`
	MessageText    string `json:"content" db:"message_text"`
	SentDateTime   string `json:"sent_datetime" db:"sent_datetime"`
	ConversationId int    `json:"conversation_id" db:"conversation_id"`
}

type AddContactReq struct {
	Id   int `json:"contact_id" db:"contact_id"`
	MyId int `json:"id" db:"id"`
}

type Contact struct {
	Id       int    `json:"id" db:"contact_id"`
	Username string `json:"username" db:"username"`
	Photo    string `json:"photo" db:"profile_photo"`
}
type ContactReq struct {
	Id int `json:"id" db:"contact_id"`
}
type AllContact struct {
	Contact []Contact `json:"contact" db:"contact"`
}
