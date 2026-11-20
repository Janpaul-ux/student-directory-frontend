Student Directory Frontend

React + Vite frontend for the Lesson 5 JWT-secured Student Directory API. Users can register, log in, view students (only when logged in), and log out.

 Setup

1. Start the backend (`express-student-api`) on port 3000 with MongoDB Atlas connected.
2. In this project, run:
   ```bash
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

Environment variables

None are needed for the frontend. The API URL is `http://localhost:3000`.
The backend needs `MONGO_URI`, `JWT_SECRET` and `PORT` in its own `.env` file, and CORS must allow `http://localhost:5173`.

 Reflection Questions

1. Why do we store the token in localStorage? What is one security risk, and what is a more secure alternative?**
We store the token in localStorage so the user stays logged in after refreshing the page or closing the tab. The risk is that any JavaScript on the page can read it, so an XSS attack could steal the token. A more secure alternative is an HttpOnly cookie, which JavaScript cannot access.

2. What is the purpose of the AuthContext? Why not just pass the token as a prop to each component?**
AuthContext holds the login state (user, token, login, logout) in one place so any component can use it. Passing the token as a prop would mean threading it through many components that don't need it (prop drilling). Context keeps the code cleaner and makes the auth logic easier to change.

3. What happens on the frontend when the JWT expires? What user experience would you want?**
When the token expires, the backend returns 401 Unauthorized and protected requests fail. I would want the app to detect the 401, clear the stored token, show a short "Session expired, please log in again" message, and redirect the user to /login. Ideally it would also send them back to the page they were on after logging in.

4. What is the difference between the backend's requireAuth middleware and the frontend's ProtectedRoute? Why do we need both?**
requireAuth runs on the server and actually verifies the JWT before returning protected data, so it provides real security. ProtectedRoute only controls what the user sees in the browser and improves the experience by redirecting logged-out users. We need both because frontend checks can be bypassed, so the backend must enforce access, while the frontend makes the app usable.
