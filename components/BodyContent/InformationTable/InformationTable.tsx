import { useAuth } from "providers/AuthProvider";
import styles from "./Information.module.scss";
import { IAppPlans } from "context/plansContext";
import { usePlanChecker } from "hooks/plans";

interface IDataField {
  title: string;
  value: boolean | string | number | undefined;
  plan: IAppPlans | any;
}

interface IInformationTableProps {
  dataFields: IDataField[] | null | undefined;
}

export const createData = (title: string, value: boolean | string | number | undefined, plan: string = IAppPlans.GROWTH) => ({
  title,
  value,
  plan,
});

export const displayValue = (value: boolean | string | number | undefined): string => {
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  } else if (typeof value === "string") {
    return value;
  } else if (typeof value === "number") {
    return value.toString();
  }
  return "-";
};

const words = [
  "Permeate",
  "Retrospective",
  "Succinct",
  "Foliage",
  "Transcend",
  "Epoch",
  "Intricate",
  "Correlate",
  "Impeccable",
  "Ineffable",
  "Alacrity",
  "Ephemeral",
  "Felicity",
  "Serendipity",
  "Quintessential",
  "Epiphany",
  "Eloquence",
  "Luminous",
  "Ubiquitous",
  "Nostalgic",
  "Gregarious",
  "Ingenious",
  "Harmonious",
  "Symphony",
  "Melancholy",
  "Metamorphosis",
  "Effervescent",
  "Labyrinth",
  "Serene",
  "Euphoria",
  "Resilience",
  "Solitude",
  "Eternity",
  "Paradox",
  "Enigma",
];

function generateRandomWord() {
  // generate a random length between 5 and 15
  const randomLength = Math.floor(Math.random() * 11) + 5;

  // filter the list to only include words of the random length
  const filteredWords = words.filter((word) => word.length === randomLength);

  if (filteredWords.length > 0) {
    // select a random word from the filtered list
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  } else {
    // If no words of the chosen length are found, return null
    return null;
  }
}

export function InformationTable({ dataFields }: IInformationTableProps) {
  const { isGrowth } = usePlanChecker();

  if (!dataFields) {
    return <></>;
  }

  return (
    <table className={styles.informationTable}>
      <tbody>
        {dataFields.map((item, index) => (
          <tr key={index}>
            <td className={`${styles.column} ${styles.column1}`}>{item.title}</td>
            {isGrowth && !Boolean(item.value) && item.plan === IAppPlans.PROFESSIONAL ? (
              <td style={{ userSelect: "none", filter: "blur(5px)" }} className={`${styles.column} ${styles.column2}`}>
                {generateRandomWord()}
              </td>
            ) : (
              <td className={`${styles.column} ${styles.column2}`}>{displayValue(item.value)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
