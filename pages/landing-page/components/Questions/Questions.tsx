import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import styles from "./Questions.module.scss";
import AddCircleIcon from "@mui/icons-material/AddCircleRounded";

export const AccordionStyle = {
  "&:before": {
    backgroundColor: "transparent !important",
  },
};

function Question({ header, content }: { header: string; content: string }) {
  return (
    <Accordion className={styles.question} sx={AccordionStyle}>
      <AccordionSummary expandIcon={<AddCircleIcon color="success" />} aria-controls="panel1a-content" id="panel1a-header">
        <div className={styles.summary}>
          <strong>{header}</strong>
        </div>
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
          header="Can I trust the AI's property recommendations?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        />
        <Question
          header="How do I get started with AI-powered property search?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        />
        <Question
          header="Can I still perform manual searches and apply my own filters?"
          content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget."
        />
      </Box>
    </Box>
  );
}
