import { useRef, useEffect } from "react";
import { TextField } from "@mui/material";

interface Props {
  label: string;
  sx?: any;
  className?: string;
  color?: any;
  id?: string;
  name?: string;
  type?: string;
  variant?: any;
  required?: boolean;
  onChange?: any;
  InputLabelProps?: any;
  InputProps?: any;
  inputProps?: any;
  placeholder?: string;
  value?: any;
  handleSelectedAddress: (e:any) => void;
}

const GoogleAddressInput = (params: Props) => {
  const autoCompleteRef: any = useRef();
  const inputRef = useRef<HTMLInputElement>(null);
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

  const {
    label,
    sx = {},
    className = '',
    color = "primary",
    id = "",
    name = "",
    type = "text",
    variant = "standard",
    required = false,
    onChange = () => {},
    InputLabelProps = {},
    InputProps = {},
    inputProps = {},
    placeholder = "",
    value = undefined,
    handleSelectedAddress,
  } = params;

  useEffect(() => {
    if(!inputRef.current) return;

    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      AUTOCOMPLETE_OPTIONS
    );

    const Listener = autoCompleteRef.current.addListener("place_changed", async()=>{
      const place = await autoCompleteRef.current.getPlace();
      handleSelectedAddress(place);
    });

    return () => {
      Listener.remove();
      autoCompleteRef.current = undefined;
    }
  }, []);

  return (
    <>
      <TextField
        label={label}
        sx={sx}
        color={color}
        id={id}
        name={name}
        type={type}
        className={className}
        variant={variant}
        required={required}
        onChange={onChange}
        InputLabelProps={InputLabelProps}
        InputProps={InputProps}
        placeholder={placeholder}
        value={value}
        inputRef={inputRef}
        inputProps={inputProps}
      />
    </>
  );
};
export default GoogleAddressInput;
