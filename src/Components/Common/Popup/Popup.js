import React, { useState } from 'react'
import Modal from '@mui/material/Modal';
// import deactive from '../../../images/deactive.png'
// import CurrencyInput from '../../common/TransForm/CurrencyInput'
import Create from '../../../Images/Bundles/create-captivate-elevate.webp'
import Car from '../../../Images/Bundles/car.webp'
import Lemon from '../../../Images/Bundles/lemon.webp'
import Mouth from '../../../Images/Bundles/mouth.webp'
import Rocket from '../../../Images/Bundles/rocket-blue-for-animation.webp'
import Pinkpaint from '../../../Images/Bundles/pink-paint.webp'
import { Box, Button, Grid, Input, Typography } from "@mui/material";
// import { PnpSelect } from './PnpSelect';

export const Popup = ({ title, subTitle, popupType = 'default', onChange, save, cancel, openpopup, textArea, saveBtnBg, setPopup, onClick, sx, values,isCancel }) => {

    const imageArray = [Car, Lemon, Mouth, Rocket, Pinkpaint];
    const style = {
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        // width: 665,
        // height:224,
        bgcolor: 'background.paper',
        border: '0px',
        borderRadius: '8px',
        boxShadow: 24,
        textAlign: 'center',
        outline:'none',
        p: 4,
        ...sx
    };

    const getPopupType = () => {


        if (popupType == 'player') {
            return <Box sx={{ justifyContent: "center", display: 'flex' }}> <Input
                sx={{ mt: 5, width: '250px' }}
                type={'number'}
                onChange={onChange}

            />
            </Box>
        } else if (popupType == 'payout') {
            return <Box >
                {/* <CurrencyInput name={'Amount'} countryCode={values.countryCode} value={values.amount} onChange={onChange} selectDisable={true}/> */}

                {/* <PnpSelect sx={{mt:5}} name={'payment'} value={values.paymentMode} options={[{'id':'Cash','name':'Cash'},{'id':'Online','name':'Online'},{'id':'UPI','name':'UPI'}]} onChange={onChange}/> */}
            </Box>
        }

    }
    return (
        <div>
            <Modal
                open={openpopup}
                // onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                        <div className="container">
                            <div className="row justify-content-center">
                                    <div className="home-img-rotation">
                                           <p className='rotating-text'><img src={Create} style={{maxWidth:'50%'}} alt="" className="img-fluid"></img></p> 
                                            <div className="mySlides">
                                                <img className='slideImages' style={{width:'30%' ,margin:'-60% 0 0 0'}} src={Mouth} alt="Image 1"></img>
                                            </div>
                                    </div>
                            </div>
                        </div>


                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {subTitle}
                    </Typography>

                    {popupType == 'default' ? textArea ?
                        <Box sx={{ mx: 'auto', textAlign: 'center', }}>
                            <textarea placeholder='Enter the reason to deactivate' style={{
                                width: "500px",
                                height: "100px",
                                resize: 'none',
                                border: '0px',
                                padding: '2%'
                            }}></textarea>
                        </Box>
                        : ''
                        : getPopupType()}

                    <Box sx={{ mt: 6 }}>

                        <Button onClick={onClick} sx={{
                            backgroundColor: saveBtnBg ? saveBtnBg : '#1BA56F', color: '#fff', px: 6, "&:hover": {
                                backgroundColor: saveBtnBg ? saveBtnBg : "#1BA56F",
                                color: "#fff",
                            },
                        }}>
                            {save}
                        </Button>
                        {
                            isCancel ?'':
                            <Button onClick={() => setPopup(false)} sx={{ backgroundColor: '#fff', color: '#000', border: '#E2E8F0 1px solid', ml: 2 }}>
                             {cancel}
                           </Button>
                        }
                       
                    </Box>

                </Box>
            </Modal>
        </div>
    )
}
