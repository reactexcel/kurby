import React from "react";
import styles from "./Faqs.module.scss";

import { FaqItem } from "./FaqItem";

export const FaqsSection = () => {
  const faqItems = [
    {
      title: "Which countries does Kurby cover?",
      desc: `Kurby provides AI-powered property insights for any property address worldwide. We provide property data records and Census data insights on 157 million U.S properties nationwide.`,
    },
    {
      title: "Where does Kurby get its data?",
      subtitle: "Kurby gets its data from a variety of reliable and authoritative sources, including:",
      subtitle1: "Location data:",
      desc: `Kurby uses GPT-4 technology to generate location data based on our database data. GPT-4 is a state-of-the-art natural language processing system that can produce high-quality and relevant text for any given input. Kurby fine-tunes GPT-4 on our own data to ensure accuracy and consistency.`,
      subtitle2: "Property data:",
      desc1: `Kurby collects property data from public records such as county assessor records, county tax assessor, county clerks records, MLS data, and more. We have property data on every parcel in the US, covering over 157 million properties. Our property data includes information such as property type, size, year built, ownership, sales history, tax assessment, market value, zoning, features, amenities, etc.`,
      subtitle3: "Neighborhood data:",
      desc2: `Kurby obtains neighborhood data from the US Census data, which provides demographic and socioeconomic information for every census tract in the US. Our neighborhood data includes information such as population, income, education, employment, crime, housing, transportation, etc.`,
      subtitle4: "Nearby Places:",
      desc3: `Kurby uses the Google Maps API to get nearby places data for any location in the US. The Google Maps API is a web service that provides access to millions of points of interest (POIs) such as restaurants, shops, schools, parks, etc. Our nearby places data includes information such as name, address, phone number, website, rating, reviews, photos, etc.`,
      desc4: `Kurby integrates and analyzes all these data sources to provide you with the most comprehensive and up-to-date insights on any property or location in the US. You can use Kurby to search, compare, evaluate, and market properties with ease and confidence.`,
    },

    {
      title: "What’s the cancellation policy?",
      desc: `You can cancel your subscription at any time and you will no longer be charged. After canceling, you will be able to continue generating content and have access to your account until the end of your billing cycle.
      `,
    },
    {
      title: "Can I upgrade or downgrade my plan at any time?",
      subtitle: "Users can upgrade or downgrade their subscription in a self-serve fashion via your profile page. ",
      desc: `In the case of an upgrade, the users' plan changes immediately and Kurby will automatically handle any proration of subscription fees.`,
    },
  ];

  return (
    <div className={styles.background}>
      <h1 className={styles.title}>faqs</h1>
      {faqItems.map((item, index) => (
        <FaqItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          desc={item.desc}
          desc1={item.desc1}
          desc2={item.desc2}
          desc3={item.desc3}
          desc4={item.desc4}
          subtitle1={item.subtitle1}
          subtitle2={item.subtitle2}
          subtitle3={item.subtitle3}
          subtitle4={item.subtitle4}
        />
      ))}
    </div>
  );
};
