import { MutableRefObject, useEffect } from 'react';

const useHandleEditConfirmation = (ref: MutableRefObject<HTMLElement>, finalizeEdit: any, isEditActive: boolean) => {
    useEffect(() => {
        const handleClickOutside = (event: any) => ref.current && !ref.current.contains(event.target) && finalizeEdit();
        const handleEnterKey = (event: KeyboardEvent) => 'Enter' === event.code && isEditActive && finalizeEdit();

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keypress', handleEnterKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keypress', handleEnterKey);
        };
    }, [ref, finalizeEdit, isEditActive]);
};

export default useHandleEditConfirmation;
