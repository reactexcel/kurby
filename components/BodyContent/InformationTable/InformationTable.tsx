import styles from "./Information.module.scss";

interface IDataField {
  title: string;
  value: boolean | string | number | undefined;
}

interface IInformationTableProps {
  dataFields: IDataField[] | null | undefined;
}

export const createData = (title: string, value: boolean | string | number | undefined) => ({
  title,
  value,
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

export function InformationTable({ dataFields }: IInformationTableProps) {
  if (!dataFields) {
    return <></>;
  }

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
