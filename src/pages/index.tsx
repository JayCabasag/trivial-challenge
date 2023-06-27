import { Poppins } from 'next/font/google';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Trivia Challenge</title>
        <meta property="og:title" content="Trivia Challenge developed by Jay Cabasag" key="title" />
      </Head>

      <div
        className='h-full overflow-hidden self-center flex items-center justify-center bg-white flex-col max-w-[900px] px-[20px] md:px-[118px] md:rounded-[10px]'
      >
        <div className='mt-[44px] md:mt-[144px] mb-[41px]'>
          <Image src='/assets/zeniark-logo.png' alt='logo' height={91} width={344} />
        </div>

        <div className='mb-[22px]'>
          <h1 className='font-semibold text-[25px] md:text-[35px] text-center'>Welcome to the Trivia Challenge!</h1>
          <p className='font-medium text-[16px] md:text-[22px] text-center'>You will be presented with 10 True or False questions.</p>
        </div>

        <button
          className='mb-[30px] md:mb-[65px] w-[280px] md:w-[523px] h-[50px] md:h-[83px] bg-primary text-white text-[20px] md:text-[35px] rounded-[15px]'
        >
          Can you score 10/10?
        </button>

        <Link href='/questions' legacyBehavior passHref>
          <a className='mb-[40px] md:mb-[107px] flex flex-col uppercase text-center text-[25px]  md:text-[35px] font-semibold text-primary'>
            let&apos;s start!
            <span className='h-[4px] w-[201px] bg-primary'></span>
          </a>
        </Link>
      </div>
    </>
  );
}