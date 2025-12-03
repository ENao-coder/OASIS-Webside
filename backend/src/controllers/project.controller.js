import projectService from "../services/project.service.js";

export default{
    async getById(req, res){
        try{
            const project = await projectService.getProjectById(req.params.id);
            if (!project) {
                return res.status(404).json({ ok: false, message: `Project with id ${req.params.id} not found` });
            }
            res.status(200).json({ ok: true, project });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }
    },

    async create(req, res){
        try{
            const adminId = req.admin.id;
            const result = await projectService.createProject( adminId ,req.body);
            res.status(201).json({ ok: true, result });
        }catch (e) {
            if (e.message.includes('already exists')) {
                return res.status(409).json({ ok: false, message: e.message });
            }
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async update(req, res){
        try{
            const result = await projectService.updateProject(req.params.id, req.body);
            res.status(200).json({ ok: true, result });
        }catch (e) {
            if (e.message.includes('not found')) {
                return res.status(404).json({ ok: false, message: e.message });
            }
            if (e.message.includes('already exists')) {
                return res.status(409).json({ ok: false, message: e.message });
            }
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async delete(req, res){
        try{
            const result = await projectService.deleteProject(req.params.id);
            res.status(200).json({ ok: true, result });
        }catch (e) {
            if (e.message.includes('not found')) {
                return res.status(404).json({ ok: false, message: e.message });
            }
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async getAll(req, res){
        try{
            const projects = await projectService.getAllProjects();
            res.status(200).json({ ok: true, projects });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }
    }
}