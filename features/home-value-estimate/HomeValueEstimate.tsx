import TopToolbar from "../homepage/Topbar/TopToolbar/TopToolbar";
import { MainSection } from "./home-value-estimate-sections/MainSection/MainSection";
import { FirstSection } from "./home-value-estimate-sections/FirstSection/FirstSection";
import { SecondSection } from "./home-value-estimate-sections/SecondSection/SecondSection";
import { ThirdSection } from "./home-value-estimate-sections/ThirdSection/ThirdSection";
import { FourthSection } from "./home-value-estimate-sections/FourthSection/FourthSection";
import { GreenSection } from "../location-data/location-data-sections/GreenSection/GreenSection";
import { Footer } from "../Footer/Footer";

export const HomeValueEstimate = () => {
  return (
    <>
      <TopToolbar />
      <MainSection />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <FourthSection />
      <GreenSection />
      <Footer />
    </>
  );
};
