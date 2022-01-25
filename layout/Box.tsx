import { PropsWithChildren, ReactElement } from 'react';
import useBoxStyles, { BoxClasses } from './useBoxStyles';

export type BoxProps = {
    space?: string,
    isBorder?: boolean,
    isBackground?: boolean;
}

function Box(
    {
        space = '1em',
        isBorder = false,
        isBackground = false,
        children
    }: PropsWithChildren<BoxProps> ): 

            ReactElement {

                const useStyles: BoxClasses = useBoxStyles({ space, isBorder, isBackground });

                return <div className={useStyles.div}>{children}</div>
    }

export default Box;