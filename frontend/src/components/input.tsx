import React, { useState } from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface InputProps {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  icon?: any;
}

export const Input = ({ label, name, placeholder, value, action, icon, type = 'text' }: InputProps) => {
  const [isShown, setIsShown] = useState(false);
  const handlePasswordShown = () => setIsShown(!isShown);

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} className="text-sm mb-2 text-gray-900 flex gap-2 items-center">
        {label} {icon}
      </label>
      <div className="relative w-full">
        <input
          id={name}
          name={name}
          type={type === "password" && isShown ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={action}
          readOnly={name === 'walletAddress'}
          className={`w-full bg-stone-100 text-gray-900 py-3 px-5 rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-150 ${name === 'walletAddress' ? 'cursor-not-allowed opacity-70' : ''
            }`}
        />
        {type === "password" &&
          <div onClick={handlePasswordShown} className='text-gray-900 absolute right-5 top-4 cursor-pointer'>
            {isShown ? <MdVisibility /> : <MdVisibilityOff />}
          </div>
        }
      </div>
    </div>
  );
};
