import axios from "axios";

export const getWeatherByCityName = async (
    {
        city,
        token,
        lang = 'ru',
        mode = "JSON",
        units = 'metric'
    }
) => {

    const {data, statusText} = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
            "q": city,
            "appid": token,
            lang,
            mode,
            units,
        }
    });
    console.log(statusText);
    return data;
};