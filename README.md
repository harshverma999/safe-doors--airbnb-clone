# SafeDoors — Airbnb Clone

A full-stack accommodation listing web application inspired by Airbnb, built using Node.js, Express.js, MongoDB, EJS, and Bootstrap.

SafeDoors allows users to explore accommodation listings, view detailed property information, create and manage listings, upload property images, interact with an interactive map, write reviews, and securely authenticate using Passport.js.

---

## 🚀 Project Overview

SafeDoors is a full-stack web application developed to demonstrate real-world backend and full-stack development concepts.

The project follows an MVC-style architecture and implements features such as authentication, authorization, CRUD operations, image uploads, server-side validation, reviews, sessions, flash messages, and location-based map integration.

The application provides separate functionality for authenticated and unauthenticated users while protecting sensitive operations such as creating, editing, and deleting listings and reviews.

---

## ✨ Key Features

### 🔐 Authentication & Authorization

- User registration and login
- Passport.js local authentication
- Secure password hashing using Passport Local Mongoose
- Session-based authentication
- Protected routes for authenticated users
- Authorization for listing and review operations
- Login/logout functionality

### 🏠 Listing Management

- Create new accommodation listings
- View all available listings
- View detailed information for individual listings
- Edit existing listings
- Delete listings
- Display listing title, description, price, country, and location
- Ownership-based authorization for listing modifications

### 🖼️ Image Upload

- Upload listing images
- Cloudinary integration for image storage
- Multer for handling multipart/form-data
- Update listing images while editing properties
- Cloud-based image storage instead of storing uploaded files in the repository

### ⭐ Review System

- Add reviews to listings
- Star-based rating system
- Display all reviews associated with a listing
- Delete reviews
- Review validation
- Authorization for review deletion

### 🗺️ Interactive Maps

- Mapbox integration
- Display listing locations on an interactive map
- Geocoding-based location handling
- Map markers for properties
- Location information displayed on listing pages

### ✅ Validation & Error Handling

- Joi schema validation
- Server-side input validation
- Custom Express error handling
- Centralized asynchronous error handling
- User-friendly validation messages
- Flash messages for success and error notifications

### 💾 Database & Sessions

- MongoDB database integration using Mongoose
- MongoDB Atlas support
- Persistent session storage using connect-mongo
- Structured Mongoose schemas and relationships

### 🎨 User Interface

- Responsive design using Bootstrap
- EJS templating
- EJS Mate for reusable layouts
- Reusable navbar, footer, and flash message components
- Responsive listing cards and forms
- Category navigation
- Tax-inclusive price display option

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Bootstrap
- EJS

### Backend

- Node.js
- Express.js
- RESTful routing
- MVC architecture

### Database

- MongoDB
- Mongoose
- MongoDB Atlas

### Authentication

- Passport.js
- Passport Local
- Passport Local Mongoose
- Express Session
- Connect Mongo

### Image Management

- Cloudinary
- Multer
- Multer Storage Cloudinary

### Maps

- Mapbox
- Mapbox SDK

### Validation & Utilities

- Joi
- Connect Flash
- Method Override
- Dotenv
- EJS Mate

---

## 🏗️ Project Architecture

The project follows an MVC-style structure to keep application logic organized and maintainable.

```text
MAJOR_PROJECT/
│
├── controllers/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   │   ├── rating.css
│   │   └── style.css
│   │
│   └── js/
│       ├── map.js
│       └── script.js
│
├── routes/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── screenshots/
│   └── Project screenshots
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   └── users/
│
├── .env.example
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── package.json
├── package-lock.json
└── README.md
```

---

## 🔄 Application Flow

The application follows a structured request-response flow:

```text
User
  ↓
Express Routes
  ↓
Authentication / Authorization Middleware
  ↓
Controller
  ↓
Mongoose Model
  ↓
MongoDB
  ↓
Controller
  ↓
EJS View
  ↓
User
```

For image uploads:

```text
User
  ↓
Multer
  ↓
Cloudinary
  ↓
Image URL
  ↓
MongoDB Listing Document
```

For location handling:

```text
Listing Location
  ↓
Mapbox Geocoding
  ↓
Coordinates
  ↓
Interactive Map
  ↓
Listing Marker
```

---

## 🔑 Authentication & Authorization

