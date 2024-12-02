import client from ".";

import Exam from "@/classes/exam";
import Subject from "@/classes/subject";
import Question from "@/classes/question";

const link = "/exam";

const getExams = async () => {
    return new Promise<Array<Exam>>((resolve, reject) => {
        client.get(link)
            .then(response => {
                let obj = response.data.map((item: any) => {
                    return item as Exam
                })
                resolve(obj)

            })
            .catch(error => {
                reject(error)
            })
    })
}

const getExam = async (id: string) => {
    return new Promise<Exam>((resolve, reject) => {
        client.get(`${link}/${id}`)
            .then(response => {
                let obj = Object.assign(new Exam(), response.data)
                obj.subject = Object.assign(new Subject(), obj.subject)
                obj.questions = new Set(obj.questions.map((item: any) => {
                    return Question.fromJson(item)
                }))
                resolve(obj)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const addExam = async (data: Exam) => {
    const obj = {
        ...data,
    }
    obj.questionIds = Array.from(data.questions).map((item: any) => item.id)
    obj.subjectId = obj.subject?.id
    obj.createdAt = new Date()

    return new Promise((resolve, reject) => {
        client.post(link, obj)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}



export { getExams, getExam, addExam }