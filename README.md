# Secret Application
To View the Live Web Page please go to [Secret-App](https://secret-app-alpha.vercel.app/)

To run the App Locally follow the steps as guided:-
1. Step 1: Clone the repository.
2. Step 2: Changes to be done in Backend Folder:
    1. Create .env file and create following variables:
        1. JWT_SECRET_KEY="any random string"
        2. Mongo_URI = link to local database
        3. Frontend_URL = http://localhost:5173
        4. Port = 3000
    2. `pnpm install`
    3. `pnpm run dev`

3. Step 3: Changes to be done in Frontend Folder:
    1. Create .env file and create following variables:
        1. VITE_BACKEND_URL = http://localhost:3000
    2. `pnpn install`
    3. `pnpm run dev`
