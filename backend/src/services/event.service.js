import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

import eventRepository from "../repositories/event.repository.js";
import EventModel from "../models/events.model.js";

export default {
  async getEventById(id) {
    const event = await eventRepository.getById(id);
    return event;
  },
  async createEvent(adminId, data) {
    const existingEvent = await eventRepository.getByTitle(data.title);
    if (existingEvent) {
      throw new Error(`Event with title "${data.title}" already exists`);
    }
    const id = uuidv4();
    const eventData = new EventModel(data);
    const newEvent = await eventRepository.create(id, { ...eventData });
    return newEvent;
  },
  async updateEvent(id, data) {
    const existingEvent = await eventRepository.getById(id);
    if (!existingEvent) {
      throw new Error(`Event with id ${id} not found`);
    }
    if (data.title) {
      const eventWithSameTitle = await eventRepository.getByTitle(data.title);
      if (eventWithSameTitle && eventWithSameTitle.id !== id) {
        throw new Error(`Event with title "${data.title}" already exists`);
      }
    }
    const eventData = { ...data };
    await eventRepository.update(id, eventData);
    return await eventRepository.getById(id);
  },
  async deleteEvent(id) {
    const existingEvent = await eventRepository.getById(id);
    if (!existingEvent) {
      throw new Error(`Event with id ${id} not found`);
    }
    await eventRepository.delete(id);
    return { id };
  },
  async getAllEvents() {
    const events = await eventRepository.getAll();
    return events;
  },
};
