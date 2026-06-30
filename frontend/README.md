# WebCode Frontend

Frontend for **WebCode**, built with Next.js, React, and Tailwind CSS.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios
- React Hook Form
- Zod
- Zustand

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
cd webcode-frontend
```

### 2. Install dependencies

```bash
bun install
```

### 3. Create `.env.local`

Copy the example environment file.

```bash
cp .env.example .env.local
```

Configure the following variables.

```env
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
NEXT_PUBLIC_HEALTH_CHECK_URL=http://localhost:8080/api/v1/health
NEXT_PUBLIC_APP_NAME=Frontend App
NEXT_PUBLIC_NODE_ENV=development
```

### 4. Start the development server

```bash
bun run dev
```

The application will be available at:

```
http://localhost:3000
```

---

## Project Structure

```text
src
├── app/
├── components/
├── features/
├── hooks/
├── lib/
├── providers/
├── services/
├── store/
├── styles/
├── types/
└── utils/
```

---

## Features

- User Authentication
- Protected Routes
- API Integration
- Form Validation
- Responsive UI
- State Management
- Dark Mode Support
- Reusable Components
- Type Safe Development

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_API_URL` | Backend API Base URL |
| `NEXT_PUBLIC_HEALTH_CHECK_URL` | Health Check Endpoint |
| `NEXT_PUBLIC_APP_NAME` | Application Name |
| `NEXT_PUBLIC_NODE_ENV` | Environment |

---

## Available Scripts

```bash
bun run dev        # Development
bun run build      # Production Build
bun run start      # Start Production Server
bun run lint       # Lint Project
```

---

## Production URLs

| Environment | URL |
|------------|-----|
| Frontend | https://webcode-five-eta.vercel.app |
| API | https://webcode-production-1d1f.up.railway.app/api/v1 |

---

## License

This project is licensed under the MIT License.