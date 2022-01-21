import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { CoverProps } from './Cover';

export type CoverClassNames = 'div' | 'section';
export type CoverStyles = Styles<CoverClassNames>;
export type CoverClasses = Classes<CoverClassNames>;
export type CoverTypeProps = CoverProps;

const getStyles: CoverStyles = {
    div: (data: CoverTypeProps) => ({
        display: 'flex',
        flexDirection: 'column',
        minBlockSize: '100vh',
        padding: '1rem',
        backgroundColor: '#eee',
        
        '& > *': {
            marginBlock: '1rem'
        },

        [`& > ${data.centeredElement}`]: {
            marginBlock: 'auto'
        },


        [`& > :first-child:not(${data.centeredElement})`]: {
            marginInlineStart: 0
        },

        [`& > :last-child:not(${data.centeredElement})`]: {
            marginInlineEnd: 0
        },     
 
    }),
    section: {}
}

const useCoverStyles: 
    (data?: any) => CoverClasses = createUseStyles<CoverClassNames>(getStyles);

export default useCoverStyles;