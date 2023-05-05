import React, { useEffect, useRef } from "react";
import styles from "./StreetView.module.scss";

/**
 * Street View
 * @description: Displays the street view instance for the given location
 */

export default React.memo(function StreetView({ position }: any) {
  const streetViewMap = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const streetViewService = new google.maps.StreetViewService();
        if (!position) {
          return;
        }
        const panorama = await streetViewService.getPanorama({
          location: position,
          radius: 200,
        });

        const point = panorama.data.location?.latLng as google.maps.LatLng;
        const markerPosition = google.maps.geometry.spherical.computeOffset(position, 10, 0);
        const heading = google.maps.geometry.spherical.computeHeading(point, markerPosition);

        const panoramaOptions = {
          position,
          disableDefaultUI: true,
          pov: {
            heading,
            pitch: 0,
          },
        };
        const r = new google.maps.StreetViewPanorama(streetViewMap.current as any, panoramaOptions);
        return r;
      } catch (error) {
        console.log(error);
      }
    })();
  }, [position]);

  return (
    <div className={styles.main} ref={streetViewMap}>
      StreetView
    </div>
  );
});
