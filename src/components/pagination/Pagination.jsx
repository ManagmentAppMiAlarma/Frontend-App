import React from "react";

export function Pagination({ total, current, onChange, className }) {
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    const halfMaxPages = Math.floor(maxPagesToShow / 2);

    if (total <= maxPagesToShow) {
      for (let i = 1; i <= total; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, current - halfMaxPages);
      let endPage = Math.min(total, current + halfMaxPages);

      if (current <= halfMaxPages) {
        endPage = maxPagesToShow;
      } else if (current + halfMaxPages >= total) {
        startPage = total - maxPagesToShow + 1;
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (startPage > 1) {
        pages.unshift("...");
      }

      if (endPage < total) {
        pages.push("...");
      }
    }

    return pages;
  };

  const pages = generatePageNumbers();

  return (
    <nav className={className}>
      <ul className="inline-flex -space-x-px text-sm">
        {current !== 1 && (
          <li>
            <button
              onClick={() => onChange(current - 1)}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={current === 1}
            >
              ←
            </button>
          </li>
        )}

        {pages.map((page, index) => (
          <li key={index}>
            {page === "..." ? (
              <span className="px-3 h-8 flex  text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700">
                ...
              </span>
            ) : (
              <button
                onClick={() => onChange(page)}
                aria-current={current === page ? "page" : undefined}
                className={`flex items-center justify-center px-3 h-8 leading-tight ${
                  current === page
                    ? "text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700"
                    : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                }`}
              >
                {page}
              </button>
            )}
          </li>
        ))}
        {current !== total && (
          <li>
            <button
              onClick={() => onChange(current + 1)}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
              disabled={current === total}
            >
              →
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}
