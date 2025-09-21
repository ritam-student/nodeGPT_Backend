
# nodeGPT Backend

A Node.js backend for an AI-powered chat application using Express, MongoDB (Mongoose), and OpenAI (Gemini) API. This backend manages chat threads, stores messages, and generates AI responses.

---

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Setup & Installation](#setup--installation)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [License](#license)

---

## Features
- RESTful API for chat threads and messages
- AI-powered responses using Gemini (OpenAI API)
- MongoDB for persistent storage
- CORS enabled for frontend integration
- TypeScript support

---

## Project Structure
```
Backend/
	package.json
	tsconfig.json
	src/
		index.ts            # Entry point, Express app setup
		db/
			connectDB.ts      # MongoDB connection logic
		models/
			threadSchema.ts   # Mongoose schema for threads/messages
		routes/
			chat.ts           # API routes for chat and threads
		utils/
			generatedResponse.ts # AI response generation logic
```

---

## Setup & Installation

1. **Clone the repository:**
	 ```sh
	 git clone <repo-url>
	 cd Backend
	 ```
2. **Install dependencies:**
	 ```sh
	 npm install
	 ```
3. **Configure environment variables:**
	 - Copy `.env.example` to `.env` and fill in the required values:
		 - `GEMINI_API_KEY` (Gemini/OpenAI API key)
		 - `BASE_URL` (OpenAI API base URL)
		 - `MONGODB_URI` (MongoDB connection string, e.g. `mongodb://localhost:27017/`)
		 - `DB_NAME` (Database name)
		 - `PORT` (Port for the server, e.g. `3000`)
4. **Build and run the server:**
	 ```sh
	 npm run build
	 npm run dev
	 ```

---

## Environment Variables
| Variable         | Description                        |
|------------------|------------------------------------|
| GEMINI_API_KEY   | Your Gemini/OpenAI API key         |
| BASE_URL         | OpenAI API base URL                |
| MONGODB_URI      | MongoDB connection string          |
| DB_NAME          | Name of the MongoDB database       |
| PORT             | Port number for the backend server |

---

## Available Scripts
| Script      | Description                        |
|-------------|------------------------------------|
| build       | Build TypeScript files              |
| dev         | Build and start the server          |

---

## API Endpoints
All endpoints are prefixed with `/api`.

### Get All Threads
- **GET** `/api/thread`
- **Description:** Fetch all chat threads (most recent first)
- **Response:** Array of thread objects

### Get Single Thread
- **GET** `/api/thread/:threadId`
- **Description:** Fetch messages for a specific thread
- **Params:**
	- `threadId` (string): Thread identifier
- **Response:** Array of message objects

### Delete Thread
- **DELETE** `/api/thread/:threadId`
- **Description:** Delete a thread by its ID
- **Params:**
	- `threadId` (string): Thread identifier
- **Response:** Success message

### Send Message / Get AI Response
- **POST** `/api/chat`
- **Description:** Send a user message, get AI assistant reply, and update thread
- **Body:**
	```json
	{
		"threadId": "string",
		"message": "string"
	}
	```
- **Response:**
	```json
	{
		"reply": "string"
	}
	```

---

## Database Models

### Thread
- `threadId`: String (unique)
- `title`: String
- `messages`: Array of Message
- `createdAt`: Date
- `updatedAt`: Date

### Message
- `role`: String ("user" or "assistant")
- `content`: String
- `timestamp`: Date

---

## License
This project is licensed under the ISC License.
