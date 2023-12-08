import './App.css';
import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import Rentals from './components/Rentals';
import SignIn from './components/SignIn';
import Header from './components/Header';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import ParkingForm from './components/ParkingForm';
import Chat from './components/Chat';
import MapPage from './components/map_components/MapPage';
import AuthProvider from './providers/AuthProvider';
import { ProtectedRoute } from './routes/ProtectedRoute';

function App() {
  return (

    <AuthProvider>
      <ChakraProvider>
        <Header />
        <Routes>
          <Route path="/" element={<ParkingForm />}></Route>
          <Route path="/chat" element={<Chat />}></Route>
          <Route path="/rentals" element={<ProtectedRoute component={<Rentals />} />}></Route>
          <Route path="/signin" element={<SignIn />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
          <Route path="/profile" element={<ProtectedRoute component={<>Profile</>} />}></Route>
          <Route path='/map' element={<ProtectedRoute component={<MapPage />} />}></Route>
        </Routes>
        <Footer />
      </ChakraProvider>
    </AuthProvider>

  );
}

export default App;
