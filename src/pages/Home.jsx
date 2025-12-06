import HeroSlider from '../components/home/HeroSlider';
import AdvertisementSection from '../components/home/AdvertisementSection';
import LatestTickets from '../components/home/LatestTickets';
import WhyChooseUs from '../components/home/WhyChooseUs';
import PopularRoutes from '../components/home/PopularRoutes';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSlider />
      <AdvertisementSection />
      <LatestTickets />
      <WhyChooseUs />
      <PopularRoutes />
    </div>
  );
};

export default Home;