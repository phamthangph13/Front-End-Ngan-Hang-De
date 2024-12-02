// interface Subject {
//     id: string;
//     name: string;
//     description: string;
// }

class Subject {
    id: string | null;
    name: string;
    description: string;
    createdAt: Date | null = null;
    updatedAt: Date | null = null;
    constructor(id : string | null, name : string, description : string, createdAt: Date | null) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
    }
    static fromJson(json: any) {
        return new Subject(json.id, json.name, json.description, json.createdAt);
    }
}


class SubjectInfo extends Subject {
    questionCount: number;
    examCount: number;
    constructor(id : string | null, name : string, description : string, questionCount: number, examCount: number, createdAt: Date | null) {
        super(id, name, description, createdAt);
        this.questionCount = questionCount;
        this.examCount = examCount;
    }
}


export default Subject;
export { SubjectInfo };