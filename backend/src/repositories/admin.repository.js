import { db } from "../config/firebase.js";
import { admin } from "../config/firebase.js";

const COLLECTION = 'admins';

export default{
    async getById(id){
        const doc = await db.collection(COLLECTION).doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    },
    async getByEmail(email){
        try {
            const snapshot = await db.collection(COLLECTION).where('email', '==', email).get();
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error in getByEmail:', error);
            throw error;
        }
    },
    async getByUsername(username){
        try {
            const snapshot = await db.collection(COLLECTION).where('username', '==', username).get();
            if (snapshot.empty) return null;
            const doc = snapshot.docs[0];
            return { id: doc.id, ...doc.data() };
        } catch (error) {
            console.error('Error in getByUsername:', error);
            throw error;
        }
    },
    async register(id, data){
        try {
            await db.collection(COLLECTION).doc(id).set(data);
            return { id };
        } catch (error) {
            console.error('Error in register:', error);
            throw error;
        }
    },
    async update(id, data){
        await db.collection(COLLECTION).doc(id).update(data);
        return { id }
    },
    async remove(id){
        await db.collection(COLLECTION).doc(id).delete();
        return { id }
    },
    async delete(id){
        await db.collection(COLLECTION).doc(id).delete();
        return { id }
    },

    //Eventos
    async addEvent(id, eventId){
        await db.collection(COLLECTION).doc(id).update({
            events: admin.firestore.FieldValue.arrayUnion(eventId)
        });
        return { id };
    },
    async removeEvent(id, eventId){
        await db.collection(COLLECTION).doc(id).update({
            events: admin.firestore.FieldValue.arrayRemove(eventId)
        });
        return { id };
    },
    //Proyectos
    async addProject(id, projectId){
        await db.collection(COLLECTION).doc(id).update({
            projects: admin.firestore.FieldValue.arrayUnion(projectId)
        });
        return { id };
    },
    async removeProject(id, projectId){
        await db.collection(COLLECTION).doc(id).update({
            projects: admin.firestore.FieldValue.arrayRemove(projectId)
        });
        return { id };
    }
}
