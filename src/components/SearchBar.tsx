import React from 'react'

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange }: SearchBarProps) => {
  return (
    <div id='search' className='searchBar'>
        <input onChange={onChange} type="text" placeholder={`🔍  Search Coin`} />
    </div>
  )
}

export default SearchBar