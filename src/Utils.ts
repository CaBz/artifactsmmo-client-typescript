export const LINE = '|------------------------------------|';

export function logHeadline(line: string): void {
    console.log(`| ${line.padEnd(34, ' ')} |`);
}
