import { Styles, Classes } from 'jss';
import { createUseStyles } from 'react-jss';
import { ClusterProps } from './Cluster';
import { globalBorderStyle } from '../styles/globalStyles';

export type ClusterClassNames = 'div' | 'section';
export type ClusterStyles = Styles<ClusterClassNames>;
export type ClusterClasses = Classes<ClusterClassNames>;
export type ClusterTypeProps = ClusterProps;

const lightColor2 = 'rgba(255, 0, 0, .05)';

const getStyles: ClusterStyles = {
    div: (data: ClusterTypeProps) => ({
        display: 'flex',
        flexDirection: 'row', 
        flexWrap: 'flex-wrap',
        gap: data.space,
        justifyContent: data.justifyContent,
        alignItems: 'center',

        backgroundColor: data.isBackground ? lightColor2 : 'none',

        border: data.isBorder ? {
            ...globalBorderStyle
          } : { 
            width: 0,
            style: 'none' 
        }
    }),
    section: {}
}

const useClusterStyles: 
    (data?: any) => ClusterClasses = createUseStyles<ClusterClassNames>(getStyles);

export default useClusterStyles;