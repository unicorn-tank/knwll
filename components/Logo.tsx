import Image from 'next/image';
import Link from 'next/link';
import logoImage from '../public/knwl-main-logo-white.png';
import injectSheet from 'react-jss';
import Cluster from '../layout/Cluster';

const styles = {
    logo: {
      
        '&:hover' : {
            filter: 'invert(100%)',
  
        },
        cursor: 'pointer'
    },
    logoText: {
        '&:hover' : {
            color: '#fff',
            backgroundColor: '#000'
  
        },
        cursor: 'pointer'
    }

 
  };
  
// alt='{ kwll logo }'
// background: 'url("knwll-main-logo-black.png")',
// backgroundSize: [65, 65],
// backgroundRepeat: 'no-repeat',

const Logo = injectSheet(styles)(({ classes }) => (
  <Cluster justifyContent='space-between' isBorder={false}>
    <Link href="/">
        <Image className={classes.logo} src={logoImage} width={65} height={65} />
    </Link>  
    <Link href="/">
        <span className={classes.logoText}>#KnowWell</span>
    </Link>
</Cluster>
    
))

export default Logo;
