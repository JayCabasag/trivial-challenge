import { RANDOM_QUESTIONS_LIMIT } from "@/utils/constansts"
import { genericGetRequest } from "./fetcher.ts/genericGetRequest"
import { Question, QuestionWithAnswer } from "@/utils/types"

export const getRandomQuestions = async (limit?: number) => {

    const params = `limit=${!limit ? RANDOM_QUESTIONS_LIMIT : limit}`
    let questions: Question[] = []

    await genericGetRequest('questions/random', params).then((response) => {
        questions = response
    }).catch(() => {
        questions = []
    })

    return questions
}

export const getQuestionsWithAnswer = async (ids: number[]) => {

    if (ids.length <= 0) return []

    let questions: QuestionWithAnswer[] = []

    const params = `ids=${ids.join(',')}`

    await genericGetRequest('questions', params).then((response) => {
        questions = response
    }).catch(() => {
        questions = []
    })

    return questions
}