import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuidv4} from 'uuid';
import dotenv from 'dotenv';

dotenv.config();

import adminRepository from '../repositories/admin.repository.js';
import AdminModel from '../models/admin.model.js';

const TOKEN_EXPIRATION = '2h';

export default {
    async getById(id){
        const admin = await adminRepository.getById(id);
        return admin;
    },
    async registerAdmin(data){
        const {email, username, password, ...rest} = data;
        const byEmail = await adminRepository.getByEmail(email);
        if(byEmail){
            throw new Error('Admin with this email already exists');
        }
        const byUsername = await adminRepository.getByUsername(username);
        if(byUsername){
            throw new Error('Admin with this username already exists');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const model = new AdminModel({
            email, username, password: hashedPassword, ...rest
        });
        const id = uuidv4();
        const registered = await adminRepository.register(id, {...model});
        return registered;
    },
    async updateAdmin(id, data){
        const existingAdmin = await adminRepository.getById(id);
        if (!existingAdmin) {
            throw new Error(`Admin with id ${id} not found`);
        }
        const updateData = {...data};
        if(updateData.password){
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }
        await adminRepository.update(id, updateData);
        return { id};
    },
    async deleteAdmin(id){
        const existingAdmin = await adminRepository.getById(id);
        if (!existingAdmin) {
            throw new Error(`Admin with id ${id} not found`);
        }
        await adminRepository.delete(id);
        return { id };
    },
    async loginAdmin(username, password){
        const admin = await adminRepository.getByUsername(username);
        if(!admin){
            throw new Error('Admin not found');
        }
        const okPass = await bcrypt.compare(password, admin.password ?? '');
        if(!okPass){
            throw new Error('Invalid password');
        }
        
        // Check for active session
        if(admin.activeToken){
            try{
                jwt.verify(admin.activeToken, process.env.JWT_SECRET);
                throw new Error('An active session already exists');
            } catch (e) {
                console.log('Previous token expired, proceeding with new login');
            }
        }
        
        const token = jwt.sign({ id: admin.id, username: admin.username }, process.env.JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
        await adminRepository.update(admin.id, { activeToken: token });
        return { token };
    },
    async logoutAdmin(id){
        return adminRepository.update(id, { activeToken: null } );
    }
}