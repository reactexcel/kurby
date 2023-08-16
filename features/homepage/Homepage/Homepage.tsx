import { useMemo } from "react";
import TopToolbar from "../Topbar/TopToolbar/TopToolbar";
import { FirstSection } from "../homepage-sections/FirstSection/FirstSection";
import { SecondSection } from "../homepage-sections/SecondSection/SecondSection";
import { ThirdSection } from "../homepage-sections/ThirdSection/ThirdSection";
import { MainSection } from "../homepage-sections/MainSection/MainSection";
import { Footer } from "../../Footer/Footer";
import { useRouter } from "next/router";
import { SuccessSignupDialog } from "components/SuccessSignupDialog/SuccessSignupDialog";
import { HomepageFooter } from "../Footer/Footer";

export const Homepage = () => {
  const router = useRouter();

  const isSuccessPage = useMemo(() => router.asPath === "/success", [router]);

  return (
    <>
      <TopToolbar />
      <MainSection />
      <FirstSection />
      <SecondSection />
      {/* <ThirdSection /> */}
      <HomepageFooter />
      {isSuccessPage && <SuccessSignupDialog />}
    </>
  );
};
