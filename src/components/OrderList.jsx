import {useEffect, useState} from 'react';
import List from './List';
import OrderOptions from './OrderOptions';
import FilterOptions from './FilterOptions';
import SortOptions from './SortOptions';
import TrashIcon from '../assets/trash-solid.svg';

export default function OrderList() {
    const [list, setList] = useState([]);
    const [auxList, setAuxList] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderSelected, setOrderSelected] = useState(null);
    const [title, setTitle] = useState('');
    const [filter, setFilter] = useState('Active');
    const [sort, setSort] = useState('Date');
    
    useEffect(() => {
        const data = localStorage.getItem('orders');
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                if (Array.isArray(parsedData)) {
                    setList(parsedData);
                } else {
                    setList([]);
                }
            } catch (error) {
                setList([]);
            }
        }
    }, []);

    useEffect(() => {
        if (list.length > 0)
            localStorage.setItem('orders', JSON.stringify(list));
    }, [list]);

    useEffect(() => {
        if (orderSelected) {
            setIsModalOpen(true);
        }
    }, [orderSelected]);

    useEffect(() => { 
        let filteredList = filter === 'Active' ? list.filter(order => order.status !== "Completed") : list.filter(order => order.status === filter);
        
        let sortedList = [...filteredList];
    
        if (sort === 'Date') {
            sortedList.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sort === 'Subtotal') {
            sortedList.sort((b, a) => {
                const subtotalA = a.products.reduce((acc, product) => acc + product.amount * product.price, 0);
                const subtotalB = b.products.reduce((acc, product) => acc + product.amount * product.price, 0);
                return subtotalA - subtotalB;
            });
        }

        setAuxList(sortedList);
    }, [filter, sort, list]); 
    


    function handleChange(event, setType) {
        const newInput = event.target.value;
        setType(newInput);
    }

    function handleSubmit() {
        if (!title) {
            alert('Please enter a name');
            return};
        const newOrder = {id : crypto.randomUUID(), name: title, status: "Pending", phone: '', address: '', date: new Date().toISOString().split("T")[0], products: []};
        setList([...list, newOrder]);
        setTitle('');
        setOrderSelected(newOrder);
    }

    function handleDelete(id) {
        setList(list.filter((order) => order.id !== id));
    }

    return (
    <>
        
        <h1>Active Orders</h1>
        <div className='add-customer'>
            <input type="text" placeholder="Enter customer name" onChange={(event) => handleChange(event, setTitle)} value={title}></input>
            <button onClick={() => {handleSubmit()}}>Add order</button>
        </div>
        


        <div className='customer-list'>
            <div className='customer-header'>
                <h4>Name</h4>
                <h4>Date</h4>
                <h4>Status</h4>
                <h4>Subtotal</h4>
                <div className='filter-sort-container'>
                    <FilterOptions onClose={(updatedFilter) => setFilter(updatedFilter)}/>
                    <SortOptions onClose={(updatedSort) => setSort(updatedSort)}/>
                </div>
            </div>

            {auxList.length === 0 ? <p className="no-orders" >No {filter} orders</p> :
            auxList.map((order) => {
                return (
                    <>
                        <div className='customer' onClick={() => {
                            setOrderSelected(order);
                            }}>

                            <div className='customer-info'>
                                <p>{order.name}</p>
                                <h6>{order.address}</h6> 
                            </div>

                            <div className='customer-info'>
                                {order.date}
                            </div>

                            <div className='customer-info'>
                                <div className={order.status}>
                                    {order.status}
                                </div>
                            </div>

                            <div className='customer-info'>
                                {Math.round(order.products.reduce((acc, product) => acc + product.amount * product.price, 0) * 100) / 100}$
                            </div>
                            <OrderOptions onDelete={() => {handleDelete(order.id)}} order={order} onClose={(updatedStatus) => {
                                setList(prevList => prevList.map(o => o.id === order.id ? {...order, status: updatedStatus} : o))
                            }}/>
                        </div>
                    </>
)
            })}
        </div>
        
        {orderSelected && <List order={orderSelected} isOpen={isModalOpen} onClose={(updatedOrder) => {
            setList(prevList => prevList.map(o => o.id === updatedOrder.id ? updatedOrder : o));
            setIsModalOpen(false);
            setOrderSelected(null);
        }} />}



        <h1>Completed Orders</h1>
        <div className='customer-list'>
            <div className='customer-header'>
                <h4>Name</h4>
                <h4>Date</h4>
                <h4>Status</h4>
                <h4>Subtotal</h4>
                <div className='delete-completed-button' onClick={() => {setList(list.filter((order) => order.status !== "Completed"))}}>
                    <img src={TrashIcon} width="15" alt='Delete all' onClick={() => {} }></img>
                </div>

                
            </div>
        
        
        {list.filter((order) => order.status === "Completed").length === 0 ? <p className="no-orders">No completed orders</p> :
        list.map((order) => {
                return (
                    <>
                        {order.status === "Completed" && <div className='customer' onClick={() => {
                            setOrderSelected(order);
                            }}>

                            <div className='customer-info'>
                                <p>{order.name}</p>
                                <h6>{order.address}</h6> 
                            </div>

                            <div className='customer-info'>
                                {order.date}
                            </div>

                            <div className='customer-info'>
                                <div className={order.status}>
                                    {order.status}
                                </div>
                            </div>

                            <div className='customer-info'>
                                {Math.round(order.products.reduce((acc, product) => acc + product.amount * product.price, 0) * 100) / 100}$
                            </div>
                            <OrderOptions onDelete={() => {handleDelete(order.id)}} order={order} onClose={(updatedStatus) => {
                                setList(prevList => prevList.map(o => o.id === order.id ? {...order, status: updatedStatus} : o))
                            }}/>
                        </div>}
                    </>
)
            })}
            </div>
    </>

    )
}