import OptionButton from '@/components/shared/OptionButton'
import QuestionOverviewCard from '@/components/shared/QuestionOverviewCard'
import { useQuestions } from '@/features/QuestionsProvider'
import { getRandomQuestions } from '@/services/questions'
import { Question } from '@/utils/types'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'

function QuestionsPage({ questions }: InferGetServerSidePropsType<typeof getServerSideProps>) {

    const questionsContext = useQuestions()

    useEffect(() => {
        const updateQuestions = () => {
            questionsContext.updateValue(questions)
        }
        updateQuestions()
    }, [])

    const questionList = questionsContext.value.questions
    const completedQuestionList = questionsContext.completedValue.questions
    const question = questionList[0]

    return (
        <>
            <Head>
                <title>Trivia Challenges | Questions</title>
                <meta property="og:title" content="Trivia Challenge developed by Jay Cabasag" key="title" />
            </Head>

            <div className='h-full w-full self-center flex items-center justify-center bg-white flex-col max-w-[900px] px-[28px] md:rounded-[10px]'>
                <div className='mt-[20px] w-full'>
                    {questionList.length > 0 ? (
                        <>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center'>
                                    <div className='pr-[28px] min-w-[60px] min-h-[65px]'>
                                        <Image src='/assets/logo.png' alt='logo' height={65} width={60} />
                                    </div>
                                    <h2 className='flex-1 text-[16px] md:text-[25px] font-semibold'>Category : {question.category}</h2>
                                </div>
                                <div className='mt-[20px] min-w-max'>
                                    <p className='text-[14px] md:text-[20px]'>{completedQuestionList.length + 1} of {questionsContext.totalQuestions}</p>
                                </div>
                            </div>
                            <hr className='mt-[31px]' />
                            <div className='min-h-[316px] md:min-h-[426px] flex items-center justify-center'>
                                <p className='text-center text-[25px] md:text-[50px]' dangerouslySetInnerHTML={{ __html: question.question }}></p>
                            </div>
                            <hr className='mt-[31px]' />
                            <div key={question.id} className='mt-[47px] mb-[47px] flex gap-[54px] w-full items-center justify-center'>
                                <button
                                    onClick={() => questionsContext.answerQuestion(question.id, 'True')}
                                    className={`w-[140px] md:w-[160px] h-[45px] md:h-[65px] bg-[#4FBD1B] rounded-[8px] flex items-center justify-center gap-3 md:gap-[21px]`}
                                >
                                    <span>
                                        <Image
                                            src={'/assets/check-icon.png'}
                                            alt={'check'}
                                            height={21}
                                            width={21}
                                        />
                                    </span>
                                    <span className='text-white text-[16px] md:text-[30px]'>True</span>
                                </button>

                                <button
                                    onClick={() => questionsContext.answerQuestion(question.id, 'False')}
                                    className={`w-[140px] md:w-[160px] h-[45px] md:h-[65px] bg-[#E04E10] rounded-[8px] flex items-center justify-center gap-3 md:gap-[21px]`}
                                >
                                    <span>
                                        <Image
                                            src={'/assets/close-icon.png'}
                                            alt={'check'}
                                            height={21}
                                            width={21}
                                        />
                                    </span>
                                    <span className='text-white text-[16px] md:text-[30px]'>False</span>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className='flex flex-col items-center justify-between'>
                            <div className='flex items-center w-full'>
                                <div className='pr-[28px] absolute'>
                                    <Image src='/assets/logo.png' alt='logo' height={65} width={60} />
                                </div>
                                <div className='flex-1 w-full'>
                                    <p className='text-[16px] md:text-[30px] font-semibold text-center mt-[20px]'>Final Results</p>
                                </div>
                            </div>
                            <hr className='mt-[30px] w-full' />
                            <div className='min-h-[122px] md:min-h-[172px] flex flex-col items-center justify-center'>
                                <h2 className='text-[35px] md:text-[50px] font-bold pt-[34px] text-center'>{questionsContext.totalCorrectAnswers}/{questionsContext.totalQuestions}</h2>
                                <p className='text-[16px] md:text-[22px] font-bold pt-[14px] capitalize text-center'>your score</p>
                            </div>
                            <hr className='mt-[30px] w-full' />
                            <ul className='min-h-[426px] flex justify-center flex-col'>
                                {completedQuestionList.map((data, index) => {
                                    return <QuestionOverviewCard key={index} number={index + 1} data={data} />
                                })}
                            </ul>
                            <hr className='mb-[46px] w-full' />
                            <Link href='/' legacyBehavior passHref>
                                <a className='mb-[41px] text-center flex flex-col uppercase text-[25px] md:text-[35px] font-semibold text-primary'>
                                    play again
                                    <span className='h-[4px] w-[201px] bg-primary'></span>
                                </a>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default QuestionsPage

export const getServerSideProps: GetServerSideProps<{ questions: Question[] }> = async () => {
    const res = await getRandomQuestions()
    return { props: { questions: res } }
}