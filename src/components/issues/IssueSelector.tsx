import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useState } from 'react';
import Issue from '../../types/models/Github';
import { Component } from '../../types/Utility';
import { capitalise } from '../../utility/Utility';
import Card from '../cards/Card';
import FilledIconButton from '../inputs/buttons/FilledIconButton';
import Dropdown from '../inputs/dropdown/Dropdown';
import Option from '../inputs/dropdown/Option';
import Label from '../inputs/Label';
import Stack from '../Utility/Stack';

interface Props {
    issues: Issue[];
}

const IssueSelector: Component<Props> = (props) => {
    const [issue, setIssue] = useState<Issue | null>(null);

    function generateOptions(): ReactNode {
        return props.issues.map((issue) => {
            return (
                <Option key={issue.id} value={issue.id.toString()}>
                    <Stack orientation="row">
                        {issue.repository && capitalise(issue.repository?.name) + '/'}
                        <div className="font-semibold text-ellipsis overflow-hidden">{issue.title}</div>
                    </Stack>
                </Option>
            );
        });
    }

    return (
        <div className="m-2 flex justify-center">
            <Card className="w-[500px] overflow-visible">
                <Label label={<h5>Select Issue</h5>}>
                    <Stack orientation="row" className="gap-x-2">
                        <Dropdown
                            className="text-gray-500 hover:text-gray-600 border-gray-500 hover:border-gray-600 bg-gray-500"
                            placeholder="The issue..."
                            onSelect={(value) => console.log('Selected ' + value)}
                        >
                            {generateOptions()}
                        </Dropdown>
                        <FilledIconButton
                            className="bg-blue-500 hover:bg-blue-600 min-w-[38px] min-h-[38px]"
                            icon={faPlus}
                        />
                    </Stack>
                </Label>
            </Card>
        </div>
    );
};

export default IssueSelector;
