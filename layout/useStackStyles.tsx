import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { StackProps } from './Stack';
import { globalBorderStyle } from '../styles/globalStyles';

export type StackClassNames = 'div' | 'section';
export type StackStyles = Styles<StackClassNames>;
export type StackClasses = Classes<StackClassNames>;
export type StackTypeProps = StackProps;

const getStyles: StackStyles = {
    div: (data: StackTypeProps) => ({

        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
 
        '& *': {
            marginTop: 0,
            marginBottom: 0,
        },
        '& * + *': {
            marginTop: data.space,
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

const useStackStyles: 
    (data?: any) => StackClasses = createUseStyles<StackClassNames>(getStyles);

export default useStackStyles;