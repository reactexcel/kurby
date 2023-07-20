import styles from "./Filters.module.scss";
import Box from "@mui/material/Box";
import Illustration from "../../public/icons/search.svg";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState, useRef, useEffect, use } from "react";
import { useRecoilState } from "recoil";
import { addressState, filterState } from "../../context/filterContext";
import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";
import searchNearbyApi from "./searchNearbyApi";
import WalkscoreListApi from "../BodyContent/Walkscore/WalkscoreListApi";
import snackbarContext from "../../context/snackbarContext";
import { useRouter } from "next/router";
import { addressToUrl } from "utils/address";
import { loadingContext } from "context/loadingContext";
import { useSearchCounter } from "hooks/use-search-counter";
import { Dialog, DialogContent } from "@mui/material";
import { LoginSignupButton } from "components/LoginSignupButton/LoginSignupButton";
import { mapClicksCounter, visitorStayLimit } from "context/visitorContext";
import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useAuth } from "providers/AuthProvider";
import { IAppPlans } from "context/plansContext";
import { GetStarted } from "components/GetStartedPricing/GetStartedPricing";

//TODO REFACTOR ALL GLOBAL SETTINGS FOR MAPS INTO GLOBAL_SETTINGS FILE
//TODO ADD LOADING TO GLOBAL STATE AND ADD SPINNERS
const { MILES_TO_METERS, MAP_ZOOM_MILES, PLACE_TYPES } = GLOBAL_SETTINGS;

/**
 * Filters
 * @description: Displays filter bar at the top of the screen
 */

