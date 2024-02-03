class DefaultService {
  async paginate(data, context, currentPage, itemsPerPage = 10) {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;

    const paginatedData = data.slice(startIndex, endIndex);
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const hasNextPage = currentPage < totalPages;
    const hasPreviousPage = currentPage > 1;

    let nextPage = null;
    let previousPage = null;

    if (hasNextPage) {
      nextPage = currentPage + 1;
    }

    if (hasPreviousPage) {
      previousPage = currentPage - 1;
    }

    return {
      [context]: paginatedData,
      currentPage: currentPage,
      totalPages: totalPages,
      nextPage: nextPage,
      previousPage: previousPage,
    };
  }
}

module.exports = DefaultService;
