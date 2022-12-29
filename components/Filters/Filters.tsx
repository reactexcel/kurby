import styles from "./Filters.module.css";
import Box from "@mui/material/Box";
import Illustration from "../../public/icons/search.svg";
import Slider from "@mui/material/Slider";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useState, useRef, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useRecoilState } from "recoil";
import filterContext from "../../context/filterContext";
import Checkbox from "@mui/material/Checkbox";
import { ListItemText, OutlinedInput, Radio } from "@mui/material";
import GLOBAL_SETTINGS from "../../globals/GLOBAL_SETTINGS";
import searchNearbyApi from "./searchNearbyApi";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';

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
  }
 
};

/**
 * Filters
 * @description: Displays filter bar at the top of the screen
*/

export default function Filters() {
  //* Use global state management
  const [filterVal, setFilterVal] = useRecoilState(filterContext);
  
  const [isSelectAll, setSelectAll] = useState<boolean>(true);

  //* State for the place select element
  const [typeOfPlace, setTypeOfPlace] = useState<any[]>(PLACE_TYPES);

  //* Refs to html elements - used for google autocomplete
  //TODO add correct typeface
  const autoCompleteRef: any = useRef();

  const inputRef = useRef<HTMLInputElement>(null);

  //* Place data fields
  //* SEE: https://developers.google.com/maps/documentation/javascript/place-data-fields

  const AUTOCOMPLETE_OPTIONS = {
    fields: [
      "photo",
      "vicinity",
      "address_components",
      "geometry",
      "icon",
      "name",
      "formatted_address",
    ],
  };

  //* All the types that the select element can be
  //TODO map these to values that the client requests
  //GLOBAL_SETTINGS.PLACE_TYPES

  //* Handle the change of the select element
  const handleSelectChange = (event: SelectChangeEvent<typeof typeOfPlace>) => {
    const {
      target: { value },
    } = event;

    setTypeOfPlace(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );

    //* If not all are selected show the 'select all' option
    const allItemsSelected = value.length == PLACE_TYPES.length;
    setSelectAll(allItemsSelected);
    
  };

  const getNearby = async ({ lat, lng }: { lat: number; lng: number }) => {
    try {
      //Verify that we have a latlong value before trying to search api
      if (!lat) return;

      const searchNearbyPayload = {
        typeOfPlace,
        request: {
          location: {
            lat,
            lng,
          },
          radius: MILES_TO_METERS(MAP_ZOOM_MILES),
        },
      }
      const nearbyLocations = await searchNearbyApi(searchNearbyPayload)

      setFilterVal((prevVal: any) => {
        //TODO save old nearby locations to prevent repeat requests

        return {
          ...prevVal,

          nearbyPlaces: nearbyLocations,
        };
      });
    } catch (error) {

      //TODO error handling - errors should be displayed to end user
      console.error(error);
    }
  };

  const handleToggleAll = ()=>{
    setSelectAll(!isSelectAll)

    if(!isSelectAll){
      setTypeOfPlace(PLACE_TYPES);
    }else{
      setTypeOfPlace([]);
    }
    console.log('toggle me! is select all', isSelectAll)
  }

  useEffect(() => {
    //* this use effect only runs when the map center or type of place changes
    //* Searching a different place will change map center

    console.log('change place type!')
    if (!filterVal?.selectedPlace) return;

    const getNearbyState = async () => {
      if (!filterVal.mapCenter) return;
      //* Retreive all of the nearby places
      await getNearby({
        lat: filterVal.mapCenter.lat,
        lng: filterVal.mapCenter.lng,
      });

    };

    getNearbyState();
  }, [filterVal.mapCenter, typeOfPlace]);

  useEffect(() => {
    //* This use effect runs on component render

    //* Check that input ref exists before proceeding
    if (!inputRef.current) return;

    //* init the autocomplete for searching addresses
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      AUTOCOMPLETE_OPTIONS
    );

    //* When the location changes, update the state
    autoCompleteRef.current.addListener("place_changed", async function () {
      //TODO handle error and display it to the client
      const place = await autoCompleteRef.current.getPlace();

      //TODO save all of place variable to state instead of destructuring it.
      setFilterVal((prevVal: any) => {
        return {
          ...prevVal,
          latlong: place.geometry.location,
          address: place.formatted_address,
          selectedPlace: place,
          mapCenter: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        };
      });
    });
  }, []);


  return (
    <>
      <Box
        sx={{
          height: "100%",
          backgroundColor: "#f1f4f6",
          borderRadius: "14px",
          padding: "22px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "25px",
          boxSizing: "border-box"
        }}
      >
        <div className={styles.searchRow}>
          <div className={styles.iconWrapper}>
            <Illustration className={styles.matIcon} />
          </div>
          <form style={{ width: "-webkit-fill-available" }}>
            <input
              placeholder="Search Property Here"
              className={styles.input}
              type="text"
              ref={inputRef}
            />
          </form>
        </div>

        <div className={styles.filterBlock}>
          
          <div className={styles.typeOfPlace}>
            <div className={styles.row}>
              <div className={styles.label}>Places of interest</div>
            </div>
            <div className={styles.row} style={{ marginTop: "12px"}}>
              <form style={{ width: "100%" }}>
                <FormControl fullWidth >
                  <InputLabel id="demo-simple-select-label">
                  </InputLabel>
                  <Select
                    id="demo-multiple-checkbox"
                    multiple
                 
                    value={typeOfPlace}
                    onChange={handleSelectChange}
                    renderValue={(selected) => `Places of Interest (${selected.length})`}
                    MenuProps={MenuProps}
                    style={{ fontSize: "16px" }}
                    autoWidth={true}
                    label=""
                   
                  >
                    <MenuItem key="toggleAll" style={{ padding: "0px" }} onClick={handleToggleAll}>
                    <Checkbox
                      icon={<RadioButtonUncheckedIcon />}
                      checkedIcon={<RadioButtonCheckedIcon />}
                      onChange={handleToggleAll}
                      checked={isSelectAll}
                    />
                      <ListItemText primary={isSelectAll ? 'Deselect All' : 'Select All'} />
                    </MenuItem>
                    {PLACE_TYPES.map((name) => (
                      <MenuItem key={name} value={name} style={{ padding: "0px" }}>
                        <Checkbox checked={typeOfPlace.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </form>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
}
