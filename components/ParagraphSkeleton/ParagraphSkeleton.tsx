import { Skeleton } from "@mui/material";

export const ParagraphSkeleton = () => {
  return (
    <>
      <Skeleton variant="rectangular" height={10} style={{ marginBottom: 6 }} />
      <Skeleton variant="rectangular" height={10} style={{ marginBottom: 6 }} />
      <Skeleton variant="rectangular" height={10} />
    </>
  );
};
