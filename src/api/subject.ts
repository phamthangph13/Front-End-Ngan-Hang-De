import Subject from "@/classes/subject"
import client from "."
const link = "/subject"


const getSubjects = async () => {
    return new Promise((resolve, reject) => {
        client.get(link)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const addSubject = async (data: Subject) => {
    data.createdAt = new Date();
    return new Promise((resolve, reject) => {
        client.post(link, data)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}


export { getSubjects, addSubject }