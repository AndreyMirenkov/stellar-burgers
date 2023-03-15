import React, {FC} from 'react';
import {useState} from 'react';

type TValues = {
  email: string;
  password: string;
  name?: string | undefined;
}

export const useForm = (initialState: TValues) => {
    const [values, setValues] = useState<TValues>(initialState);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
  