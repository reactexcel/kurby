import { usePlanChecker } from "hooks/plans";
import styles from "./RequiresProPlan.module.scss";
import React from "react";
import { Button } from "@mui/material";
import router from "next/router";

interface IRequiresProPlanProps {
  readonly title: string;
}

export default function RequiresProPlan({ title }: IRequiresProPlanProps) {
  const { isPro } = usePlanChecker();
  const handleRedirect = () => {
    router.push("/pricing");
  };
  return (
    <h3 className={styles.titleStyle}>
      {title}
      {!isPro && (
        <Button onClick={handleRedirect} color="primary">
          (Upgrade to Pro Plan)
        </Button>
      )}
    </h3>
  );
}
