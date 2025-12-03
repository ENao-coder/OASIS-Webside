import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

import projectRepository from '../repositories/project.repository.js';
import ProjectModel from '../models/projects.model.js';

export default {
    async getProjectById(id){
        const project = await projectRepository.getById(id);
        return project;
    },
    async createProject(adminId, data){
        const existingProject = await projectRepository.getByTitle(data.title);
        if (existingProject) {
            throw new Error(`Project with title "${data.title}" already exists`);
        }
        const id = uuidv4();
        const projectData = new ProjectModel(data);
        const newProject = await projectRepository.create(id, {...projectData});
        return newProject;
    },
    async updateProject(id, data){
        const existingProject = await projectRepository.getById(id);
        if (!existingProject) {
            throw new Error(`Project with id ${id} not found`);
        }
        if (data.title) {
            const projectWithSameTitle = await projectRepository.getByTitle(data.title);
            if (projectWithSameTitle && projectWithSameTitle.id !== id) {
                throw new Error(`Project with title "${data.title}" already exists`);
            }
        }
        const projectData = {...data}
        await projectRepository.update(id, projectData);
        return await projectRepository.getById(id);
    },
    async deleteProject(id){
        const existingProject = await projectRepository.getById(id);
        if (!existingProject) {
            throw new Error(`Project with id ${id} not found`);
        }
        await projectRepository.delete(id);
        return { id };
    },
    async getAllProjects(){
        const projects = await projectRepository.getAll();
        return projects;
    }
}