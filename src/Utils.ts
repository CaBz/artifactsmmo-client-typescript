export const LINE = '|------------------------------------|';

export async function sleep(ms: number){
    return new Promise(resolve => setTimeout(resolve, ms))
}

export function logHeadline(line: string): void {
    console.log(`| ${line.padEnd(34, ' ')} |`);
}
