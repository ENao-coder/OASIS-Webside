import eventService from "../services/event.service.js";

export default {
  async getById(req, res) {
    try {
      const event = await eventService.getEventById(req.params.id);
      if (!event) {
        return res.status(404).json({
          ok: false,
          message: `Event with id ${req.params.id} not found`,
        });
      }
      res.status(200).json({ ok: true, event });
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message });
    }
  },

  async create(req, res) {
    try {
      const adminId = req.admin.id;
      const result = await eventService.createEvent(adminId, req.body);
      res.status(201).json({ ok: true, result });
    } catch (e) {
      if (e.message.includes("already exists")) {
        return res.status(409).json({ ok: false, message: e.message });
      }
      res.status(400).json({ ok: false, message: e.message });
    }
  },
  async update(req, res) {
    try {
      const result = await eventService.updateEvent(req.params.id, req.body);
      res.status(200).json({ ok: true, result });
    } catch (e) {
      if (e.message.includes("not found")) {
        return res.status(404).json({ ok: false, message: e.message });
      }
      if (e.message.includes("already exists")) {
        return res.status(409).json({ ok: false, message: e.message });
      }
      res.status(400).json({ ok: false, message: e.message });
    }
  },
  async delete(req, res) {
    try {
      const result = await eventService.deleteEvent(req.params.id);
      res.status(200).json({ ok: true, result });
    } catch (e) {
      if (e.message.includes("not found")) {
        return res.status(404).json({ ok: false, message: e.message });
      }
      res.status(400).json({ ok: false, message: e.message });
    }
  },
  async getAll(req, res) {
    try {
      const events = await eventService.getAllEvents();
      res.status(200).json({ ok: true, events });
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message });
    }
  },
};
