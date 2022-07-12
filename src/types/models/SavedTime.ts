interface SavedTime {
    id: string;
    ms: number;
    startTime: Date;
    endTime: Date;
    description?: string;
    issueId: number;
    repoName?: string;
    ownerName?: string;
    issueTitle?: string;
    isPR: boolean;
}

type SavedTimeNoId = Omit<SavedTime, 'id'>;

export type { SavedTime, SavedTimeNoId };
