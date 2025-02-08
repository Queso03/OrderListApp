import React from 'react';
import OptionsLogo from '../assets/ellipsis-solid.svg';
import {useState, useEffect, useRef} from 'react';


function OrderOptions({ onDelete, onClose }) {
    const [isOpen, setIsOpen] = useState(false);
    const [statusOpen, setStatusOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
          if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
            setStatusOpen(false);
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
                <img src={OptionsLogo} width="20" alt='Options'></img>
            </div>

            {isOpen && (
            <div className='options' ref={menuRef}>
                <div className="option" onClick={(event) => {
                    setIsOpen(!isOpen);
                    setStatusOpen(true);
                    event.stopPropagation();
                }}>Change status</div>
                <div className="option" onClick={(event) => {
                    onDelete();
                    setIsOpen(!isOpen);
                    event.stopPropagation();
                }}>Delete</div>
            </div>
            )}
            {statusOpen && (            
                <div className='status-options' ref={menuRef}>
                    <div onClick={(event) => {event.stopPropagation();}}>
                        <div className="Completed" onClick={(event) => {
                                onClose("Completed");
                                setStatusOpen(false);
                                event.stopPropagation();
                            }}>Completed</div>
                    </div>

                    <div onClick={(event) => {event.stopPropagation();}}>
                        <div className="Ready" onClick={(event) => {
                            onClose("Ready");
                            setStatusOpen(false);
                            event.stopPropagation();
                        }}>Ready</div>
                    </div>

                    <div onClick={(event) => {event.stopPropagation();}}>
                        <div className="Pending" onClick={(event) => {
                            onClose("Pending");
                            setStatusOpen(false);
                            event.stopPropagation();
                        }}>Pending</div>
                    </div>




                </div>
        )}
        </div>

    );
}

export default OrderOptions;