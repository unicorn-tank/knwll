import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';

const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);

export default function Search() {

    return (
        <>
            <InstantSearch
                searchClient={searchClient}
                indexName="questions_answers">

                    <SearchBox />

                    <Hits />
            
            </InstantSearch>

    
        </>
    )
}