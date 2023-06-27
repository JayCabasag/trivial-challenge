import { useQuestions } from '@/features/QuestionsProvider'
import { AnsweredQuestion } from '@/utils/types'
import Image from 'next/image'
import React from 'react'

interface Props {
    data: AnsweredQuestion
    number: number
}

const QuestionOverviewCard = ({ data, number }: Props) => {

    const questionsContext = useQuestions()


    const userAnswer = data.user_answer
    const isUserAnswerTrue = userAnswer === 'True'

    const questionWithAnswer = questionsContext.valueWithAnswers.questions.find((doc) => doc.id === data.id)

    let isAnswerCorrect = false

    if (!!questionWithAnswer) {
        isAnswerCorrect = data.user_answer.toLowerCase() === questionWithAnswer.correct_answer.toLowerCase()
    }

    const isCorrectAnswerTrue = (questionWithAnswer?.correct_answer as string) === 'True'

    return (
        <li className='pt-[27px] pb-[19px] border-dashed border-b flex gap-[20px]'>
            <div>
                <p className='text-[#9D9D9D]'>{number}.</p>
            </div>
            <div className='flex-1'>
                <p className='text-[14px] md:text-[16px]' dangerouslySetInnerHTML={{ __html: data.question }}></p>
                <p className='mt-[10px] italic text-[12px] md:text-[14px] text-[#9D9D9D]'>
                    The correct answer is <span className={isCorrectAnswerTrue ? 'font-bold text-[#4FBD1B]' : 'font-bold text-[#FF4D00]'}>{questionWithAnswer?.correct_answer ?? ''}</span>.
                    You answered <span className={isUserAnswerTrue ? 'font-medium text-[#4FBD1B]' : 'font-medium text-[#FF4D00]'}>{data.user_answer}</span>
                    .
                </p>
            </div>
            <div className='flex items-center justify-center px-[20px]'>
                {isAnswerCorrect ? (
                    <Image
                        src={'/assets/green-check-icon.png'}
                        alt={'check'}
                        height={20}
                        width={28}
                    />
                ) : (
                    <Image
                        src={'/assets/red-close-icon.png'}
                        alt={'check'}
                        height={21}
                        width={21}
                    />
                )}
            </div>
        </li>
    )
}

export default QuestionOverviewCard