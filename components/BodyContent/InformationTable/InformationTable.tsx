import styles from "./Information.module.scss";

interface IDataField {
  title: string;
  value: boolean | string | number;
}

interface IInformationTableProps {
  dataFields: IDataField[] | null | undefined;
}

export const createData = (title: string, value: boolean | string | number) => ({
  title,
  value,
});

export function InformationTable({ dataFields }: IInformationTableProps) {
  if (!dataFields) {
    return <></>;
  }

  const displayValue = (value: boolean | string | number): string => {
    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    } else if (typeof value === "string") {
      return value;
    } else if (typeof value === "number") {
      return value.toString();
    }
    return "Null";
  };

  return (
    <table className={styles.informationTable}>
      <tbody>
        {dataFields.map((item, index) => (
          <tr key={index}>
            <td className={`${styles.column} ${styles.column1}`}>{item.title}</td>
            <td className={`${styles.column} ${styles.column2}`}>{displayValue(item.value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
