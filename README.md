# Crokto: A Web3 Decentralized Course Selling Platform

Crokto is a Next.js application that integrates Shadcn for UI components, Okto Wallet for cryptocurrency wallet functionality, and Google OAuth for user authentication. It is a Web3-based platform for buying and selling courses.

## Features

- **Modern UI**: An application built using the best modern UI practices.
- **Okto Auth**: Authentication using Okto Custodial Wallet.
- **Automated Rewards**: Instructors can set up automated reward tasks for students after completing course quizzes.
- **NFT Certificates**: Students receive NFT certificates upon course completion.

### Additional Features

- 📚 **View and Buy Various Courses**: Explore and purchase a wide range of courses available on-chain.
- 🎟️ **Get NFT on Purchase**: Receive an NFT upon course purchase and completion.
- 📝 **Quizzes**: Each course includes quizzes to test your skills, with an NFT awarded on quiz completion.
- 🎓 **Create Your Own Course**: Instructors can create and sell their own courses on the platform.
- 📊 **Full Dashboard for Students**: A comprehensive dashboard for students to track their progress.
- 💰 **Creator Profile**: Instructors can view their earnings and transactions using the Okto Portfolio.
- 🔖 **Various Categories**: Choose from multiple categories to find the courses that suit your interests.

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/your-username/crokto.git
   cd crokto

   ```

2. **Installing Dependencies**:

   ```npm install
    or
    yarn install

   ```

3. **Setup environment variables:**:

   ```
   cp env.sample .env

   ```

```DATABASE_URL="your-neon-database-url"

NEXT_PUBLIC_OKTO_CLIENT_API="your-okto-client-api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
NEXT_PUBLIC_HOST="http://localhost:3000"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OKTO_SERVER_API_KEY="your-okto-server-api-key"
```

**_Make sure to use the Neon.tech connection string you copied earlier for the DATABASE_URL._**

4. **Setup Prisma**:

   ```
   npx prisma init
   npx prisma generate
   npx prisma migrate dev --name init


   ```

5. **Run it locally**:
   ```
   npm run dev
   ```
