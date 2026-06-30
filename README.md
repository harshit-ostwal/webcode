# WebCode

WebCode is a full stack web application built with **Next.js**, **Node.js**, **Express.js**, and **MongoDB**. This repository contains both the frontend and backend applications in a single repository.

## Repository Structure

```text
webcode/
├── backend/      # Express.js API
├── frontend/     # Next.js Application
└── README.md
```

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- Zustand
- Zod

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Zod Validation
- Nodemailer

### Runtime & Package Manager

- Bun

---

## Live Demo

| Service | URL |
|----------|-----|
| Frontend | https://webcode-five-eta.vercel.app |
| Backend API | https://webcode-production-1d1f.up.railway.app |

---

## Prerequisites

Install Bun.

```bash
curl -fsSL https://bun.sh/install | bash
```

Verify the installation.

```bash
bun --version
```

---

## Getting Started

Clone the repository.

```bash
git clone <repository-url>
cd webcode
```

### Install Dependencies

Install dependencies for both applications.

```bash
cd backend
bun install

cd ../frontend
bun install
```

---

## Environment Variables

Create the required environment files.

### Backend

```bash
cd backend
cp .env.example .env
```

### Frontend

```bash
cd frontend
cp .env.example .env.local
```

Update the environment variables before starting the applications.

---

## Running the Applications

### Start Backend

```bash
cd backend
bun run dev
```

Backend runs on:

```
http://localhost:8080
```

### Start Frontend

Open a new terminal.

```bash
cd frontend
bun run dev
```

Frontend runs on:

```
http://localhost:3000
```

---

## Project Structure

```text
webcode/
│
├── backend/
│   ├── src/
│   ├── .env.example
│   └── README.md
│
├── frontend/
│   ├── src/
│   ├── .env.example
│   └── README.md
│
└── README.md
```

---

## Documentation

| Project | Documentation |
|---------|---------------|
| Frontend | [frontend/README.md](./frontend/README.md) |
| Backend | [backend/README.md](./backend/README.md) |

---

## Features

- Modern Full Stack Architecture
- Authentication with JWT
- RESTful APIs
- Cookie Based Authentication
- Request Validation
- Responsive UI
- Type Safe Development
- MongoDB Database
- Email Integration

---

## Development Commands

### Backend

```bash
cd backend

bun install
bun run dev
bun run lint
bun run format
```

### Frontend

```bash
cd frontend

bun install
bun run dev
bun run build
bun run lint
```

---

## Deployment

| Service | Platform |
|----------|----------|
| Frontend | Vercel |
| Backend | Railway |

---

## License

This project is licensed under the MIT License.