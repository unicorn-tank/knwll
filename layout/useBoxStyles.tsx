import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { BoxProps } from './Box';
import { globalBorderStyle } from '../styles/globalStyles';

export type BoxClassNames = 'div' | 'section';
export type BoxStyles = Styles<BoxClassNames>;
export type BoxClasses = Classes<BoxClassNames>;
export type BoxTypeProps = BoxProps;


const lightColor = '#fff';
const lightColor2 = 'rgba(255, 0, 0, .05)';
const darkColor = '#000'

const getStyles: BoxStyles = {
    div: (data: BoxTypeProps) => ({

        padding: data.space,
        color: darkColor,
        backgroundColor: lightColor2,

        border: data.isBorder ? {
            ...globalBorderStyle
          } : { 
            width: 0,
            style: 'none'

        }
 
    }),
    section: {}
}

const useBoxStyles: 
    (data?: any) => BoxClasses = createUseStyles<BoxClassNames>(getStyles);

export default useBoxStyles;