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
          header="How does Kurby AI differ from other real estate platforms?"
          content="Unlike traditional platforms, Kurby AI combines the vast data of the real estate market with the power of artificial intelligence. This allows users to gain in-depth knowledge on any property globally, similar to having a local expert guide."
        />
        <Question
          header="How frequently is the data updated on Kurby?"
          content="Kurby strives to provide the most current and accurate information. Our data is updated daily, leveraging both AI analysis and real-time market feeds. This ensures that you always have access to the latest property insights and market trends."
        />
        <Question
          header="Can Kurby help me with properties that are suitable for short-term rentals like Airbnb?"
          content="Absolutely! Kurby provides specific AI-powered models and presets specific to short-term rental investors that allow you to identify properties with potential for short-term rentals. You can evaluate neighborhoods, nearby attractions, vacancy rates, and other factors that may contribute to the success of a short-term rental investment."
        />
        <Question
          header="Can I trust the accuracy of Kurby's data?"
          content="Absolutely! Kurby combines AI insights with comprehensive Census and market data, including crime rates, educational statistics, and market trends. We gather information from reliable sources and regularly update our database to ensure you have the most accurate and up-to-date information."
        />
        <Question
          header="How can real estate professionals benefit from using Kurby AI?"
          content="Real estate professionals can leverage our advanced AI tools to gain a competitive edge, anticipate future market trends, and make informed decisions in both the residential real estate market and commercial real estate."
        />
        <Question
          header="What makes Kurby AI's approach to residential real estate market analysis unique?"
          content="Our blend of machine learning and comprehensive data from the residential real estate sector ensures that users receive precise and actionable insights tailored for prospective buyers and sellers."
        />
      </Box>
    </Box>
  );
}
