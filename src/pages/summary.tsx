import { Checkbox, Container, Grid, GridItem, Stack, Text } from "@chakra-ui/react";
import { FC, ReactNode, useEffect, useState } from "react";
import { getAllIssuesOrFetch, getAllReposOrFetch } from "../data/GithubData";
import { useUserContext } from "../login/UserContext";
import Issue, { Repository } from "../types/models/Github";
import { capitalise } from "../utility/Utility";

const Summary: FC = () => {

    const userContext = useUserContext();
    const [issues, setIssues] = useState<Issue[]>([]);
    const [repos, setRepos] = useState<Repository[]>([]);
    const [filteredRepos, setFilteredRepos] = useState<boolean[]>([])

    useEffect(() => {
        async function fetch() {
            if (userContext.octokit && issues.length === 0) {
                setIssues(await getAllIssuesOrFetch(userContext.octokit));
                const repos = await getAllReposOrFetch(userContext.octokit);
                setRepos(repos);
                console.log(repos);
                setFilteredRepos(Array(repos.length).fill(true));
            }
        }

        fetch();
    }, [])

    function toggleRepoFilter(index: number) {
        setFilteredRepos(filteredRepos => {
            filteredRepos[index] = !filteredRepos[index];
            return [...filteredRepos];
        })
    }

    function generateRepoFilters(): ReactNode {
        return repos.map((repo, index) => (
                <Checkbox key={repo.id} isChecked={filteredRepos[index]} onChange={() => toggleRepoFilter(index)}>
                    {capitalise(repo.name)}
                </Checkbox>
            )
        );
    }


    return (
        <Container maxW="container.md">
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem w="100%">
                    <Stack spacing={2}>
                        <Text fontSize="xl">Filter Repositories</Text>
                        {generateRepoFilters()}
                    </Stack>
                </GridItem>
            </Grid>
        </Container>
    );
}

export default Summary