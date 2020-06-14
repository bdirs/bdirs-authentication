import { paginationHelper } from "../pagination-helper";

describe("PaginationHelper", () => {
    it("should return pagination object", () => {
        const data = { rows: [], count: 0 };
        const res = paginationHelper(data, 1, 1);
        expect(res).toEqual({
            currentPage: 1,
            nextPage: null,
            perPage: 1,
            previousPage: null,
            results: [],
            totalItems: 0,
            totalPages: 0,
        });
    });
});
