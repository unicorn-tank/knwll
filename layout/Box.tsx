import { PropsWithChildren, ReactElement } from 'react';
import useBoxStyles, { BoxClasses } from './useBoxStyles';

export type BoxProps = {
    space?: string,
    isBorder?: boolean
}

function Box(
    {
        space = '1em',
        isBorder = false,
        children
    }: PropsWithChildren<BoxProps> ): 

            ReactElement {

                const useStyles: BoxClasses = useBoxStyles({ space, isBorder });

                return <div className={useStyles.div}>{children}</div>
    }

export default Box;