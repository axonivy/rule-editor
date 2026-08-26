import {
  BasicField,
  Button,
  dataTableHelper,
  deleteFirstSelectedRow,
  Flex,
  selectRow,
  SelectRow,
  SortableHeader,
  Table,
  TableBody,
  TableCell,
  TableGlobalFilter,
  TableResizableHeader,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
  useHotkeys,
  useTableKeyHandler,
  type DataTableFeatures
} from '@axonivy/ui-components';

import { type Decision } from '@axonivy/rule-editor-protocol';
import { flexRender, useTable, type ReactTable } from '@tanstack/react-table';
import { useAppContext } from '../../context/AppContext';
import { useMemo, useEffect, useRef } from 'react';
import { useKnownHotkeys } from '../../utils/useKnonwHotkeys';
import { IvyIcons } from '@axonivy/ui-icons';
import { t } from 'i18next';

const { columnHelper, tableOptions } = dataTableHelper<Decision>();

export const Main = () => {
  const { data, setData, setSelectedIndex, detail, setDetail } = useAppContext();

  const decisions = useMemo(() => data?.decisions ?? [], [data]);

  const columns = useMemo(
    () =>
      columnHelper.columns([
        columnHelper.accessor('name', {
          header: ({ column }) => <SortableHeader column={column} name='NAME' />,
          cell: cell => (
            <Flex alignItems='center' gap={1}>
              <span>{cell.getValue()}</span>
            </Flex>
          )
        })
      ]),
    []
  );

  const table = useTable({
    ...tableOptions,
    data: decisions,
    columns
  });

  useEffect(() => {
    const subscription = table.atoms.rowSelection.subscribe(selectedRows => {
      const selectedRowIndex = Object.keys(selectedRows).find(key => selectedRows[key]);
      if (selectedRowIndex === undefined) {
        setSelectedIndex(-1);
        return;
      }
      setSelectedIndex(Number(selectedRowIndex));
    });
    return () => subscription.unsubscribe();
  }, [table, setSelectedIndex]);

  const { handleKeyDown } = useTableKeyHandler({
    table,
    data: decisions
  });

  const deleteRule = () =>
    setData(old => {
      const selectedRow = table.getSelectedRowModel().flatRows[0];
      if (!selectedRow) {
        return old;
      }
      const newData = deleteFirstSelectedRow(table, old.decisions).newData;
      return { ...old, decisions: newData };
    });

  const resetSelection = () => {
    selectRow(table);
  };

  const hotkeys = useKnownHotkeys();
  const ref = useHotkeys<HTMLDivElement>(hotkeys.deleteRule.hotkey, () => deleteRule(), { scopes: ['global'] });
  const firstElementRef = useRef<HTMLDivElement>(null);
  useHotkeys(hotkeys.focusMain.hotkey, () => firstElementRef.current?.focus(), { scopes: ['global'] });

  return (
    <Flex direction='column' ref={ref} onClick={resetSelection} className='h-full overflow-auto'>
      <BasicField
        tabIndex={-1}
        ref={firstElementRef}
        className='m-3 min-h-0'
        label={t('label.editorTitle')}
        control={<Controls table={table} deleteRule={table.getSelectedRowModel().flatRows.length > 0 ? deleteRule : undefined} />}
        onClick={event => event.stopPropagation()}
      >
        <TableGlobalFilter table={table} />
        <div className='overflow-x-hidden'>
          <Table onKeyDown={e => handleKeyDown(e, () => setDetail(!detail))}>
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

const Controls = ({ table, deleteRule }: { table: ReactTable<DataTableFeatures, Decision>; deleteRule?: () => void }) => {
  const hotkeys = useKnownHotkeys();
  return (
    <Flex gap={2}>
      {/* TODO: Add "Add Rule" dialog/button here. Might simply be a button, not a full dialog? Uses the table prop*/}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button icon={IvyIcons.Trash} onClick={deleteRule} disabled={deleteRule === undefined} aria-label={hotkeys.deleteRule.label} />
          </TooltipTrigger>
          <TooltipContent>{hotkeys.deleteRule.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Flex>
  );
};
