import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import homepageimg from '../Images/homepage.jpg'

const Navbar = () => {
    const navigate = useNavigate();

    const handleAddProduct = () => {
      navigate('/product');
    };

    const handleCategory = () => {
      navigate('/category');
    };
    return (
        <>
          <AppBar position="static" style={{backgroundColor:"#625F60"}}>
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                My App
              </Typography>
              <Button color="inherit" onClick={handleCategory}>Category</Button>
              <Button color="inherit" onClick={handleAddProduct}>ADD Products</Button>
            </Toolbar>
          </AppBar>
          <div style={{ position: 'relative' ,height:'560px', overflow:"hidden" }}>
            <img src={homepageimg} alt="Image" style={{ width: '100%' }} />
            <h1 style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: 'white', fontSize: '30px', textShadow: '2px 2px 4px #000000' }}>
              Welcome to Home Page
            </h1>
          </div>
        </>
      );
      
      
};

export default Navbar;

  
