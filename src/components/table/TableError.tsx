"use client";

import React from 'react'

import { TableRow, TableCell } from '@/components/ui/table'

type Props = {
  error: string
}

const TableError = ({error}: Props) => {
  return (
    <TableRow className="hover:bg-transparent">
    <TableCell
      colSpan={7}
      className="text-sm text-center w-full pt-0 text-rose-600 font-medium"
    >
      {error}
    </TableCell>
  </TableRow>
)}
  

export default TableError