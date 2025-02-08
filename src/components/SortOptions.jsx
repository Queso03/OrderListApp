import React from 'react';
import {useState, useEffect, useRef} from 'react';
import SortIcon from '../assets/sort-solid.svg';

function SortOptions( {onClose} ) {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
          }
        }
    
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
      }, []);

    return (
        <div className='options-container'>
            <div className='options-button' onClick={(event) => {
                setIsOpen(!isOpen);
                event.stopPropagation();
            }}>
                <img src={SortIcon} width="15" alt='Options'></img>
            </div>

            {isOpen && (
                <div className='options' ref={menuRef}>
                    <div className='option' onClick={(event) => {
                        onClose("Date");
                        setIsOpen(!isOpen);
                        event.stopPropagation();
                    }}>Date
                    </div>
                    <div className='option' onClick={(event) => {
                        onClose("Subtotal");
                        setIsOpen(!isOpen);
                        event.stopPropagation();
                    }}>Subtotal
                    </div>
                </div>)}
        </div>
    );
};

export default SortOptions;