import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/material";
import styles from "./Questions.module.scss";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";

export const AccordionStyle = {
  "&:before": {
    backgroundColor: "transparent !important",
  },
};

function Question({ header, content }: { header: string; content: string }) {
  return (
    <Accordion className={styles.question} sx={AccordionStyle}>
      <AccordionSummary expandIcon={<ExpandCircleDownIcon color="success" />}>
        <div className={styles.summary}>{header}</div>
      </AccordionSummary>
      <AccordionDetails>
        <div className={styles.content}>{content}</div>
      </AccordionDetails>
    </Accordion>
  );
}

export default function Questions() {
  return (
    <Box className={styles.main}>
      <div className={styles.header}>Frequently asked questions</div>
      <Box className={styles.questions}>
        <Question
          header="What is Kurby AI?"
          content="Kurby AI is a real estate platform leveraging GPT-4's capabilities to provide comprehensive location insights for homebuyers and investors. We've fine-tuned our platform on millions of real estate data points to ensure accurate and personalized property insights."
        />

        <Question
          header="How does Kurby assist in finding properties with high investment potential?"
          content="Kurby analyzes market trends, home values, and various other factors to identify properties with high cash flow, appreciation, or equity potential. Whether you're looking for low-cost markets or distressed properties, our platform guides you toward investment opportunities that match your criteria."
        />

        <Question
          header="Can Kurby help me find properties in specific school districts?"
          content="Absolutely! Kurby allows you to filter properties based on various preferences, including school ratings and specific school districts. This ensures that you find homes in areas that align with your educational goals for your family."
        />

        <Question
          header="Can I trust the accuracy of Kurby's data?"
          content="Absolutely! Kurby combines AI insights with comprehensive Census and market data, including crime rates, educational statistics, and market trends. We gather information from reliable sources and regularly update our database to ensure you have the most accurate and up-to-date information."
        />

        <Question
          header="How frequently is the data updated on Kurby?"
          content="Kurby strives to provide the most current and accurate information. Our data is updated daily, leveraging both AI analysis and real-time market feeds. This ensures that you always have access to the latest property insights and market trends."
        />

        <Question
          header="Can Kurby AI provide specific property details like home value and rental estimates?"
          content="Absolutely! For all US properties, Kurby AI offers details like home value, rental estimates, comparable homes, and even mortgage information."
        />

        <Question
          header="Can Kurby help me with properties that are suitable for short-term rentals like Airbnb?"
          content="Absolutely! Kurby provides specific AI-powered models and presets specific to short-term rental investors that allow you to identify properties with potential for short-term rentals. You can evaluate neighborhoods, nearby attractions, vacancy rates, and other factors that may contribute to the success of a short-term rental investment."
        />

        <Question
          header="How is Kurby AI revolutionizing the real estate industry?"
          content="Kurby AI is harnessing the power of artificial intelligence to transform how the real estate industry operates, offering deeper insights and streamlined processes that were once unattainable with human intelligence alone."
        />

        <Question
          header="How comprehensive is your Property & Owner data?"
          content="We have data on over 150 million U.S. homes. This includes information about the property itself, as well as details about its ownership."
        />

        <Question
          header="How can real estate professionals benefit from using Kurby AI?"
          content="Real estate professionals can leverage our advanced AI tools to gain a competitive edge, anticipate future market trends, and make informed decisions in both the residential real estate market and commercial real estate."
        />

        <Question
          header="Where does Kurby get its data?"
          content="Kurby gets its data from a variety of reliable and authoritative sources, including: Location data: Kurby uses GPT-4 technology to generate location data based on our database data. GPT-4 is a state-of-the-art natural language processing system that can produce high-quality and relevant text for any given input. Kurby fine-tunes GPT-4 on our own data to ensure accuracy and consistency. Property data: Kurby collects property data from public records such as county assessor records, county tax assessor, county clerks records, MLS data, and more. We have property data on every parcel in the US, covering over 157 million properties. Our property data includes information such as property type, size, year built, ownership, sales history, tax assessment, market value, zoning, features, amenities, etc. Neighborhood data: Kurby obtains neighborhood data from the US Census data, which provides demographic and socioeconomic information for every census tract in the US. Our neighborhood data includes information such as population, income, education, employment, crime, housing, transportation, etc. Nearby Places: Kurby uses the Google Maps API to get nearby places data for any location in the US. The Google Maps API is a web service that provides access to millions of points of interest (POIs) such as restaurants, shops, schools, parks, etc. Our nearby places data includes information such as name, address, phone number, website, rating, reviews, photos, etc. Kurby integrates and analyzes all these data sources to provide you with the most comprehensive and up-to-date insights on any property or location in the US. You can use Kurby to search, compare, evaluate, and market properties with ease and confidence."
        />

        <Question
          header="What makes Kurby AI's approach to residential real estate market analysis unique?"
          content="Our blend of machine learning and comprehensive data from the residential real estate sector ensures that users receive precise and actionable insights tailored for prospective buyers and sellers."
        />

        <Question
          header="Can Kurby AI assist real estate companies in scaling their real estate business?"
          content="Certainly! Real estate companies can utilize our AI tools to gain deeper insights into the market, optimize their real estate transactions, and connect more effectively with prospective buyers and mortgage lenders. This data-driven approach can significantly enhance their decision-making and streamline operations in the real estate industry."
        />

        <Question
          header="How does artificial intelligence in Kurby AI compare to traditional methods used in real estate transactions?"
          content="Traditional methods rely primarily on human intelligence and manual data analysis. In contrast, our artificial intelligence processes vast amounts of real estate data at unprecedented speeds, offering insights that can dramatically enhance the efficiency and accuracy of real estate transactions."
        />

        <Question
          header="How can real estate agents use Kurby AI to better sell properties?"
          content="Real estate agents can harness our platform to understand the real estate market nuances, identify suitable properties for clients, quickly access up-to-date location and property descriptions, and provide data-driven recommendations. This not only helps sell properties faster but also builds trust with clients."
        />

        <Question
          header="With the rise of machine learning and AI tools, how does Kurby AI ensure its artificial intelligence remains ahead in the real estate sector?"
          content="For first-time homebuyers, Kurby simplifies the home-buying process by providing tools that help you evaluate properties, analyze neighborhood statistics, and understand market trends. Our platform enables you to find homes that suit your budget, lifestyle, and long-term goals, making the process more transparent and less stressful."
        />

        <Question
          header="What does Kurby offer for first-time homebuyers specifically?"
          content="For first-time homebuyers, Kurby simplifies the home-buying process by providing tools that help you evaluate properties, analyze neighborhood statistics, and understand market trends. Our platform enables you to find homes that suit your budget, lifestyle, and long-term goals, making the process more transparent and less stressful."
        />
      </Box>
    </Box>
  );
}
