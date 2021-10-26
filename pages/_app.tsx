import TagManager from 'react-gtm-module';

import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';

import { useUserData } from '../lib/hooks';
import { useEffect } from 'react';

const tagManagerArgs = {
  id: 'GTM-NBLWQ92'
}

function KNWLLApp({ Component, pageProps }) {

  const userData = useUserData();

  useEffect(() => {
    TagManager.initialize(tagManagerArgs);
  },[])

  return (
    <UserContext.Provider value={userData}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  )
}

export default KNWLLApp
