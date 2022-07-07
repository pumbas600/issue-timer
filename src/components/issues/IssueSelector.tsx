import { faCircleDot } from '@fortawesome/free-regular-svg-icons';
import { faCodePullRequest, faPlus } from '@fortawesome/free-solid-svg-icons';
import { ReactNode, useState } from 'react';
import Issue from '../../types/models/Github';
import { Component } from '../../types/Utility';
import { first } from '../../utility/Utility';
import Card from '../cards/Card';
import FilledIconButton from '../inputs/buttons/FilledIconButton';
import IconButton from '../inputs/buttons/IconButton';
import Checkbox from '../inputs/checkbox/Checkbox';
import Dropdown from '../inputs/dropdown/Dropdown';
import Option from '../inputs/dropdown/Option';
import Label from '../inputs/Label';
import Stack from '../utility/Stack';
import { issueTitle } from './IssueTimer';

interface Props {
    issues: Issue[];
    onAddIssue?: (issue: Issue) => void;
}

interface Filters {
    issues: boolean;
    pullRequests: boolean;
}

const IssueSelector: Component<Props> = (props) => {
    const [selectedIssue, setSelectedIssue] = useState<string | null>(null);
    const [filters, setFilers] = useState<Filters>({ issues: true, pullRequests: true });

    function generateOptions(filteredIssues: Issue[]): ReactNode {
        return filteredIssues.map((issue) => {
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

    function renderDropdown(): ReactNode {
        if (!filters.issues && !filters.pullRequests) {
            return (
                <div>
                    {"Don't feel like doing anything?"}
                    <br />
                    <div className="font-semibold">No worries, take a break.</div>
                </div>
            );
        }

        let filteredIssues: Issue[];
        if (filters.issues && filters.pullRequests) filteredIssues = props.issues;
        else
            filteredIssues = props.issues.filter(
                (issue) =>
                    (filters.issues && filters.pullRequests) ||
                    (!filters.issues && issue.pull_request) ||
                    (!filters.pullRequests && !issue.pull_request),
            );

        if (filteredIssues.length === 0) {
            let selectedNames: string;
            if (filters.issues && filters.pullRequests) {
                selectedNames = 'issues/PRs';
            } else if (filters.issues) {
                selectedNames = 'issues';
            } else selectedNames = 'PRs';

            return (
                <div>
                    {`You currently don't have any ${selectedNames} assigned to you.`}
                    <br />
                    <div className="font-semibold">Enjoy the break!</div>
                </div>
            );
        }

        return (
            <Stack orientation="row" className="gap-x-2 mt-1">
                <Dropdown
                    className="border-gray-300 bg-gray-500"
                    placeholder="The issue..."
                    onSelect={(value) => setSelectedIssue(value)}
                    value={selectedIssue}
                >
                    {generateOptions(filteredIssues)}
                </Dropdown>
                <FilledIconButton
                    className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400"
                    icon={faPlus}
                    onClick={addIssue}
                    disabled={selectedIssue === null}
                />
            </Stack>
        );
    }

    return (
        <div className="flex justify-center">
            <Card className="w-full overflow-visible">
                <Stack orientation="row" className="justify-between">
                    <h5 className="whitespace-nowrap">Select Issue</h5>
                    <Stack orientation="row">
                        <IconButton
                            title={filters.issues ? 'Remove issues from dropdown' : 'Include issues in dropdown'}
                            icon={faCircleDot}
                            size="lg"
                            className={`${filters.issues ? 'text-blue-500' : 'text-gray-300'}`}
                            onClick={() => setFilers({ ...filters, issues: !filters.issues })}
                        />
                        <IconButton
                            title={filters.pullRequests ? 'Remove PRs from dropdown' : 'Include PRs in dropdown'}
                            icon={faCodePullRequest}
                            size="lg"
                            className={`${filters.pullRequests ? 'text-blue-500' : 'text-gray-300'}`}
                            onClick={() => setFilers({ ...filters, pullRequests: !filters.pullRequests })}
                        />
                    </Stack>
                </Stack>
                {renderDropdown()}
            </Card>
        </div>
    );
};

export default IssueSelector;
