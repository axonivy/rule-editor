import { Button, SidebarHeader, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@axonivy/ui-components';
import { IvyIcons } from '@axonivy/ui-icons';
import { useTranslation } from 'react-i18next';
import { useAppContext } from '../../context/AppContext';
// import { DetailContent } from './DetailContent';

export const Sidebar = ({ ref }: { ref: React.Ref<HTMLDivElement> }) => {
  const { data, selectedIndex } = useAppContext();
  const rule = data.decisions[selectedIndex];
  const { t } = useTranslation();

  return (
    <>
      <SidebarHeader title={rule?.name ?? t('title.detail')} icon={IvyIcons.PenEdit} ref={ref} tabIndex={-1}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {/* TODO: Open URL to help link */}
              <Button icon={IvyIcons.Help} />
            </TooltipTrigger>
            {/* eslint-disable-next-line i18next/no-literal-string */}
            <TooltipContent>TODO: Implement 'Open URL' action</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </SidebarHeader>
      {/* <DetailContent /> */}
    </>
  );
};
