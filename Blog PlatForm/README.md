# MyBlog - A Modern Blogging Platform

## 🚀 Project Overview

**MyBlog** is a modern, responsive blogging platform built with [React](https://reactjs.org/), [Tailwind CSS](https://tailwindcss.com/), and [Firebase](https://firebase.google.com/). It allows users to create, edit, delete, and categorize blog posts, offering a seamless way to share thoughts with the world. The platform features user authentication and real-time data management via Firebase Firestore.

### 🌟 Features

- **User Authentication**: Register, log in, and manage your profile using Firebase Authentication.
- **Real-time CRUD Operations**: Create, read, update, and delete posts with real-time updates using Firebase Firestore.
- **Responsive Design**: Fully responsive design built with Tailwind CSS, ensuring a seamless experience across devices.
- **Dark Mode Support**: Effortlessly toggle between light and dark themes.
- **Image Uploads**: Upload and manage images for your posts using Firebase Storage.
- **Search & Filtering**: Search and filter posts by categories or keywords.
- **SEO Optimized**: Basic SEO optimization for better visibility on search engines.

### 🖥️ Live Demo

Check out the live project: [MyBlog](https://myblog-platform.netlify.app/)

## 📂 Project Structure

Here's an overview of the project's structure:

```plaintext
MyBlog/
│
├── public/                 # Static files (index.html, icons, etc.)
├── src/
│   ├── assets/             # Images, icons, etc.
│   ├── components/         # Reusable UI components
│   ├── pages/              # Page components (Home, Profile, etc.)
│   ├── services/           # Firebase services and API calls
│   ├── utils/              # Utility functions and hooks
│   ├── App.js              # Main app component
│   ├── index.js            # React DOM rendering
│   └── tailwind.config.js  # Tailwind CSS configuration
│
├── .gitignore              # Git ignore file
├── README.md               # Project documentation
├── package.json            # Project dependencies and scripts
└── tailwind.config.js      # Tailwind CSS configuration

```

## 🛠️ Technologies Used

- **User Authentication**: React, Tailwind CSS.
- **Backend**: Firebase (Authentication, Firestore, Storage).
- **Deployment**: Netlify.


## 🔧 Setup & Installation
Follow these steps to set up the project locally:

## 1. Clone the Repository
```plaintext
git clone https://github.com/AjitRaut/Blog-PlatForm.git
cd Blog-PlatForm
```

## 2. Install Dependencies
```plaintext
npm install
```

3. Set Up Firebase
1. Create a Firebase Project: Go to the Firebase Console and create a new project.

2. Enable Firebase Services:

- Enable Firebase Authentication.
- Enable Firestore Database.
- Enable Firebase Storage.

3. Configure Firebase in Your Project:

- Copy your Firebase config object from the Firebase Console.
- Create a .env file at the root of your project and add the following:

```plaintext
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## 4. Run the Development Server

```plaintext
npm start
```

Your app should now be running on http://localhost:3000.

## 5. Deploy to Netlify
To deploy your application to Netlify:

1. Push Your Code to GitHub:
- Ensure your code is pushed to a GitHub repository.
  
2. Connect to Netlify:

- Go to Netlify, sign in, and select "New site from Git".
- Connect your GitHub repository.
- Choose the branch you want to deploy and configure the build settings:
  - Build Command: npm run build
  - Publish Directory: build
  - 
3.Deploy:

- Click "Deploy Site" and wait for the build process to complete.
  
4. Custom Domain (Optional):

- If you have a custom domain, you can set it up in the "Domain settings" on Netlify.
  
6. Handle 404 Errors
To prevent "Page Not Found" errors on Netlify when navigating directly to routes other than /, create a _redirects file:

1.In the public directory, create a file named _redirects.

2.Add the following line:
```plaintext
/* /index.html 200
```

This tells Netlify to serve index.html for all routes, allowing React Router to handle routing.

## 📖 Usage

- **Creating a Post**: Log in, navigate to "Create a Post", enter the post details, and hit "Publish".
- **Editing a Post**: Go to your profile, select the post to edit, make changes, and save.
- **Deleting a Post**: You can delete your post directly from your profile.

## 🤝 Contributing
Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (git checkout -b feature-name).
3. Make your changes and commit them (git commit -m 'Add some feature').
4. Push to the branch (git push origin feature-name).
5. Open a pull request.

## 📧 Contact
If you have any questions or suggestions, feel free to reach out:

- **Email**: ajitraut9561@gmail.com.
- **LinkedIn**: Ajit Raut.
- **GitHub**: Ajit Raut
