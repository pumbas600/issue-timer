import { FC } from 'react';
import IssueComment from '../../types/models/SavedComment';
import Stack from '../utility/Stack';
import { issueTitle } from './IssueTimer';
import { getDisplayTime } from './Timer';

interface Props {
    comment: IssueComment;
}

const IssueComment: FC<Props> = (props) => {
    return (
        <div>
            <Stack orientation="row" className="gap-x-2">
                <div className="text-sm">{issueTitle(props.comment.issue)}</div>
                <div className="bg-black w-1.5 h-1.5 rounded-full" />
                <h5>{getDisplayTime(props.comment.ms)}</h5>
            </Stack>
            {props.comment.description && (
                <div className="leading-5 mb-2 whitespace-pre-wrap">{props.comment.description}</div>
            )}
        </div>
    );
};

export default IssueComment;
