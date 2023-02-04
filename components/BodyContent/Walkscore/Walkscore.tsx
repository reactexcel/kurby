import { Box } from "@mui/system";
import styles from './Walkscore.module.css';
import PersonIcon from "../../../public/images/person.svg";
import BicycleIcon from "../../../public/images/bicycle.svg";
import CarIcon from "../../../public/images/car.svg";
import { Walkscore as WalkscoreType } from "interfaces/walkscore";
import { Tooltip } from "@mui/material";

const tooltip = 'Score outside US and Canada might be inaccurate';

export default function Walkscore({ type, score, isUSOrCanada, error }: { type: string, score: number | null, isUSOrCanada: boolean, error: WalkscoreType['error'] }) {
    const typesMapping: any = {
        walk: PersonIcon,
        bike: BicycleIcon,
        transit: CarIcon
    }
    const MyComponent = typesMapping[type];
    const formatScoreTitle = (type: string) => `${type.charAt(0).toUpperCase() + type.slice(1)} Score`
    return ( 
        error ? 
        <Box></Box> : 
        <Box className={styles.card}>
            <Box style={{display: 'flex', placeContent: 'center'}}>
                <Box>
                    <MyComponent className={styles.scoreIcon} />
                </Box>
                <Tooltip title={isUSOrCanada ? '' : tooltip}>
                    <Box className={styles.scoreNumber}>{score}</Box>
                </Tooltip>
            </Box>
            <Box className={styles.scoreTitle}>{formatScoreTitle(type)}</Box>
        </Box>
    );
}

