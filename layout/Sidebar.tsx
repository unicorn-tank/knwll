import { PropsWithChildren, ReactElement } from 'react';
import useSidebarStyles, { SidebarClasses } from './useSidebarStyles';

export type SidebarProps = {
    space?: string,
    sideWidth?: string
  
}

function Sidebar(
    {
        space='0',
        sideWidth='30rem',
        children
    }: PropsWithChildren<SidebarProps> ): ReactElement {

        const useStyles: SidebarClasses = useSidebarStyles({ space, sideWidth });

        return <div className={useStyles.div}>{children}</div>
}


export default Sidebar;