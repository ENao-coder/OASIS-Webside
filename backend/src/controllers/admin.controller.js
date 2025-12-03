import adminService from "../services/admin.service.js";

export default{
    async getAdminById(req, res){
        try {
            const admin = await adminService.getById(req.params.id);
            if (!admin) {
                return res.status(404).json({ ok: false, message: `Admin with id ${req.params.id} not found` });
            }
            res.status(200).json({ ok: true, admin });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }  
    },

    async registerAdmin(req, res){
        try{
            const result = await adminService.registerAdmin(req.body);
            res.status(201).json({ ok: true, result });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async updateAdmin(req, res){
        try{
            const result = await adminService.updateAdmin(req.params.id, req.body);
            res.status(200).json({ ok: true, result });
        }catch (e) {
            if (e.message.includes('not found')) {
                return res.status(404).json({ ok: false, message: e.message });
            }
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async deleteAdmin(req, res){
        try{
            const result = await adminService.deleteAdmin(req.params.id);
            res.status(200).json({ ok: true, result });
        }catch (e) {
            if (e.message.includes('not found')) {
                return res.status(404).json({ ok: false, message: e.message });
            }
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async loginAdmin(req, res){
        try{
            const { username, password } = req.body;
            const result = await adminService.loginAdmin(username, password);
            res.status(200).json({ ok: true, result });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }
    },
    async logoutAdmin(req, res){
        try{
            const id = req.admin.id
            await adminService.logoutAdmin(id);
            res.status(200).json({ ok: true, message: 'Logged out successfully' });
        }catch (e) {
            res.status(400).json({ ok: false, message: e.message });
        }
    }
}