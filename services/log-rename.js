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