import {
  BasicField,
  Button,
  dataTableHelper,
  deleteFirstSelectedRow,
  Flex,
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
  useTableKeyHandler
} from '@axonivy/ui-components';

import { type Decision } from '@axonivy/rule-editor-protocol';
import { IvyIcons } from '@axonivy/ui-icons';
import { flexRender, useTable } from '@tanstack/react-table';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
import { useKnownHotkeys } from '../../utils/useKnownHotkeys';

const { columnHelper, tableOptions } = dataTableHelper<Decision>();

export const Main = () => {
  const { t } = useTranslation();
  const { data, setData, setSelectedIndex, detail, setDetail } = useAppContext();

  const decisions = useMemo(() => data?.decisions ?? [], [data]);

  const columns = columnHelper.columns([
    columnHelper.accessor('name', {
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.labelDecision')} />,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          <span>{cell.getValue()}</span>
        </Flex>
      )
    }),
    columnHelper.accessor('when', {
      header: ({ column }) => <SortableHeader column={column} name={t('common.label.labelConditions')} />,
      cell: cell => (
        <Flex alignItems='center' gap={1}>
          <span>
            {cell
              .getValue()
              .map(condition => condition.field)
              .filter(Boolean)
              .join(', ')}
          </span>
        </Flex>
      )
    })
  ]);

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

  const addRule = () => {
    setData(old => {
      const newDecision = { name: '', then: [], when: [] };
      return { ...old, decisions: [...old.decisions, newDecision] };
    });
  };

  const deleteRule = () =>
    setData(old => {
      const selectedRow = table.getSelectedRowModel().flatRows[0];
      if (!selectedRow) {
        return old;
      }
      const newData = deleteFirstSelectedRow(table, old.decisions).newData;
      return { ...old, decisions: newData };
    });

  const hotkeys = useKnownHotkeys();
  const ref = useHotkeys<HTMLDivElement>(hotkeys.deleteRule.hotkey, () => deleteRule(), { scopes: ['global'] });
  const firstElementRef = useRef<HTMLDivElement>(null);
  useHotkeys(hotkeys.focusMain.hotkey, () => firstElementRef.current?.focus(), { scopes: ['global'] });

  return (
    <Flex
      direction='column'
      ref={ref}
      onClick={() => {
        table.resetRowSelection();
      }}
      className='h-full overflow-auto'
    >
      <BasicField
        tabIndex={-1}
        ref={firstElementRef}
        className='m-3 min-h-0'
        control={<Controls addRule={addRule} deleteRule={table.getSelectedRowModel().flatRows.length > 0 ? deleteRule : undefined} />}
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

const Controls = ({ addRule, deleteRule }: { addRule: () => void; deleteRule?: () => void }) => {
  const hotkeys = useKnownHotkeys();
  return (
    <Flex gap={2}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button icon={IvyIcons.Plus} onClick={addRule} aria-label={hotkeys.addRule.label} />
          </TooltipTrigger>
          <TooltipContent>{hotkeys.addRule.label}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
