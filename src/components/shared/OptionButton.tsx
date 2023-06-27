import Image from 'next/image'
import React from 'react'

interface Props {
    onClick: () => void
    src: string
    color: string
    label: string
}

const OptionButton = ({ onClick, src, color, label }: Props) => {

    return (
        <button
            onClick={onClick}
            className={`w-[160px] h-[65px] bg-[${color}] rounded-[8px] flex items-center justify-center gap-[21px]`}
        >
            <span>
                <Image
                    src={src}
                    alt={label}
                    height={21}
                    width={21}
                />
            </span>
            <span className='text-white text-[30px]'>{label}</span>
        </button>
    )
}

export default OptionButton