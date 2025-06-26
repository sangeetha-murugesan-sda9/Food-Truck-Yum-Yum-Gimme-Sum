# Yum Yum Gimme Sum - Food Truck Menu System  
A React-based frontend application for the Yum Yum Gimme Sum food truck that serves delicious wontons. This app allows customers to browse the menu, manage their cart, place orders, and view receipts.A vibrant digital menu for modern food trucks

# Features
*1.Browse the full menu of wontons, dips, and drinks

 2.Add/remove items from shopping cart
 
 3.Responsive design based on Figma sketch

 4.View switching between menu, cart, order, and receipt pages

 5.Place orders and get order confirmation with ETA

 6.View order receipts

 7.Secure API integration with API key management

# Technologies Used

1.React.js

2.Redux Toolkit (with createAsyncThunk)

3.React Router

4.CSS Modules

5.Tailwind CSS

6.Fetch API

# Folder Structure

src/
│
├── app/
│   └── store.js
│
├── features/
│   ├── cart/
│   │   └── cartSlice.js
│   ├── menu/
│   │   ├── menuSlice.js
│   │   └── Menu.jsx
│   ├── order/
│   │   └── orderSlice.js
│   └── tenant/
│       └── tenantSlice.js
│
├── pages/
│   ├── CartPage.jsx
│   ├── OrderPage.jsx
│   ├── ReceiptPage.jsx
│   └── Home.jsx
│
├── components/
│   ├── Layout.jsx
│   └── Navbar.jsx
── styles/
│   ├── global.css
│   
│
├── App.jsx
├── main.jsx

# API Integration
# The app integrates with the Yum Yum Gimme Sum Foodtruck API:

Base URL: https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com

All requests require an API key obtained from /keys endpoint

# Key features:

1.Menu management

2.Order processing

3.Receipt generation

4.Tenant registration

# Getting Started
# Prerequisites
Node.js (v14 or higher)

npm or yarn

Installation
Clone the repository:

bash
git clone https://github.com/your-username/yum-yum-gimme-sum.git
cd yum-yum-gimme-sum
Install dependencies:

bash
npm install
or
yarn install
Start the development server:

bash
npm start
or
yarn start
Open http://localhost:3000 in your browser.

# Available Scripts
npm start: Runs the app in development mode

npm test: Launches the test runner

npm run build: Builds the app for production

npm run eject: Ejects from Create React App (not recommended)

# Redux Store Structure
The Redux store manages:

1.Menu items

2.Cart contents

3.Order details

4.Tenant information

5.API key

# UI Components
# Component	              Purpose                	Props
<MenuItem />   	      Dishes display	item,      onClick
<TenantBadge />	      API status	tenantId,      status

# API Endpoints
javascript
// Example API interaction
fetch(`${import.meta.env.VITE_API_BASE_URL}/menu`, {
  headers: { "X-API-KEY": apiKey }
})
# Troubleshooting
Issue: Menu fails to load
# Fixes:

1.Verify API key in Redux store

2.Check network tab for CORS errors

3.Validate tenantId exists

# Deployment Targets
Food Truck Tablet: npm run build -- --mode kiosk

Web Hosting: Configure as SPA in vercel/netlify

Electron: See electron-branch

# Contribution Guide
Code Standards:

Redux actions MUST use createAsyncThunk

Components prefixed with use must be hooks

Tailwind classes sorted using Headwind

# Testing:

bash
npm test # Runs Vitest + React Testing Library
# License
MIT - Includes commercial use rights for food truck operators
