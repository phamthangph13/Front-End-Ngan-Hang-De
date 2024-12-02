import client from ".";
import QuestionBank from "@/classes/questionBank";

const link = "/questionBank";

export const getQuestionBanks = async () => {
  return new Promise<Array<QuestionBank>> ((resolve, reject) => {
    client.get(link)
      .then(response => {
          const result = response.data.map((item: any) => {
            return QuestionBank.formJSON(item);
          });
            resolve(result);
      })
      .catch(error => {
        reject(error)
      })
  })
};

export const getQuestionBank = async (id: string) => {
  return new Promise<QuestionBank>((resolve, reject) => {
    client.get(`${link}/${id}`)
      .then(response => {
        resolve(QuestionBank.formJSON(response.data));
      })
      .catch(error => {
        reject(error)
      })
  })
};

export const addQuestionBank = async (questionBank: QuestionBank) => {
  let obj = {
    ...questionBank,
    subjectId : questionBank.subject?.id
  }

  return new Promise<boolean>((resolve, reject) => {
    client.post(link, obj)
      .then(response => {
        resolve(true);
      })
      .catch(error => {
        reject(error)
      })
  })
};



