import React, { useContext, useState, useEffect } from 'react';

const AppContext = React.createContext(undefined);

export const AppContextProvider = ({ children }) => {
    const [tutor, setTutor] = useState(() => {
        const savedTutor = localStorage.getItem('tutor');
        return savedTutor ? JSON.parse(savedTutor) : null;
    });

    useEffect(() => {
        if (tutor) {
            localStorage.setItem('tutor', JSON.stringify(tutor));
        } else {
            localStorage.removeItem('tutor');
        }
    }, [tutor]);

    return (
        <AppContext.Provider value={{ tutor, setTutor }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    const context = useContext(AppContext);
    return context;
};
