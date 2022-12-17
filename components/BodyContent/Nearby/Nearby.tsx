import { useRecoilState } from "recoil";
import filterContext from "../../../context/filterContext";
import NearbyPlaceCard from "./NearbyPlaceCard";
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from "react";


/**
 * Nearby
 * @description: Container for the nearby place cards. 
*/

const PAGE_SIZE = 5;

// Update the loadMore function to accept setFilterV as an argument
export const loadMore = (filterVal: any, setFilterV: any) => {
  console.log('load more..')
  const diff = filterVal.nearbyPlaces.length - filterVal.loadedNearbyPlaces.length;
  if (diff === 0) {
    return;
  }
  const plus = diff < PAGE_SIZE ? diff : PAGE_SIZE;
  // Use the setFilterV function to update the state
  setFilterV((prev: any) => {
    return {
      ...prev,
      loadedNearbyPlaces: filterVal.nearbyPlaces.slice(0, filterVal.loadedNearbyPlaces.length + plus)
    }
  });
}


const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8
};

// Pass setFilterV as an argument to the loadMore function
export default function Nearby() {
  const [filterVal, setFilterVal] = useRecoilState(filterContext);
  const [firstCall, setfirstCall] = useState(true)
  const [items, setItems] = useState(Array.from({length: 20}))

  const fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      setItems(
        items.concat(Array.from({ length: 20 }))
      );
    }, 1500);
  };

  useEffect(() => {
    console.log('filterVal.nearbyPlaces.length', filterVal.nearbyPlaces.length)
  }, [])

  if(firstCall) {
    // Pass setFilterV as an argument to loadMore
    loadMore(filterVal, setFilterVal);
    setfirstCall(!firstCall)
  }
  return (
    <>
      <InfiniteScroll
        // style={{ height: "600px" }}
        dataLength={items.length} //This is important field to render the next data
        // Pass setFilterV as an argument to loadMore
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        height="600px"
      >
        {items.map((i, index)=>{
          return (
            <div style={style} key={index}>
              div - #{index}
            </div>
          )
        })}
      </InfiniteScroll>

    </>
  );
}



