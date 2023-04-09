import { KBColor } from "constants/color";

export const useStyles = {
  flexBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ownerCard: {
    display: "flex",
    backgroundColor: KBColor.DARK,
    border: `solid 1px ${KBColor.LIGHT_BLACK}`,
    borderRadius: "10px",
    width: "100%",
    cursor: "pointer",
  },
  standardCard: {
    marginTop: "15px",
    // backgroundColor: KBColor.DARK,
    // border: `solid 1px ${KBColor.LIGHT_BLACK}`,
    borderRadius: "10px",
    width: "100%",
  },
};
