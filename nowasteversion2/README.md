# NoWasteAI Version 2

NoWasteAI is a food waste management application I built to help people make better use of the ingredients they already have instead of letting food go to waste.

The idea is simple: keep track of what's in your pantry, generate recipes based on your available ingredients and update your pantry when you make a meal.

## Features

- Pantry management:Add ingredients with their quantities, units and expiry dates.
- Expiry tracking: Identify expired ingredients so they aren't used when generating recipes.
- Kitchen equipment: Save the cooking equipment you have available.
- Recipe generation: Generate recipes based on your pantry ingredients and available equipment.
- Recipe images: Find existing food images using TheMealDB API.
- Pantry updates: Confirm whether you made a recipe and update ingredient quantities accordingly.

## Tech Stack

- Frontend: React, JavaScript and CSS
- Backend: Python and FastAPI
- Database: PostgreSQL
- External API: TheMealDB

## Getting Started

### Prerequisites

Make sure you have Python, Node.js and PostgreSQL installed.

### 1. Clone the repository

```bash
git clone https://github.com/Angellulu954/Nowasteai-Version-2.git
cd Nowasteai-Version-2
```

### 2. Set up the backend

Open a terminal in the `Backend` directory.

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```powershell
venv\Scripts\activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Configure your database connection and any required environment variables using your local setup.

Start the backend:

```bash
uvicorn app.main:app --reload
```

The API should be available at `http://127.0.0.1:8000`.

You can view the API documentation at `http://127.0.0.1:8000/docs`.

### 3. Set up the frontend

Open another terminal in the `Frontend` directory.

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the local URL provided by Vite in your terminal.