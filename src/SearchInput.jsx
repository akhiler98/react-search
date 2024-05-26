import React, { useEffect, useState } from 'react'
import './SearchInput.css';


function SearchInput() {
  const corsProxy = 'https://api.allorigins.win/get?url=';   //Used this because https method not supported for fetching data
  
    const[searchText,setSearchText] = useState('')
    const[searchResult,setSearchResult] = useState([])
    // console.log(searchText);

    
    const fetchSearch = async()=>{ 
      const apiUrl = `http://16.171.5.90/public/api/searchtext/${searchText}`; 
        // const response = await fetch(`http://www.searchengine.test/api/searchtext/${searchText}`);
        const response = await fetch(`${corsProxy}${encodeURIComponent(apiUrl)}`);
        const data = await response.json()
        const result = JSON.parse(data.contents); //for converting json string in to javascript objects
        setSearchResult(result.items)
        // console.log(result);
       
      }

      const handleSave = () => {
        const fileData = JSON.stringify(searchResult, null, 2);
        const blob = new Blob([fileData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${searchText}.json`;
        link.click();
    };


  return (
    <div className= 'mainContainer'>
        <div className= {searchResult.length >1 ? 'mainContainer-headNone' : 'mainContainer-head'}>
            <h1 className={ searchResult.length>1 ?'mainContainer-head_none' : 'mainContainer-head_title'}>Search Engine</h1>
             <div className={ searchResult.length>1 ?'mainContainer-head_inputNone': 'mainContainer-head_input'}>
            <input className='inputField' placeholder='search...' value={searchText} type="text" onChange={(e)=>{setSearchText(e.target.value)}} />
            <button className='button' onClick={fetchSearch}>search</button>
            {
               searchResult.length > 1 ?  
            <button className='button-save' onClick={handleSave}>Save Results</button>
            : " "
            }
            </div>
        </div>

        
             <div className='mainContainer-results'>
            {
        searchResult.map(item=>{
         
          return(
            <>
             <div>
               <a className='mainContainer-results_title' href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
               <p>{item.snippet}</p>
               <a className='mainContainer-results_link' href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a>
             </div>
            
            </>
            )
          })
            }
            </div> 
        
    </div>
  )
}

export default SearchInput