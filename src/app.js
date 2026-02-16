import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import csrf from 'csurf';
import publicRoutes from './routes/public.js';
import privateRoutes from './routes/private.js';
import genNotifications from './middlewares/notifications.js';
import auth from './middlewares/auth.js';
import checkUser from './middlewares/checkUser.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static('frontend'));
app.use(cookieParser());

app.set('view engine', 'ejs');
app.set('views', './frontend/views');

const csrfProtection = csrf({ cookie: true });

app.use(genNotifications);
app.use(checkUser);
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
});
app.use(publicRoutes);
app.use(auth, privateRoutes);

export default app;
