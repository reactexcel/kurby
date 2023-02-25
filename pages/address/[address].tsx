import Resultspage from "components/Resultspage/Resultspage";
import { useRouter } from "next/router";

const Post = () => {
  const router = useRouter();
  const { address } = router.query;

  return <Resultspage />;
};

export default Post;
