import {useState, useEffect, useRef} from 'react';
import FilterIcon from '../assets/filter-solid.svg';

function FilterOptions( {onClose} ) {
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
            <img src={FilterIcon} width="15" alt='Options'></img>
        </div>

        {isOpen && (
            <div className="options" ref={menuRef}>
                <div className="option" onClick={(event) => {
                    onClose("Active");
                    setIsOpen(!isOpen);
                    event.stopPropagation();
                }}>
                    Active
                </div>
                <div className="option" onClick={(event) => {
                    onClose("Pending");
                    setIsOpen(!isOpen);
                    event.stopPropagation();
                }}>
                    Pending
                </div>
                <div className="option" onClick={(event) => {
                    onClose("Ready");
                    setIsOpen(!isOpen);
                    event.stopPropagation();
                }}>
                    Ready
                </div>
            </div>)}
    </div>)
}

export default FilterOptions;