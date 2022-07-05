import { FC, ReactNode } from 'react';
import IssueTimer from '../../types/models/Github';
import { capitalise } from '../../utility/Utility';
import Card from '../cards/Card';
import CardSeparator from '../cards/CardSeparator';
import Stack from '../utility/Stack';
import Timer from './Timer';

interface Props {
    issue: IssueTimer;
}

export function issueTitle(issue: IssueTimer): ReactNode {
    return (
        <Stack orientation="row">
            {issue.repository && capitalise(issue.repository?.name) + '/'}
            <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{issue.title}</div>
        </Stack>
    );
}

const IssueTimer: FC<Props> = (props) => {
    return (
        <Card>
            <Stack className="gap-y-2">
                <h5>{issueTitle(props.issue)}</h5>
                <CardSeparator />
                <Timer />
                <textarea
                    className="w-full border border-gray-300 rounded-md p-1"
                    placeholder="Description of what's being done..."
                />
            </Stack>
        </Card>
    );
};

export default IssueTimer;
