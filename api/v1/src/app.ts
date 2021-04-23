import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';

import eventsRoutes from './routes/events.routes';
import usersRoutes from './routes/users.routes';
import authRoutes from './routes/auth.routes';

const app = express();
const prefix = config.API_PATH_VERSION;


app.set('port', config.PORT);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); //REVISAR QUE HACE
app.use(prefix, eventsRoutes);
app.use(prefix, usersRoutes);
app.use(prefix, authRoutes);

export default app;
