import React, { useState, ChangeEvent } from 'react';

interface DynamicInputProps extends React.ComponentPropsWithoutRef<"input"> {
  handleUrlChange: (event: ChangeEvent<HTMLInputElement>) => void;
  url: string;
}

export function DynamicInput({ handleUrlChange, url, ...props }: DynamicInputProps) {
  const [inputValue, setInputValue] = useState(url);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    handleUrlChange(event);
  };

  const newProps = {
    ...props,
    value: inputValue,
    onChange: handleChange,
    size: inputValue.length || 20,
    className: "text-center font-mono bg-transparent hover:border hover:border-black p-3 mt-0.5 ",
    type: "url",
    placeholder: "______________________",
  };

  return (
    <input {...newProps} />
  );
}