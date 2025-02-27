import {promises as fs} from "fs";

export const LINE = '|------------------------------------|';

export function logHeadline(line: string): void {
    console.log(`| ${line.padEnd(34, ' ')} |`);
}

export function errorHeadline(line: string): void {
    console.error(`| ${line.padEnd(34, ' ')} |`);
}

export function stdoutHeadline(line: string): void {
    process.stdout.write(`| ${line.padEnd(34, ' ')} |`);
}

export function stdoutClear(): void {
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
}

export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function readFile(fileName: string) {
    const data = await readFileRaw(fileName);
    return JSON.parse(data);
}

export async function readFileRaw(fileName: string) {
    const bufferedData = await fs.readFile(fileName);
    const data = await Buffer.from(bufferedData);

    return data.toString();
}

export async function writeFile(fileName: string, data: any) {
    await fs.writeFile(fileName, JSON.stringify(data, null, 2));
}
