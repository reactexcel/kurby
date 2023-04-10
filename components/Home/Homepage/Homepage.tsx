import TopToolbar from "../Topbar/TopToolbar/TopToolbar";
import HomeFooter from "../HomepageFooter/HomepageFooter";
import { FirstSection } from "features/homepage-sections/FirstSection/FirstSection";
import { SecondSection } from "features/homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "features/homepage-sections/ThirdSection/ThirdSection";
import { MainSection } from "features/homepage-sections/MainSection/MainSection";

export const Homepage = () => {
  return (
    <>
      <TopToolbar />
      <MainSection />
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <HomeFooter />
    </>
  );
};
