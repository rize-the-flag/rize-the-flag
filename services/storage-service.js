import {homedir} from 'os';
import {join} from 'path';
import {promises} from 'fs'
import {TOKEN_DICTIONARY} from "../constants.js";

const filePath = join(homedir(), 'weather-data.json');


const isExist = async (path) => {
    try {
        await promises.stat(path);
        return true;
    } catch (e) {
        return false;
    }
};

export const getKeyValue = async (key) => {
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        const data = await JSON.parse(file.toString());
        return data[key];
    }
};

export const saveKeyValue = async (key, value) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file.toString());
    }
    data[key] = value;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export const saveCity = async (city) => {
    let data = {};
    if (await isExist(filePath)) {
        const file = await promises.readFile(filePath);
        data = JSON.parse(file.toString());
    }
    data[TOKEN_DICTIONARY.city] = city;
    await promises.writeFile(filePath, JSON.stringify(data));
};

export const getCity = async () => {
    if (await isExist(filePath)) {
        const data = await promises.readFile(filePath);
        return JSON.parse(data.toString())[TOKEN_DICTIONARY.city];
    }
};