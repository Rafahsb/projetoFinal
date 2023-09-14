import React from "react";
import Pagination from "react-bootstrap/Pagination";

function PaginationComponent({ currentPage, totalPages, onPageChange }) {
    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxPageDisplay = 5; // Número máximo de páginas a serem exibidas

        let startPage = 1;
        let endPage = totalPages; // Limita a exibição a 5 páginas

        if (totalPages > maxPageDisplay) {
            const halfPageDisplay = Math.floor(maxPageDisplay / 2);

            if (currentPage <= halfPageDisplay + 1) {
                endPage = maxPageDisplay;
            } else if (currentPage >= totalPages - halfPageDisplay) {
                startPage = totalPages - maxPageDisplay + 1;
            } else {
                startPage = currentPage - halfPageDisplay;
                endPage = currentPage + halfPageDisplay;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <Pagination.Item
                    key={i}
                    active={i === currentPage}
                    onClick={() => onPageChange(i)}
                >
                    {i}{" "}
                </Pagination.Item>
            );
        }
        return pageNumbers;
    };

    return (
        <Pagination size="md" className="d-flex justify-content-center mt-3">
            {/* Botão para a primeira página */}
            <Pagination.First onClick={() => onPageChange(1)} />{" "}
            {/* Botão para a página anterior */}{" "}
            <Pagination.Prev onClick={() => onPageChange(currentPage - 1)} />
            {/* Renderizar números de páginas limitados */}{" "}
            {renderPageNumbers()} {/* Botão para a próxima página */}{" "}
            <Pagination.Next onClick={() => onPageChange(currentPage + 1)} />
            {/* Botão para a última página */}
            <Pagination.Last onClick={() => onPageChange(totalPages)} />{" "}
        </Pagination>
    );
}

export default PaginationComponent;
