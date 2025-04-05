import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const COINS = ['BTC', 'ETH', 'LTC', 'DOGE']; 
const BASE_CURRENCY = 'USD'; 

function App() {
  const [open, setOpen] = useState(false);
  const [portfolio, setPortfolio] = useState([]);

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCoinSelect = async (coin) => {
    const price = await fetchCoinPrice(coin);
    if (price) {
      setPortfolio((prev) => [...prev, { coin, price }]);
    }
    setOpen(false);
  };

  const fetchCoinPrice = async (coin) => {
    const apiKey = '479b3642d2-92a495f52e-su93zh'; 
    const url = `https://api.fastforex.io/fetch-one?from=${coin}&to=${BASE_CURRENCY}&api_key=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data?.result?.[BASE_CURRENCY];
    } catch (error) {
      console.error('Ошибка при получении цены:', error);
      return null;
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          </IconButton>
          <Typography variant="h4" component="div" sx={{ flexGrow: 1 }}>
            Portfolio Overview
          </Typography>
          <Button color="inherit" style={{ fontSize: '150%' }} onClick={handleAddClick}>
            Добавить
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ p: 2 }}>
        {portfolio.map(({ coin, price }) => (
          <Card key={coin} sx={{ my: 1 }}>
            <CardContent>
              <Typography variant="h6">{coin}</Typography>
              <Typography variant="body1">Цена: {price} {BASE_CURRENCY}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Выберите монету</DialogTitle>
        <List>
          {COINS.map((coin) => (
            <ListItem disablePadding key={coin}>
              <ListItemButton onClick={() => handleCoinSelect(coin)}>
                <ListItemText primary={coin} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </Box>
  );
}

export default App;
