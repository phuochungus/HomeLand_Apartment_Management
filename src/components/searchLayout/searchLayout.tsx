import React from 'react'
import Tippy from '@tippyjs/react/headless';
import styles from './searchLayout.module.scss'
import clsx from 'clsx';
import { useState } from 'react';
import { SearchIcon } from '../icons';

const SearchLayout = ({className, placeHolder} : {className?: any, placeHolder:string}) => {
    const [results, setResults] = useState([]);
    const [valueSearch, setValueSearch] = useState('');
  return (
//     <Tippy
//     visible
//     interactive
//     render={(attrs) => (
//         <div className={clsx(styles.tippyWrapper)} {...attrs}>
//             {results.length > 0 && (
//                 <div>
//                     {/* {results.map((result) => (
//                         <SearchItem data={result} />
//                     ))} */}
//                 </div>
//             )}
//         </div>
//     )}
// >
    <div
        className={clsx(styles.search, {
            [`${className}`]: className
        })}
    >
        
        <input
            placeholder={placeHolder}
            value={valueSearch}
            onChange={(e) => {
                if (!e.target.value.startsWith(' ')) {
                    setValueSearch(e.target.value);
                }
            }}
            className={clsx(styles.searchField)}
        />
        <SearchIcon width={'24px'} height={'24px'}/>
        {/* {valueSearch.length > 0 && (
            <FontAwesomeIcon onClick={() => setValueSearch('')} icon={faClose} className={cx('close-icon')} />
        )}   */}
    </div>
// </Tippy>
  )
}

export default SearchLayout