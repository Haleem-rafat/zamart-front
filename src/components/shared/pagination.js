import React from "react";
import { Pagination } from "semantic-ui-react";
import useFilter from "../../hooks/use-filter";

const PaginationApp = ({ totalPages, totalItem }) => {
  const [page, setPage] = useFilter("page", "1");
  const [perpage, setPerPage] = useFilter("perPage", `${totalItem}`);
  return (
    <Pagination
      className="edit_Pag"
      defaultActivePage={1}
      firstItem={null}
      lastItem={null}
      ellipsisItem={null}
      pointing
      secondary
      totalPages={totalPages}
      onPageChange={(e, data) => setPage(data?.activePage)}
    />
  );
};

export default PaginationApp;
