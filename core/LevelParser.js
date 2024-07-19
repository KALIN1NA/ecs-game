// import * as JSON5 from 'json5';
//
// export class LevelParser {
//     static async parse(levelPath) {
//         return JSON5.parse(await fetch(levelPath).then(response => response.text()));
//     }
// }
export class LevelParser {
    static async parse(levelPath) {
        const response = await fetch(levelPath);
        return await response.json();
    }
}