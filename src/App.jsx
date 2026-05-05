import { useState } from 'react';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Trips from './components/Trips';
import HowItWorks from './components/HowItWorks';
import WhyUs from './components/WhyUs';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

function App() {
  const [bookingTrip, setBookingTrip] = useState(null);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <About />
        <Trips onBook={setBookingTrip} />
        <HowItWorks />
        <WhyUs />
        <Contact />
      </main>
      <Footer />
      {bookingTrip && (
        <BookingModal trip={bookingTrip} onClose={() => setBookingTrip(null)} />
      )}
    </>
  );
}

export default App;
