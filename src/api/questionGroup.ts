import client from ".";
import { addQuestion } from "@/api/question";
import QuestionGroup  from "../classes/questionGroup";

const link = "/questionGroup"


const getQuestionGroups = async () => {
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

const addQuestionGroup = async (data: QuestionGroup) => {
    data.createdAt = new Date();
    return new Promise((resolve, reject) => {
        client.post(link, {
            ...data,
            subjectId: data.subject.id,
            questionIds : []
        })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
    // for (let question of data.questions) {
    //     await addQuestion(question)
    // }
    // let obj = {...data} // clone object
    // // remove questions from object
    // obj['questionIds'] = data.questions.map((question) => question.id)
    // return new Promise((resolve, reject) => {
    //     client.post(link, obj)
    //         .then(response => {
    //             resolve(response.data)
    //         })
    //         .catch(error => {
    //             reject(error)
    //         })
    // })
}

const deleteQuestionGroup = async (id: string) => {
    return new Promise((resolve, reject) => {
        client.delete(`${link}/${id}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}



export { getQuestionGroups, addQuestionGroup, deleteQuestionGroup }