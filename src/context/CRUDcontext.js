import { db } from "../firebase";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

class CRUD {
    addData = (newUser, dbName) => {
        const CRUD_Ref = collection(db, dbName);
        return addDoc(CRUD_Ref, newUser);
    }

    editData = (id, editedData, dbName) => {
        const DataDoc = doc(db, dbName, id);
        return updateDoc(DataDoc, editedData);
    }

    deleteData = (id, dbName) => {
        const DataDoc = doc(db, dbName, id);
        return deleteDoc(DataDoc);
    }

    getAllDataList = (dbName) => {
        const CRUD_Ref = collection(db, dbName);
        return getDocs(CRUD_Ref);
    }

    getUser = (id) => {
        const userDoc = doc(db, "Userlist", id);
        return getDoc(userDoc);
    }
}

export default new CRUD();