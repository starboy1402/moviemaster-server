# MovieMaster Pro - Server

Backend API for MovieMaster Pro movie management system.

## Features

- RESTful API for movie CRUD operations
- MongoDB database integration
- User-based movie collections
- Top-rated and recently added movies endpoints
- CORS enabled for client-side requests

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- CORS
- dotenv for environment variables

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
CORS_ORIGIN=http://localhost:5173
```

4. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Movies
- `GET /api/movies` - Get all movies
- `GET /api/movies/top-rated` - Get top 5 rated movies
- `GET /api/movies/recent` - Get 6 most recently added movies
- `GET /api/movies/:id` - Get single movie by ID
- `GET /api/movies/user/:email` - Get movies by user email
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Deployment

Deploy to Vercel for serverless deployment.
