# CRUD MySQL with ExpressJS & TypeORM

A RESTful API for user management with TypeScript, Docker, and TypeORM.

---

## Features

- Full CRUD operations
- Pagination & Filtering
- Input validation
- Swagger documentation
- Dockerized environment
- Seed data & database migration

---

## Table of Contents

- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Database Setup](#database-setup)
- [Docker Deployment](#docker-deployment)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## Getting Started

### Prerequisites

- Docker & Docker Compose
- Node.js 18+
- MySQL 8.0+

---

### Setup & Run

#### **Option 1: Docker (Recommended)**

```bash
# Build and start containers
docker compose up -d --build

# Access application
http://localhost:3000/api-docs
```

#### **Option 2: Local Setup**

```bash
# Install dependencies
npm install

# Create .env file
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=99tech
DB_NAME=99tech_db

# Run migrations
npx typeorm migration:run

# Start development server
npm run dev
```

---

## API Documentation

### Base URL

`http://localhost:3000/api/users`

### Endpoints

| Method | Endpoint | Description       | Parameters                          |
| ------ | -------- | ----------------- | ----------------------------------- |
| POST   | `/`      | Create user       | `name`, `email` (required)          |
| GET    | `/`      | Get all users     | `name`, `email`, `page`, `pageSize` |
| GET    | `/:id`   | Get user by ID    | `id` (path parameter)               |
| PUT    | `/:id`   | Update user by ID | `id`, `name`, `email`               |
| DELETE | `/:id`   | Delete user by ID | `id` (path parameter)               |

### Response Example

```json
{
  "data": [
    {
      "id": 1,
      "name": "Alice",
      "email": "alice@99tech.com",
      "createdAt": "2025-09-03T00:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "totalItems": 3,
    "totalPages": 1
  }
}
```

---

## Swagger UI

- **URL**: `http://localhost:3000/api-docs`
- Interactive API documentation with request examples

---

## Database Setup

### Migrations

```bash
# Generate migration
npx typeorm migration:generate -n UpdateUserTable

# Run migration
npx typeorm migration:run
```

### Seed Data

3 sample users will be auto-populated via Docker or manual migration:

```sql
INSERT INTO users (name, email) VALUES
('Alice', 'alice@99tech.com'),
('Bob', 'bob@99tech.com'),
('Charlie', 'charlie@99tech.com');
```

---

## Docker Deployment

### Services

| Service    | Image      | Port | Environment Variables                                     |
| ---------- | ---------- | ---- | --------------------------------------------------------- |
| `app`      | Node.js 18 | 3000 | `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME` |
| `database` | MySQL 8.0  | 3306 | `MYSQL_ROOT_PASSWORD`, `MYSQL_DATABASE`                   |

---

## Project Structure

```
src/
├── controllers/   # HTTP request handlers
├── entities/       # Database schema definitions (TypeORM)
├── services/       # Business logic layer
├── validators/     # Input validation logic
├── utils/          # Helper functions (pagination, etc.)
├── database/       # Database connection & migration
├── routes/         # API endpoint definitions
├── swagger/        # Documentation configuration
└── app.ts         # Application entrypoint
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=99tech
DB_NAME=99tech_db
```

---

## Pagination

Example request:

```bash
curl "http://localhost:3000/api/users?page=2&pageSize=10"
```

---

## CORS Configuration

```typescript
app.use(
  cors({
    origin: "*", // Allow all origins in development
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
```

---

## Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m "Add some feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a PR

---

## License

MIT License

---

## Architecture

The folder structure I recommend for the project follows the Modular Architecture and Clean Code principles, focusing on separation of responsibilities and code reuse.

---

## Credits

- Built with ❤️ using [TypeORM](https://typeorm.io/) and [Swagger](https://swagger.io/)
- Dockerized with ❤️ by [Docker Compose](https://docs.docker.com/compose/)
