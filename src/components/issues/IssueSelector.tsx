import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useState } from 'react';
import Issue from '../../types/models/Github';
import { Component } from '../../types/Utility';
import { first } from '../../utility/Utility';
import Card from '../cards/Card';
import FilledIconButton from '../inputs/buttons/FilledIconButton';
import Dropdown from '../inputs/dropdown/Dropdown';
import Option from '../inputs/dropdown/Option';
import Label from '../inputs/Label';
import Stack from '../utility/Stack';
import { issueTitle } from './Issue';

interface Props {
    issues: Issue[];
    onAddIssue?: (issue: Issue) => void;
}

const IssueSelector: Component<Props> = (props) => {
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);

    function generateOptions(): ReactNode {
        return props.issues.map((issue) => {
            return (
                <Option key={issue.id} value={issue.id.toString()}>
                    {issueTitle(issue)}
                </Option>
            );
        });
    }

    function addIssue() {
        if (props.onAddIssue) {
            const issue = first(props.issues, (issue) => issue.id.toString() === selectedIssue);
            if (issue) props.onAddIssue(issue);
        }
        setSelectedIssue(null);
    }

    return (
        <div className="flex justify-center">
            <Card className="w-[500px] overflow-visible">
                <Label label={<h5>Select Issue</h5>}>
                    <Stack orientation="row" className="gap-x-2 mt-1">
                        <Dropdown
                            className="border-gray-300 bg-gray-500"
                            placeholder="The issue..."
                            onSelect={(value) => setSelectedIssue(value)}
                            value={selectedIssue}
                        >
                            {generateOptions()}
                        </Dropdown>
                        <FilledIconButton
                            className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400"
                            icon={faPlus}
                            onClick={addIssue}
                            disabled={selectedIssue === null}
                        />
                    </Stack>
                </Label>
            </Card>
        </div>
    );
};

export default IssueSelector;
