export class GlobalError extends Error {
    public status: number;
    public extra?: any;
    constructor(message: string, status: number = 500, extra?: any) {
        super(message);
        this.status = status;
        this.extra = extra;
    }
}