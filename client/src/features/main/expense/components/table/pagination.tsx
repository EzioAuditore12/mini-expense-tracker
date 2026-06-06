import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
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

function generatePaginationItems(currentPage: number, totalPages: number) {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }).map((_, i) => i + 1);
  }

  if (currentPage <= 4) {
    return [1, 2, 3, 4, 5, '...', totalPages];
  }

  if (currentPage >= totalPages - 3) {
    return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
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

  const items = generatePaginationItems(page, totalPages);

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

        {items.map((item, index) => {
          if (item === '...') {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          const pageNumber = item as number;

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
