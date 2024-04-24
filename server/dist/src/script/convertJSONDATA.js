"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
async function convert() {
    try {
        const jsonTaskData = await promises_1.default.readFile(`./data/availableTask.json`, "utf-8");
        if (!jsonTaskData)
            throw new Error("Something went wrong while trying to read the json seed data");
        const parsedJsonData = JSON.parse(jsonTaskData);
        const formattedJSONData = Object.entries(parsedJsonData).reduce((final, current) => {
            const [key, value] = current;
            const formattedMood = value.map((item) => {
                return { ...item, mood: key };
            });
            return [...final, ...formattedMood];
        }, []);
        await promises_1.default.writeFile(`./data/convertedDvailableTask.json`, JSON.stringify(formattedJSONData));
    }
    catch (err) {
        console.dir(err);
    }
}
convert();
//# sourceMappingURL=convertJSONDATA.js.map