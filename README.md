# COSMOS website

## **Overview**
Quantum & Cosmology Articles Platform is a web-based application for publishing and managing popular science articles related to **quantum physics** and **cosmology**. The system supports user authentication, allowing **administrators** to create, edit, and delete articles, while regular users can browse and read them.

This project consists of:
- **Frontend:** React.js, React Router, TanStack Query
- **Backend:** Node.js, Express.js, PostgreSQL
- **Authentication:** JWT-based authentication
- **Styling:** CSS Modules

---

## **Features**
### **General**
- Browse scientific articles about quantum physics and cosmology.
- View article details, including author and publication date.

![Homepage](docs/screenshots/homepage.gif)

### **Authentication & Authorization**
- **User authentication** using JWT tokens.
- **Admin access control**: Only admins can add, edit, or delete articles.
- **Secure login & signup** process with password hashing.

![Login Animation](docs/screenshots/login-animation.gif)

### **Article Management**
- **Create new articles** (admin only).
- **Edit existing articles** (admin only).
- **Delete articles** (admin only).

![Article View](docs/screenshots/article-view.png)
![Admin Add Article](docs/screenshots/admin-add-article.png)

### **Performance & API**
- Optimized API with pagination support for fetching articles.
- Database connection using PostgreSQL.

## **Installation & Setup**
### **1. Clone the repository**
  `git clone https://github.com/klaudia-pruchnik/cosmos-website.git`
### **2. Backend Setup**
  Open a terminal and navigate to the `backend/` directory:
  `cd backend`
  `npm install`
  Then, start the backend server:
  `node app.js`
### **3. Frontend Setup**
  Open a second terminal and navigate to the project root:
  `npm install`
  `npm run dev`
### **4. Configure Environment Variables**
  Create a `.env` file inside the `backend/` directory:
  
  `cd backend`
    `touch .env` For Linux/Mac
    `echo. > .env` For Windows
    
  Add the following content:
    `DATABASE_URL=postgresql://restricted_user:securepassword@ep-steep-shape-a2i8vju3.eucentral-1.aws.neon.tech/cosmos_db?sslmode=require
    JWT_KEY=your_secret_key`
    
  ⚠️ Important: The DATABASE_URL is required to run the application.
This connection string allows users to register, log in, and read articles but does not allow editing or deleting them.

### **5. Running the Application**
Once the backend and frontend are running, open your browser and go to:
`http://localhost:5173` 
to access the frontend.
The backend API runs on:
`http://localhost:8080`

## **Technologies Used**

### **Frontend**
- React.js
- React Router
- TanStack Query
- CSS Modules
### **Backend**
- Node.js
- Express.js
- PostgreSQL
- JWT authentication

## **Licence**
This project is licensed under the MIT License.
  
