export default interface SavedComment {
    issueId: number;
    ms: number;
    startTime: Date;
    endTime: Date;
    description?: string;
}
