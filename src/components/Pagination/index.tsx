import {DOTS, usePagination} from './hooks/usePagination';

const Pagination = (props: any) => {
    const {
        onPageChange,
        totalCount,
        siblingCount = 1,
        currentPage,
        pageSize,
        className,
    } = props;

    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount,
        pageSize,
    });

    // If there are less than 2 times in pagination range we shall not render the component
    if (currentPage === 0 || (paginationRange?.length || 0) < 2) {
        return null;
    }
    const onNext = () => {
        onPageChange(currentPage + 1);
    };

    const onPrevious = () => {
        onPageChange(currentPage - 1);
    };

    let lastPage = paginationRange?.[paginationRange?.length - 1];

    return (
        <div className="flex flex-row-reverse flex-wrap items-center px-10 pb-10 ">
            <nav aria-label="Page navigation">
                <ul className="inline-flex items-center">
                    <li>
                        <button
                            disabled={currentPage === 1}
                            onClick={onPrevious}
                            className={`${
                                currentPage === 1
                                    ? 'text-[#ABB5BE]'
                                    : 'text-[#0012A3]'
                            } `}
                        >
                            Prev
                        </button>
                    </li>
                    {paginationRange?.map((pageNumber, index) => {
                        // If the pageItem is a DOT, render the DOTS unicode character
                        if (pageNumber === DOTS) {
                            return (
                                <li className="px-1 text-[#0012A3]" key={index}>
                                    &#8230;
                                </li>
                            );
                        }

                        // Render our Page Pills
                        return (
                            <li
                                key={index}
                                className={`px-2 transition-colors duration-150 focus:shadow-outline !border`}
                                style={{
                                    color:
                                        pageNumber === currentPage
                                            ? 'white!important'
                                            : '',
                                }}
                            >
                                <button
                                    onClick={() => onPageChange(pageNumber)}
                                    className=""
                                >
                                    {pageNumber}
                                </button>
                            </li>
                        );
                    })}

                    <li>
                        <button
                            disabled={currentPage === lastPage}
                            onClick={onNext}
                            className={`${
                                currentPage === lastPage
                                    ? 'text-[#ABB5BE]'
                                    : 'text-[#0012A3]'
                            }`}
                        >
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
