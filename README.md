# ShopCart

E-commerce cart and checkout demo for Modern Client-Side State Management in React.

## Setup

Install dependencies:

```bash
npm install
```

Install json-server (dev dependency):

```bash
npm install -D json-server@0.17.4
```

## Running the Application

Run in two separate terminal windows:

Terminal 1 (Frontend):

```bash
npm run dev
```

Starts Vite on http://localhost:5173/

Terminal 2 (Mock API):

```bash
npm run server
```

Starts json-server on http://localhost:3001/ with a 1.5s network delay.

## Scripts

- `npm run dev` - Start Vite dev server
- `npm run server` - Start json-server mock API
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build

## API Contracts

- `GET /api/products` - Returns the catalog list
- `POST /api/orders` - Creates an order, returns the created order with unique id
