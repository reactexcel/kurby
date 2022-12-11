import React, { useEffect, useRef } from "react"
import { useRecoilState } from "recoil";
import filterContext from "../../context/filterContext";

/**
 * Street View
 * @description: Displays the street view instance for the given location
*/

export default React.memo(function StreetView() {
  const streetViewMap = useRef(null)  
  const [filterVal] = useRecoilState(filterContext);
  
  useEffect(() => {
    new google.maps.StreetViewPanorama(
        streetViewMap.current as any,
        {
          position: filterVal.latlong,
          fullscreenControl: false,
          visible: true,
          zoomControl: false,
          enableCloseButton: false,
          linksControl: false,
          panControl: false,
          addressControl: false,
        }
      );
  }, [filterVal])
  
  
  return (
    <div style={{height:"200px", width:"200px", marginRight:"20px"}} ref={streetViewMap}>StreetView</div>
  )
})
