import { connectSearchBox } from 'react-instantsearch-dom';

//import { ReactComponent as StartIcon } from '@zendeskgarden/svg-icons/src/16/search-stroke.svg';

const CustomSeacthBox = ({ refine }) => (

    <input                
        id="algolia_search" 
        type="search"
        onChange={(e) => refine(e.currentTarget.value)}
                    
        />
 
)

export default connectSearchBox(CustomSeacthBox);