import TopToolbar from "../Topbar/TopToolbar/TopToolbar";
import { FirstSection } from "../homepage-sections/FirstSection/FirstSection";
import { SecondSection } from "../homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "../homepage-sections/ThirdSection/ThirdSection";
import { MainSection } from "../homepage-sections/MainSection/MainSection";
import { Footer } from "../../Footer/Footer";

export const Homepage = () => {
  return (
    <>
      <TopToolbar />
      <MainSection />
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <Footer />
    </>
  );
};
