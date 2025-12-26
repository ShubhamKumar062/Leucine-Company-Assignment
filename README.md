# Equipment Tracker

A full-stack web application for tracking and managing equipment data. This application allows users to view, add, update, and delete equipment records, including details like name, type, status, and cleaning history.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Endpoints](#api-endpoints)

## Features
- **View Equipment**: Display a list of all equipment with their details.
- **Add Equipment**: Form to add new equipment to the database.
- **Update Equipment**: Edit existing equipment details.
- **Delete Equipment**: Remove equipment from the system.
- **Responsive Design**: Mobile-friendly interface for managing equipment on the go.

## Tech Stack

### Backend
- **Node.js**: Runtime environment.
- **Express.js**: Web framework for building the API.
- **MongoDB**: NoSQL database for storing equipment data.
- **Mongoose**: ODM library for MongoDB.

### Frontend
- **React**: JavaScript library for building the user interface.
- **Vite**: Fast build tool and development server.
- **Axios**: HTTP client for making API requests.

## Project Structure
- `Backend/`: Contains the server-side code (Node.js/Express).
- `Frontend/Leucine/`: Contains the client-side code (React/Vite).

## Prerequisites
Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)

## Installation and Setup

### Backend Setup
1. Navigate to the `Backend` directory:
   ```bash
   cd Backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Backend` directory and configure the following variables:
   ```env
   PORT=8080
   MONGO_URI=your_mongodb_connection_string
   ```
4. Start the server:
   ```bash
   npm run start
   # or for development with nodemon
   npm run dev
   ```
   The backend will start running at `http://localhost:8080`.

### Frontend Setup
1. Navigate to the `Frontend/Leucine` directory:
   ```bash
   cd ../Frontend/Leucine
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `Frontend/Leucine` directory:
   ```env
   VITE_API_URL=http://localhost:8080/api/users
   ```
   > **Note**: Update the port if your backend is running on a different port.

4. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend application will be available at the URL shown in the terminal (usually `http://localhost:5173`).

## API Endpoints
The backend provides the following RESTful API endpoints. Note that while the resource is conceptually "Equipment", the current endpoints use the `/api/users` path.

| Method | Endpoint | Description | Body Parameters |
| :--- | :--- | :--- | :--- |
| **GET** | `/api/users/` | Get all equipment | None |
| **POST** | `/api/users/` | Add new equipment | `{ "name": "...", "type": "...", "status": "...", "lastCleaned": "..." }` |
| **PUT** | `/api/users/:id` | Update equipment | `{ "name": "...", "type": "...", "status": "...", "lastCleaned": "..." }` |
| **DELETE** | `/api/users/:id` | Delete equipment | None |

## Equipment Data Structure
- **Name**: String (Required)
- **Type**: String (Enum: "Machine", "Vessel", "Tank", "Mixer")
- **Status**: String (Enum: "Active", "Inactive", "Under Maintenance")
- **Last Cleaned**: Date (Required)
