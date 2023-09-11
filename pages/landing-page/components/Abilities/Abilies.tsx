import { Box } from "@mui/material";
import Image from "next/image";
import styles from "./Abilities.module.scss";

export function AbilityImage({ src, alt, objectFit }: { src: string; alt: string; objectFit: string }) {
  return <Image src={src} alt={alt} fill objectFit={objectFit} />;
}

export default function Abilities() {
  return (
    <Box className={styles.main}>
      <Box className={styles.first_section}>
        <Box className={styles.first_block}>
          {/* Comprehensive list of pros and cons */}
          <Box className={styles.ability}>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/comp_list.png" alt="comp_list" objectFit="contain" />
            </div>
            <Box className={styles.info}>
              <div className={styles.header}>Comprehensive list of pros and cons</div>
              <div className={styles.parag}>Everything you need to know about any property location in the world</div>
            </Box>
          </Box>
          {/* Conversational Real Estate AI Search */}
          <Box className={styles.ability}>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/conv.png" alt="conv" objectFit="contain" />
            </div>
            <Box className={styles.info}>
              <div className={styles.header}>Conversational Real Estate AI Search</div>
              <div className={styles.parag}>Show me vacant 3 bedroom homes in Boston with out-of-state owners</div>
            </Box>
          </Box>
        </Box>
        {/* AI Location Data & Insights */}
        <Box className={styles.second_block}>
          <Box className={styles.ability}>
            <div className={styles.info}>
              <div className={styles.header}>AI Location Data & Insights</div>
              <div className={styles.parag}>
                <div>Stay ahead of the competition and find hidden gems and undervalued properties with Kurby’s location data and insights.</div>
                <div>
                  Find properties that match your investment criteria and budget, properties that have high cash flow potential in a low-cost market, unlock appreciation
                  potential in a growing market, equity potential in a distressed market, and much more.
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/ai.png" alt="ai" objectFit="contain" />
            </div>
          </Box>
        </Box>
      </Box>
      {/* Property & Owner data on 150M+ U.S. homes */}
      <Box className={styles.second_section}>
        <Box className={styles.ability}>
          <div className={styles.image}>
            <AbilityImage src="/images/abilities_images/prop.png" alt="prop" objectFit="contain" />
          </div>
          <div className={styles.info}>
            <div className={styles.header}>Property & Owner data on 150M+ U.S. homes</div>
            <div className={styles.parag}>
              Owner data, including name and address with skip tracing, owner equity value, mortgage information, estimated home value, investor portfolio information, and
              more.
            </div>
          </div>
        </Box>
      </Box>
    </Box>
  );
}
