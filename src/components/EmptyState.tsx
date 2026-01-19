import styles from './EmptyState.module.css';

interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const EmptyState = ({ title, description, action }: Props) => {
  return (
    <div className={styles.empty}>
      <div>
        <p className={styles.title}>{title}</p>
        {description && <p className={styles.desc}>{description}</p>}
      </div>
      {action}
    </div>
  );
};

export default EmptyState;
