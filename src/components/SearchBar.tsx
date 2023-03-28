import React from 'react'

interface SearchBarProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string
}

const SearchBar = ({ onChange, placeholder }: SearchBarProps) => {
  return (
    <div id='search' className='searchBar'>
        <input onChange={onChange} type="text" placeholder={placeholder} />
    </div>
  )
}

export default SearchBar