import { FC } from 'react';
import { SavedTime } from '../../types/models/SavedTime';
import Stack from '../utility/Stack';
import { issueTitle } from './IssueTimer';
import { getDisplayTime } from './Timer';

interface Props {
    savedTime: SavedTime;
}

const SavedIssueTime: FC<Props> = (props) => {
    return (
        <div>
            <Stack orientation="row" className="gap-x-2">
                <div className="text-sm">
                    {issueTitle(props.savedTime.issueTitle, props.savedTime.isPR, props.savedTime.repoName)}
                </div>
                <div className="bg-black w-1.5 h-1.5 rounded-full" />
                <h5>{getDisplayTime(props.savedTime.ms)}</h5>
            </Stack>
            {props.savedTime.description && (
                <div className="leading-5 mb-2 whitespace-pre-wrap">{props.savedTime.description}</div>
            )}
        </div>
    );
};

export default SavedIssueTime;
