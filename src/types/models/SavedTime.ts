import Issue from './Github';

interface SavedTime {
    issue: Issue;
    ms: number;
    startTime: Date;
    endTime: Date;
    description?: string;
}

export type { SavedTime };
