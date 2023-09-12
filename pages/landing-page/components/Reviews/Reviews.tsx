import { Box } from "@mui/material";
import styles from "./Reviews.module.scss";
import Image from "next/image";
import { ImageIcon } from "../Facts/Facts";
import { useContext, useState } from "react";
import { WindowSizeContext } from "context/windowSizeContext";

const reviews = [
  // {
  //   review:
  //     "Discovering the perfect property in my local area has always been a daunting task, until I stumbled upon Kurby.I was amazed at how quickly it learned my preferences and helped me refine my search, saving me time and energy.",
  //   first_name: "Christine",
  //   last_name: "Ritz",
  //   city: "Miami",
  // },
  {
    review:
      "Kurby has revolutionized the way I approach real estate. The insights on median household income and school ratings gave me the confidence to invest in a neighborhood perfect for my family.",
    first_name: "Liam",
    last_name: "O'Donnell",
    city: "Boston",
  },
  {
    review:
      "The property search with owner filters and AI-powered insights is a game-changer! It allowed me to narrow down potential investment properties in no time. Thanks, Kurby!",
    first_name: "Ava",
    last_name: "Patterson",
    city: "Los Angeles",
  },
  {
    review: "I've never felt more informed about a location than with Kurby. Knowing the crime rate and nearby attractions helped me make a decision quickly.",
    first_name: "Ethan",
    last_name: "Smith",
    city: "Chicago",
  },
  {
    review:
      "I was on the fence about two properties, but Kurby's comprehensive list of pros and cons made the decision crystal clear. It's like having a realtor in my pocket!",
    first_name: "Sophia",
    last_name: "Clark",
    city: "Dallas",
  },
  {
    review: "Getting mortgage information and comparable homes all in one place is invaluable. Kurby is my go-to for all my real estate ventures now.",
    first_name: "James",
    last_name: "Walsh",
    city: "San Francisco",
  },
  {
    review: "As an investor, time is of the essence. Kurby's quick, AI-driven results saved me hours of research.",
    first_name: "Mia",
    last_name: "Rodriguez",
    city: "New York",
  },
  {
    review: "I've always been wary about making big property decisions, but the in-depth insights from Kurby gave me peace of mind.",
    first_name: "Isabella",
    last_name: "Thompson",
    city: "Seattle",
  },
  {
    review: "Kurby provided home value and rental estimates that were spot on! It's impressive how accurate the platform is. I'm a fan for life.",
    first_name: "Lucas",
    last_name: "Williams",
    city: "Denver",
  },
  {
    review: "From school ratings to mortgage information, Kurby provided all the data I needed to secure my dream home. It's the ultimate tool for homebuyers.",
    first_name: "Emma",
    last_name: "Johnson",
    city: "Phoenix",
  },
  // {
  //   review: "I was initially overwhelmed with the US property market, but Kurby made it all so accessible. The platform's vast property and owner data is unmatched.",
  //   first_name: "Oliver",
  //   last_name: "Jones",
  //   city: "Atlanta",
  // },
];

export default function Reviews() {
  const [reviewPage, setReviewPage] = useState(0);

  const { isMobile } = useContext(WindowSizeContext);

  const imageSize = isMobile ? 330 : 600;

  const moveBackReview = () => {
    if (reviewPage !== 0) {
      setReviewPage((prev) => prev - 1);
    }
  };

  const moveForwardReview = () => {
    if (reviewPage !== 8) {
      setReviewPage((prev) => prev + 1);
    }
  };

  return (
    <Box className={styles.main}>
      <Box className={styles.image_block}>
        <Image
          className={styles.image}
          src={`/images/reviews/Webp/${reviewPage}.webp`}
          alt={`review_${reviewPage}`}
          width={imageSize}
          height={imageSize}
          objectFit="contain"
        />
      </Box>
      <Box className={styles.review_block}>
        <div className={styles.review}>"{reviews[reviewPage].review}"</div>
        <div className={styles.client_name}>
          {reviews[reviewPage].first_name} {reviews[reviewPage].last_name.slice(0, 1)}., {reviews[reviewPage].city}
        </div>
        <Box className={styles.page_navigation}>
          <Box onClick={moveBackReview} className={styles.arrow}>
            <ImageIcon src="/icons/arrow-left.svg" alt="arrow-left" size={14} />
          </Box>
          <div className={styles.current_page}>
            {reviewPage + 1} of {reviews.length}
          </div>
          <Box onClick={moveForwardReview} className={styles.arrow}>
            <ImageIcon src="/icons/arrow-right.svg" alt="arrow-right" size={14} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
