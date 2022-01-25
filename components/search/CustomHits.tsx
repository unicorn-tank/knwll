import { instantsearch, search, connectHits } from 'react-instantsearch-dom';
//import { connectHits } from 'react-instantsearch-dom';
//import { connectHits } from 'instantsearch.js/es/connectors';

//import search from 'algoliasearch/lite';

 const renderHits = (hits, renderOptions, isFirstRender) => {
    // Render logic
    let { transformItems } = renderOptions;
    transformItems = shuffle;

    return (
        <>

        </>
    )

}

export const ConnectedCustomHits = connectHits(renderHits)

// search.addWidget([
//     customHits()
// ])

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), 
        x = o[--i], o[i] = o[j], o[j] = x)
    return o;
}