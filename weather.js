#!/usr/bin/env node
import {getArgs} from "./helpers/args.js";
import {printHelp, printError, printSuccess} from "./services/log-rename.js";
import {saveKeyValue} from "./services/storage-service.js";

const saveToken = async (token) => {
    try {
        await saveKeyValue('token', token);
        printSuccess('Токен сохранен');
    } catch (e) {
        printError(e.message);
    }
};

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        printHelp();
    }
    if (args.s) {

    }
    if (args.t) {
        saveToken('token', args.t);
    }
};

initCLI();