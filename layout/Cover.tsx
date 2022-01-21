import { PropsWithChildren, ReactElement } from 'react';
import useCoverStyles, { CoverClasses } from './useCoverStyles';

export type CoverProps = {
    centeredElement?: string
}

function Cover(
    {
        centeredElement = 'h1',
        children
    }: PropsWithChildren<CoverProps> ): ReactElement {

        const useStyles: CoverClasses = useCoverStyles({ centeredElement });

        return <div className={useStyles.div}>{children}</div>
}


export default Cover;