import styles from "./Filters.module.scss";
import Box from "@mui/material/Box";
import Illustration from "../../public/icons/search.svg";
import { SelectChangeEvent } from "@mui/material/Select";
import { useState, useRef, useEffect, useContext, useMemo } from "react";
import { useRecoilState } from "recoil";
import { addressState, filterState } from "../../context/filterContext";
import GLOBAL_SETTINGS, { PlacesType } from "../../globals/GLOBAL_SETTINGS";
import { searchNearbyApi } from "./searchNearbyApi";
import WalkscoreListApi from "../BodyContent/Walkscore/WalkscoreListApi";
import snackbarContext from "../../context/snackbarContext";
import { useRouter } from "next/router";
import { addressToUrl, covertIntoKebabCase, covertIntoCamelCase } from "utils/address";
import { loadingContext } from "context/loadingContext";
import { useSearchCounter } from "hooks/use-search-counter";
import { Checkbox, Dialog, DialogContent, FormControl, ListItemText, MenuItem, Select } from "@mui/material";
import { LoginSignupButton } from "components/LoginSignupButton/LoginSignupButton";
import { mapClicksCounter, visitorStayLimit } from "context/visitorContext";
import { usePersistentRecoilState } from "hooks/recoil-persist-state";
import { useAuth } from "providers/AuthProvider";
import { GetStarted } from "components/GetStartedPricing/GetStartedPricing";
import { usePlanChecker } from "hooks/plans";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import { activeTabState } from "context/activeTab";
import { nearbyContext } from "context/nearbyPlacesContext";
import { isEqual } from "lodash";
import { nearbyPlacesCache } from "context/nearbyPlacesCacheContext";
import { useNearbyPlacesCallCount } from "hooks/use-nearby-places-call-count";
import { nearbyPlacesCallCountContext } from "context/nearbyPlacesCallCountContext";
import { DialogContext } from "context/limitDialogContext";
import { typesOfPlaceContext } from "context/typesOfPlaceContext";
import { PresetType, openaiDropdownContext } from "context/openaiDropdownContext";
import { extractCityCountry } from "utils/extractCityCountry";
import { useOpenaiDropdownOptions } from "hooks/use-openai-dropdown-options";
import { useMediaQuery } from "react-responsive";
import GoogleMapButton from "public/icons/google_button_icon.svg";
import FilterMapButton from "public/icons/filter.svg";
import { gmapMobileScreen } from "context/mobileScreenContext";
import CustomLoginSignUpButton from "features/landing-page/components/CustomLoginSignupButton/CustomLoginSignupButton";
import { standardizeAddress } from "hooks/standardize-address";

//TODO REFACTOR ALL GLOBAL SETTINGS FOR MAPS INTO GLOBAL_SETTINGS FILE
//TODO ADD LOADING TO GLOBAL STATE AND ADD SPINNERS
const { MILES_TO_METERS, MAP_ZOOM_MILES, PLACE_TYPES } = GLOBAL_SETTINGS;
const SELECT_INPUT_DROPDOWN_HEIGHT = 100;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: SELECT_INPUT_DROPDOWN_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

/**
 * Filters
 * @description: Displays filter bar at the top of the screen
 */

