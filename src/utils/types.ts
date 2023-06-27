export type Question = {
    id: number;
    category: string;
    type: string;
    difficulty: string;
    question: string;
}

export type AnsweredQuestion = {
    user_answer: string
} & Question

export type QuestionWithAnswer = {
    correct_answer: string
} & Question

