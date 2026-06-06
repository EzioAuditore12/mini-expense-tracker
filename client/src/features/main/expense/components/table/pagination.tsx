import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

import { ExpenseTablePaginationSkeleton } from '@/features/main/expense/components/skeleton';

interface ExpenseTablePaginationProps {
  page: number;

  totalPages: number;

  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

export function ExpenseTablePagination({
  page,
  totalPages,
  onPageChange,
  isLoading,
}: ExpenseTablePaginationProps) {
  if (isLoading) {
    return <ExpenseTablePaginationSkeleton />;
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page > 1) {
                onPageChange(page - 1);
              }
            }}
            aria-disabled={page === 1}
          />
        </PaginationItem>

        {Array.from({
          length: totalPages,
        }).map((_, index) => {
          const pageNumber = index + 1;

          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href="#"
                isActive={page === pageNumber}
                onClick={(e) => {
                  e.preventDefault();

                  onPageChange(pageNumber);
                }}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();

              if (page < totalPages) {
                onPageChange(page + 1);
              }
            }}
            aria-disabled={page === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
