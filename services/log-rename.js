import chalk from 'chalk'
import dedent from 'dedent-js'

export const printError = (text) => {
    console.log(`${chalk.bgRed('ERROR')} ${text}`)
};

export const printSuccess = (text) => {
    console.log(`${chalk.bgGreen('SUCCESS')} ${text}`)
};

export const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyanBright('HELP')} 
        Без Парамтеров - вывод погоды
        -s [CITY] Погода для города
        -h для вывода справки
        -t [API_KEY] для сохранения токена
        `
    );
};

export const printWeather = (response) => {
    console.log(dedent
        `${response.name} погода сегодня:
         ${response.weather.pop().description}
         Температура воздуха: ${response.main.temp.toFixed(0)} (Ощущается как ${response.main.feels_like.toFixed(0)})
         Давление воздуха: ${response.main.pressure} мм
         Скорость ветра: ${response.wind.speed} м/с;
         `);
};