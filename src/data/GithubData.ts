import { Octokit } from '@octokit/core';
import Issue, { IssueIdentifier, Repository } from '../types/models/Github';

const ISSUE_CACHE = new Map<IssueIdentifier, Issue>();
const REPO_CACHE= new Map<number, Repository>();

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
            if (issue.repository) {
                ISSUE_CACHE.set(
                    { owner: issue.repository.owner.login, repo: issue.repository.name, id: issue.id },
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

function getAllIssues(): Issue[] {
    return Array.from(ISSUE_CACHE.values());
}

async function getAllIssuesOrFetch(octokit: Octokit): Promise<Issue[]> {
    const cachedIssues = getAllIssues();
    if (cachedIssues.length !== 0) {
        return cachedIssues;
    }
    return await fetchAllIssues(octokit);
}

async function getAllReposOrFetch(octokit: Octokit): Promise<Repository[]> {
    if (REPO_CACHE.size === 0) {
        const issues = await getAllIssuesOrFetch(octokit);
        issues.forEach(issue => {
            if (issue.repository)
                REPO_CACHE.set(issue.repository.id, issue.repository);
        });
    }
    
    return Array.from(REPO_CACHE.values());
}

export { getIssueOrFetch, fetchAllIssues, getAllIssues, getAllIssuesOrFetch, getAllReposOrFetch };
