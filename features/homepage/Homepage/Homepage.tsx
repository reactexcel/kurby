import TopToolbar from "../Topbar/TopToolbar/TopToolbar";
import HomeFooter from "../HomepageFooter/HomepageFooter";
import { FirstSection } from "../homepage-sections/FirstSection/FirstSection";
import { SecondSection } from "../homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "../homepage-sections/ThirdSection/ThirdSection";
import { MainSection } from "../homepage-sections/MainSection/MainSection";

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
