import styles from './AnimatedHeader.module.css';
import {
    useRef, 
    useState, 
    useEffect
} from 'react';
import {
    Typography
} from '@mui/material';

const AnimatedHeader = ({mobile}: any) => {
    const [activeLabel, setActiveLabel] = useState(0);

    const container = useRef<HTMLSpanElement>(null);
    const first = useRef<HTMLHeadingElement>(null);
    const next = useRef<HTMLHeadingElement>(null);
    const dream = useRef<HTMLHeadingElement>(null);
    const vacation = useRef<HTMLHeadingElement>(null);
    const forever = useRef<HTMLHeadingElement>(null);

    const wait = () => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
               resolve(true);
            }, 2000)
        })
    }

    const changeAnimation: (label: number) => any = async (label: number) => {
        let nextValue = 0;

        if(label == 4){
            nextValue = 0;
            setActiveLabel(0);
        }else {
            nextValue = label + 1;
            setActiveLabel(nextValue);
        }

        let elemWidth = 0;
        switch (nextValue) {
            case 0: 
                elemWidth = mobile ? 90 : 110;
                break;
            case 1:
                elemWidth = mobile ? 100 : 120;
                break;
            case 2: 
                elemWidth = mobile ? 130 : 160;
                break;
            case 3: 
                elemWidth = mobile ? 170 : 200;
                break;
            case 4:
                elemWidth = mobile ? 150 : 170;
                break;
            default: 
                break;
        }


        const containerElem = container.current;

        if(containerElem && elemWidth){
            containerElem.style.width = `${elemWidth}px`
        }
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            changeAnimation(activeLabel);
        }, 3000)
    }, [activeLabel])

    const labelStyle = {
        fontSize: mobile ? "30px" : "43px"
    }

  return (
    <div>
      <h3
        style={{
          fontWeight: "500",
          fontSize: mobile ? "30px" : "43px",
          margin: "20px 0px",
          display: 'flex', 
          flexDirection: 'row'
          // fontFamily: '"Filson Pro", Filson Pro'
        }}
      >
        <span>Buying Your</span>
        <span className={styles.container} ref={container}>
            <h2 className={`${styles.flipX} ${activeLabel == 0 ? styles.active : styles.inactive}`} ref={first} style={labelStyle}> First </h2>
            <h2 className={`${styles.flipX} ${activeLabel == 1 ? styles.active : styles.inactive}`} ref={next} style={labelStyle}> Next </h2>
            <h2 className={`${styles.flipX} ${activeLabel == 2 ? styles.active : styles.inactive}`} ref={dream} style={labelStyle}> Dream </h2>
            <h2 className={`${styles.flipX} ${activeLabel == 3 ? styles.active : styles.inactive}`} ref={vacation} style={labelStyle}> Vacation </h2>
            <h2 className={`${styles.flipX} ${activeLabel == 4 ? styles.active : styles.inactive}`} ref={forever} style={labelStyle}> Forever </h2>
        </span>
        <span>Home Just Got Easier</span>
      </h3>
    </div>
  );
};

export default AnimatedHeader;
