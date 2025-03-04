import {promises as fs} from "fs";

export const LINE = `|${'-'.repeat(37)}|`;

export function logHeadline(line: string): void {
    console.log(`| ${line.padEnd(35, ' ')} |`);
}

export function errorHeadline(line: string): void {
    console.error(`| ${line.padEnd(35, ' ')} |`);
}

export function stdoutHeadline(line: string): void {
    process.stdout.write(`| ${line.padEnd(35, ' ')} |`);
}

export function stdoutClear(): void {
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
}

export function formatForMiddle(cellContent: string, length: number): string {
    if (length - cellContent.length <= 1) {
        return cellContent;
    }

    const spaces = (length - cellContent.length) / 2;
    return ' '.repeat(Math.floor(spaces)) + cellContent + ' '.repeat(Math.ceil(spaces));
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
