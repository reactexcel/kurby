import { Box } from "@mui/system";
import styles from './Walkscore.module.css';
import PersonIcon from "../../../public/images/person.svg";
import BicycleIcon from "../../../public/images/bicycle.svg";
import CarIcon from "../../../public/images/car.svg";

export default function Walkscore({ type, score }: { type: string, score: number | null }) {
    const typesMapping: any = {
        walk: PersonIcon,
        bike: BicycleIcon,
        transit: CarIcon
    }
    const MyComponent = typesMapping[type];
    const formatScoreTitle = (type: string) => `${type.charAt(0).toUpperCase() + type.slice(1)} Score`
    return (
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