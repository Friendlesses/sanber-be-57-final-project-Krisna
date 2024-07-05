- Buat file [Readme.md](http://Readme.md) dan cantumkan di dalamnya, URL deploy dan daftar endpoint apa saja yang sudah dibuat
    - lengkap dengan HTTP Method dan URL endpoint nya.
 
# Final Project Sanbercode

Deployed Project yang dapat diakses secara public : https://final-project-production-15f7.up.railway.app/api

### Product 

- **Get All Products**
  - **HTTP Method:** GET
  - **URL Endpoint:** `/products`

- **Create a New Product**
  - **HTTP Method:** POST
  - **URL Endpoint:** `/products`

- **Get a Product by ID**
  - **HTTP Method:** GET
  - **URL Endpoint:** `/products/:id`

- **Update a Product by ID**
  - **HTTP Method:** PUT
  - **URL Endpoint:** `/products/:id`

- **Delete a Product by ID**
  - **HTTP Method:** DELETE
  - **URL Endpoint:** `/products/:id`

### Category 

- **Get All Categories**
  - **HTTP Method:** GET
  - **URL Endpoint:** `/categories`

- **Create a New Category**
  - **HTTP Method:** POST
  - **URL Endpoint:** `/categories`

- **Get a Category by ID**
  - **HTTP Method:** GET
  - **URL Endpoint:** `/categories/:id`

- **Update a Category by ID**
  - **HTTP Method:** PUT
  - **URL Endpoint:** `/categories/:id`

- **Delete a Category by ID**
  - **HTTP Method:** DELETE
  - **URL Endpoint:** `/categories/:id`

### Order 

- **Create a New Order**
  - **HTTP Method:** POST
  - **URL Endpoint:** `/orders`
  - **Description:** This endpoint is used to create a new order. It requires a JWT token in the authorization header.

- **Get Order History by User**
  - **HTTP Method:** GET
  - **URL Endpoint:** `/orders`
  - **Description:** This endpoint is used to get the order history of the authenticated user. It requires a JWT token in the authorization header.

### File Upload

- **Single File Upload**
  - **HTTP Method:** POST
  - **URL Endpoint:** `/upload`
  - **Description:** This endpoint is used to upload a single file.

- **Multiple File Upload**
  - **HTTP Method:** POST
  - **URL Endpoint:** `/uploads`
  - **Description:** This endpoint is used to upload multiple files.

## Authentication

Semua endpoints yang memodifikasi data atau meminta akses data dari user membutuhkan token JWT yang dapat dimasukkan pada header POSTMAN dengan key Authorization dan value Bearer <jwt_token>

## Environment Variables

- `SECRET`: Digunakan untuk mendapatkan JWT Token
- `EMAIL_USER`: Email yang digunakan untuk mengirim invoice
- `EMAIL_PASS`: Password dari email yang mengirimkan invoice
- `CLOUDINARY_API_KEY`: Kunci API unik yang diberikan oleh Cloudinary untuk mengidentifikasi aplikasi atau project
- `CLOUDINARY_API_SECRET`: Semacam password atau autentikasi API yang diberikan oleh Cloudinary untuk memastikan keamanan komunikasi antara aplikasi atau project dan API Cloudinary
- `CLOUDINARY_CLOUD_NAME`: Nama akun atau penyedia cloud di Cloudinary
- `DATABASE_URL`: Url database yang digunakan, dalam kasus ini saya menggunakan mongodb dengan urlnya (mongodb+srv://Krisna-Sanbercode:GDJIB9iIQBsqqJ2E@sanbercode-krisna.exgwioo.mongodb.net/)
