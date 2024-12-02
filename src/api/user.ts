import client from ".";
import userInfo from "@/types/userInfo";

const link = "/user";


export const getMe = async () => {
    return new Promise<userInfo>((resolve, reject) => {
        client.get(`${link}/me`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

export const uploadAvatar = async (file: File) => {
    return new Promise<string>((resolve, reject) => {
        const formData = new FormData();
        formData.append('avatar', file);
        client.patch(`${link}/avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

