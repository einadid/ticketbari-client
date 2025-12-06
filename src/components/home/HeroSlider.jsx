import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import { FaSearch, FaBus, FaTrain, FaShip, FaPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HeroSlider = () => {
  const slides = [
    {
      id: 1,
      title: 'Book Your Journey',
      subtitle: 'Travel Anywhere, Anytime',
      description: 'Find the best bus, train, launch & flight tickets at the lowest prices',
      image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=1920&q=80',
      icon: FaBus,
      color: 'from-blue-600 to-purple-600',
    },
    {
      id: 2,
      title: 'Comfortable Train Rides',
      subtitle: 'Experience Premium Travel',
      description: 'Book train tickets with guaranteed seats and comfortable journey',
      image: 'https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=1920&q=80',
      icon: FaTrain,
      color: 'from-green-600 to-teal-600',
    },
    {
      id: 3,
      title: 'Launch Your Adventure',
      subtitle: 'Water Way Transport',
      description: 'Enjoy scenic water routes with safe and reliable launch services',
      image: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=1920&q=80',
      icon: FaShip,
      color: 'from-cyan-600 to-blue-600',
    },
    {
      id: 4,
      title: 'Fly High with Us',
      subtitle: 'Quick & Safe Flights',
      description: 'Book domestic and international flights at competitive prices',
      image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&q=80',
      icon: FaPlane,
      color: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <div className="relative h-[calc(100vh-5rem)] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        loop={true}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="relative h-full w-full">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                  className="max-w-2xl"
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
                    className={`inline-block p-4 rounded-2xl bg-gradient-to-r ${slide.color} mb-6`}
                  >
                    <slide.icon className="text-5xl text-white" />
                  </motion.div>

                  {/* Subtitle */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-primary-400 font-semibold text-xl mb-3"
                  >
                    {slide.subtitle}
                  </motion.p>

                  {/* Title */}
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  {/* Description */}
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="text-xl text-gray-200 mb-8"
                  >
                    {slide.description}
                  </motion.p>

                  {/* Buttons */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="flex flex-wrap gap-4"
                  >
                    <Link
                      to="/all-tickets"
                      className={`px-8 py-4 rounded-xl font-semibold text-white bg-gradient-to-r ${slide.color} hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2`}
                    >
                      <FaSearch />
                      Search Tickets
                    </Link>
                    <Link
                      to="/about"
                      className="px-8 py-4 rounded-xl font-semibold text-white border-2 border-white hover:bg-white hover:text-gray-900 transition-all"
                    >
                      Learn More
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination Style */}
      <style jsx>{`
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: white;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: linear-gradient(to right, #0ea5e9, #d946ef);
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: white;
          background: rgba(0, 0, 0, 0.3);
          width: 50px;
          height: 50px;
          border-radius: 50%;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 20px;
        }
      `}</style>
    </div>
  );
};

export default HeroSlider;