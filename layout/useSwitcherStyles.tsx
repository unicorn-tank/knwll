import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { SwitcherProps } from './Switcher';
import { globalBorderStyle } from '../styles/globalStyles';

export type SwitcherClassNames = 'div' | 'section';
export type SwitcherStyles = Styles<SwitcherClassNames>;
export type SwitcherClasses = Classes<SwitcherClassNames>;
export type SwitcherTypeProps = SwitcherProps;

const getStyles: SwitcherStyles = {
    div: (data: SwitcherTypeProps) => ({

        display: 'flex',
        flexWrap: 'wrap',
        gap: data.space,

        '& > *': {
            
            flexGrow: 1,
            flexBasis: `calc(( ${data.threshold} - 100%) * 999)`

        },

        [`& > :nth-last-child(n+ ${data.limit} + 1)`]: {
            flexBasis: '100%'
        },
        [`& > :nth-last-child(n+ ${data.limit} + 1) ~ *`]: {
            flexBasis: '100%'
        },

        border: data.isBorder ? {
            ...globalBorderStyle
          } : { 
            width: 0,
            style: 'none' 
        }
   
    }),

    section: {}
}

const useSwitcherStyles: 
    (data?: any) => SwitcherClasses = createUseStyles<SwitcherClassNames>(getStyles);

export default useSwitcherStyles;