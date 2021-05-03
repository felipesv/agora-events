import { Router } from 'express';
import * as eventsCtrl from '../controllers/events.controller';
import { validToken } from '../middlewares/auth';

const router = Router();

router.get('/events', [validToken], eventsCtrl.getEvents);
router.get('/events/:id', [validToken], eventsCtrl.getEvent);
router.get('/authorevents', [validToken], eventsCtrl.getEventAuthor);
router.post('/events', [validToken], eventsCtrl.createEvent);
router.delete('/events/:id', [validToken], eventsCtrl.deleteEvent);
router.put('/events/:id', [validToken], eventsCtrl.updateEvent);
router.post('/attendance/:id', [validToken], eventsCtrl.insertAttendance);
router.delete('/attendance/:id', [validToken], eventsCtrl.deleteAttendance);
router.post('/rating/:id', [validToken], eventsCtrl.increaseRating);
router.delete('/rating/:id', [validToken], eventsCtrl.decreaseRating);

export default router;
