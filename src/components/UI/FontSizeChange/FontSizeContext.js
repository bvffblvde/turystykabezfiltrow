import React, { createContext, useContext, useState, useEffect } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const savedFontSize = localStorage.getItem('fontSize');
    const [fontSize, setFontSize] = useState(savedFontSize ? parseFloat(savedFontSize) : 0);
    const [lastSelectedSize, setLastSelectedSize] = useState(0);

    const updateFontSize = (change) => {
        const newFontSize = lastSelectedSize + change;
        document.body.style.fontSize = `${newFontSize}px`;

        document.querySelectorAll('body *').forEach((element) => {
            const computedStyle = window.getComputedStyle(element);
            const currentFontSize = parseFloat(computedStyle.fontSize);
            const newElementFontSize = currentFontSize + change;
            element.style.fontSize = `${newElementFontSize}px`;
        });

        setFontSize(newFontSize);
    };

    const resetFontSize = () => {
        document.body.style.fontSize = '';

        document.querySelectorAll('body *').forEach((element) => {
            element.style.fontSize = '';
        });

        setFontSize(0);
        setLastSelectedSize(0);
    };

    useEffect(() => {
        if (savedFontSize) {
            setFontSize(parseFloat(savedFontSize));
            setLastSelectedSize(parseFloat(savedFontSize));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    return (
        <FontSizeContext.Provider value={{ fontSize, lastSelectedSize, updateFontSize, resetFontSize }}>
            {children}
        </FontSizeContext.Provider>
    );
};

export const useFontSize = () => {
    const context = useContext(FontSizeContext);
    if (!context) {
        throw new Error('useFontSize must be used within a FontSizeProvider');
    }
    return context;
};
