import React from 'react';
import Navbar from './Navbar';
import SignInModal from './Signinmodal';
import HeroSection from './HeroSection';
import Ambiance from './Ambiance';
import PopularDishes from './PopularDishes';
import Reviews from './Reviews';
import Footer from './Footer';

export default function FrontPage() {
  return (
    <>
      <Navbar />
      <SignInModal />
      <HeroSection />
      <Ambiance />
      <PopularDishes />
      <Reviews />
      <Footer />
    </>
  );
}
