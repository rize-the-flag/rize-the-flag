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

const getEmoji = (weatherCode) => {
    const code = weatherCode.substr(0, weatherCode.length - 1);
    switch (code) {
        case '04':
            return '☁';
        case '03':
        case '02':
            return '⛅';
        case '01':
            return '☀';
        case '10':
            return '🌧';
    }
};

export const printWeather = (response) => {
    console.log(dedent
        `${response.name} погода сегодня:
         ${response.weather[0].description} ${getEmoji(response.weather[0].icon)}
         Температура воздуха: ${response.main.temp.toFixed(0)} (Ощущается как ${response.main.feels_like.toFixed(0)})
         Давление воздуха: ${response.main.pressure} мм
         Скорость ветра: ${response.wind.speed} м/с;
         `);
};