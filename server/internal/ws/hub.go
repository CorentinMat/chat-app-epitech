package ws

type Room struct {
	ID      string             `json:"id"`
	Name    string             `json:"name"`
	Clients map[string]*Client `json:"clients"`
}

type Hub struct {
	Rooms      map[string]*Room
	Register   chan *Client
	Unregister chan *Client
	Broadcast  chan *Message
}

// probleme par la :=>
func NewHub() *Hub {
	return &Hub{
		Rooms:      make(map[string]*Room),
		Register:   make(chan *Client),
		Unregister: make(chan *Client),
		Broadcast:  make(chan *Message, 5),
	}
}
func (h *Hub) Run() {
	for {
		select {
		case client := <-h.Register:
			if _, ok := h.Rooms[client.RoomID]; ok {
				r := h.Rooms[client.RoomID]
				// check if the client is already registered or not
				if _, ok := r.Clients[client.ID]; !ok {
					r.Clients[client.ID] = client
				}
			}
		case client := <-h.Unregister:
			if _, ok := h.Rooms[client.RoomID]; ok {
				// check if the client existe
				if _, ok := h.Rooms[client.RoomID].Clients[client.ID]; ok {
					// message for other clients
					if len(h.Rooms[client.RoomID].Clients) > 0 {
						h.Broadcast <- &Message{
							Content:  "User left the room 🫡",
							RoomID:   client.ID,
							Username: client.Username,
						}
					}

					delete(h.Rooms[client.ID].Clients, client.ID)
					close(client.Message)
				}
			}
		case m := <-h.Broadcast:
			if _, ok := h.Rooms[m.RoomID]; ok {
				for _, client := range h.Rooms[m.RoomID].Clients {
					client.Message <- m
				}
			}
		}
	}
}
