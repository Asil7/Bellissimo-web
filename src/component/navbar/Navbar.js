import './navbar.css';
import logo from './navbarImg/bellissimo-logo.webp'
import location from './navbarImg/location.svg'
import { Tag } from 'antd';

const Navbar = () => {
    return (
        <div className='navbar bg-light text-center'>
            <img src={logo} alt="Logo"></img>
            <div className='d-flex align-items-start'>
                <Tag color="green" className='d-flex align-items-start'>
                    <img className='p-2' src={location} alt="Location"></img>
                </Tag>
                <div className='d-flex flex-column text-start mt-1'>
                    <span style={{fontSize: '12px'}} className='text-muted'>Shahar:</span>
                    <div>Toshkent </div>
                </div>
            </div>

        </div>
    );
}

export default Navbar;
