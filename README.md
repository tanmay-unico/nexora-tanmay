## Nexora Market - Tanmay Lautawar

Nexora Market is a lightweight e-commerce demo showcasing a full-stack shopping flow. The project includes a Node/Express backend with a SQLite store and a Vite/React frontend styled as a modern storefront.

### Project Structure

- `backend/` – Express API, SQLite database, and seed scripts.
- `frontend/` – Vite + React app with modular components and modern styling.

### Prerequisites

- Node.js 18+
- npm (bundled with Node)

### Getting Started

1. **Install dependencies**
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

2. **Seed the database (optional)**
   ```bash
   cd backend
   npm run seed
   ```

3. **Run the backend API**
   ```bash
   cd backend
   npm run dev
   ```

4. **Run the frontend**
   ```bash
   cd frontend
   npm run dev
   ```

5. Visit the URL printed by Vite (typically `http://localhost:5173`) to explore the storefront UI. The backend defaults to `http://localhost:3000`.

### Environment Variables

The backend reads configuration from `backend/src/config/appConfig.js`. Adjust the defaults there or create an `.env` file if you need to customize ports or database paths.

### Production Build

To build the frontend for production:

```bash
cd frontend
npm run build
```

Static assets will be emitted to `frontend/dist/`.

