import { KBColor } from "constants/color";

export const useStyles = {
    resultsContentStyle: {
        padding: "20px",
        border: "1px solid rgba(38,75,92,.2)",
        boxShadow: "0 4px 4px #00000040",
        borderRadius: "14px",
        borderBottomRightRadius: "0px",
        borderBottomLeftRadius: "0px",
        marginTop: "25px",
        boxSizing: "border-box",
    },
    roundImage: {
        borderRadius: "10px",
        width: '100%'
    },
    boxStyle: {
        overflow: "auto",
        height: "100%",
        width: "100%",
        position: "relative",
        padding: '20px',
    },
    flexBetween: {
        display: 'flex',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    ownerCard: {
        display: 'flex', 
        marginTop: '15px', 
        backgroundColor: KBColor.DARK,
        border: `solid 1px ${KBColor.LIGHT_BLACK}`, 
        borderRadius: '10px', 
        width: 'fit-content'
    },
    standardCard: {
        display: 'flex', 
        marginTop: '15px', 
        backgroundColor: KBColor.DARK,
        border: `solid 1px ${KBColor.LIGHT_BLACK}`, 
        borderRadius: '10px', 
    }
}