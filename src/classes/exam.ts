import Question from "./question";
import QuestionGroup from "./questionGroup";
import Subject from "./subject";

class Exam {
    id: string | null;
    code: string | null;
    title: string;
    duration: number;
    subject: Subject | null;
    questions: Set<Question>;
    questionIds: string[];
    isOfficial: boolean;
    knowledgeScope: string[];
    createdAt: Date | null;
    updatedAt: Date | null;
    children?: Exam[] | null;

    constructor(code: string | null, title: string, duration: number, subject: Subject | null, questions: Set<Question>, isOfficial: boolean, knowledgeScope: string[], createdAt: Date | null, updatedAt: Date | null) {
        this.code = code;
        this.title = title;
        this.duration = duration;
        this.subject = subject;
        this.questions = questions;
        this.isOfficial = isOfficial;
        this.knowledgeScope = knowledgeScope;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    static createExam() {
        return new Exam('', "", 90, null, new Set<Question>(), false, [], null, null);
    }

}

export default Exam;

