import fs from 'node:fs/promises';

export function fileReader(file) {
    try {
        return fs.readFile(file, { encoding: 'utf8' });
    } catch (err) {
        console.error(err);
        return null;
    }
}