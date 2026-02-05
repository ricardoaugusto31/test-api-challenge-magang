# Blog API - NestJS REST API

Simple REST API application built with NestJS and TypeScript, featuring JWT authentication, CRUD operations for Posts and Comments, and E2E testing.

## 📋 Features

- **Authentication**: JWT-based authentication (register, login, profile)
- **Posts CRUD**: Create, Read, Update, Delete blog posts
- **Comments CRUD**: Create, Read, Update, Delete comments (linked to posts)
- **Authorization**: Users can only modify their own posts/comments
- **Validation**: DTO validation using class-validator
- **E2E Testing**: Comprehensive end-to-end tests for authentication

## 🛠️ Tech Stack

- **Framework**: NestJS + TypeScript
- **Database**: SQLite (via TypeORM)
- **Authentication**: JWT (Passport.js)
- **Testing**: Jest + Supertest

## 🏗️ Project Pattern: Modular Architecture

Proyek ini menggunakan **NestJS Modular Architecture**, yang merupakan pattern yang sering saya gunakan karena beberapa alasan:

### Mengapa Memilih Pattern Ini?

1. **Separation of Concerns**
   - Setiap fitur dipisahkan ke dalam modul tersendiri (AuthModule, PostsModule, CommentsModule, UsersModule)
   - Memudahkan maintenance karena perubahan pada satu fitur tidak mempengaruhi fitur lain

2. **Scalability**
   - Mudah menambahkan fitur baru dengan membuat modul baru
   - Modul dapat di-import dan di-reuse di tempat lain

3. **Dependency Injection**
   - NestJS built-in DI container memudahkan pengelolaan dependencies
   - Membuat unit testing lebih mudah dengan kemampuan mock dependencies

4. **Clear Structure**
   - Struktur folder yang konsisten untuk setiap modul:
     ```
     src/
     ├── auth/
     │   ├── dto/           # Data Transfer Objects
     │   ├── guards/        # Auth Guards
     │   ├── strategies/    # Passport Strategies
     │   ├── auth.controller.ts
     │   ├── auth.module.ts
     │   └── auth.service.ts
     ├── posts/
     │   ├── dto/
     │   ├── post.entity.ts
     │   ├── posts.controller.ts
     │   ├── posts.module.ts
     │   └── posts.service.ts
     └── comments/
         └── ... (similar structure)
     ```

5. **Best Practices**
   - Mengikuti konvensi NestJS yang sudah teruji di production
   - Dokumentasi lengkap dan komunitas yang besar

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- npm

### Installation

```bash
# Clone repository
git clone <repository-url>
cd test-api-challenge-magang

# Install dependencies
npm install

# Run the application
npm run start:dev
```

The API will be available at `http://localhost:3000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login and get JWT token | No |
| GET | `/auth/profile` | Get current user profile | Yes |

### Posts

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts` | Get all posts | No |
| GET | `/posts/:id` | Get post by ID | No |
| POST | `/posts` | Create new post | Yes |
| PATCH | `/posts/:id` | Update post | Yes (owner only) |
| DELETE | `/posts/:id` | Delete post | Yes (owner only) |

### Comments

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/posts/:postId/comments` | Get comments for a post | No |
| POST | `/posts/:postId/comments` | Create comment on post | Yes |
| PATCH | `/comments/:id` | Update comment | Yes (owner only) |
| DELETE | `/comments/:id` | Delete comment | Yes (owner only) |

## 📝 API Usage Examples

### Register
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123", "name": "John Doe"}'
```

### Login
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

Response:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

### Create Post (with token)
```bash
curl -X POST http://localhost:3000/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-access-token>" \
  -d '{"title": "My First Post", "content": "Hello World!"}'
```

### Add Comment to Post
```bash
curl -X POST http://localhost:3000/posts/1/comments \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <your-access-token>" \
  -d '{"content": "Great post!"}'
```

## 🧪 Testing

### Run E2E Tests
```bash
npm run test:e2e
```

### E2E Test Coverage
The E2E tests cover:
- ✅ User registration (success, duplicate email, invalid email)
- ✅ User login (success, wrong password, non-existent user)
- ✅ Profile access (with valid token, without token, with invalid token)

### Run Unit Tests
```bash
npm run test
```

## 📁 Project Structure

```
src/
├── app.module.ts          # Root module
├── main.ts                # Application entry point
├── auth/                  # Authentication module
│   ├── dto/              # Register & Login DTOs
│   ├── guards/           # JWT Auth Guard
│   ├── strategies/       # JWT Passport Strategy
│   ├── auth.controller.ts
│   ├── auth.module.ts
│   └── auth.service.ts
├── users/                 # Users module
│   ├── user.entity.ts
│   ├── users.module.ts
│   └── users.service.ts
├── posts/                 # Posts module
│   ├── dto/              # Create & Update Post DTOs
│   ├── post.entity.ts
│   ├── posts.controller.ts
│   ├── posts.module.ts
│   └── posts.service.ts
└── comments/              # Comments module
    ├── dto/              # Create & Update Comment DTOs
    ├── comment.entity.ts
    ├── comments.controller.ts
    ├── comments.module.ts
    └── comments.service.ts

test/
├── app.e2e-spec.ts        # App E2E tests
└── auth.e2e-spec.ts       # Auth E2E tests (JWT token testing)
```

## 📚 API Documentation (Postman)

File Postman collection tersedia di folder `postman/`:

### Cara Import ke Postman:

1. Buka **Postman**
2. Klik **Import** (pojok kiri atas)
3. Pilih file `postman/Blog_API.postman_collection.json`
4. Collection akan muncul di sidebar

### Fitur Collection:

- ✅ **Auto-save token**: Setelah login, token otomatis disimpan ke variable `{{accessToken}}`
- ✅ **Variable baseUrl**: Mudah ganti URL jika deploy ke server lain
- ✅ **Semua endpoint**: Auth, Posts, dan Comments lengkap dengan contoh body

### Cara Penggunaan:

1. Jalankan server: `npm run start:dev`
2. Buka Postman, jalankan **Register** untuk buat akun
3. Jalankan **Login** - token akan otomatis tersimpan
4. Sekarang bisa akses semua endpoint yang butuh authentication

## 📄 License

This project is MIT licensed.
