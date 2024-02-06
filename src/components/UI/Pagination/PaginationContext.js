import React from "react";
import {useContext, useState} from "react";

const PaginationContext = React.createContext();

export const PaginationProvider = ({ children }) => {
    const [currentPage, setCurrentPage] = useState(1);

    const setPage = (page) => {
        setCurrentPage(page);
    };

    return (
        <PaginationContext.Provider value={{ currentPage, setPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error("usePagination must be used within a PaginationProvider");
    }
    return context;
};