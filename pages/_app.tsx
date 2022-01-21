import TagManager from 'react-gtm-module';

//import '../styles/globals2.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';

import { useUserData } from '../lib/hooks';
import { useEffect } from 'react';

//import useSheet from 'react-jss';
import { JssProvider } from 'react-jss';
import globalSetupJss from '../styles/globalSetupJss';

import Stack from '../layout/Stack';

const sheets = globalSetupJss();

const tagManagerArgs = {
  id: 'GTM-NBLWQ92'
}

function KNWLLApp({ Component, pageProps }) {

  const userData = useUserData();

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  }, [])

  return (
    <JssProvider registry={sheets}>
      <UserContext.Provider value={userData}>

        <Navbar />
        <Component {...pageProps} />


        <Toaster />
      </UserContext.Provider>
    </JssProvider>
  )
}

export default KNWLLApp