export default function Filters() {
  //* Use global state management
  const [, setFilterVal] = useRecoilState(filterState);
  const [address] = useRecoilState(addressState);
  const [, setSnackbar] = useRecoilState(snackbarContext);
  const [isSelectAll, setSelectAll] = useState<boolean>(true);
  const [, setLoading] = useRecoilState(loadingContext);
  const { incrementCounter } = useSearchCounter();
  const { searchLimit } = useSearchCounter();

  //* State for the place select element
  const [typesOfPlace, setTypesOfPlace] = useState<any[]>(PLACE_TYPES);

  const router = useRouter();

  //* Refs to html elements - used for google autocomplete
  //TODO add correct typeface
  const autoCompleteRef: any = useRef();

  const inputRef = useRef<HTMLInputElement>(null);

  //* Place data fields
  //* SEE: https://developers.google.com/maps/documentation/javascript/place-data-fields

  const AUTOCOMPLETE_OPTIONS = {
    fields: ["photo", "vicinity", "address_components", "geometry", "icon", "name", "formatted_address"],
  };

  //* All the types that the select element can be
  //TODO map these to values that the client requests
  //GLOBAL_SETTINGS.PLACE_TYPES

  //* Handle the change of the select element
  const handleSelectChange = (event: SelectChangeEvent<typeof typesOfPlace>) => {
    const {
      target: { value },
    } = event;

    setTypesOfPlace(value as any[]);

    //* If not all are selected show the 'select all' option
    const allItemsSelected = value.length == PLACE_TYPES.length;
    setSelectAll(allItemsSelected);
  };

  const getNearby = async ({ lat, lng }: { lat: number; lng: number }) => {
    try {
      //Verify that we have a latlong value before trying to search api
      if (!lat) return;

      const searchNearbyPayload = {
        typesOfPlace,
        request: {
          location: {
            lat,
            lng,
          },
          radius: MILES_TO_METERS(MAP_ZOOM_MILES),
        },
      };
      const nearbyLocations = await searchNearbyApi(searchNearbyPayload);

      //* remove duplciates
      const noDups = nearbyLocations.filter((place: { reference: string }, index: any, array: any) => {
        return index === array.findIndex((x: any) => place.reference === x.reference);
      });

      //*filter out certain data / incorrect info
      const goodPlaceListings = noDups.filter((place: any) => {
        const operational = "OPERATIONAL";

        const isNotLocality = !place.types.includes("locality");
        const isOpen = place.business_status === operational;

        return isNotLocality && isOpen;
      });

      setFilterVal((prevVal: any) => {
        //TODO save old nearby locations to prevent repeat requests

        return {
          ...prevVal,

          nearbyPlaces: goodPlaceListings,
        };
      });
    } catch (error) {
      //TODO error handling - errors should be displayed to end user
      console.error(error);
    }
  };

  const handleToggleAll = () => {
    setSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setTypesOfPlace(PLACE_TYPES);
    } else {
      setTypesOfPlace([]);
    }
  };

  // Commented "Nearby places"
  // useEffect(() => {
  //   //* this use effect only runs when the map center or type of place changes
  //   //* Searching a different place will change map center
  //   (async () => {
  //     if (!filterVal.mapCenter) return;
  //     //* Retreive all of the nearby places
  //     await getNearby({
  //       lat: filterVal.mapCenter.lat,
  //       lng: filterVal.mapCenter.lng,
  //     });

  //   })()
  // }, [filterVal.mapCenter, typesOfPlace]);

  const handleAddressChange = async (place: any) => {
    const getScore = (address: string, location: any) => WalkscoreListApi({ address, location });

    //TODO save all of place variable to state instead of destructuring it.
    const location = {
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    };
    const walkscore = await getScore(place.formatted_address, location);
    setSnackbar((prevVal: any) => ({
      ...prevVal,
      ...(walkscore.error
        ? {
            open: true,
            message: "Walkscore error",
            variant: "error",
          }
        : { open: false }),
    }));
    setLoading((prevState) => ({ ...prevState, walkscore: false }));
    setFilterVal((prevVal: any) => ({
      ...prevVal,
      latlong: place.geometry.location,
      address: place.formatted_address,
      selectedPlace: place,
      mapCenter: location,
      walkscore,
    }));
  };

  useEffect(() => {
    //* This use effect runs on component render
    //* Check that input ref exists before proceeding
    if (!inputRef.current) {
      return;
    }
    //* init the autocomplete for searching addresses
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, AUTOCOMPLETE_OPTIONS);
    //* When the location changes, update the state

    autoCompleteRef.current.addListener("place_changed", async function () {
      //TODO handle error and display it to the client
      const place = await autoCompleteRef.current.getPlace();
      const encodedAddress = addressToUrl(place.formatted_address);
      router.push(`/app/${encodedAddress}`);
    });
  }, []);

  useEffect(() => {
    if (address && inputRef.current) {
      const addressFormattted = address.replaceAll('"', "");
      inputRef.current.value = addressFormattted;
      const getData = async () => {
        const service = new google.maps.places.PlacesService(document.createElement("div"));
        const placeReq = {
          query: addressFormattted,
          fields: ["place_id"],
        };
        service.findPlaceFromQuery(placeReq, (results, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK && results) {
            const placeId = results[0]?.place_id;
            if (!placeId) return;

            const detailsRequest = {
              placeId,
              fields: ["name", "geometry", "formatted_address", "address_components", "place_id"],
            };
            service.getDetails(detailsRequest, (result, status) => {
              if (status === google.maps.places.PlacesServiceStatus.OK && result) {
                handleAddressChange(result);
                incrementCounter();
              }
            });
          }
        });
      };
      getData();
    }
  }, [address]);

  const { user } = useAuth();

  const [mapCounter] = usePersistentRecoilState("mapClickCounter", mapClicksCounter);
  const [visitorStayLimitLaunched] = usePersistentRecoilState("visitorStayLimit", visitorStayLimit);

  const isFreePlan = user?.Account?.CurrentSubscription?.Plan?.Name === IAppPlans.FREE_PLAN;
  const isVisitor = !Boolean(user);
  const visitorFourClicks = (isFreePlan || isVisitor) && mapCounter >= 4;
  const visitorSearchLimit = !Boolean(user) && searchLimit;
  const visitorStayLimitReached = isVisitor && visitorStayLimitLaunched;

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      // Open dialog after 2 seconds, to have respect for coldstart variables
      // Since user is undefined for the first time you load the page, we make sure,
      // we don't display the dialog too quickly
      if (visitorStayLimitReached || visitorFourClicks || visitorSearchLimit) {
        setShowDialog(true);
      }
    }, 1800);

    // Clean up timer
    return () => clearTimeout(timer);
  }, [visitorStayLimitReached, visitorFourClicks, visitorSearchLimit, user]);

  return (
    <>
      <Box className={styles.container}>
        <div className={styles.searchRow}>
          <div className={styles.iconWrapper}>
            <Illustration className={styles.matIcon} />
          </div>
          <input placeholder="Search Property Here" className={styles.input} type="text" ref={inputRef} />
        </div>

        {/* <div className={styles.searchBlock}>
          <div className={styles.typeOfPlace}>
            <div className={styles.row}>
              <div className={styles.label}>Places of interest</div>
            </div>
            <div className={styles.row} style={{ marginTop: "6px" }}>
              <form style={{ width: "100%" }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label"></InputLabel>
                  <Select
                    id="demo-multiple-checkbox"
                    multiple
                    value={typesOfPlace}
                    onChange={handleSelectChange}
                    renderValue={(selected) => `Places of Interest (${selected.length})`}
                    MenuProps={MenuProps}
                    style={{ fontSize: "16px" }}
                    autoWidth={true}
                    label=""
                  >
                    <MenuItem key="toggleAll" style={{ padding: "0px" }} onClick={handleToggleAll}>
                      <Checkbox icon={<RadioButtonUncheckedIcon />} checkedIcon={<RadioButtonCheckedIcon />} onChange={handleToggleAll} checked={isSelectAll} />
                      <ListItemText primary={isSelectAll ? "Deselect All" : "Select All"} />
                    </MenuItem>
                    {PLACE_TYPES.map((name) => (
                      <MenuItem key={name} value={name} style={{ padding: "0px" }}>
                        <Checkbox checked={typesOfPlace.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </div>
          </div>
        </div> */}
        {showDialog && (
          <Dialog open className={styles.dialog}>
            <h2 className={styles.dialogTitle}>Daily {(searchLimit && "Search") || ""} Limit Reached</h2>
            {isFreePlan ? (
              <DialogContent className={styles.dialogContent}>
                You’ve reached your daily limit. To get unlimited access, upgrade to a paid plan.
                <GetStarted />
              </DialogContent>
            ) : (
              <DialogContent className={styles.dialogContent}>
                You’ve reached your daily limit. To get free unlimited access forever: Log In or Join Kurby, but you are free to accept or refuse.
                <LoginSignupButton />
              </DialogContent>
            )}
          </Dialog>
        )}
      </Box>
    </>
  );
}
