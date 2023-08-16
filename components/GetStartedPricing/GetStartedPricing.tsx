import { Button } from "components/Button/Button";
import { useRouter } from "next/router";

export const GetStarted = () => {
  const router = useRouter();
  return <Button onClick={() => router.push("/pricing")}>Get Started</Button>;
};
