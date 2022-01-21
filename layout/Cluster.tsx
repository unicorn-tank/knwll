import { PropsWithChildren, ReactElement } from 'react';
import useClusterStyles, { ClusterClasses } from './useClusterStyles';

export type ClusterProps = {
    justifyContent?: 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly' | 'stretch',
    space?: string;
    isBorder?: boolean;
    isBackground?: boolean;
}

function Cluster(
    {
        justifyContent = 'flex-start',
        space = '1rem',
        isBorder = true,
        isBackground = false,
        children
    }: PropsWithChildren<ClusterProps> ): ReactElement {

        const useStyles: ClusterClasses = useClusterStyles({ justifyContent, space, isBorder, isBackground });

        return <div className={useStyles.div} role='list'>{children}</div>
}


export default Cluster;