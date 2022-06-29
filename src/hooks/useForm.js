import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [ formValidation, setFormValidation ] = useState( formValidations );

    useEffect(() => {
      createValidators();
    }, [formState])

    const isFormValid = useMemo( () => {
        for(let value of Object.keys(formValidation)){
            if(formValidation[value] !== null) return false;
            return true;
        }
    }, [formState])
    

    // control de cambio de campos del formulario
    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    // validaciones del formulario
    const createValidators = () => {
        const formCheckedValues = {};

        for(let field of Object.keys(formValidations)){
            const [fn, errorMessage = 'Campo requerido'] = formValidations[field];
            formCheckedValues[`${field}Valid`] = fn(formState[field]) ? null : errorMessage;
        }

        setFormValidation(formCheckedValues);
    }

    // limpieza de campos del formulario
    const onResetForm = () => {
        setFormState( initialForm );
    }

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,
        ...formValidation,
        isFormValid,
    }
}
