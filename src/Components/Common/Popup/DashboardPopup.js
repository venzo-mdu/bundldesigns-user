import React from 'react'
import Modal from '@mui/material/Modal';
import Create from '../../../Images/Bundles/create-captivate-elevate.webp'
import Car from '../../../Images/Bundles/car.webp'
import Lemon from '../../../Images/Bundles/lemon.webp'
import Mouth from '../../../Images/Bundles/mouth.webp'
import Rocket from '../../../Images/Bundles/rocket-blue-for-animation.webp'
import Pinkpaint from '../../../Images/Bundles/pink-paint.webp'
import { Box, Button, Input, Typography, useMediaQuery } from "@mui/material";
import popupGIF from '../../../Images/popupGIF.gif'

export const DashboardPopup = ({ title, subTitle, popupType = 'default', onChange, save, cancel, openpopup, textArea, saveBtnBg, setPopup, onClick, sx, values, isCancel }) => {
    const isSmallScreen = useMediaQuery('(max-width:441px)');

    const style = {
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: isSmallScreen ? '90%' : '30%',
        bgcolor: 'background.paper',
        border: '0px',
        borderRadius: '8px',
        boxShadow: 24,
        textAlign: 'center',
        outline: 'none',
        p: isSmallScreen ? 2 : 4,
        ...sx
    };

    const getPopupType = () => {
        if (popupType === 'player') {
            return (
                <Box sx={{ justifyContent: "center", display: 'flex' }}>
                    <Input
                        sx={{ mt: 5, width: '250px' }}
                        type="number"
                        onChange={onChange}
                    />
                </Box>
            );
        } else if (popupType === 'payout') {
            return <Box>{/* Custom component inputs here */}</Box>;
        }
    }
    return (
        <div>
            <Modal
                open={openpopup}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="relative flex justify-center text-center p-0 !pb-[14px]">
                            <img className='w-[100px] ' src={popupGIF}></img>
                            </div>
                        </div>
                    </div>

                    <Typography sx={{color:'black'}} id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ marginTop:'3px',width:'93%',marginLeft:'auto',marginRight:'auto' , color:'#00000080' }}>
                        {subTitle}
                    </Typography>

                    {popupType === 'default' && textArea ? (
                        <Box sx={{ mx: 'auto', textAlign: 'center' }}>
                            <textarea
                                placeholder="Enter the reason to deactivate"
                                style={{
                                    width: isSmallScreen ? "90%" : "500px",
                                    height: "100px",
                                    resize: 'none',
                                    border: '0px',
                                    padding: '2%',
                                }}
                            />
                        </Box>
                    ) : (
                        getPopupType()
                    )}

                    <Box sx={{ marginTop:'10px'}}>
                        <Button
                            onClick={onClick}
                            sx={{
                                backgroundColor: saveBtnBg || '#1BA56F',
                                color: '#fff',
                                px: 6,
                                "&:hover": {
                                    backgroundColor: saveBtnBg || "#1BA56F",
                                    color: "#fff",
                                },
                            }}
                            className='!rounded-none !capitalize text-[20px] font-[500]'
                        >
                            {save}
                        </Button>
                        {!isCancel && (
                            <Button
                                onClick={() => setPopup(false)}
                                sx={{
                                    backgroundColor: '#fff',
                                    color: '#000',
                                    border: '#E2E8F0 1px solid',
                                    ml: 2,
                                    mt: isSmallScreen ? 2 : 0,
                                }}
                            >
                                {cancel}
                            </Button>
                        )}
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}
