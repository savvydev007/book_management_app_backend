# Book Management System

This is the backend service for the Book Management App, built with **Express.js**, **MongoDB**, and **TypeScript**.

## Features

- User authentication and authorization (JWT-based).
- CRUD operations for managing books.
- MongoDB integration for data storage.
- Middleware for error handling and logging.

## Prerequisites

- Bun (v1.0 or higher)
- MongoDB (local or cloud instance)

## Setup Instructions

1. **Clone the repository**:
```bash
git clone https://github.com/your-username/book-management-system.git
cd backend
```
2. **Install dependencies**:
```bash
bun install
```

3. **Set up environment variables**: Create a `.env` file in the `backend` directory and add the following:
```bash
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
```
4. **Run the application**:
- For development:
```bash
bun run dev
```
- For production:
```bash
bun run build
bun start
```

5. **Run the frontend server**:
```bash
cd frontend
npm run dev
```

6. Access the application in your browser at `http://localhost:3000`.
   For frontend `http://localhost:3000`.
   For backend check config.js and assign the corresponding port

## API Endpoints

- **GET /books**: Get all books
- **POST /books/create**: Create a new book
- **GET /books/:id**: Get details of a specific book
- **PUT /books/:id**: Update details of a specific book
- **DELETE /books/:id**: Delete a specific book

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or new features you'd like to see implemented.

## License

This project is licensed under the MIT License.