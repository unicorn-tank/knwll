import Head from 'next/head';

export default function MetaTags({ title, description="", image =null}) {
    return (
        <Head>
            
            <title>{title}</title>        
            
            <meta property="description" content={description} />

            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@knwll" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />    

            <link rel="apple-touch-icon" href="favicon.ico" />
   
            {/* <link rel="apple-touch-icon" href="http://knwll.com/iapple-touch-icon-57x57.png" />
            <link rel="apple-touch-icon" sizes="72x72" href="http://knwll.com/apple-touch-icon-72x72.png" />
            */}
       
        </Head>
    )
}