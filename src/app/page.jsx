"use client";

import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPokemon } from "../utils/fetchPokemon";

export default function Home() {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const result = await fetchPokemon(page, pageSize, search);
      setRows(result.data);
      setRowCount(result.total);
      setLoading(false);
    };

    loadData();
  }, [page, pageSize, search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
    setPage(0); // Reset to first page on search change
  };
  return (
    <div style={{ height: 400, width: "100%" }}>
      <input
        type="text"
        placeholder="Quick filter"
        value={search}
        onChange={handleSearchChange}
        style={{ marginBottom: 10 }}
      />
      <DataGrid
        rows={rows}
        columns={[
          { field: "name", headerName: "Name", width: 200 },
          { field: "url", headerName: "URL", width: 200 },
        ]}
        pagination
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        rowCount={rowCount}
        paginationMode="server"
        onPageChange={(newPage) => setPage(newPage)}
        onPageSizeChange={(newPageSize) => {
          setPageSize(newPageSize);
          setPage(0); // Reset to first page on page size change
        }}
        loading={loading}
      />
    </div>
  );
}
