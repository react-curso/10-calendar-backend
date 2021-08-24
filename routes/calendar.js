/*
    Authentication Paths / calendar
    host + /api/events
*/

const express = require('express')
const router = express.Router()
const { getEventsCalendar,
    createEvent,
    updateEvent,
    deleteEvent } = require('../controllers/calendar')
const { validateJWT } = require('../middleware/validated-token')

const { check } = require('express-validator')
const validate = require('../middleware/field-validator')
const { isDate } = require('../helpers/isDate')

// router.use( validateJWT ) //Validate all router down here

router.post(
    '/',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom(isDate),
        check('end', 'end date is required').custom(isDate),
    ],
    validate,
    validateJWT,
    createEvent
)

router.get('/', validateJWT, getEventsCalendar)

router.put(
    '/:id',
    [
        check('title', 'title is required').not().isEmpty(),
        check('start', 'start date is required').custom(isDate),
        check('end', 'end date is required').custom(isDate),
    ],
    validate,
    validateJWT,
    updateEvent
)

router.delete('/:id', validateJWT, deleteEvent)


module.exports = router