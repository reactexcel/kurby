import { Box } from "@mui/material";
import Image from "next/image";
import styles from "./Abilities.module.scss";

export function AbilityImage({ src, alt, objectFit }: { src: string; alt: string; objectFit: string }) {
  return <Image src={src} alt={alt} fill objectFit={objectFit} />;
}

export default function Abilities() {
  return (
    <Box id="about" className={styles.main}>
      <Box className={styles.first_section}>
        <Box className={styles.first_block}>
          {/* Comprehensive list of pros and cons */}
          <Box className={styles.ability}>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/comp_list.webp" alt="comp_list" objectFit="contain" />
            </div>
            <Box className={styles.info}>
              <div className={styles.header}>Comprehensive list of pros and cons</div>
              <div className={styles.parag}>Everything you need to know about any property location in the world</div>
            </Box>
          </Box>
          {/* Conversational Real Estate AI Search */}
          <Box className={styles.ability}>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/conv.webp" alt="conv" objectFit="contain" />
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
              <div className={styles.header}>Data + AI: Powerful Property Insights for Homebuyers</div>
              <div className={styles.parag}>
                <div>
                  Kurby is a real estate AI platform that uses GPT-4 refined on millions of real estate data points to generate location insights tailored to homebuyers' and
                  investors' preferences.
                </div>
                <div>
                  It’s like having a local expert on your side who can tell you everything you need to know about any property in the world, and help you find hidden gems and
                  undervalued properties.
                </div>
              </div>
            </div>
            <div className={styles.image}>
              <AbilityImage src="/images/abilities_images/ai.webp" alt="ai" objectFit="contain" />
            </div>
          </Box>
        </Box>
      </Box>
      {/* Property & Owner data on 150M+ U.S. homes */}
      <Box className={styles.second_section}>
        <Box className={styles.ability}>
          <div className={styles.image}>
            <AbilityImage src="/images/abilities_images/prop.webp" alt="prop" objectFit="contain" />
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
