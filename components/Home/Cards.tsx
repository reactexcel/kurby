import styles from "./Cards.module.css";
import { Button, ButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";

const Header = styled('h3')(() => ({
    marginBottom: '44px',
    color: '#061A23',
    // fontFamily: '"Filson Pro", Filson Pro',
    fontSize: '32px',
    fontWeight: '500',
    textTransform: 'uppercase',
    lineHeight: '38px',
    textAlign: 'center', 
    boxSizing: 'border-box', 
}));

const Body = styled('p')(() => ({
    color: '#868686',
    // fontFamily: '"Filson Pro", Filson Pro',
    fontSize: '24px',
    fontWeight: '300',
    lineHeight: '28px',
    boxSizing: 'border-box',
    margin: '0px', 
    textAlign: 'center'
}));

const CustomButton = styled(Button)<ButtonProps>(() => ({
    marginTop: '20px',
    // fontFamily: '"Filson Pro", Filson Pro',
    fontWeight: '500',
    backgroundColor: '#21C25E',
    borderStyle: 'solid',
    borderWidth: '1px 1px 1px 1px',
    borderColor: '#21C25E',
    borderRadius: '10px 10px 10px 10px',
    color: 'white', 
    fontSize: '16px', 
    padding: '7px 20px', 
    textTransform: 'none', 
    '&:hover': {
        backgroundColor: 'white', 
        color: '#21C25E'
    }
}))

const Cards = () => {
  return (
    <div className={styles['card-container']}>
      <div className={styles.card}>
        <img src="https://kurby.ai/wp-content/uploads/elementor/thumbs/icon1-py4s4q8mdmbukzegvx41ydtzevq9p26c8t6mdeqr58.png" />
        <Header>What's Nearby</Header>
        <Body>
          Kurby analyzes location data in an unprecedented way to find the best
          place for you to live.
        </Body>
        <CustomButton>Find What's nearby</CustomButton>
      </div>
      <div className={styles.card}>
        <img src="https://kurby.ai/wp-content/uploads/elementor/thumbs/icon2-py4rzi8wer6i2yzjdnuo3p9sltguxlg0uypie2hhpo.png" />
        <Header>LOCATION SCORE</Header>
        <Body>
          Our proprietary location score makes it easy to find the most
          comfortable, convenient, and livable home for you.
        </Body>
        <CustomButton>Calculate location score</CustomButton>
      </div>
      <div className={styles.card}>
        <img src="https://kurby.ai/wp-content/uploads/elementor/thumbs/icon3-py4rrdx3da2bs8s5snhp291fuzhpfq7i2rti50ixgs.png" />
        <Header sx={{
            marginBottom: '8px'
        }}>EXPLAIN IT LIKE A LOCAL</Header>
        <Body>
          Get local information on what a particular area is really like before
          spending any more time evaluating it.
        </Body>
        <CustomButton>Get local information</CustomButton>
      </div>
    </div>
  );
};

export default Cards;
