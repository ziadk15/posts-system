# Posts System

A backend system built with Node.js, Express, MongoDB, Apache Kafka, and Docker following Domain-Driven Design (DDD) principles.

## Tech Stack

- Node.js + Express
- MongoDB + Mongoose
- Apache Kafka (KafkaJS)
- Docker + Docker Compose
- Domain-Driven Design (DDD)

## How to Run

1. Clone the repository

```bash
git clone https://github.com/ziadk15/posts-system.git
cd posts-system
```

2. Create `.env` file
3. Run with Docker

```bash
docker compose up --build
```


## Project Structure
src/
├── domain/          # Business logic and entities
│   └── post/
│       ├── Post.js
│       └── PostRepository.js
├── application/     # Use cases
│   └── post/
│       ├── CreatePost.js
│       ├── GetPost.js
│       └── ListPosts.js
├── infrastructure/  # DB and messaging
│   ├── db/
│   │   ├── database.js
│   │   └── MongoPostRepository.js
│   └── messaging/
│       ├── KafkaProducer.js
│       └── KafkaConsumer.js
└── api/             # HTTP layer
├── routes/
│   └── postRoutes.js
└── server.js

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /posts | Create a new post |
| GET | /posts | List all posts |
| GET | /posts/:id | Get post by ID |

## Example Request

```json
POST /posts
{
  "title": "My First Post",
  "content": "This is the content"
}
```

## Kafka Flow

When a post is created:
1. API saves the post to MongoDB
2. Producer sends event to `post.created` topic
3. Consumer receives the event and logs it

## Screenshots
<img width="1900" height="967" alt="Screenshot From 2026-05-17 18-42-04" src="https://github.com/user-attachments/assets/499b532b-a70f-4a73-b65f-75ebe35d8174" />
<img width="1900" height="967" alt="Screenshot From 2026-05-17 18-37-28" src="https://github.com/user-attachments/assets/9d3493d8-13a9-4af5-b871-f6cb7625e84c" />
<img width="1900" height="967" alt="Screenshot From 2026-05-17 18-27-19" src="https://github.com/user-attachments/assets/b5711673-6eba-4cb9-94cb-c384ed131969" />
