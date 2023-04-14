import { Typography, Box } from "@mui/material";
import styles from "./RecordRow.module.scss";

interface RecordRowProps {
  title: string;
  data?: any;
}

interface FieldProps {
  className?: string;
  value: any;
}

export const RecordRow = ({ title, data }: RecordRowProps) => {
  return (
    <tr>
      <Field className={styles.title} value={title} />
      <Field className={styles.separator} value=":" />
      <Field className={styles.data} value={data} />
    </tr>
  );
};

const Field = ({ className = "", value }: FieldProps) => {
  return (
    <td>
      <Typography className={className}>{value}</Typography>
    </td>
  );
};
