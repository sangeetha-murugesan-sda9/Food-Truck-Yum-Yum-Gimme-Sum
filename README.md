
A React-based frontend application for the Yum Yum Gimme Sum food truck that serves delicious wontons. This app allows customers to browse the menu, manage their cart, place orders, and view receipts.

##Features
 Browse the full menu of wontons, dips, and drinks

 Add/remove items from shopping cart
 Responsive design based on Figma sketch

 View switching between menu, cart, order, and receipt pages

 Place orders and get order confirmation with ETA

 View order receipts

 Secure API integration with API key management

##Technologies Used
React.js

Redux Toolkit (with createAsyncThunk)

React Router

CSS Modules

Fetch API

Folder Structure
text
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
│
├── App.jsx
├── main.jsx
└── index.css
API Integration
The app integrates with the Yum Yum Gimme Sum Foodtruck API:

Base URL: https://fdnzawlcf6.execute-api.eu-north-1.amazonaws.com

All requests require an API key obtained from /keys endpoint

Key features:

Menu management

Order processing

Receipt generation

Tenant registration

Getting Started
Prerequisites
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
# or
yarn install
Start the development server:

bash
npm start
# or
yarn start
Open http://localhost:3000 in your browser.

Available Scripts
npm start: Runs the app in development mode

npm test: Launches the test runner

npm run build: Builds the app for production

npm run eject: Ejects from Create React App (not recommended)

Redux Store Structure
The Redux store manages:

Menu items

Cart contents

Order details

Tenant information

API key
