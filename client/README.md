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
