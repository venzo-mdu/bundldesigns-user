import React from 'react'
import '../Purchase/MyCart.css'
import { Navbar } from '../Common/Navbar/Navbar'
import { Footer } from '../Common/Footer/Footer'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import DeleteIcon from '../../Images/BundlDetail/deleteicon.svg'
import BlackDollor from '../../Images/BundlDetail/blackdollor.svg'
import BlackTime from '../../Images/BundlDetail/blacktime.svg' 

export const MyCart = () => {
    function createData(name, calories, fat, carbs) {
        return { name, calories, fat, carbs };
    }
    const rows = [
        createData('Boutiquer Bundl', 1, 7640, DeleteIcon, 4.0),
        createData('Boutiquer Bundl', 1, 7640, DeleteIcon, 4.0),
        createData('Boutiquer Bundl', 1, 7640, DeleteIcon, 4.0),
        createData('Boutiquer Bundl', 1, 7640, DeleteIcon, 4.0),
        createData('Boutiquer Bundl', 1, 7640, DeleteIcon, 4.0),
    ]
    return (
        <div>
            <Navbar />
            <div className='mycart'>
                <div className='cart'>
                    <p>Your Cart</p>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Item</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="center">Price</TableCell>
                                    <TableCell align="center">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell scope="row">
                                            {row.name}
                                        </TableCell>
                                        <TableCell align="center">{row.calories}</TableCell>
                                        <TableCell align="center">{row.fat}</TableCell>
                                        {/* <TableCell align="center"><img style={{width:'23px'}} src={row.DeleteIcon}></img></TableCell> */}
                                        <TableCell align="center">
                                            <img style={{ cursor:'pointer' }} src={DeleteIcon} alt="Delete Icon" />
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div style={{float:'right',margin:'4% 0 0 0',width:'30%'}}>
                       <div  className='total' style={{ display: 'flex' }}>
                        <p style={{width:'50%'}}>Price:</p>
                        <p style={{width:'50%'}}>8000 sar</p>
                       </div>
                       <div  className='total' style={{ display: 'flex' }}>
                        <p  style={{width:'53%'}}>VAT:</p>
                        <p  style={{width:'40%'}}>400 sar</p>
                       </div>
                       <div>
                        <div   style={{ display: 'flex' }}>
                        <p style={{ width: '50%' }}><img src={BlackDollor}></img>Total Price</p>
                        <p style={{ width: '40%' }}>8000 sar</p>
                        </div>
                        <div  style={{ display: 'flex' }}>
                            <p style={{ width: '55%' }}><img src={BlackTime}></img>Total Duration</p>
                            <p style={{ width: '45%' }}>45 Days</p>
                        </div>
                       </div>
                    </div>
                </div>
                <div className='billing'>
                    <p>Billing Address</p>
                    <form>
                        <div className='user-name'>
                            <div>
                                <label>First Name</label>
                                <input></input>
                            </div>
                            <div style={{ margin: '2% 0 0 2%' }}>
                                <label>Last Name</label>
                                <input></input>
                            </div>
                        </div>
                        <div className='email'>
                            <label>Email</label>
                            <input></input>
                        </div>
                        <div className='phonenumber'>
                            <label>Phonenumber</label>
                            <input></input>
                        </div>
                        <div className='country'>
                            <div>
                                <label>Country</label>
                                <input></input>
                            </div>
                            <div style={{ margin: '2% 0 0 2%' }}>
                                <label>City</label>
                                <input></input>
                            </div>
                        </div>
                        <div className='postal-code'>
                            <label>Postal Code</label>
                            <input></input>
                        </div>
                        <div className='promo-code'>
                            <label>Promo Code</label>
                            <input></input>
                        </div>
                        <button className='payment'>Make Payment</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}
