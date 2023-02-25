import React from 'react';
import {useState} from 'react';

export function useForm(initialState) {
    const [values, setValues] = useState(initialState);
  
    const handleChange = (event) => {
      const {value, name} = event.target;
      setValues({...values, [name]: value});
    };
    return {values, handleChange, setValues};
  }
  