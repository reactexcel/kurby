import { Container, ContainerProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import TopToolbar from "./Topbar/TopToolbar";
import Cards from './Cards';
import HomeFooter from "./HomeFooter";
import Footer from "../Footer/Footer";
import AnimatedHeader from './AnimatedHeader';
import styles from './Home.module.css';
import SearchIcon from "@mui/icons-material/Search";
import GoogleAddressInput from "../GoogleAddressInput";
import { useRecoilState } from "recoil";
import {addressState, filterState} from "../../context/filterContext";

const CustomContainer = styled("div")(() => ({
  position: "relative",
  display: "flex",
  flexWrap: "wrap",
  alignContent: "flex-start",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "100px",
  marginLeft: "auto",
  marginRight: "auto",
}));

const CustomBody = styled(Container)<ContainerProps>(() => ({
  backgroundImage:
    'url("/images/home-banner950.jpg")',
  backgroundPosition: "center center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  width: "100%",
  maxWidth: "none !important",
  margin: "0 !important",
  transition:
    "background 0.3s, border 0.3s, border-radius 0.3s, box-shadow 0.3s",
  height: "92vh",
  zIndex: "-1",
  top: "0",
  display: "flex",
  marginTop: "-125px !important",
}));

export default function Home({mobile, setHomepage}: any) {
  const [filterVal, setFilterVal] = useRecoilState(filterState);
  const [address, setAddress] = useRecoilState(addressState)
  return (
    <>
    <div
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px 0px",
      }}
    >
      <TopToolbar />
    </div>
    <CustomBody>
      <CustomContainer>
        <AnimatedHeader mobile={mobile} />
        <div>
          <h2
            style={{
              fontWeight: "300",
              fontSize: "30px",
              color: "#868686",
              textAlign: 'center'
            }}
          >
            Kurby uses location data to estimate property value like never
            before.
          </h2>
        </div>

        <div className={styles.formWrapper}>
          <div className={styles.formContainer}>
            <GoogleAddressInput 
              label=""
              inputProps={{
                sx: {
                  height: '50px', 
                  fontSize: '20px', 
                },
                autocomplete: "off"
              }}
              InputProps={{
                sx: {
                  minWidth: '450px', 
                  textDecoration: 'none', 
                  height: '50px', 
                  borderBottom: 'none !important', 
                  marginTop: '5px',
                  '&::before': {
                    borderBottom: 'none !important', 
                  }, 
                  '&::after': {
                    borderBottom: 'none !important', 
                  }
                }
              }}
              className={styles.input}
              placeholder="Search a property address"
              handleSelectedAddress={(address:any) => {
                setAddress(address.formatted_address);
                //setHomepage(false);
              }}
            />
            {/* <input
              className={styles.input}
              placeholder="Search a property address"
            ></input> */}
            <button className={styles.searchButton}>
              <SearchIcon className={styles.searchIcon} />
            </button>
          </div>
        </div>
      </CustomContainer>
    </CustomBody>
    <section
      style={{
        padding: '0'
      }}
    >
      <div
        style={{
          maxWidth: "1140px",
          marginLeft: "auto",
          marginRight: "auto",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "500",
            textTransform: "uppercase",
            textAlign: 'center'
          }}
        >
          How Kurby Improves The Home-Buying Process
        </h2>
        <Cards />
        <h2
          style={{
            fontSize: "40px",
            fontWeight: "500",
            textTransform: "uppercase",
            textAlign: 'center'
          }}
        >
          Explore Neighborhoods on Kurby
        </h2>
      </div>
    </section>
    <HomeFooter mobile={mobile} />
    <Footer />
  </>
  )
}
