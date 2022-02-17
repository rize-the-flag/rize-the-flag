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
        printError(e?.message);
    }
};

const getForekast = async () => {
    const token = await getKeyValue(TOKEN_DICTIONARY.token);
    const city = await getCity();
    if (!city) return printError('Город не задан');
    if (!token) return printError('token не задан');

    try {
        const response = await getWeatherByCityName({city, token});
        printWeather(response);
    } catch (e) {
        switch (e?.response?.status) {
            case 404:
                return printError('Город не найден');
            case 401:
                return printError('Неверный токен');
        }
    }
}

const initCLI = async () => {
    const args = getArgs(process.argv);

    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return await saveCity(args.s);
    }
    if (args.t) {
        return await saveToken(args.t);
    }
    await getForekast();

};

await initCLI();