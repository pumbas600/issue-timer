import { FC } from 'react';
import IssueComment from '../../types/models/SavedComment';
import { getDisplayTime } from './Timer';

interface Props {
    comment: IssueComment;
}

const IssueComment: FC<Props> = (props) => {
    return (
        <div>
            <h5>{getDisplayTime(props.comment.ms)}</h5>
            {props.comment.description}
        </div>
    );
};

export default IssueComment;
