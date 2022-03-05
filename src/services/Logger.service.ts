export default class LoggerService {
    public static log(component: string, msg: any) {
        console.log(`Application Log (${component}): `, msg);
    }

    public static error(component: string, error: any) {
        console.error(`Application Error (${component}): `, error);
    }
}