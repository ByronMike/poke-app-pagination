"use client";

import React, { useEffect, useState } from "react";
import { Box, AppBar, Toolbar, Typography, Container } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { fetchPokemon } from "../utils/fetchPokemon";

const columns = [
  { field: "name", headerName: "Name", width: 200 },
  { field: "url", headerName: "URL", width: 200 },
];

function App() {
  const [pageState, setPageState] = useState({
    isLoading: false,
    data: [],
    total: 0,
    page: 1,
    pageSize: 10,
    search: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      setPageState((old) => ({ ...old, isLoading: true }));
      const result = await fetchPokemon(
        pageState.page,
        pageState.pageSize,
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
  }, [pageState.page, pageState.pageSize, pageState.search]);

  const handleSearchChange = (event) => {
    setPageState((old) => ({ ...old, search: event.target.value, page: 1 })); // Reset to first page on search change
  };

  const handlePageChange = (newPage) => {
    console.log("click");
    setPageState((old) => ({ ...old, page: newPage + 1 }));
  };

  const handlePageSizeChange = (newPageSize) => {
    console.log("click");

    setPageState((old) => ({ ...old, pageSize: newPageSize, page: 1 })); // Reset to first page on page size change
  };

  return (
    <Box>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" component="div">
            Server-side Pagination demo
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ marginTop: 100, marginBottom: 100 }}>
        <input
          type="text"
          placeholder="Quick filter"
          value={pageState.search}
          onChange={handleSearchChange}
          style={{ marginBottom: 10 }}
        />
        <DataGrid
          autoHeight
          rows={pageState.data}
          rowCount={pageState.total}
          loading={pageState.isLoading}
          rowsPerPageOptions={[10, 30, 50, 70, 100]}
          pagination
          page={pageState.page - 1}
          pageSize={pageState.pageSize}
          paginationMode="server"
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          columns={columns}
        />
      </Container>
    </Box>
  );
}

export default App;
