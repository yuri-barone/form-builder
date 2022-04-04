import getTableLocaleText from '@config/tableLocale';
import { Paper } from '@mui/material';
import {
  DataGrid,
  DataGridProps,
  GridColDef,
  GridRowIdGetter,
  GridRowsProp,
  GridSortModel,
} from '@mui/x-data-grid';
import { toJS } from 'mobx';
import React from 'react';

import useTranslation from '@core/hooks/useTranslation';

import CustomFooter from './CustomFooter';
import CustomLoadingOverlay from './CustomLoadingOverlay';
import CustomNoRowsOverlay from './CustomNoRowsOverlay';

export interface MuiTableProps extends DataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  pageSize?: number;
  rowsPerPageOptions?: number[];
  isLoading?: boolean;
  page?: number;
  totalCount?: number;
  onPageChange?: (page: number) => void;
  onSortModelChange?: (model: GridSortModel) => void;
  getRowId?: GridRowIdGetter;
}

export default function MuiTable(props: MuiTableProps) {
  const {
    columns,
    rows,
    page,
    pageSize,
    rowsPerPageOptions,
    totalCount,
    isLoading,
    onPageChange,
    onSortModelChange,
    getRowId,
    ...otherProps
  } = props;
  const { translate } = useTranslation();

  return (
    <Paper elevation={0} sx={{ height: 400 }}>
      <DataGrid
        {...otherProps}
        rows={toJS(rows)}
        columns={columns}
        rowCount={totalCount}
        page={page}
        pageSize={pageSize || 100}
        rowsPerPageOptions={rowsPerPageOptions || [pageSize || 100]}
        localeText={getTableLocaleText(translate)}
        loading={isLoading}
        onPageChange={onPageChange}
        onSortModelChange={onSortModelChange}
        disableSelectionOnClick
        disableColumnFilter
        getRowId={getRowId}
        paginationMode="server"
        sortingMode="server"
        components={{
          Footer: CustomFooter,
          LoadingOverlay: CustomLoadingOverlay,
          NoRowsOverlay: CustomNoRowsOverlay,
          ...otherProps.components,
        }}
      />
    </Paper>
  );
}