import { BasicField, Flex, Table, TableBody, SelectRow, TableCell, useTableGlobalFilter, useTableSort } from '@axonivy/ui-components';

import { useAppContext } from '../../context/AppContext';
import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from '@tanstack/react-table';
import { type Decision } from '@axonivy/rule-editor-protocol';

export const Main = () => {
  const { data } = useAppContext();
  const decisions = data?.decisions ?? [];

  //   const selection = useTableSelect<Decision>({
  //     onSelect: selectedRows => {
  //       const selectedRowIndex = Object.keys(selectedRows).find(key => selectedRows[key]);
  //       if (selectedRowIndex === undefined) {
  //         setSelectedIndex(-1);
  //         return;
  //       }
  //       setSelectedIndex(Number(selectedRowIndex));
  //     }
  //   });
  const globalFilter = useTableGlobalFilter();
  const sort = useTableSort();
  const columns: ColumnDef<Decision, string>[] = [
    {
      accessorKey: 'name',
      header: () => <span>NAME</span>,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          <span>{cell.getValue()}</span>
        </Flex>
      )
      //   cell: ({ row }) => <div>{row.getValue('name')}</div>
    }
    // {
    //   accessorKey: 'description',
    //   header: ({ column }) => <SortableHeader column={column} name='DECISION DESCRIPTION' />,
    //   cell: cell => <span>{cell.getValue()}</span>
    // },
    // {
    //   accessorKey: 'description',
    //   header: ({ column }) => <SortableHeader column={column} name='' />,
    //   cell: cell => <span>{cell.getValue()}</span>
    // },
    // {}
  ];

  const table = useReactTable<Decision>({
    ...globalFilter.options,
    ...sort.options,
    data: decisions,
    columns: columns,
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <Flex direction='column' className='h-full overflow-auto'>
      <BasicField tabIndex={-1} className='m-3 min-h-0' label={'Decisions'} onClick={event => event.stopPropagation()}>
        {globalFilter.filter}
        <div className='overflow-x-hidden'>
          <Table>
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
