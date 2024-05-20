import React, { createContext, useContext, useState, useEffect } from 'react';

const FontSizeContext = createContext();

export const FontSizeProvider = ({ children }) => {
    const savedFontSize = localStorage.getItem('fontSize');
    const [fontSize, setFontSize] = useState(savedFontSize ? parseFloat(savedFontSize) : 0);
    const [lastSelectedSize, setLastSelectedSize] = useState(0);

    const updateFontSize = (change) => {
        setLastSelectedSize(change); // Устанавливаем выбранный размер как последний выбранный
    };

    const applyFontSize = (newFontSize) => {
        document.body.style.fontSize = `${newFontSize}px`;

        document.querySelectorAll('body *').forEach((element) => {
            const computedStyle = window.getComputedStyle(element);
            const currentFontSize = parseFloat(computedStyle.fontSize);
            const newElementFontSize = currentFontSize + newFontSize;
            element.style.fontSize = `${newElementFontSize}px`;
        });

        setFontSize(newFontSize); // Устанавливаем новый размер шрифта
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
        // Применяем изменения размера шрифта только если выбран новый размер
        if (lastSelectedSize !== 0) {
            const newFontSize = fontSize + lastSelectedSize;
            applyFontSize(newFontSize);
        }
    }, [lastSelectedSize]); // Следим только за изменением lastSelectedSize

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

