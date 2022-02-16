#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printHelp, printError, printSuccess} from "./services/log-rename.js";
import {saveKeyValue} from "./services/storage-service.js";
import {getKeyValue} from "./services/storage-service.js";
import {getCity, saveCity} from "./services/storage-service.js";
import {getWeatherByCityName} from "./services/api-service.js";
import {TOKEN_DICTIONARY} from "./constants.js";
import {printWeather} from "./services/log-rename.js";


const saveToken = async (token) => {
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        printHelp();
    }
    if (args.s) {
        await saveCity(args.s);
    }
    if (args.t) {
        return await saveToken(args.t);
    }

    const token = process.env.TOKEN ?? await getKeyValue(TOKEN_DICTIONARY.token);
    const city = process.env.CITY ?? await getCity();
    const response = await getWeatherByCityName({city, token});
    printWeather(response);

};

initCLI();