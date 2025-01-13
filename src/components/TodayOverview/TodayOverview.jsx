import styles from "./TodayOverview.module.css";
import OverviewItem from "./OverviewItem";
import airPollution from "../../assets/air-pollution 1.svg";
import uvIndex from "../../assets/uv 1.svg";
import pressureImg from "../../assets/barometer.svg";

const TodayOverview = ({ pressure }) => {
  return (
    <div>
      <h2 className={styles.TodayOverview}>Today&apos;s Overview</h2>
      <div className={styles.box}>
        <OverviewItem
          title="Air Quality Index"
          value="53"
          description="Good"
          icon={airPollution}
          altText="Air Pollution"
        />
        <OverviewItem
          title="UV Index"
          value="3"
          description="Moderate"
          icon={uvIndex}
          altText="UV Index"
        />
        <OverviewItem
          title="Pressure"
          value={pressure}
          description="Normal"
          icon={pressureImg}
          altText="Pressure"
        />
      </div>
    </div>
  );
};

export default TodayOverview;
