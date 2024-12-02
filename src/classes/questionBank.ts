import Question from "@/classes/question";
import Stimulus from "@/classes/stimulus";
import Subject   from "@/classes/subject";

class QuestionBank {
    id?: string;
    title: string;
    items: (Question | Stimulus)[];
    class?: number;
    subject?: Subject;
    knowledgeScope: string[];

    constructor(title: string = '', items: (Question | Stimulus)[] = [], class_?: number, subject?: Subject, knowledgeScope: string[]) {
        this.title = title;
        this.items = items;
        this.class = class_;
        this.subject = subject;
        this.knowledgeScope = knowledgeScope;
    }


    addItem(item: Question | Stimulus) {
        this.items.push(item);
    }

    removeItem(item: Question | Stimulus) {
        this.items = this.items.filter(i => i !== item);
    }

    getItem(index: number) {
        return this.items[index];
    }

    getQuestionCount() {
        // find the number of questions in the question bank
        let qNum = 0;
        this.items.forEach(item => {
            if (item instanceof Question) {
                qNum++;
            } else {
                qNum += item.getQuestionCount();
            }
        });

    }

    static createBank() {
        return new QuestionBank()
    }

    static formJSON(json: any) : QuestionBank {
        // parse the json string and return a QuestionBank object
        return Object.assign(new QuestionBank(), json);

    }

}


export default QuestionBank;
