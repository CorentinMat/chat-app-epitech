package user

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/pkg/errors"
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
func (r *repository) SaveMsg(ctx context.Context, req *SaveMsgReq) (*Message, error) {
	var lastInsertId int
	// Surement changer le returning ..
	var message Message
	fmt.Println("conv id :", req.ConversationId)

	query := "INSERT INTO message(from_user,message_text,sent_datetime, conversation_id) VALUES($1,$2,$3,$4) returning message_id"
	err := r.db.QueryRowContext(ctx, query, req.FromUser, req.MessageText, req.SentDateTime, req.ConversationId).Scan(&lastInsertId)
	if err != nil {
		return &Message{}, err
	}
	message.MessageId = lastInsertId
	message.ConversationId = req.ConversationId
	message.FromUser = req.FromUser
	message.SentDateTime = req.SentDateTime
	message.MessageText = req.MessageText

	return &message, nil
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

func (r *repository) GetContact(ctx context.Context, user_id ContactReq) (*[]Contact, error) {
	var contact []Contact
	query := "SELECT contact_id, username, profile_photo FROM contact WHERE user_id = $1"
	rows, err := r.db.QueryContext(ctx, query, user_id.Id)
	// .Scan(&contact.id, &contact.username, &contact.photo)
	if err != nil {
		return &[]Contact{}, err
	}
	for rows.Next() {
		if err := rows.Err(); err != nil {
			return nil, err
		}
		var contact_id int
		var contact_username string
		var contact_photo string
		if err := rows.Scan(&contact_id, &contact_username, &contact_photo); err != nil {
			return nil, errors.Errorf("failed to scan result set for get Contact for user id = %q: %s", user_id.Id, err)
		}
		// fmt.Println("teeeee :=", contact_id, contact_username, contact_photo)
		new_contact := new(Contact)
		new_contact.Id = contact_id
		new_contact.Photo = contact_photo
		new_contact.Username = contact_username
		contact = append(contact, *new_contact)

	}
	// fmt.Println(len(contact))
	return &contact, nil
}
func (r *repository) AddContact(ctx context.Context, req AddContactReq) (*Contact, error) {
	var contact Contact
	query := "SELECT username, id FROM users WHERE id = $1"
	err := r.db.QueryRowContext(ctx, query, req.Id).Scan(&contact.Username, &contact.Id)
	if err != nil {
		return &Contact{}, err
	}

	query = "INSERT INTO contact(username, contact_id, user_id, profile_photo) SELECT $1, $2, $3, $4 WHERE NOT EXISTS (SELECT contact_id FROM contact WHERE contact_id = $2 AND user_id = $3)"
	rows, err := r.db.QueryContext(ctx, query, contact.Username, contact.Id, req.MyId, "no_photo")
	fmt.Println(rows)
	if err != nil {
		fmt.Println(err)
		return &Contact{}, err
	}
	return &contact, nil
}
func (r *repository) GetMsgByConversation(ctx context.Context, conv *GetMessageReq) (*[]Message, error) {
	fmt.Println(conv.ConvId)

	var AllMessages []Message
	query := "SELECT message_id, from_user, message_text, sent_datetime FROM message WHERE conversation_id = $1"
	rows, err := r.db.QueryContext(ctx, query, conv.ConvId)
	if err != nil {
		return &[]Message{}, err
	}
	for rows.Next() {
		if err := rows.Err(); err != nil {
			return nil, err
		}
		var message_id int
		var from_user string
		var messageText string
		var sent_datetime string

		if err := rows.Scan(&message_id, &from_user, &messageText, &sent_datetime); err != nil {
			return nil, errors.Errorf("failed to scan result set for get Conversation  for conv id = %q: %s", conv.ConvId, err)
		}
		fmt.Println("messageText : ", messageText)
		new_message := new(Message)
		new_message.ConversationId = conv.ConvId
		new_message.FromUser = from_user
		new_message.MessageId = message_id
		new_message.MessageText = messageText
		new_message.SentDateTime = sent_datetime
		AllMessages = append(AllMessages, *new_message)
		fmt.Println("new message", new_message.MessageText)
	}
	// new_message := new(Message)
	// new_message.ConversationId = 1
	// new_message.FromUser = "fredo le poto"
	// new_message.MessageId = 15
	// new_message.MessageText = "Hello le world"
	// new_message.SentDateTime = "111111"
	// AllMessages = append(AllMessages, *new_message)

	return &AllMessages, nil

}
