import TopToolbar from "../homepage/Topbar/TopToolbar/TopToolbar";
import { LegendSection } from "./pricing-page-sections/LegendSection/LegendSection";
import { PriceSection } from "./pricing-page-sections/PriceSection/PriceSection";
import { TracingSection } from "./pricing-page-sections/TracingSection/TracingSection";
import { FaqsSection } from "./pricing-page-sections/FaqsSection/FaqsSection";
import { ProsConsSection } from "./pricing-page-sections/ProsConsSection/ProsConsSection";
import { Footer } from "../Footer/Footer";

import { MyContextProvider } from "../../context/priceContext";

export const PricingPage = () => {
  const paramValue = false;

  return (
    <MyContextProvider initialParam={paramValue}>
      <TopToolbar />
      <LegendSection />
      <PriceSection />
      <TracingSection />
      <FaqsSection />
      <ProsConsSection />
      <Footer />
    </MyContextProvider>
  );
};
