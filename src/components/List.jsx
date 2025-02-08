import { useState, useEffect } from "react"
import Modal from "react-modal";
import CloseLogo from '../assets/xmark-solid.svg';
import DeleteIcon from '../assets/trash-solid.svg';
import AddIcon from '../assets/plus-solid.svg';

Modal.setAppElement('#root');

export default function List({ order, isOpen, onClose }) {
    const [title, setTitle] = useState(order.name);
    const [status] = useState(order.status);
    const [phone, setPhone] = useState(order.phone);
    const [address, setAddress] = useState(order.address);

    const [products, setProducts] = useState(order.products);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState('');
    const [price, setPrice] = useState('');
    const [total, setTotal] = useState(0);
    const [date, setDate] = useState(order.date);

    useEffect(() => {        
        let newTotal = 0;
        products.forEach((product) => {
            newTotal += product.price * product.amount;
        });
        setTotal(Math.round(newTotal * 100) / 100);}, [products]);

    if (!order) return null;

    function handleChange(event, setType) {
        const newInput = event.target.value;
        setType(newInput);
    }

    function handleSubmit() {
        if (!name || !amount || !price) return;
        const newProduct = {
            id: crypto.randomUUID(), 
            name: name, 
            amount: parseFloat(amount), 
            price: parseFloat(price)
        };
        setProducts([...products, newProduct]);
        setName('');
        setAmount('');
        setPrice('');
        
    }

    function handleDelete(product) {
        return () => {
            const newProducts = products.filter((p) => p.id !== product.id);
            setProducts(newProducts);

    }}

    function handleClose() {
        onClose({id : order.id, name: title, status: status, phone: phone, address: address, date: date, products: products});
    }


    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        className="modal-content"
        >   
            <div className="modal-header">
                <h2>Order form</h2>
                <img src={CloseLogo} className='close-button' onClick={handleClose} width="20"></img>
            </div>

                
            
            <div className="order-info">
                <span>Name</span>
                <input type="text" onChange={(event) => handleChange(event, setTitle)} value={title} placeholder="Enter name"></input>
            </div>
            <div className="order-info">
                <span>Phone</span>
                <input type="text" onChange={(event) => handleChange(event, setPhone)} value={phone} placeholder="Enter phone"></input>
            </div>
            
            <div className="order-info">
                <span>Address</span>
                <input type="text" onChange={(event) => handleChange(event, setAddress)} value={address} placeholder="Enter address"></input>
            </div>
            <div className="order-info">
                <span>Date</span>
                <input type="date" onChange={(event) => handleChange(event, setDate)} value={date} placeholder="Enter date"></input>
            </div>
            

            <h2>Products</h2>
            <div className="table">
                <div className="table-header">
                    <p>Product</p>
                    <p>Amount</p>
                    <p>Unit price</p>
                </div>
                <div className="table-body">
                    {products.map((product) => {
                            return (
                            <>
                                <div className='table-row' key={product.id}>
                                    <div>{product.name}</div>
                                    <div>{product.amount}</div>
                                    <div>{product.price}$</div>
                                    <div className='delete-column' ><img src={DeleteIcon} width="20" className="delete-button" onClick={handleDelete(product)}></img></div>
                                </div>

                            </>
                        )
                        })}
                    
                    <div className='input-row'>
                        <div><input className='table-input' type="text" onChange={(event) => handleChange(event, setName)} value={name} placeholder="Enter product name"></input></div>
                        <div><input className='table-input' type="text" onChange={(event) => handleChange(event, setAmount)} value={amount} placeholder="Enter amount"></input></div>
                        <div><input className='table-input' type="text" onChange={(event) => handleChange(event, setPrice)} value={price} placeholder="Enter unit price"></input></div>
                        <div className='add-column'><img width="28" src={AddIcon} onClick={handleSubmit}></img></div>
                    </div>
                </div>
                <h3>Total: {total}$</h3>
            </div>
            
        </Modal>
    )

}