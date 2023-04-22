package user

import (
	"context"
	"database/sql"

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

// test return que 1 contact
func (r *repository) GetContact(ctx context.Context, user_id int) ([]Contact, error) {
	// bloquer à 10 contacts max pour le moment
	// contact := make([]Contact, 10)
	var contact []Contact
	query := "SELECT contact_id, username, profile_photo FROM contact WHERE user_id = $1"
	rows, err := r.db.QueryContext(ctx, query, user_id)
	// .Scan(&contact.id, &contact.username, &contact.photo)
	if err != nil {
		return []Contact{}, err
	}
	count := 0
	for rows.Next() {
		if err := rows.Err(); err != nil {
			return nil, err
		}
		var contact_id int
		var contact_username string
		var contact_photo string
		if err := rows.Scan(&contact_id, &contact_username, &contact_photo); err != nil {
			return nil, errors.Errorf("failed to scan result set for get Contact for user id = %q: %s", user_id, err)
		}
		// fmt.Println("teeeee :=", contact_id, contact_username, contact_photo)
		new_contact := new(Contact)
		new_contact.id = contact_id
		new_contact.photo = contact_photo
		new_contact.username = contact_username
		contact = append(contact, *new_contact)
		count++

	}
	// fmt.Println(len(contact))
	return contact, nil
}
func (r *repository) GetMsgByConversation(ctx context.Context, conversation_id int64) (*[]Message, error) {
	var AllMessages []Message
	query := "SELECT from_user, message_text, sent_date FROM message WHERE conversation_id = $1"
	rows, err := r.db.QueryContext(ctx, query, conversation_id)
	if err != nil {
		res := make([]Message, 0)
		return &res, err
	}
	for rows.Next() {
		if err := rows.Err(); err != nil {
			return nil, err
		}

		// log.Println("rows =>", rows.Next())
		// var pkey int
		// err = rows.Scan(&pkey, (&AllMessages))
		// if err != nil {
		// 	res := make([]Message, 0)
		// 	return &res, err
		// }
	}

	return &AllMessages, nil

}
