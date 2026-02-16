import imageService from "../services/image.service.js";

export default {
  async getById(req, res) {
    try {
      const image = await imageService.getImageById(req.params.id);
      if (!image) {
        return res.status(404).json({
          ok: false,
          message: `Image with id ${req.params.id} not found`,
        });
      }
      res.status(200).json({ ok: true, image });
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message });
    }
  },

  async create(req, res) {
    try {
      const result = await imageService.createImage(req.body);
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
      const result = await imageService.updateImage(req.params.id, req.body);
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
      const result = await imageService.deleteImage(req.params.id);
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
      const images = await imageService.getAllImages();
      res.status(200).json({ ok: true, images });
    } catch (e) {
      res.status(400).json({ ok: false, message: e.message });
    }
  },
};
