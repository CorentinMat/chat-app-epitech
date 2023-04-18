CREATE TABLE "users" (
    "id" bigserial PRIMARY KEY,
    "username" varchar NOT NULL,
    "email" varchar NOT NULL,
    "password" varchar NOT NULL
)
-- CREATE TABLE "rooms"{
--     "id" bigserial PRIMARY KEY,
-- }
-- CREATE TABLE "message"(
--     "message_id" bigserial PRIMARY KEY,
--     FOREIGN KEY ("sender_id") REFERENCES users (id)
--     FOREIGN KEY ("receive_id") REFERENCES users (id)
--     "message_text" varchar NOT NULL,
--     "file" text, 
--     "sent_at" datetime NOT NULL,

-- )