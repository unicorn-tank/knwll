import { PropsWithChildren, ReactElement } from 'react';
import useSwitcherStyles, { SwitcherClasses } from './useSwitcherStyles';

// Limit
// The maximum number of elements allowed to appear in the horizontal configuration
export type SwitcherProps = {
    threshold?: string,
    space?: string,
    limit?: number,
    isBorder?: boolean
}

function Switcher(
    {
        threshold = '30rem',
        space,
        limit = 2,
        isBorder = false,
        children
        
    }: PropsWithChildren<SwitcherProps> ): ReactElement {

        const useStyles: SwitcherClasses = useSwitcherStyles({ space, isBorder });

        return <div className={useStyles.div}>{children}</div>
}

export default Switcher;