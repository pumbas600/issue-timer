import Issue from './Github';

interface BaseSavedTime {
    id: string;
    ms: number;
    startTime: Date;
    endTime: Date;
    description?: string;
}

interface SavedTime extends BaseSavedTime {
    issue: Issue;
}

interface FirebaseSavedTime extends BaseSavedTime {
    issueId: number;
}

export type { SavedTime, FirebaseSavedTime };
