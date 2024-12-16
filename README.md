## Habibi Launch Pad

### Project Description

Welcome to **Habibi Launch Pad**, is a platform designed to support the launch and promotion of new decentralized applications (dApps), token sales, and blockchain-based projects. It provides a space for these projects to reach an audience, attract investors, and gather community support. By combining news aggregation with Web3 features, Habibi Launch Pad offers a comprehensive experience for users interested in both the latest news and the latest Web3 ventures.

### Features:

  
- **Web3 Launchpad:** Stay informed about the latest Web3 projects, including upcoming ICOs, NFT drops, and decentralized apps. Our platform allows users to discover, follow, and support new Web3 ventures directly.

- **User Authentication:** Create a new account or log in to your existing account to personalize your news experience and interact with the Web3 ecosystem.

- **Personalized News Feed:** Once logged in, your home page presents you with a consolidated view of news articles from the APIs, including updates on Web3 projects, token sales, and blockchain innovations.

- **Profile Management:** Your profile is just a click away. Access it from the dropdown next to your username in the top right corner. Update your personal information, including your name, email, and password. You also have the option to delete your account if needed.

- **Preference Settings:** Tailor your news feed to match your interests by visiting the preference page from the dropdown menu. Here, you can choose preferred news sources, categories, and authors. Your news feed will reflect these choices, ensuring you get the most relevant articles.

### How to Get Started

- **Create an Account or Log In:** Start by creating a new account or logging in if you already have one.
  
- **Explore the Home Page:** Once logged in, you'll land on the home page, where you can view the latest news articles and Web3 projects from our selected APIs.

- **Filter News:** Use the filtering options to refine your news feed. Search for articles by title, date, categories, or author to focus on topics that matter to you.

- **Interact with Web3 Projects:** Discover upcoming Web3 projects, token offerings, and decentralized apps. Participate in their early stages or simply follow their progress.

- **Manage Your Profile:** Click on your username in the top right corner and select "Profile" from the dropdown. Here, you can update your personal details or delete your account if needed.

- **Customize Your Preferences:** Access the preference page from the dropdown next to your username. Fine-tune your news feed by selecting preferred sources, categories, and authors.

- **Stay Informed:** Enjoy a personalized news experience that keeps you informed about the latest Web3 projects, token sales, and blockchain innovations.

Whether you're a news enthusiast, a Web3 investor, or someone curious about decentralized technologies, **Habibi Launch Pad** offers a seamless way to access, customize, and enjoy a diverse range of Web3 news and projects.

### Table of Contents

- Installation
- Configuration
- Usage

### Installation

1. **Ensure you have the required software:**
   Before getting started, make sure you have the following software installed on your system:
   - [Composer](https://getcomposer.org/download/)
   - [Node.js](https://nodejs.org/en/download/)
   - XAMPP or any other server with PHP version 8.2.4 or higher installed and running.

2. **Clone the repository:**
   ```
   git clone https://github.com/mousakhoury/News-Aggregator.git
   ```

3. **Navigate to the project directory:**
   ```
   cd your-project
   ```

4. **Install Composer Dependencies:**
   ```
   composer install
   ```

5. **Copy the .env file:**
   ```
   cp .env.example .env
   ```

6. **Generate an application key:**
   ```
   php artisan key:generate
   ```

7. **Create an empty database for the project. Update `.env` with your database details:**

   ```
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=your_database_name
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   ```

8. **Run Migrations and Seeders:**
   ```
   php artisan migrate --seed
   ```

### Configuration

Explain any additional configuration steps that might be necessary. This could include setting up third-party services, environment variables, or custom settings.

### Usage

1. **Compile assets:**
   ```
   npm install
   npm run dev
   ```

2. **Start the development server:**
   ```
   php artisan serve
   ```

3. **Access the application in your web browser:**
   ```
   http://localhost:8000
   ```
