"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPokemon } from "@/app/actions/fetchPokemon";
import { PageState } from "@/types/pageState";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "url", headerName: "URL", width: 200 },
];

export default function Page() {
  const [paginationModel, setPaginationModel] = useState<PageState>({
    page: 0,
    pageSize: 10,
    isLoading: false,
    data: [],
    total: 100,
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPaginationModel((old) => ({ ...old, isLoading: true }));
      const result = await fetchPokemon(
        paginationModel.page + 1,
        paginationModel.pageSize,
        paginationModel.search
      );
      setPaginationModel((old) => ({
        ...old,
        isLoading: false,
        data: result.data,
        total: result.total,
      }));
    };

    fetchData();
  }, [paginationModel.page, paginationModel.pageSize, paginationModel.search]);

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPaginationModel((old) => ({ ...old, search: event.target.value }));
    setPaginationModel((old) => ({ ...old, page: 0 }));
  };

  const handlePageChange = (params: any) => {
    setPaginationModel((old) => ({ ...old, page: params.page }));
  };

  return (
    <div style={{ height: 700, width: "100%" }}>
      <input
        type="text"
        placeholder="Search"
        value={paginationModel.search}
        onChange={handleSearchChange}
        style={{ marginBottom: 16 }}
      />
      <DataGrid
        columns={columns}
        rows={paginationModel.data}
        rowCount={paginationModel.total}
        loading={paginationModel.isLoading}
        pageSizeOptions={[5]}
        paginationModel={paginationModel}
        paginationMode="server"
        onPaginationModelChange={handlePageChange}
      />
    </div>
  );
}