SafeDoors uses Passport.js for authentication.

The authentication system includes:

- User signup
- User login
- Password hashing
- Persistent sessions
- Logout
- Protected routes
- User ownership checks

Authenticated users can create listings and reviews.

Listing owners can edit or delete their own listings, while review permissions are also protected through authorization middleware.

---

## 🏠 CRUD Operations

The application implements complete CRUD functionality for accommodation listings.

### Create

Users can create a listing by providing:

- Title
- Description
- Image
- Price
- Country
- Location

### Read

Users can:

- Browse all listings
- Search listings
- Open individual listing pages
- View property details
- View reviews
- View the property location on a map

### Update

Listing owners can update:

- Title
- Description
- Image
- Price
- Country
- Location

### Delete

Authorized listing owners can remove their listings.

---

## ⭐ Review System

Users can submit reviews for listings using a star rating and comment.

The review system includes:

- 1–5 star ratings
- Review comments
- Review validation
- Review display
- Review deletion
- Authorization checks

Reviews are associated with both the user and the listing using MongoDB relationships.

---

## ☁️ Cloudinary Image Management

Listing images are stored using Cloudinary rather than being permanently stored inside the project repository.

The upload flow uses:

- Multer
- Multer Storage Cloudinary
- Cloudinary

This keeps the repository lightweight and separates application code from uploaded media.

---

## 🗺️ Mapbox Integration

Mapbox is used to provide interactive maps for listing locations.

The application processes the location information and displays it on an interactive map with a marker.

Users can see the approximate listing location while the application can keep the exact location information protected until the appropriate stage of the user flow.

---

## 🛡️ Validation & Error Handling

The application implements server-side validation using Joi.

Validation is applied to important user inputs before they are stored in the database.

The project also includes:

- Custom `ExpressError` class
- `wrapAsync` utility
- Centralized error handling
- Joi validation
- Flash messages
- Form validation feedback

This helps prevent invalid data from reaching the database and provides a better user experience.

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/harshverma999/safe-doors--airbnb-clone.git
```

### 2. Navigate to the project directory

```bash
cd safe-doors--airbnb-clone
```

### 3. Install dependencies

```bash
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the project root.

You can use `.env.example` as a reference.

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

ATLASDB_URL=your_mongodb_atlas_connection_string

SECRET=your_session_secret

MAP_TOKEN=your_mapbox_token
```

### Important

Never commit your actual `.env` file or API keys to GitHub.

The repository includes `.env.example` only to show the required environment variable structure.

---

## ▶️ Running the Application

After configuring the environment variables, start the application using:

```bash
node app.js
```

For development, you can also use a Node.js development tool such as Nodemon if configured locally.

The application will run on the configured local port.

---

## 🧪 Example User Flow

A typical user flow looks like this:

```text
Sign Up
   ↓
Login
   ↓
Explore Listings
   ↓
Open Listing
   ↓
View Details & Map
   ↓
Write Review
   ↓
Create Listing
   ↓
Edit Listing
   ↓
Manage Own Listings
   ↓
Logout
```

---

## 📚 What I Learned

This project helped me gain practical experience with:

- Building a full-stack Node.js application
- Express.js routing and middleware
- MVC architecture
- MongoDB database design
- Mongoose schemas and relationships
- Authentication and authorization
- Passport.js
- Session management
- RESTful CRUD operations
- Joi validation
- Error handling
- Cloudinary image uploads
- Multer
- Mapbox integration
- EJS templating
- Bootstrap responsive UI
- Git and GitHub
- Environment variable management

---

## 🔮 Future Improvements

Potential improvements for future versions include:

- Advanced listing search and filtering
- Pagination
- Booking and reservation functionality
- User profile management
- Wishlist functionality
- Email notifications
- Payment gateway integration
- Improved mobile responsiveness
- Advanced location-based search
- Automated testing
- Deployment with CI/CD

---

## 📂 Screenshots

Application screenshots are available in the `screenshots/` directory of this repository.

---

## 👨‍💻 Author

**Harsh Kumar Verma**

B.Tech — Computer Science & Engineering

GitHub:  
https://github.com/harshverma999

Project Repository:  
https://github.com/harshverma999/safe-doors--airbnb-clone

---

## 📄 License

This project is developed for educational and portfolio purposes.
