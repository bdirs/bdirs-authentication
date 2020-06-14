export const paginationHelper = (data: {count: number, rows: any[]}, page: number, itemsPerPage: number) => {
    const{rows, count} = data;
    const totalPages = Math.ceil(count / itemsPerPage);
    const nextPage = page >= totalPages ? null : page + 1 ;

    const response = {
      currentPage: page,
      nextPage,
      perPage: itemsPerPage,
      previousPage: page > 0 ? page - 1 === 0 ? null : page - 1 : null,
      results: rows,
      totalItems: rows.length,
      totalPages,
    };

    return response;
};
