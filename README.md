
# Project Title

A brief description of what this project does and who it's for
# For Swagger api docs,visit: 
## [https://ez-train.vercel.app/api](https://ez-train.vercel.app/api)
# 📚 Courses API (NestJS + Prisma)

A RESTful API built with **NestJS** and **Prisma ORM** for managing course data.

---

## 🚀 Features

- Get all courses
- Get a course by ID
- Create a new course
- Modular NestJS architecture
- Prisma ORM integration

---

## 📦 Tech Stack

- **Node.js**
- **NestJS**
- **Prisma**
- **TypeScript**
- **PostgreSQL** (recommended, but any Prisma-supported DB works)

---

## 🗂 Project Structure


---

## ⚙️ Installation

```bash
npm install

http://localhost:3000

GET /courses
[
  {
    "id": 1,
    "title": "Introduction to N5",
    "description": "Learn the basics Greetings",
     
  }
]

GET /courses/:id

{
  "statusCode": 404,
  "message": "Course not found"
}

POST /courses

{
  "title": "N4 for Beginners",
  "description": "Learn Japanese N4",
  
}


Fetch all:
GET http://localhost:3000/courses

Fetch one:
GET http://localhost:3000/courses/1

Create one:
POST http://localhost:3000/courses


Body → JSON:

{
  "title": "NestJS Deep Dive",
  "description": "Advanced backend concepts.",
 
}
 
