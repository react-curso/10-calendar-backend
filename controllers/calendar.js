const { request, response } = require('express')
const Event = require('../models/modelCalendar')


const getEventsCalendar = async (req, res = response) => {

    try {

        const events = await Event.find().populate('user', 'name')

        res.json({
            ok: true,
            events
        })

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Error to get events'
        })
    }

}

const createEvent = async (req, res = response) => {

    try {

        const event = new Event(req.body)

        event.user = req.uid

        const eventDB = await event.save()

        res.json({
            ok: true,
            msg: 'createEvents',
            eventDB
        })

    } catch (error) {

        res.status(500).json({
            ok: false,
            msg: 'Error create events'
        })

    }

}

const updateEvent = async (req = request, res = response) => {

    const eventId = req.params.id

    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'id is invalid'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        const newEvent = {
            ...req.body,
            user: uid
        }

        const updateEvent = await Event.findByIdAndUpdate(eventId, newEvent, { new: true })

        res.json({
            ok: true,
            updateEvent
        })

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Error to get events'
        })

    }

}

const deleteEvent = async (req = request, res = response) => {

    const eventId = req.params.id

    const uid = req.uid

    try {

        const event = await Event.findById(eventId)

        if (!event) {
            return res.status(404).json({
                ok: false,
                msg: 'id is invalid'
            })
        }

        if (event.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: 'action not allowed'
            })
        }

        await Event.findByIdAndDelete(eventId)

        res.json({
            ok: true,
            msg: 'delete event'
        })

    } catch (error) {

        res.status(401).json({
            ok: false,
            msg: 'Error to get events'
        })

    }

}

module.exports = {
    getEventsCalendar,
    createEvent,
    updateEvent,
    deleteEvent
}