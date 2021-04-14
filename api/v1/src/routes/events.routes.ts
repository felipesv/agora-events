import { Router } from 'express';

import * as eventsCtrl from './events.controller';

const router = Router();

router.get('/events', eventsCtrl.getEvents);
router.get('/events/:id', eventsCtrl.getEvent);
router.post('/events', eventsCtrl.createEvent);
router.delete('/events/:id', eventsCtrl.deleteEvent);
router.put('/events/:id', eventsCtrl.updateEvent);

export default router;
