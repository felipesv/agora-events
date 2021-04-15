import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import config from './config/config';

import eventsRoutes from './routes/events.routes';

const app = express();

app.set('port', config.PORT);
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false})); //REVISAR QUE HACE
app.use(eventsRoutes);

export default app;
