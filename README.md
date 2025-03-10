# Sports Reservation System

## Overview
The Sports Reservation System is a web application that allows users to reserve sports facilities. It consists of a React frontend and a Node.js backend, with a MySQL database for data storage. The application is containerized using Docker for easy deployment and management.

## Project Structure
```
sports-reservation-system
├── backend
│   ├── src
│   │   ├── app.js
│   │   ├── controllers
│   │   │   └── index.js
│   │   ├── models
│   │   │   └── index.js
│   │   ├── routes
│   │   │   └── index.js
│   │   └── config
│   │       └── database.js
│   ├── package.json
│   └── Dockerfile
├── frontend
│   ├── src
│   │   ├── App.js
│   │   ├── components
│   │   │   └── index.js
│   │   ├── pages
│   │   │   └── index.js
│   │   └── services
│   │       └── api.js
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

## Technologies Used
- **Frontend**: React
- **Backend**: Node.js, Express
- **Database**: MySQL
- **Containerization**: Docker

## Setup Instructions

### Prerequisites
- Docker
- Docker Compose

### Running the Application
1. Clone the repository:
   ```
   git clone <repository-url>
   cd sports-reservation-system
   ```

2. Build and run the application using Docker Compose:
   ```
   docker-compose up --build
   ```

3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend API: `http://localhost:5000`

## Usage
- Users can create, view, and manage reservations for sports facilities.
- Admins can manage users and facilities through the backend API.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any improvements or features.

## License
This project is licensed under the MIT License.