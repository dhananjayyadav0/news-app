// components/ui/pagination.tsx
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxPageButtons = 5,
}: PaginationProps) => {
  const getPageNumbers = useCallback(() => {
    if (totalPages <= maxPageButtons) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(currentPage - halfMaxButtons, 1);
    let endPage = Math.min(startPage + maxPageButtons - 1, totalPages);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(endPage - maxPageButtons + 1, 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  }, [currentPage, totalPages, maxPageButtons]);

  if (totalPages <= 1) return null;

  return (
    <nav role="navigation" aria-label="Pagination Navigation">
      <ul className="flex flex-wrap items-center justify-center gap-1">
        {/* Previous button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Go to previous page"
            className="h-8 w-8 p-0 transition-all duration-200 ease-in-out"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </li>

        {/* First page */}
        {getPageNumbers()[0] > 1 && (
          <>
            <li>
              <Button
                variant={currentPage === 1 ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(1)}
                aria-label="Go to page 1"
                aria-current={currentPage === 1 ? "page" : undefined}
                className={`h-8 w-8 p-0 ${
                  currentPage === 1 ? "bg-gray-300 text-gray-700" : ""
                }`}
              >
                1
              </Button>
            </li>
            {getPageNumbers()[0] > 2 && (
              <li className="px-2">
                <span className="text-muted-foreground">...</span>
              </li>
            )}
          </>
        )}

        {/* Page numbers */}
        {getPageNumbers().map((page) => (
          <li key={page}>
            <Button
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
              className={`h-8 w-8 p-0 ${
                currentPage === page ? "bg-gray-300 text-gray-700" : ""
              }`}
            >
              {page}
            </Button>
          </li>
        ))}

        {/* Last page */}
        {getPageNumbers()[getPageNumbers().length - 1] < totalPages && (
          <>
            {getPageNumbers()[getPageNumbers().length - 1] < totalPages - 1 && (
              <li className="px-2">
                <span className="text-muted-foreground">...</span>
              </li>
            )}
            <li>
              <Button
                variant={currentPage === totalPages ? "default" : "outline"}
                size="sm"
                onClick={() => onPageChange(totalPages)}
                aria-label={`Go to page ${totalPages}`}
                aria-current={currentPage === totalPages ? "page" : undefined}
                className={`h-8 w-8 p-0 ${
                  currentPage === totalPages ? "bg-gray-300 text-gray-700" : ""
                }`}
              >
                {totalPages}
              </Button>
            </li>
          </>
        )}

        {/* Next button */}
        <li>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
            className="h-8 w-8 p-0 transition-all duration-200 ease-in-out"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </li>
      </ul>
    </nav>
  );
};
