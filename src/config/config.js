import axios from "axios";
import { Url } from "./web";

/*------ User Table API -------- */

export async function UserData(Request) {
    let params = {
        headers: {
            Accept: 'application/json',
            // Authorization: `Bearer ${JSON.parse(localStorage.getItem('user-info')).api_token}`
        }
    };
    const Data = axios.get(Url + `users`, params)
        .then(res => {
            return res.data;
        });
    return Data;
}


export async function AddNewUser(Request) {
    let params = {
        headers: {
            Accept: 'application/json',
        }
    };
    const Data = axios.post(Url + `users`, Request, params)
        .then(res => {
            return res.data;
        });
    return Data;
}


export async function EditUsers(Request) {
    let params = {
        headers: {
            Accept: 'application/json',
        }
    };
    const Data = axios.put(Url + `users/${Request.id}`, Request, params)
        .then(res => {
            return res.data;
        });
    return Data;
}

export async function deleteRow(Request) {
    let params = {
        headers: {
            Accept: 'application/json',
        }
    };
    const Data = axios.delete(Url + `users/${Request.id}`, Request, params)
        .then(res => {
            return res.data;
        });
    return Data;
}