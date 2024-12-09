import './App.css';
import { Invoice } from './Components/Invoice';
import OrderBookingForm from './Forms/OrderBookingForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route path="/" element={<OrderBookingForm />} />
          {/* <Route path="/measure" element={<BodyMeasurements />} /> */}
          <Route path="/invoice" element={<Invoice />} />
          {/* <Route path='/women' element={<WomenMeasurementsForm/>}/> */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
