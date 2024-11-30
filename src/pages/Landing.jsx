import CallToAction from "../components/landing/CallToAction";
import Categories from "../components/landing/Categories";
import GetStarted from "../components/landing/GetStarted";
import Hero from "../components/landing/Hero";
import Newsletter from "../components/landing/Newsletter";
import OnlineEvents from "../components/landing/OnlineEvents";
import PopularEvents from "../components/landing/PopularEvents";
import TrendingEvents from "../components/landing/TrendingEvents";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Landing = () => {
  return (
    <div className="text-appDarkText">
      <Navbar />
      <Hero />
      <Categories />
      <PopularEvents />
      <OnlineEvents />
      <GetStarted />
      <TrendingEvents />
      <CallToAction />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Landing;
