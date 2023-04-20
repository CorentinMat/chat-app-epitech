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
	SaveMsg(ctx context.Context, msg *Message) (*Message, error)
	CreateUser(ctx context.Context, user *User) (*User, error)
	GetUserByEmail(ctx context.Context, email string) (*User, error)

	// test
	GetMsgByConversation(ctx context.Context, conversation_id int64) (*[]Message, error)
}
type Service interface {
	CreateUser(c context.Context, req *CreateUserReq) (*CreateUserRes, error)
	Login(c context.Context, req *LoginUserReq) (*LoginUserRes, error)
	SaveMsg(c context.Context, req *SaveMsgReq) (*Message, error)
	GetMsgByConversation(ctx context.Context, conversation_id int64) (*[]Message, error)
}

type LoginUserReq struct {
	Email    string `json:"email" db:"email"`
	Password string `json:"password" db:"password"`
}
type LoginUserRes struct {
	accessToken string
	ID          string `json:"id" db:"id"`
	Username    string `json:"username" db:"username"`
}

// test
type SaveMsgReq struct {
	FromUser     string `json:"from_user" db:"from_user"`
	MessageText  string `json:"message_text" db:"message_text"`
	SentDateTime string `json:"sent_datetime" db:"sent_datetime"`
}

// Je crois que Db :.... ne servent à rien 👋
type Message struct {
	MessageId      int64  `json:"message_id" db:"message_id"`
	FromUser       string `json:"from_user" db:"from_user"`
	MessageText    string `json:"message_text" db:"message_text"`
	SentDateTime   string `json:"sent_datetime" db:"sent_datetime"`
	ConversationId int64  `json:"conversation_id" db:"conversation_id"`
}
