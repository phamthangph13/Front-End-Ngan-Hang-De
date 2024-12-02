import client from "."
import Question from '@/classes/question';
import Subject from "@/classes/subject";


const link = "/question"


const getQuestions = async () => {
    return new Promise<Question>((resolve, reject) => {
        client.get(link)
            .then(response => {
                let obj : Question[] = response.data.map((item: any) => {
                    return Question.fromJson(item)
                })
                obj = obj.map((i) => {
                    i.subject = i.subject as Subject
                    return i
                })
                resolve(obj)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const getQuestion = async (id: string) => {
    return new Promise((resolve, reject) => {
        client.get(`${link}/${id}`)
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error)
            })
    })
}

const addQuestion = async (question: Question) => {
    question.createdAt = new Date();
    question.id = null;
    return new Promise((resolve, reject) => {
        client.post(link, {
            ...question,
            subjectId: question.subject?.id
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        })
            .then(response => {
                resolve(response.data )
            })
            .catch(error => {
                reject(error)
            })
    })
}

const updateQuestion = async (id: string, data: Question) => {
    data.updatedAt = new Date();

    return new Promise((resolve, reject) => {
        client.put(`${link}/${id}`,
            {
                ...data,
                subjectId: data.subject?.id
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*',
                }
            }
        )
        .then(response => {
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

const deleteQuestion = async (id: string) => {
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

const generateQuestion = async (message: string | null, question: Question | null) => {
    return new Promise((resolve, reject) => {
        client.post(`${link}/similar`, {
            message,
            input: question,
        }).then(response => {
            resolve(response.data)
        })
        .catch(error => {
            reject(error)
        })
    })
}

export { getQuestions, addQuestion, getQuestion, updateQuestion, deleteQuestion, generateQuestion }