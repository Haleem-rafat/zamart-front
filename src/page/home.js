import React from "react";
import HeaderHome from "../components/home-components/header";
import HeroSection from "../components/home-components/hero-section";
import CategoriesSections from "../components/home-components/categories-sections.js";
import FilterSections from "../components/home-components/filter-sections";
import ItemsDrid from "../components/home-components/items-grid";
import TryApp from "../components/home-components/typ-app";
import Footer from "../components/home-components/footer";

const Home = () => {
  return (
    <div>
      <HeaderHome />
      <HeroSection />
      <CategoriesSections />
      <FilterSections />
      <ItemsDrid />
      <TryApp />
      <Footer />
    </div>
  );
};

export default Home;
