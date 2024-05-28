import React from 'react';
import "./Card.css";
import Image from 'next/image';

type Card = {
    icon: string,
    title: string,
    description: string,
    footer: string
}

const Card = ({icon, title, description, footer}: Card) => {
    return (
        <div className="card rounded-2xl px-10 pt-16 pb-6 flex-column-center relative shadow-lg">
            <div className="icon absolute flex-center">
                <Image src={icon} alt="icon" width={50} height={50} />
            </div>
            <div className="text-3xl mt-6 font-semibold">{title}</div>
            <div className="text-xl my-2 text-center break-words max-w-72">{description}</div>
            <div className="font-semibold mt-11">{footer}</div>
        </div>
    );
};

export default Card;