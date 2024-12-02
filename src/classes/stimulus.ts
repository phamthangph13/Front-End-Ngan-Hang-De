import Question from "@/classes/question";


class Stimulus {
    title: string;
    instructions?: string;
    content: string;
    questions: Question[];


    constructor(title: string = '', content: string = '', questions: Question[] = [], instructions?: string) {
        this.title = title;
        this.instructions = instructions;
        this.content = content;
        this.questions = questions;
    }

    addQuestion(question: Question) {
        this.questions.push(question);
    }

    removeQuestion(question: Question) {
        this.questions = this.questions.filter(q => q !== question);
    }

    getQuestion(index: number) {
        return this.questions[index];
    }

    getQuestionCount() {
        return this.questions.length;
    }

}

export default Stimulus;