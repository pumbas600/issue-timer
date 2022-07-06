import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ChangeEvent, FC, ReactNode, useState } from 'react';
import IssueTimer from '../../types/models/Github';
import { capitalise } from '../../utility/Utility';
import Card from '../cards/Card';
import CardSeparator from '../cards/CardSeparator';
import IconButton from '../inputs/buttons/IconButton';
import Stack from '../utility/Stack';
import TableRow from '../utility/TableRow';
import Timer from './Timer';

interface Props {
    issue: IssueTimer;
    onDelete: VoidFunction;
}

export function issueTitle(issue: IssueTimer): ReactNode {
    return (
        <Stack orientation="row" className="whitespace-nowrap">
            {issue.repository && capitalise(issue.repository?.name) + '/'}
            <div className="font-semibold text-ellipsis whitespace-nowrap overflow-hidden">{issue.title}</div>
        </Stack>
    );
}

const IssueTimer: FC<Props> = (props) => {
    const [description, setDescription] = useState<string | undefined>(undefined);

    function handleDescriptionUpdate(e: ChangeEvent<HTMLTextAreaElement>) {
        if (e.target.value.length === 0) setDescription(undefined);
        else setDescription(e.target.value);
    }

    return (
        <Card className="overflow-visible">
            <Stack className="gap-y-2">
                <Stack orientation="row" className="flex-reverse">
                    <h5 className="w-full overflow-hidden">{issueTitle(props.issue)}</h5>
                    <IconButton icon={faTrash} className="text-red-500 bg-red-500" onClick={props.onDelete} />
                </Stack>
                <CardSeparator />
                <Timer />
                <textarea
                    className="w-full border border-gray-300 rounded-md p-1"
                    placeholder="Description of what's being done..."
                    onChange={handleDescriptionUpdate}
                    value={description}
                    // https://stackoverflow.com/questions/881085/count-the-number-of-occurrences-of-a-character-in-a-string-in-javascript
                    rows={Math.max((description?.match(/\n/g) || []).length + 1, 2)}
                />
            </Stack>
        </Card>
    );
};

export default IssueTimer;
