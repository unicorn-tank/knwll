import React, { useEffect, useRef, useState } from 'react';

import algoliasearch from 'algoliasearch/lite';

import { InstantSearch, Configure } from 'react-instantsearch-dom';
import { CustomInfiniteHits } from '@components/search/CustomInfiniteHits';
import qs from 'qs';



const searchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
    process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_API_KEY);

const createURL = state => `?${qs.stringify(state)}`;

const searchStateToURL = (location, searchState) =>
  searchState ? `${location.pathname}?${qs.stringify(searchState)}` : "";

const pathToSearchState = path =>
  path.includes("?") ? qs.parse(path.substring(path.indexOf("?") + 1)) : {};

const updateAfter = 15;


export default function Search({questionsCount, props}) {


  const { router, page, seoProps, ...restProps } = props;

  const setStateId = useRef(null);

  const [searchState, setSearchState] = useState(
    pathToSearchState(router.asPath)
  );

  const onSearchStateChange = nextSearchState => {
    clearTimeout(10);

    setStateId.current = setTimeout(() => {
      const href = searchStateToURL(router, nextSearchState);

      props.router.push(href, href, {
        shallow: true
      });

      setSearchState(nextSearchState);

    }, updateAfter);
  };

    return (
        <>
            <InstantSearch
                searchClient={searchClient}
                indexName="questions_answers"
                searchState={searchState}
                resultsState={restProps.resultsState}
                onSearchStateChange={onSearchStateChange}
                createURL={createURL}>
                
                  <Configure hitsPerPage={restProps.hitsPerPage || 15} />
                  <CustomInfiniteHits questionsCount = {questionsCount}/>
       
            </InstantSearch>


        </>
    )
}


  