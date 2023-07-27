import TopToolbar from "../homepage/Topbar/TopToolbar/TopToolbar";
import { MainSection } from "./location-data-sections/MainSection/MainSection";
import { FirstSection } from "features/location-data/location-data-sections/FirstSection/FirstSection";
import { SecondSection } from "./location-data-sections/SecondSection/SecondSection";
import { ThirdSection } from "./location-data-sections/ThirdSection/ThirdSection";
import { GreenSection } from "./location-data-sections/GreenSection/GreenSection";
import { Footer } from "../Footer/Footer";

export const LocationData = () => {
  return (
    <>
      <TopToolbar />
      <MainSection />
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <GreenSection />
      <Footer />
    </>
  );
};
