import { PropsWithChildren, ReactElement } from 'react';
import useStackStyles, { StackClasses } from './useStackStyles';

export type StackProps = {
    space?: string,
    isBorder?: boolean
}

function Stack(
    {
        space = '0.5rem',
        isBorder = false,
        children
    }: PropsWithChildren<StackProps> ): ReactElement {

        const useStyles: StackClasses = useStackStyles({ space, isBorder });

        return <div className={useStyles.div}>{children}</div>
}

export default Stack;