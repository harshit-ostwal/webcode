# WebCode Backend

Backend API for **WebCode**, built with Node.js, Express.js, and MongoDB.

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- Cookie Authentication
- Nodemailer
- Railway

---

## Live Demo

| Service | URL |
|----------|-----|
| Frontend | https://webcode-five-eta.vercel.app |
| Backend API | https://webcode-production-1d1f.up.railway.app |

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd webcode-backend
```

### 2. Install dependencies

```bash
bun install
```

### 3. Create `.env`

Copy `.env.example`.

```bash
cp .env.example .env
```

Configure the following variables.

```env
# Application Configuration
NODE_ENV=development
PORT=8080

# CORS Configuration
ALLOWED_ORIGINS=http://localhost:8080,http://localhost:3000

# Application URLs
BACKEND_URL=http://localhost:8080
FRONTEND_URL=http://localhost:3000

# Database
DATABASE_URL=

# Cookie
COOKIE_SECRET_KEY=

# JWT
ACCESS_TOKEN_SECRET=
ACCESS_TOKEN_EXPIRY=

REFRESH_TOKEN_SECRET=
REFRESH_TOKEN_EXPIRY=
REFRESH_TOKEN_EXPIRY_MS=

# Email
MAIL_PROVIDER=smtp

SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASSWORD=
SMTP_SECURE=true
```

### 4. Run the development server

```bash
bun run dev
```

The API will be available at:

```
http://localhost:8080
```

---

## Project Structure

```text
src
├── config/
├── core/
├── middlewares/
├── modules/
│   ├── auth/
│   ├── user/
│   └── ...
├── shared/
├── app.js
└── server.js
```

---

## Features

- JWT Authentication
- Access and Refresh Tokens
- Cookie Based Authentication
- User Management
- Email Support
- Request Validation
- Centralized Error Handling
- Logging
- MongoDB Integration
- RESTful API Architecture

---

## API Base URL

### Development

```
http://localhost:8080/api/v1
```

### Production

```
https://webcode-production-1d1f.up.railway.app/api/v1
```

---

## Available Scripts

```bash
bun run dev       # Development
bun run start     # Production
bun run lint      # Lint code
bun run format    # Format code
```

---

## Deployment

| Service | Platform |
|----------|----------|
| Backend | Railway |
| Frontend | Vercel |

---

## License

This project is licensed under the MIT License.