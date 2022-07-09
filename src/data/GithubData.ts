import { Octokit } from '@octokit/core';
import Issue, { IssueIdentifier } from '../types/models/Github';

const ISSUE_CACHE = new Map<IssueIdentifier, Issue>();

async function fetchIssue(issueId: IssueIdentifier, octokit: Octokit): Promise<Issue | null> {
    try {
        const res = await octokit.request('GET /repos/{owner}/{repo}/issues/{id}', { ...issueId });
        res.data;
    } catch (error) {
        console.log(error);
    }

    return null;
}

async function getIssueOrFetch(issueId: IssueIdentifier, octokit: Octokit): Promise<Issue | null> {
    if (!ISSUE_CACHE.has(issueId)) {
        const issue = await fetchIssue(issueId, octokit);
        if (issue) {
            ISSUE_CACHE.set(issueId, issue);
        }
    }
    return ISSUE_CACHE.get(issueId) ?? null;
}

async function fetchAllIssues(octokit: Octokit): Promise<Issue[]> {
    try {
        const res = await octokit.request('GET /issues');
        res.data.forEach((issue) => {
            if (issue.repository && issue.repository.owner.name) {
                ISSUE_CACHE.set(
                    { owner: issue.repository.owner.name, repo: issue.repository.name, id: issue.id },
                    issue,
                );
            }
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }

    return [];
}
