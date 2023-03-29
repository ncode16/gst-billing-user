import React from "react";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import './Manage.css';

const ManageInventory= () => {
    const BootstrapButton = styled(Button)({
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 20,
        backgroundColor: '#2754ff',
        borderColor: '#0063cc',
        borderRadius:10,
        marginTop: 20,
        fontFamily: [
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ]
      })
    return (
      <div className="container">
  <div>
            <div className="tworow home-tworow home-tworow2">
            <div className="secondrow">
            <img className="imgborder" src="https://getswipe.in/static/img/illustrations/inventory_management.webp" width={'500px'} alt="img2" />
                </div>
                <div className="firstrow">
                    <h3 className="heading3">Manage inventory</h3>
                    <p className="paragraph1">Swipe Inventory is designed to help you spend less time in front of the screen and more time with your customers. Download reports on current inventory and update inventory quantities in bulk, which is helpful when adding new inventory.</p>
                    <Stack spacing={2} direction="row">
                        <BootstrapButton variant="contained" size="large"  >Manage INventory for FREE</BootstrapButton>
                    </Stack>
                </div>
            </div>
        </div>
      </div>
    )
}

export default ManageInventory;