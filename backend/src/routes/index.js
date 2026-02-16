import express from "express";
import adminRoutes from "./admin.routes.js";
import eventRoutes from "./event.routes.js";
import projectRoutes from "./project.routes.js";
import imageRoutes from "./image.routes.js";

const router = express.Router();

import jwt from "jsonwebtoken";
import adminRepository from "../repositories/admin.repository.js";

// Endpoint para obtener la sesión actual del admin autenticado
router.get("/auth/session", async (req, res) => {
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(200).json(null);
    }
    const token = authHeader.replace("Bearer ", "");
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(200).json(null);
    }
    const admin = await adminRepository.getById(decoded.id);
    if (!admin || admin.activeToken !== token) {
      return res.status(200).json(null);
    }
    // No enviar la contraseña ni el token
    const { password, activeToken, ...safeAdmin } = admin;
    res.status(200).json(safeAdmin);
  } catch (err) {
    res.status(200).json(null);
  }
});

router.use("/admins", adminRoutes);
router.use("/events", eventRoutes);
router.use("/projects", projectRoutes);
router.use("/images", imageRoutes);

export default router;
