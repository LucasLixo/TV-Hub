import React, { createContext, useState, useEffect } from 'react';

export const VizerContext = createContext();

export const VizerProvider = ({ children }) => {
    const [vizerHost, setVizerHost] = useState('');

    useEffect(() => {
        const fetchVizerHost = async () => {
            try {
                const response = await fetch('https://raw.githubusercontent.com/LucasLixo/TV-Hub/main/fastlane/host.txt');
                const host = await response.text();
                setVizerHost(host.trim());
            } catch (error) {
                //
            }
        };

        fetchVizerHost();
    }, []);

    return (
        <VizerContext.Provider value={vizerHost}>
            {children}
        </VizerContext.Provider>
    );
};
