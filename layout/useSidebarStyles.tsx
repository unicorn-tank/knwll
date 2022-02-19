import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { SidebarProps } from './Sidebar';

export type SidebarClassNames = 'div' | 'section';
export type SidebarStyles = Styles<SidebarClassNames>;
export type SidebarClasses = Classes<SidebarClassNames>;
export type SidebarTypeProps = SidebarProps;

const getStyles: SidebarStyles = {
    div: (data: SidebarTypeProps) => ({
           display: 'flex',
           flexWrap: 'flex-wrap',
           gap: data.space,

           '& > :last-child' : {
               flexBasis: data.sideWidth,
               flexGrow: 1,
               alignItem: 'flex-start'
           },

           '& > :first-child' : {
                flexBasis: 0,
                flexGrow: 999,
                minInlineSize: '50%'
           }
 
    }),
    section: {}
}

const useSidebarStyles: 
    (data?: any) => SidebarClasses = createUseStyles<SidebarClassNames>(getStyles);

export default useSidebarStyles;