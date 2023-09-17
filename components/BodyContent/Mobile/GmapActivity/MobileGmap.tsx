import Gmap, { DemographicFeatureDropdown } from "components/BodyContent/Gmap/Gmap";
import Activity from "../Activity/Activity";
import { useRecoilState } from "recoil";
import { gmapMobileScreen } from "context/mobileScreenContext";
import { useRouter } from "next/router";
import React from "react";

function MobileGmap() {
  const router = useRouter();
  const viewMapFromUrl = router.query.viewMap === "true";

  const [isGmap, setIsGmap] = useRecoilState(gmapMobileScreen);

  // If the URL parameter viewMap is true, then update the state.
  React.useEffect(() => {
    setIsGmap(viewMapFromUrl);
  }, [viewMapFromUrl, setIsGmap]);

  const handleOnClose = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, viewMap: "false" },
    });
  };
  return (
    <Activity onClose={handleOnClose} header={{ title: "Location" }} open={isGmap}>
      <DemographicFeatureDropdown />
      <hr style={{ opacity: 0 }} />
      <Gmap />
    </Activity>
  );
}

export default MobileGmap;
