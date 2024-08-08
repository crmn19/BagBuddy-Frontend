# Bad Buddy

This project is a comprehensive e-commerce platform coupled with an admin dashboard. It provides a seamless user experience for both customers and administrators, offering robust features for product management, order processing, and settings customization.

## Features

- E-commerce Platform
- Product Browsing: Customers can browse a wide range of products with detailed descriptions and high-quality images.
- Search and Filter: Advanced search and filtering options to help customers find exactly what they need.
- Shopping Cart: Easy-to-use shopping cart functionality allowing customers to add, remove, and manage products.
- Checkout Process: Secure and efficient checkout process integrated with PayPal for payment processing.
- Order History: Customers can view their order history and track order statuses.

## Admin Dashboard

- Product Management: Admins can add, edit, and delete products, manage product categories, and update inventory.
- Order Management: View and manage orders, update order statuses, and process refunds or cancellations.
- Sales Analytics: Real-time data visualization with charts and graphs to display sales data and other key metrics.

## Run Locally Front-End

Clone the project

```bash
git clone https://github.com/carmen-romano/BagBuddy-FrontEnd.git
```

Go to the project directory

```bash
 cd BagBuddy-FrontEnd
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
npm run dev
```

## Run Locally Back-End

Clone the project

```bash
git clone https://github.com/carmen-romano/BagBuddy-BackEnd.git
```

Go to the project directory

```bash
 cd BagBuddy-FrontEnd
```

Build the backend application

```bash
mvn clean install
```

Start the server

```bash
mvn spring-boot:run
```

Set up environment variables:

```bash
 Create a .env file in the backend directory and add the necessary environment variables (e.g., database connection, PayPal API keys).
```

## Tech Stack

**Client:** React, Redux, MaterialUI, Bootstrap

**Server:** Java, Spring Boot

**Payment Integration:** PayPal API

## Authors

- [@carmen-romano](https://github.com/carmen-romano)

## License

[MIT](https://choosealicense.com/licenses/mit/)

![Logo](https://i.postimg.cc/GpGv7b95/BAGBBUNNY.png)
