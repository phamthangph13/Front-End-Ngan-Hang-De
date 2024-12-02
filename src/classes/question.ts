import  Subject  from './subject';


interface Answer {
    content: string;
    isCorrect: boolean;
}

const DifficultyList = ['easy', 'medium', 'hard'] as const;

type Difficulty = typeof DifficultyList[number];

const QuestionTypes = [
    'multiple-choice', // + true-false
    'check-box', 
    'short-answer',
    'essay', 
    // 'long-answer',
    // 'fill-in-the-blank',
] as const;

type QuestionType = typeof QuestionTypes[number];

class Question {
    id: string | null;
    type: QuestionType;
    class: number | null;
    subject: Subject | null;
    knowledgeScope: string[];
    difficulty: Difficulty
    title: string;
    answers: Answer[];
    explanation: string;
    score?: number;
    createdAt: Date | null;
    updatedAt: Date | null = null;
    // referenceDocument?: string;
    constructor(id: string | null, type: QuestionType, class_: number, subject: Subject | null, difficulty: Difficulty, knowledgeScope: string[], title: string, answers: Answer[], explanation: string, score: number = 1) {
        this.id = id;
        this.type = type;
        this.class = class_;
        this.subject = subject;
        this.difficulty = difficulty;
        this.knowledgeScope = knowledgeScope;
        this.title = title;
        this.answers = answers;
        this.explanation = explanation;
        this.score = score;
        this.createdAt = null;
    }
    static createMultipleChoiceTest() {
        return new Question(
            null,
            'multiple-choice',
            10,
            null,
            'easy',
            [],
            'Câu hỏi ...',
            [
                { content: 'Đáp án A', isCorrect: true },
                { content: 'Đáp án B', isCorrect: false },
                { content: 'Đáp án C', isCorrect: false },
                { content: 'Đáp án D', isCorrect: false },
            ],
            ''
        );
    }
    static createMultipleChoiceTest1() {
        return new Question(
            null,
            'multiple-choice',
            11,
            null,
            'easy',
            [],
            'Câu hỏi ...',
            [
                { content: 'Đáp án A', isCorrect: true },
                { content: 'Đáp án B', isCorrect: false },
                { content: 'Đáp án C', isCorrect: false },
                { content: 'Đáp án D', isCorrect: false },
            ],
            ''
        );
    }
    static fromJson(json: any) {
        // @ts-ignore
        return Object.assign(new Question(), json)
    }
}


export default Question;
export type { Answer, Difficulty, QuestionType };
export { DifficultyList, QuestionTypes };
