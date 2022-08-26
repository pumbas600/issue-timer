import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { Checkbox, Container, Grid, GridItem, IconButton, Stack, Text } from '@chakra-ui/react';
import { faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { collection } from 'firebase/firestore';
import { FC, ReactNode, useEffect, useState } from 'react';
import { getAllIssuesOrFetch, getAllReposOrFetch } from '../data/GithubData';
import { db } from '../firebase/FirebaseApp';
import { useUserContext } from '../login/UserContext';
import Issue, { Repository } from '../types/models/Github';
import { capitalise } from '../utility/Utility';

interface GrouppedIssue {
    repo: Repository;
    issues: (Issue & { isEnabled: boolean })[];
    enabledCount: number;
    isExpanded: boolean;
}

const savedTimesRef = collection(db, 'savedtimes');

const Summary: FC = () => {
    const userContext = useUserContext();
    const [grouppedIssues, setGrouppedIssues] = useState<GrouppedIssue[]>([]);

    useEffect(() => {
        async function fetch() {
            if (userContext.octokit && grouppedIssues.length === 0) {
                const issues = await getAllIssuesOrFetch(userContext.octokit);

                setGrouppedIssues(groupIssuesByRepo(issues));
            }
        }

        fetch();
    }, []);

    function createGrouping(issue: Issue): GrouppedIssue {
        return {
            repo: issue.repository!,
            issues: [{ ...issue, isEnabled: true }],
            enabledCount: 1,
            isExpanded: false,
        };
    }

    function groupIssuesByRepo(issues: Issue[]): GrouppedIssue[] {
        const grouppedIssues: GrouppedIssue[] = [];

        let currentGrouppedIssue: GrouppedIssue | null = null;

        issues.sort((a, b) => (a.repository!.name > b.repository!.name ? 1 : -1));
        issues.forEach((issue) => {
            if (!issue.repository) return;

            if (currentGrouppedIssue === null) {
                currentGrouppedIssue = createGrouping(issue);
            } else if (currentGrouppedIssue.repo.id !== issue.repository.id) {
                grouppedIssues.push(currentGrouppedIssue);
                currentGrouppedIssue = createGrouping(issue);
            } else {
                currentGrouppedIssue.issues.push({ ...issue, isEnabled: true });
                currentGrouppedIssue.enabledCount++;
            }
        });

        if (currentGrouppedIssue !== null) {
            grouppedIssues.push(currentGrouppedIssue);
        }

        return grouppedIssues;
    }

    function enableIssue(repoIndex: number, issueIndex: number, isEnabled: boolean) {
        setGrouppedIssues((grouppedIssues) => {
            const grouping = grouppedIssues[repoIndex];
            grouping.issues[issueIndex].isEnabled = isEnabled;
            if (isEnabled) {
                grouping.enabledCount++;
            } else {
                grouping.enabledCount--;
            }

            return [...grouppedIssues];
        });
    }

    function enableAllIssues(repoIndex: number, isEnabled: boolean) {
        setGrouppedIssues((grouppedIssues) => {
            const grouping = grouppedIssues[repoIndex];

            grouping.issues.forEach((issue) => {
                issue.isEnabled = isEnabled;
            });

            if (isEnabled) {
                grouping.enabledCount = grouping.issues.length;
            } else {
                grouping.enabledCount = 0;
            }

            return [...grouppedIssues];
        });
    }

    function toggleExpandIssueFilters(repoIndex: number) {
        setGrouppedIssues((grouppedIssues) => {
            const grouping = grouppedIssues[repoIndex];
            grouping.isExpanded = !grouping.isExpanded;
            return [...grouppedIssues];
        });
    }

    function generateIssueFilters(grouppedIssue: GrouppedIssue, repoIndex: number): ReactNode {
        return grouppedIssue.issues.map((issue, issueIndex) => (
            <Checkbox
                key={issue.id}
                isChecked={issue.isEnabled}
                onChange={(e) => enableIssue(repoIndex, issueIndex, e.target.checked)}
            >
                {capitalise(issue.title)}
            </Checkbox>
        ));
    }

    function generateRepoFilters(): ReactNode {
        return grouppedIssues.map((grouppedIssue, repoIndex) => {
            const isIndeterminate =
                grouppedIssue.enabledCount !== grouppedIssue.issues.length && grouppedIssue.enabledCount !== 0;

            return (
                <div key={grouppedIssue.repo.id}>
                    <Stack direction="row" alignItems="center" spacing={0}>
                        <Checkbox
                            isIndeterminate={isIndeterminate}
                            isChecked={grouppedIssue.enabledCount !== 0}
                            onChange={(e) => enableAllIssues(repoIndex, e.target.checked)}
                        >
                            <Text fontSize="lg">{capitalise(grouppedIssue.repo.name)}</Text>
                        </Checkbox>
                        <IconButton
                            onClick={() => toggleExpandIssueFilters(repoIndex)}
                            variant="ghost"
                            colorScheme="black"
                            size="sm"
                            aria-label={grouppedIssue.isExpanded ? 'Collapse issues' : 'Expand issues'}
                            icon={
                                grouppedIssue.isExpanded ? (
                                    <FontAwesomeIcon icon={faChevronDown} size="sm" />
                                ) : (
                                    <FontAwesomeIcon icon={faChevronRight} size="sm" />
                                )
                            }
                        />
                    </Stack>
                    {grouppedIssue.isExpanded && (
                        <Stack ml={6} spacing={0.5}>
                            {generateIssueFilters(grouppedIssue, repoIndex)}
                        </Stack>
                    )}
                </div>
            );
        });
    }

    return (
        <Container maxW="container.md">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%">
                    <Stack spacing={2}>
                        <Text fontSize="xl">Filter Issues</Text>
                        {generateRepoFilters()}
                    </Stack>
                </GridItem>
            </Grid>
        </Container>
    );
};

export default Summary;
