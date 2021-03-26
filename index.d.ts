import { Readable } from 'stream';

declare global {
    interface Console {
        draft(message?: any, ...optionalParams: any[]): (message?: any, ...optionalParams: any[]) => void;
    }
}

declare class LineCountStream {
    addLineListener(inStream: Readable): void;
}

declare function DraftLog(console: Console, extra?: boolean): LineCountStream;
declare namespace DraftLog {
    declare function into(console: Console, extra?: boolean): LineCountStream;
}
export = DraftLog;
