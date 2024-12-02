// interface QuestionGroup {
//     id?: string;
//     title: string;
//     class: number;
//     subject: Subject;
//     knowledgeScope: string[];
//     questions: Question[] | QuestionExam[];
//     explanation: string;
// }

import Subject from './subject';
import Question from './question';


class QuestionGroup {
    id: string | null;
    subject: Subject | null;
    // class: number;
    knowledgeScope: string[];
    source: string;
    method: string;
    explanation: string;
    questions: Question[];
    createdAt: Date | null;
    updatedAt: Date | null = null;

    constructor(
        id: string | null = null,
        source: string = '',
        method: string = '',
        // classNumber: number = 0,
        subject: Subject | null = null,
        knowledgeScope: string[] = [],
        questions: Question[] = [],
        explanation: string = '',
        createdAt: Date | null = null,
        updatedAt: Date | null = null,
    ) {
        this.id = id;
        this.source = source;
        this.method = method;
        // this.class = classNumber;
        this.subject = subject;
        this.knowledgeScope = knowledgeScope;
        this.questions = questions;
        this.explanation = explanation;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt
    }

    static create() {
        return new QuestionGroup(
            null,
            '',
            '',
            0,
            [],
            [],
            [],
            '',
            null,
            null
        );
    }

    // static create() {
    //     return new QuestionGroup(
    //         null,
    //         'Bộ câu hỏi ...',
    //         10,
    //         null,
    //         [],
    //         [],
    //         'Giải thích ...',
    //     );
    // }
    static fromJson(json: string) {
        // @ts-ignore
        return Object.assign(new QuestionGroup(), json)
    }
}

export default QuestionGroup;