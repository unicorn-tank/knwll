import Head from 'next/head';

export default function MetaTags({ title, description="", image =null}) {
    return (
        <>
            
            <title>{title}</title>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content="@knwll" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="description" content="Ask questions, check the answer. Questions and answers repositorium will feed your any quiz request." />
 
        </>
    )
}