import React, { ReactNode } from 'react'
import Image from 'next/image';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
    subsets: ['latin'],
    weight: '400',
});


interface Props {
    children: ReactNode
}

const MainLayout = ({ children }: Props) => {
    return (
        <main
            className={`min-h-screen w-screen ${poppins.className}`}
            style={{
                backgroundImage: `url('/assets/bg.png')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='min-h-screen w-screen flex justify-center md:py-[80px]'>
                {children}
            </div>
        </main>
    )
}

export default MainLayout