// OverviewItem.jsx
import styles from "./TodayOverview.module.css";

const OverviewItem = ({ title, value, description, icon, altText }) => {
  return (
    <div className={styles.boxElement}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.boxElement2}>
        <div>
          <h2>{value}</h2>
          <p>{description}</p>
        </div>
        <div>
          <img className={styles.icon} src={icon} alt={altText} />
        </div>
      </div>
    </div>
  );
};

export default OverviewItem;
