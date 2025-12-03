import {db} from "../config/firebase.js";

const COLLECTION = 'images';

export default {
    async create(id, data){
        await db.collection(COLLECTION).doc(id).set(data);
        const doc = await db.collection(COLLECTION).doc(id).get();
        return { id: doc.id, ...doc.data() };
    },
    async update(id, data){
        await db.collection(COLLECTION).doc(id).update(data);
        const doc = await db.collection(COLLECTION).doc(id).get();
        return { id: doc.id, ...doc.data() };
    },
    async delete(id){
        await db.collection(COLLECTION).doc(id).delete();
        return { id }
    }, 
    async getById(id){
        const doc = await db.collection(COLLECTION).doc(id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
    },
    async getByTitle(title){
        const snapshot = await db.collection(COLLECTION).where('title', '==', title).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },
    async getByUrl(url){
        const snapshot = await db.collection(COLLECTION).where('url', '==', url).get();
        if (snapshot.empty) return null;
        const doc = snapshot.docs[0];
        return { id: doc.id, ...doc.data() };
    },
    async getAll(){
        const snapshot = await db.collection(COLLECTION).get();
        const images = [];
        snapshot.forEach(doc => {
            images.push({ id: doc.id, ...doc.data() });
        });
        return images;
    }
}
