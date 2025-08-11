import path from 'path';
import { registerJob } from '@amohajewellery/amohajewellery/lib/cronjob';
export default function () {
    registerJob({
        name: 'sampleJob',
        schedule: '*/1 * * * *', // Runs every minute
        resolve: path.resolve(import.meta.dirname, 'crons', 'everyMinute.js'),
        enabled: true
    });
}
//# sourceMappingURL=bootstrap.js.map
