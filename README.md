# URL Shortener App

This is a simple URL shortener app that allows users to shorten long URLs into shorter ones. It's built using React for the frontend and interacts with a backend API for URL shortening functionality.

## Features

- Shorten long URLs to create shorter, more manageable links.
- Option to register an account for a personalized experience.
- Login functionality to access your shortened URLs.
- Responsive design for optimal usage on various devices.

## Technologies Used

- **Frontend:** React, React Router, Styled Components
- **Backend:** Node.js, Express, MongoDB
- **API:** Axios
- **Icon:** Font Awesome (for the eye icon)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/dainty92/url-shortener.git
cd url-shortener
```

2. Install the dependencies for both the frontend and backend:

```
# Navigate to the frontend directory and install dependencies
cd url-shortener/url-shortener-spa
npm install

# Navigate to the backend directory and install dependencies
cd url-shortener
npm install
```

3. Configure the backend:

Create a .env file in the backend directory and set up your MongoDB connection string:

```
MONGODB_URI=your-mongodb-connection-string
```

4. Start the development server:

```
# Start the backend server (from the backend directory)
node app.js

# Start the frontend development server (from the frontend directory)
npm start
```

The app should now be accessible at http://localhost:3000.

## Usage

Open your web browser and navigate to http://localhost:3000.
You can create a new account or log in if you already have one.
After logging in, you can use the URL shortener to create shortened links.
Click on the "Shortened URLs" section to view and manage your shortened URLs.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to create a pull request or open an issue.

## Thank You