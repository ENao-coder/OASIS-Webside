import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

import imageRepository from "../repositories/image.repository.js";
import ImagesModel from "../models/images.model.js";

export default {
  async getImageById(id) {
    const image = await imageRepository.getById(id);
    return image;
  },
  async createImage(data) {
    const existingImageByTitle = await imageRepository.getByTitle(data.title);
    if (existingImageByTitle) {
      throw new Error(`Image with title "${data.title}" already exists`);
    }
    const existingImageByUrl = await imageRepository.getByUrl(data.url);
    if (existingImageByUrl) {
      throw new Error(`Image with URL "${data.url}" already exists`);
    }
    const id = uuidv4();
    const imageData = new ImagesModel(data);
    const newImage = await imageRepository.create(id, { ...imageData });
    return newImage;
  },
  async updateImage(id, data) {
    const existingImage = await imageRepository.getById(id);
    if (!existingImage) {
      throw new Error(`Image with id ${id} not found`);
    }
    if (data.title) {
      const imageWithSameTitle = await imageRepository.getByTitle(data.title);
      if (imageWithSameTitle && imageWithSameTitle.id !== id) {
        throw new Error(`Image with title "${data.title}" already exists`);
      }
    }
    if (data.url) {
      const imageWithSameUrl = await imageRepository.getByUrl(data.url);
      if (imageWithSameUrl && imageWithSameUrl.id !== id) {
        throw new Error(`Image with URL "${data.url}" already exists`);
      }
    }
    const imageData = { ...data };
    await imageRepository.update(id, imageData);
    return await imageRepository.getById(id);
  },
  async deleteImage(id) {
    const existingImage = await imageRepository.getById(id);
    if (!existingImage) {
      throw new Error(`Image with id ${id} not found`);
    }
    await imageRepository.delete(id);
    return { id };
  },
  async getAllImages() {
    const images = await imageRepository.getAll();
    return images;
  },
};
