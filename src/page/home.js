import React from "react";
import HeroSection from "../components/home-components/hero-section";
import CategoriesSections from "../components/home-components/categories-sections.js";
import FilterSections from "../components/home-components/filter-sections";
import ItemsDrid from "../components/home-components/items-grid";
import TryApp from "../components/home-components/typ-app";

const Home = () => {
  return (
    <div className="animate-in">
      <HeroSection />
      <CategoriesSections />
      <FilterSections />
      <ItemsDrid />
      <TryApp />
    </div>
  );
};

export default Home;
