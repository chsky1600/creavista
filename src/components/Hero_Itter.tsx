import React, { useState, useEffect } from 'react';

export function Hero_Itter(props: React.ComponentPropsWithoutRef<"h1">) {
  const synonyms = ['SUPERIOR', 'GREATER', 'IMPROVED', 'ADVANCED', 'ENHANCED', "THE ENVY OF ALL YOUR FRIENDS", "EPIC"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentWordIndex((currentWordIndex + 1) % synonyms.length);
    }, 1000); // Change every 2 seconds

    // Clean up function
    return () => {
      clearInterval(intervalId);
    };
  }, [currentWordIndex]);

  const newProps = {
    ...props,
    className: `${props.className ?? ''} text-center font-mono bg-transparent p-3 font-bold`
  };

  return (
    <h1 {...newProps}>
      {synonyms[currentWordIndex]}
    </h1>
  );
}