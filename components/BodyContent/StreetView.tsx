import React, { useEffect, useRef } from "react"
import { useRecoilState } from "recoil";

/**
 * Street View
 * @description: Displays the street view instance for the given location
*/

export default React.memo(function StreetView({ position }: any) {
  const streetViewMap = useRef(null)
  useEffect(() => {
    const getStreetViewData = async () => {
      try {
        const streetViewService = new google.maps.StreetViewService();
        if (!position) {
          return;
        }
        const panorama = await streetViewService.getPanorama({
          location: position,
          radius: 200
        });

        const point = panorama.data.location?.latLng as google.maps.LatLng;
        const marker_position = google.maps.geometry.spherical.computeOffset(position, 10, 0);
        const heading = google.maps.geometry.spherical.computeHeading(point, marker_position);

        const panoramaOptions = {
          position,
          disableDefaultUI: true,
          pov: {
            heading,
            pitch: 0
          }
        };
        const r = new google.maps.StreetViewPanorama(streetViewMap.current as any, panoramaOptions);
        return r;
      } catch (error) {
        console.log(error)
      }
    }
    getStreetViewData();
  }, [position])


  return (
    <div style={{ height: "200px", width: "200px", minWidth: "200px", marginRight: "20px" }} ref={streetViewMap}>StreetView</div>
  )
})
