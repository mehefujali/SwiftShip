Parcel Delivery API
A secure, modular, and role-based backend API designed to manage a parcel delivery system. This application allows users to register as senders or receivers and perform various operations such as creating, tracking, canceling, or confirming parcel deliveries.

🚀 Key Features
JWT-Based Authentication: Secure login system using accessToken and cookie-based refreshToken for persistent sessions.

Role-Based Access Control (RBAC): Endpoints are protected based on user roles (ADMIN, SENDER, RECEIVER), ensuring users can only access authorized resources.

Parcel Management: Senders can create new parcel requests and cancel them before dispatch.

Status Tracking: Admins can update a parcel's status (e.g., REQUESTED, DISPATCHED, IN_TRANSIT, DELIVERED), and users can track these updates in real-time.

User Management: Admins have full control over the user base, including viewing all users and blocking or unblocking their accounts.

Secure Password Hashing: User passwords are securely hashed using bcryptjs before being stored in the database.

Modular Architecture: The codebase is organized into a clean, modular structure, making it easy to maintain, scale, and extend.

Input Validation: All incoming API requests are validated using Zod to ensure data integrity and prevent invalid inputs.

Centralized Error Handling: A global error handler ensures consistent and well-structured error responses across the API.

🛠️ Technologies Used
Backend: Node.js, Express.js

Database: MongoDB with Mongoose

Language: TypeScript

Authentication: JSON Web Token (JWT)

Validation: Zod

Linting & Formatting: ESLint

⚙️ Setup and Installation
Prerequisites
Node.js (v18 or later recommended)

npm or yarn

MongoDB (running locally or a cloud instance)

Installation Steps
Clone the repository:

Bash

git clone https://github.com/your-username/parcel-delivery-api.git
cd parcel-delivery-api
Install dependencies:

Bash

npm install
Set up environment variables:

Create a .env file in the root of the project.

Copy the contents of .env.example (if available) or add the following variables:

Code snippet

PORT=8080
MONGO_URI=mongodb://localhost:27017/parcel-delivery-api
NODE_ENV=development
FRONTEND_URL=http://localhost:3000

# JWT Secrets

JWT_ACCESS_SECRET=your_super_secret_for_access_token
JWT_ACCESS_EXP=15m
JWT_REFRESH_SECRET=your_super_secret_for_refresh_token
JWT_REFRESH_EXP=7d
BCRYPT_SALT_ROUND=12
Run the application:

For development mode with live reloading:

Bash

npm run dev
To build for production:

Bash

npm run build
To start the production server:

Bash

npm run start
The server will be running at http://localhost:8080.

📜 Available Scripts
npm run dev: Starts the development server using ts-node-dev.

npm run build: Compiles the TypeScript code into JavaScript in the dist folder.

npm run start: Starts the production server from the compiled code.

npm run lint: Lints the codebase using ESLint.

npm run lint:fix: Attempts to automatically fix linting issues.

API Endpoints
Base URL: http://localhost:8080/api/v1
