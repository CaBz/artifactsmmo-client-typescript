export const LINE = '|------------------------------------|';

export function logHeadline(line: string): void {
    console.log(`| ${line.padEnd(34, ' ')} |`);
}

export function stdoutHeadline(line: string): void {
    process.stdout.write(`| ${line.padEnd(34, ' ')} |`);
}

export function stdoutClear(): void {
    process.stdout.clearLine(1);
    process.stdout.cursorTo(0);
}
