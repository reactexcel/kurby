import { useIsProPlan } from "hooks/require-pro-plan";
import styles from "./RequiresProPlan.module.scss";
import React from "react";
import { Button } from "@mui/material";
import router from "next/router";

interface IRequiresProPlanProps {
  readonly title: string;
}

export default function RequiresProPlan({ title }: IRequiresProPlanProps) {
  const isProPlan = useIsProPlan();
  const handleRedirect = () => {
    router.push("/pricing");
  };
  return (
    <h3 className={styles.titleStyle}>
      {title} {!isProPlan && "(Requires Pro Plan)"}
      {!isProPlan && (
        <Button onClick={handleRedirect} color="primary">
          Change plan
        </Button>
      )}
    </h3>
  );
}
