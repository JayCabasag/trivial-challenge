import { getQuestionsWithAnswer } from '@/services/questions'
import { AnsweredQuestion, Question, QuestionWithAnswer } from '@/utils/types'
import React, { ReactNode, createContext, useContext, useState } from 'react'

type QuestionContextType = {
  totalCorrectAnswers: number,
  totalQuestions: number,
  value: { questions: Question[] },
  completedValue: { questions: AnsweredQuestion[] },
  valueWithAnswers: { questions: QuestionWithAnswer[] },
  updateValue: (questions: Question[]) => void,
  answerQuestion: (id: number, userAnswer: string) => void
}

const initialQuestionContextState = {
  totalCorrectAnswers: 0,
  totalQuestions: 0,
  value: { questions: [] },
  completedValue: { questions: [] },
  valueWithAnswers: { questions: [] },
  updateValue: () => { },
  answerQuestion: () => { },
}

const QuestionsContext = createContext<QuestionContextType>(initialQuestionContextState)

interface Props {
  children: ReactNode
}

const QuestionsProvider = ({ children }: Props) => {
  const [value, setValue] = useState<{ questions: Question[] }>({ questions: [] })
  const [completedValue, setCompletedValue] = useState<{ questions: AnsweredQuestion[] }>({ questions: [] })
  const [valueWithAnswers, setValueWithAnswers] = useState<{ questions: QuestionWithAnswer[] }>({ questions: [] })
  const [totalQuestions, setTotalQuestions] = useState<number>(0)
  const [totalCorrectAnswers, setTotalCorrectAnswers] = useState<number>(0)

  const updateValue = (questions: Question[]) => {

    setValueWithAnswers({
      questions: []
    })

    setCompletedValue({
      questions: []
    })

    setValue({
      questions
    })

    setTotalQuestions(questions.length)

  }

  const answerQuestion = async (id: number, userAnswer: string) => {

    const answeredQuestion = value.questions.find((data) => data.id === id)
    if (!answeredQuestion) return

    const newValueQuestionsList = value.questions.filter((data) => data.id !== id)
    setValue({
      questions: newValueQuestionsList
    })

    const convertedToAnsweredType = { ...answeredQuestion, user_answer: userAnswer }
    const newCompletedQuestionsList = completedValue.questions.concat(convertedToAnsweredType)

    setCompletedValue({
      questions: newCompletedQuestionsList
    })

    if (newValueQuestionsList.length === 0) {

      const ids = newCompletedQuestionsList.map((data) => data.id)

      const response = await getQuestionsWithAnswer(ids)
      setValueWithAnswers({
        questions: response
      })

      const totalCorrectAnswerScore = newCompletedQuestionsList.reduce((accumulator, currentValue) => {
        const currentQuestion = response.find((data) => data.id === currentValue.id)

        if (!currentQuestion) {
          return accumulator
        }

        if (currentQuestion.correct_answer === currentValue.user_answer) {
          return accumulator + 1
        }

        return accumulator
      }, 0)

      setTotalCorrectAnswers(totalCorrectAnswerScore)
    }
  }

  return (
    <QuestionsContext.Provider value={{ totalQuestions, totalCorrectAnswers, value, completedValue, valueWithAnswers, updateValue, answerQuestion }}>
      {children}
    </QuestionsContext.Provider>
  )
}

export default QuestionsProvider

export const useQuestions = () => useContext(QuestionsContext)