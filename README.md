# Amazon Clone Project

This is a full-stack Amazon clone project that simulates core e-commerce functionalities such as product browsing, cart management, checkout, and order tracking.

## 🚀 Features

- Product listing and search
- Shopping cart functionality
- Checkout and order placement
- Order history and tracking
- Responsive design

## 🛠️ Tech Stack

### Frontend

- **HTML5**: Structure of the web pages
- **CSS3**: Styling, including responsive layouts (see [`styles/`](styles/))
- **JavaScript (ES6 Modules)**: Client-side logic (see [`scripts/`](scripts/))
- **[dayjs](https://day.js.org/)**: Date formatting and manipulation

### Backend

- **Node.js**: JavaScript runtime environment
- **Express.js**: Web framework for Node.js ([`backend/index.js`](backend/index.js))
- **MySQL**: Relational database for storing products, orders, etc.
- **mysql2**: MySQL client for Node.js
- **Sequelize**: ORM for MySQL
- **CORS**: Cross-Origin Resource Sharing middleware
- **body-parser**: Middleware for parsing JSON requests
- **nodemon**: Development utility for auto-restarting the server

### Testing

- **Jasmine**: Unit testing framework ([`tests/tests.html`](tests/tests.html), [`tests/lib/jasmine-5.1.1/`](tests/lib/jasmine-5.1.1/))

## 📂 Project Structure

```
amazon.html
checkout.html
orders.html
tracking.html
backend/
  index.js
  package.json
  controllers/
  modules/
  routes/
images/
scripts/
styles/
tests/
```

## Getting Started

1. **Clone the repository**
2. **Install backend dependencies**
   ```
   cd backend
   npm install
   ```
3. **Set up MySQL database**
   - Create a database named `amazon-app`
   - Update credentials in [`backend/index.js`](backend/index.js) if needed

4. **Run the backend server**
   ```
   npm start
   ```

5. **Open `amazon.html` in your browser to use the frontend**

6. **Run tests**
   - Open [`tests/tests.html`](tests/tests.html) in your browser

## License

This project uses the MIT License. See [`tests/MIT.LICENSE`](tests/MIT.LICENSE)
