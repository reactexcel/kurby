import { Box } from "@mui/system";
import styles from './Walkscore.module.css';
import PersonIcon from "../../../public/images/person.svg";
import BicycleIcon from "../../../public/images/bicycle.svg";
import CarIcon from "../../../public/images/car.svg";
import { Walkscore as WalkscoreType } from "interfaces/walkscore";

export default function Walkscore({ type, score, error }: { type: string, score: number | null, error: WalkscoreType['error'] }) {
    console.log(error)
    const typesMapping: any = {
        walk: PersonIcon,
        bike: BicycleIcon,
        transit: CarIcon
    }
    const MyComponent = typesMapping[type];
    const formatScoreTitle = (type: string) => `${type.charAt(0).toUpperCase() + type.slice(1)} Score`
    return (
        error ? 
        <Box style={{fontStyle: 'italic'}}>{userErrorMessages[error.code]}</Box> : 
        <Box className={styles.card}>
            <Box style={{display: 'flex', placeContent: 'center'}}>
                <Box>
                    <MyComponent className={styles.scoreIcon} />
                </Box>
                <Box className={styles.scoreNumber}>{score}</Box>
            </Box>
            <Box className={styles.scoreTitle}>{formatScoreTitle(type)}</Box>
        </Box>
    );
}

const userErrorMessages: Record<number, string> = {
    2: 'Walk Score is not yet supported in this country. We do not have enough data to ensure an accurate score.',
    30: 'Invalid latitude/longitude',
    31: 'Walk Score API internal error',
    40: 'Your WSAPIKEY is invalid',
    41: 'Your daily API quota has been exceeded',
    42: 'Your IP address has been blocked'
}