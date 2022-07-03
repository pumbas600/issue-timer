import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Issue from '../../types/models/Github';
import { Component } from '../../types/Utility';
import Card from '../cards/Card';
import FilledIconButton from '../inputs/buttons/FilledIconButton';
import Label from '../inputs/Label';
import Stack from '../utility/Stack';

interface Props {
    issues: Issue[];
}

const IssueSelector: Component<Props> = (props) => {
    const [issue, setIssue] = useState<Issue | null>(null);

    return (
        <div className="m-2 flex justify-center">
            <Card className="w-[500px]">
                <Label label={<h6 className="font-semibold">Select Issue</h6>}>
                    <Stack orientation="row" className="gap-x-2">
                        <select className="p-1.5 border border-gray-300 rounded-lg">
                            {props.issues.map((issue) => {
                                return (
                                    <option key={issue.id} value={issue.id}>
                                        <div className="font-bold">
                                            {issue.repository && issue.repository?.name + '/'}
                                            <b>{issue.title}</b>
                                        </div>
                                    </option>
                                );
                            })}
                        </select>
                        <FilledIconButton className="bg-blue-500 hover:bg-blue-600 w-9 h-9" icon={faPlus} />
                    </Stack>
                </Label>
            </Card>
        </div>
    );
};

export default IssueSelector;
