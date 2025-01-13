import {
    WiDaySunny,
    WiDayCloudy,
    WiNightAltCloudy,
    WiCloudy,
    WiShowers,
    WiThunderstorm,
    WiWindy,
  } from "react-icons/wi";
  import { RiMoonClearFill } from "react-icons/ri";
  import { IoIosSnow } from "react-icons/io";
  
  export const allIcons = {
    "01d": WiDaySunny,
    "01n": RiMoonClearFill,
    "02d": WiDayCloudy,
    "02n": WiNightAltCloudy,
    "03d": WiCloudy,
    "03n": WiCloudy,
    "04d": WiCloudy,
    "04n": WiCloudy,
    "09d": WiShowers,
    "09n": WiShowers,
    "10d": WiShowers,
    "10n": WiShowers,
    "11d": WiThunderstorm,
    "11n": WiThunderstorm,
    "13d": IoIosSnow,
    "13n": IoIosSnow,
    "50d": WiWindy,
    "50n": WiWindy,
  };
  
  export const renderWeatherIcon = (iconCode, styles) => {
    const IconComponent = allIcons[iconCode];
    return IconComponent ? <IconComponent className={styles.weatherIcon} /> : null;
  };
  