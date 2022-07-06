import Issue from './Github';

export default interface SavedComment {
    issue: Issue;
    ms: number;
    startTime: Date;
    endTime: Date;
    description?: string;
}
