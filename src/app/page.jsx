"use client";

import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPokemon } from "@/utils/fetchPokemon";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "url", headerName: "URL", width: 200 },
];

export default function Page() {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 100,
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const result = await fetchPokemon(
        paginationModel.page + 1,
        paginationModel.pageSize,
        pageState.search
      );
      setPageState((old) => ({
        ...old,
        isLoading: false,
        data: result.data,
        total: result.total,
      }));
    };

    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, pageState.search]);

  const handleSearchChange = (event) => {
    setPageState((old) => ({ ...old, search: event.target.value }));
    setPaginationModel((old) => ({ ...old, page: 0 }));
  };

  const handlePageChange = (params) => {
    setPaginationModel((old) => ({ ...old, page: params.page }));
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        value={pageState.search}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        columns={columns}
        rows={pageState.data}
        rowCount={pageState.total}
        loading={pageState.isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePageChange}
      />
    </div>
  );
}
