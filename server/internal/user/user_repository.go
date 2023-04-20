package user

import (
	"context"
	"database/sql"
	"fmt"
)

type DBTX interface {
	ExecContext(ctx context.Context, query string, args ...interface{}) (sql.Result, error)
	PrepareContext(context.Context, string) (*sql.Stmt, error)
	QueryContext(context.Context, string, ...interface{}) (*sql.Rows, error)
	QueryRowContext(context.Context, string, ...interface{}) *sql.Row
}

type repository struct {
	db DBTX
}

func NewRepository(db *sql.DB) Repository {
	return &repository{db: db}
}
func (r *repository) SaveMsg(ctx context.Context, msg *Message) (*Message, error) {
	var lastInsertId int
	// Surement changer le returning ..
	query := "INSERT INTO message(from_user,message_text,sent_datetime) VALUES($1,$2,$3) returning message_id"
	err := r.db.QueryRowContext(ctx, query, msg.FromUser, msg.MessageText, msg.SentDateTime).Scan(&lastInsertId)
	if err != nil {
		return &Message{}, err
	}
	msg.MessageId = int64(lastInsertId)
	return msg, nil
}

func (r *repository) CreateUser(ctx context.Context, user *User) (*User, error) {
	var lastInsertId int
	query := "INSERT INTO users(username, password, email) VALUES ($1, $2, $3) returning id"
	err := r.db.QueryRowContext(ctx, query, user.Username, user.Password, user.Email).Scan(&lastInsertId)
	if err != nil {
		return &User{}, err
	}

	user.ID = int64(lastInsertId)
	return user, nil
}

func (r *repository) GetUserByEmail(ctx context.Context, email string) (*User, error) {
	u := User{}
	query := "SELECT id, email, username, password FROM users WHERE email = $1"
	err := r.db.QueryRowContext(ctx, query, email).Scan(&u.ID, &u.Email, &u.Username, &u.Password)
	if err != nil {
		return &User{}, err
	}
	return &u, nil
}
func (r *repository) GetMsgByConversation(ctx context.Context, conversation_id int64) (*[]Message, error) {
	var AllMessages []Message
	fmt.Println("coucou")
	query := "SELECT from_user, message_text, sent_date FROM message WHERE conversation_id = $1"
	rows, err := r.db.QueryContext(ctx, query, conversation_id)
	if err != nil {
		res := make([]Message, 0)
		return &res, err
	}
	for rows.Next() {
		fmt.Println("rows =>", rows.Next())
		var pkey int
		err = rows.Scan(&pkey, (&AllMessages))
		if err != nil {
			res := make([]Message, 0)
			return &res, err
		}
	}

	return &AllMessages, nil

}
