'use client';

import * as React from 'react';

interface ParallaxCard {
  lightBg: string;
  darkBg: string;
  content: React.ReactNode;
}

interface ParallaxCardsProps {
  cards?: ParallaxCard[];
  height?: number | string;
}

export default function ParallaxCards({
  cards,
  height = '100vh',
}: ParallaxCardsProps) {
  const cardCount = cards?.length || 0;

  return (
    <section className='relative w-full' style={{ height }}>
      <div style={{ height: `${cardCount * 70}vh` }} className='relative'>
        {cards?.map((card, index) => (
          <div key={index} className='sticky top-0 h-[70vh] z-1'>
            <div
              className={`flex h-full w-full items-center justify-center rounded-none p-8 text-center ${card.lightBg} ${card.darkBg}`}
            >
              {card.content}
            </div>
          </div>
        ))}
      </div>
      <div className='h-screen bg-white dark:bg-black' />
    </section>
  );
}