export default function Filters() {
  //* Use global state management
  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [activeTab] = useRecoilState(activeTabState);
  const [address] = useRecoilState(addressState);
  const [, setSnackbar] = useRecoilState(snackbarContext);
  const [isSelectAll, setSelectAll] = useState<boolean>(true);
  const [, setLoading] = useRecoilState(loadingContext);
  const { searchLimit, incrementCounter } = useSearchCounter();
  const [nearby, setNearby] = useRecoilState(nearbyContext);
  const nearbyCallRef = useRef<string[]>(["School"]);
  const [nearbyCache, setNearbyCache] = useRecoilState(nearbyPlacesCache);
  const { user } = useAuth();
  const { hasBeenCalled, incrementCallCount } = useNearbyPlacesCallCount();
  const [{ hasReachedLimit }] = useRecoilState(nearbyPlacesCallCountContext);
  const { setIsOpen } = useContext(DialogContext);
  const [openaiDropdownValue, setOpenaiDropdownValue] = useRecoilState(openaiDropdownContext);
  const dropdownOptions = useOpenaiDropdownOptions();

  //* State for the place select element
  const [typesOfPlace, setTypesOfPlace] = useRecoilState(typesOfPlaceContext);

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

  const handleOpenaiDropdownChange = (event: SelectChangeEvent) => {
    const value = event.target.value as PresetType;

    if (!dropdownOptions[value]?.includedInPlan) {
      return;
    }

    setOpenaiDropdownValue({
      label: dropdownOptions[value]?.label || "",
      value,
    });

    if (dropdownOptions[value].url !== "living") {
      router.push({
        pathname: "/app/[address]/[preset]",
        query: {
          address: router.query?.address,
          preset: dropdownOptions[value].url,
        },
      });
    } else {
      router.push(`/app/${router.query?.address}`);
    }
  };

  useEffect(() => {
    let preset = router.query?.preset as string;
    if (preset) {
      for (const key in dropdownOptions) {
        let item = dropdownOptions[key as PresetType];
        if (item?.url === preset) {
          setOpenaiDropdownValue({
            label: item.label,
            value: item.value as PresetType,
          });
          break;
        }
      }
    } else {
      setOpenaiDropdownValue({
        label: dropdownOptions["living"].label,
        value: dropdownOptions["living"].value as PresetType,
      });
    }
  }, [router]);

  //* Handle the change of the select element
  const handleSelectChange = (event: SelectChangeEvent<typeof typesOfPlace>) => {
    const {
      target: { value },
    } = event;

    if (!user) {
      return;
    } else {
      setTypesOfPlace(typeof value === "string" ? [value] : value.sort());
    }

    //* If not all are selected show the 'select all' option
    const allItemsSelected = value.length == PLACE_TYPES.length;
    setSelectAll(allItemsSelected);
  };

  const handleClose = async () => {
    if (typesOfPlace.length && filterVal.mapCenter && !isEqual(nearbyCallRef.current, typesOfPlace)) {
      await getNearby({
        lat: filterVal.mapCenter?.lat,
        lng: filterVal.mapCenter?.lng,
      });
      nearbyCallRef.current = typesOfPlace;
    }
  };

  const getNearby = async ({ lat, lng }: { lat: number; lng: number }) => {
    if (hasReachedLimit) {
      setIsOpen(true);
      return;
    }

    try {
      //Verify that we have a latlong value before trying to search api
      if (!lat) return;

      setLoading((prev) => ({
        ...prev,
        nearby: true,
      }));

      const typesOfPlacesSnakeCase = typesOfPlace.map((type) => type.toLowerCase().replace(" ", "_"));
      let types: string[] = [];

      if (nearbyCache[filterVal.address as string]) {
        const keys = Object.keys(nearbyCache[filterVal.address as string]);

        types = typesOfPlacesSnakeCase.filter((type) => !keys.includes(type));
      } else {
        types = typesOfPlacesSnakeCase;
      }

      let goodPlaceListings: any[] = [];

      if (types.length) {
        const searchNearbyPayload = {
          typesOfPlace: types,
          request: {
            location: {
              lat,
              lng,
            },
            radius: MILES_TO_METERS(MAP_ZOOM_MILES),
          },
        };
        const nearbyLocations = await searchNearbyApi(searchNearbyPayload);
        incrementCallCount(types.length);

        //* remove duplciates
        const noDups = nearbyLocations.filter((place: { reference: string }, index: any, array: any) => {
          return index === array.findIndex((x: any) => place.reference === x.reference);
        });

        //*filter out certain data / incorrect info
        goodPlaceListings = noDups.filter((place: any) => {
          const operational = "OPERATIONAL";

          const isNotLocality = !place.types.includes("locality");
          const isOpen = place.business_status === operational;

          return isNotLocality && isOpen;
        });
      }

      const cachedPlaces = typesOfPlacesSnakeCase
        .reduce((acc: any, type: string) => {
          return [...acc, ...(nearbyCache[filterVal.address as string]?.[type as PlacesType] || [])];
        }, [])
        .filter((place) => place);

      setNearby((prev) => ({
        ...prev,
        places: cachedPlaces ? [...cachedPlaces, ...goodPlaceListings] : goodPlaceListings,
      }));

      setNearbyCache((prevState) => ({
        ...prevState,
        [filterVal.address as string]: {
          ...prevState[filterVal.address as string],
          ...goodPlaceListings.reduce((acc: any, place: any) => {
            if (place._type) {
              return {
                ...acc,
                [place._type]: [...(acc[place._type] || []), place],
              };
            } else {
              return acc;
            }
          }, {}),
        },
      }));
    } catch (error) {
      //TODO error handling - errors should be displayed to end user
      console.error(error);
    }

    setLoading((prev) => ({
      ...prev,
      nearby: false,
    }));
  };

  const handleToggleAll = () => {
    setSelectAll(!isSelectAll);

    if (!isSelectAll) {
      setTypesOfPlace(PLACE_TYPES);
    } else {
      setTypesOfPlace([]);
    }
  };

  const getPlaceCategory = (addressComponents: any[]) => {
    const hasLocality = addressComponents.some((component) => component.types.includes("locality"));
    const hasStreetNumber = addressComponents.some((component) => component.types.includes("street_number"));
    if (hasStreetNumber) return "address";
    if (hasLocality) return "city";
    return "";
  };

  useEffect(() => {
    //* this use effect only runs when the map center or type of place changes
    //* Searching a different place will change map center
    (async () => {
      if (filterVal.mapCenter && activeTab === "nearby" && (!nearby.places.length || filterVal.address !== nearby.address) && hasBeenCalled) {
        //* Retreive all of the nearby places
        await getNearby({
          lat: filterVal.mapCenter.lat,
          lng: filterVal.mapCenter.lng,
        });
      }
    })();
  }, [filterVal.mapCenter, activeTab, filterVal.address, hasBeenCalled]);

  const getCityAndCountry = (addressComponents: any[], address: string) => {
    let city = addressComponents.find((component) => component.types.includes("locality"));
    let country = addressComponents.find((component) => component.types.includes("country"));

    if (!city || !country) {
      const extracted = extractCityCountry(address);

      city = extracted.city;
      country = extracted.country;
    }

    return {
      city: city?.long_name,
      country: country?.long_name,
    };
  };

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
    // Determine if the place is a city or an address
    const placeCategory = getPlaceCategory(place.address_components);

    setFilterVal((prevVal: any) => ({
      ...prevVal,
      latlong: place.geometry.location,
      address: place.formatted_address,
      selectedPlace: place,
      mapCenter: location,
      placeCategory,
      walkscore,
      ...getCityAndCountry(place.address_components, place.formatted_address),
    }));
    setNearby(() => ({
      address: place.formatted_address,
      places: [],
    }));
  };

  useEffect(() => {
    //* This use effect runs on component render
    //* Check that input ref exists before proceeding

    if (inputRef.current) {
      //* init the autocomplete for searching addresses
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(inputRef.current, AUTOCOMPLETE_OPTIONS);
      //* When the location changes, update the state

      autoCompleteRef.current.addListener("place_changed", async function () {
        //TODO handle error and display it to the client
        const place = await autoCompleteRef.current?.getPlace();
        const _address = standardizeAddress(place?.formatted_address);
        let encodedAddress = "";
        if (_address) {
          encodedAddress = addressToUrl(_address);
        } else {
          encodedAddress = addressToUrl(place?.formatted_address);
        }

        if (router.query.preset && router.query.preset !== "living") {
          router.push({
            pathname: "/app/[address]/[preset]",
            query: {
              address: encodedAddress,
              preset: router.query.preset,
            },
          });
        } else {
          router.push(`/app/${encodedAddress}`);
        }
      });
    }
  }, [router]);

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

  const { isVisitor, isFree, isPro } = usePlanChecker();

  const [visitorStayLimitLaunched] = usePersistentRecoilState("visitorStayLimit", visitorStayLimit);
  const visitorSearchLimit = isVisitor && searchLimit;
  const visitorStayLimitReached = isVisitor && visitorStayLimitLaunched;
  const [mapCounter] = usePersistentRecoilState("mapClickCounter", mapClicksCounter);

  const visitorMapReachedClickLimit = isVisitor && mapCounter >= 50;

  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    if (visitorStayLimitReached || visitorSearchLimit || visitorMapReachedClickLimit) {
      setShowDialog(true);
    }
  }, [visitorStayLimitReached, visitorSearchLimit, visitorMapReachedClickLimit, user]);

  const dropdownMenuItems = useMemo(() => {
    return Object.keys(dropdownOptions).map((key) => {
      const dropdownOption = dropdownOptions[key as keyof typeof dropdownOptions];

      return (
        <MenuItem key={key} value={key} disabled={!dropdownOption.includedInPlan}>
          {dropdownOption?.label}
        </MenuItem>
      );
    });
  }, [dropdownOptions]);

  const searchBarMobileBreakpoint = useMediaQuery({ minWidth: 600 });
  const handleGmapActivity = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, viewMap: "true" },
    });
  };
  const handleFiltersActivity = () => {
    router.push({
      pathname: router.pathname,
      query: { ...router.query, viewFilters: "true" },
    });
  };

  return (
    <div className={styles.main}>
      <Box className={styles.container}>
        <div className={styles.searchRow}>
          <div className={styles.searchField}>
            <div className={styles.iconWrapper}>
              <Illustration className={styles.matIcon} />
            </div>
            <input placeholder="Search Property Here" className={styles.input} type="text" ref={inputRef} />
          </div>
          {!searchBarMobileBreakpoint && (
            <div className={styles.mobileButtons}>
              <Box onClick={handleGmapActivity} className={styles.mobileButton}>
                <GoogleMapButton className={styles.icon} />
              </Box>
              <Box onClick={handleFiltersActivity} className={styles.mobileButton}>
                <FilterMapButton className={styles.icon} />
              </Box>
            </div>
          )}
        </div>

        <>
          {activeTab === "location" && (
            <DropdownWrapper>
              <Select style={{ height: "42px" }} id="openai-dropdown" value={openaiDropdownValue.value} onChange={handleOpenaiDropdownChange}>
                {/* {!isPro && (
                  <div className={styles.dropdownUpgradeMessageWrapper}>
                    <div className={styles.dropdownUpgradeMessage}>Upgrade Plan to Access More Options</div>
                  </div>
                )} */}
                {dropdownMenuItems}
              </Select>
            </DropdownWrapper>
          )}

          {activeTab === "nearby" && (
            <DropdownWrapper>
              <Select
                id="demo-multiple-checkbox"
                multiple
                value={typesOfPlace}
                onChange={handleSelectChange}
                onClose={handleClose}
                displayEmpty
                renderValue={(selected) => `Places of Interest (${selected.length})`}
                MenuProps={MenuProps}
                style={{ fontSize: "16px", height: "42px" }}
                autoWidth={true}
              >
                <MenuItem key="toggleAll" onClick={handleToggleAll}>
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
            </DropdownWrapper>
          )}
        </>
      </Box>
      {showDialog && (
        <Dialog style={{ zIndex: 90000 }} open className={styles.dialog}>
          <h2 className={styles.dialogTitle}>Daily {(searchLimit && "Search") || ""} Limit Reached</h2>
          {isFree ? (
            <DialogContent className={styles.dialogContent}>
              You’ve reached your daily limit. To get unlimited access, upgrade to a paid plan.
              <GetStarted />
            </DialogContent>
          ) : (
            <DialogContent className={styles.dialogContent}>
              You’ve reached your daily limit. To get free unlimited access forever: Log In or Join Kurby, but you are free to accept or refuse.
              {/* <LoginSignupButton /> */}
              <CustomLoginSignUpButton />
            </DialogContent>
          )}
        </Dialog>
      )}
    </div>
  );
}

const DropdownWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className={styles.searchBlock}>
    <div className={styles.typeOfPlace}>
      <div className={styles.row}>
        <form style={{ width: "100%" }}>
          <FormControl fullWidth className={styles.formControl}>
            {children}
          </FormControl>
        </form>
      </div>
    </div>
  </div>
);
