import {
  BasicField,
  dataTableHelper,
  Flex,
  SelectRow,
  SortableHeader,
  Table,
  TableBody,
  TableCell,
  TableGlobalFilter,
  TableResizableHeader
} from '@axonivy/ui-components';

import { type Decision } from '@axonivy/rule-editor-protocol';
import { flexRender, useTable } from '@tanstack/react-table';
import { useAppContext } from '../../context/AppContext';

const { columnHelper, tableOptions } = dataTableHelper<Decision>();

export const Main = () => {
  const { data } = useAppContext();
  const decisions = data?.decisions ?? [];

  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: ({ column }) => <SortableHeader column={column} name='NAME' />,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          <span>{cell.getValue()}</span>
        </Flex>
      )
    }),
    columnHelper.accessor('description', {
      header: ({ column }) => <SortableHeader column={column} name='DESCRIPTION' />,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          <span>{cell.getValue()}</span>
        </Flex>
      )
    })
  ]);

  const table = useTable<Decision>({
    ...tableOptions,
    data: decisions,
    columns
  });

  return (
    <Flex direction='column' className='h-full overflow-auto'>
      <BasicField tabIndex={-1} className='m-3 min-h-0' label={'DECISIONS'} onClick={event => event.stopPropagation()}>
        <TableGlobalFilter table={table} />
        <div className='overflow-x-hidden'>
          <Table>
            <TableResizableHeader headerGroups={table.getHeaderGroups()} />
            <TableBody>
              {table.getRowModel().rows.map(row => (
                <SelectRow key={row.id} row={row}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} style={{ width: cell.column.getSize() }}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </SelectRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </BasicField>
    </Flex>
  );
};
