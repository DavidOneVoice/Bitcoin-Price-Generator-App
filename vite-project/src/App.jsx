import { useEffect, useState } from 'react'
import './App.css'
import moon from './assets/moon.png';
import sun from './assets/sun.png';
import btcimage from './assets/btcimage.jpg';
import btclogo from './assets/btclogo.png';
import usdlogo from './assets/usdlogo.png'
import bfxlogo from './assets/bfxlogo.jpg'

function App() {
  const [btcprice, setBtcPrice] = useState({});
  const [theme, setTheme] = useState('dark');
  const style = { color: 'red' }
  const getPrice = async () => {
    const url = 'https://bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com/indices/global/ticker/BTCUSD';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '138ce9a3a7msh7d9e264f7e8ba0bp11025ejsnc2b5ecf50157',
        'X-RapidAPI-Host': 'bitcoinaverage-global-bitcoin-index-v1.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      setBtcPrice(data);
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {

    //Implementing the setInterval method 
    const interval = setInterval(() => {
      getPrice();
    }, 5000);
  }, []);

  const changeTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <div className='main' style={theme === 'dark' ? { color: 'white', backgroundColor: 'black' } : { color: 'black', backgroundColor: 'white' }}>
      <span>
        <img className='bfxlogo' src={bfxlogo} alt='logo' style={theme === 'dark' ? { border: '1px solid red' } : { border: 'none' }} />
        <h2 className='topic'>GET  LIVE  UPDATE <br /> BITCOIN<img className='currlogos' src={btclogo} alt='btclogo' /> / USD<img src={usdlogo} alt='usdlogo' className='currlogos' /></h2>
        <button onClick={changeTheme}>{theme === 'dark' ? <img src={sun} alt='sunlogo' /> : <img src={moon} alt='moonlogo' />}</button>
      </span>
      <section >
        <img className='btcImg' src={btcimage} alt='bitcoin-image' />
        <div className='btcdata'>
          <span>
            <h2 style={{ color: 'red' }}>Ask Price: ${btcprice.ask}</h2>
            <h2 style={{ color: 'green' }}>Bid Price: ${btcprice.bid}</h2>
          </span>
          <span id='midspan' style={theme === 'dark' ? { backgroundColor: 'white' } : null}>
            <h2 style={btcprice.changes.percent.day > 0 ? { color: 'green' } : { color: 'red' }}>Daily Profit/Loss: {btcprice.changes.percent.day}%</h2>
            <h2 style={btcprice.changes.percent.week > 0 ? { color: 'green' } : { color: 'red' }}>Weekly Profit/Loss: {btcprice.changes.percent.week}%</h2>
            <h2 style={btcprice.changes.percent.month > 0 ? { color: 'green' } : { color: 'red' }}>Monthly Profit/Loss: {btcprice.changes.percent.month}%</h2>
            <h2 style={btcprice.changes.percent.month_3 > 0 ? { color: 'green' } : { color: 'red' }}>Tri-Monthly Profit/Loss: {btcprice.changes.percent.month_3}%</h2>
            <h2 style={btcprice.changes.percent.month_6 > 0 ? { color: 'green' } : { color: 'red' }}>Bi-Annual Profit/Loss: {btcprice.changes.percent.month_6}%</h2>
            <h2 style={btcprice.changes.percent.year > 0 ? { color: 'green' } : { color: 'red' }}>Yearly Profit/Loss: {btcprice.changes.percent.year}%</h2>
          </span>
          <span>
            <h2>Hourly Candle Opening Price: ${btcprice.open.hour}</h2>
            <h2>Daily Candle Opening Price: ${btcprice.open.day}</h2>
            <h2>Weekly Candle Opening Price: ${btcprice.open.week}</h2>
            <h2>Monthly Candle Opening Price: ${btcprice.open.month}</h2>
            <h2>Tri-Monthly Candle Opening Price: ${btcprice.open.month_3}</h2>
            <h2>Bi-Annual Candle Opening Price: ${btcprice.open.month_6}</h2>
            <h2>Yearly Candle Opening Price: ${btcprice.open.year}</h2>
          </span>
        </div>
      </section>
      <footer>
        <h4>Copyright &copy; OVTech 2023</h4>
      </footer>

    </div>
  )
}

export default App
