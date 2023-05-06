import { PaginationContainer, ArrowButton, PageInput, PageCount } from '@/styles/styledComponents';
import PaginatorProps from '@/types/PaginatorProps';
import React, { useState } from 'react';

const Paginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
  const [pageInput, setPageInput] = useState<number>(currentPage);

  const handlePageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1 && value <= totalPages) {
      setPageInput(value);
      onPageChange(value);
    } else {
      setPageInput(currentPage);
    }
  };

  const handlePageInputBlur = () => {
    if (pageInput < 1) {
      setPageInput(1);
    } else if (pageInput > totalPages) {
      setPageInput(totalPages);
    }
  };

  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPageClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <ArrowButton onClick={handlePrevPageClick}>&lt;</ArrowButton>
      <PageInput
        type="number"
        value={currentPage}
        onChange={handlePageInputChange}
        onBlur={handlePageInputBlur}
        min={1}
        max={totalPages}
      />
      <PageCount>of {totalPages}</PageCount>
      <ArrowButton onClick={handleNextPageClick}>&gt;</ArrowButton>
    </PaginationContainer>
  );
};

export default Paginator;
