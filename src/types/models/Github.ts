export type IssueState = 'open' | 'closed';

export interface Label {
    id: number;
    url: string;
    name: string;
    description: string;
    color: string;
    default: boolean;
}

export interface GithubUser {
    login: string;
    id: number;
    avatar_url: string;
    url: string;
}

export interface Repository {
    id: number;
    name: string;
    full_name: string;
    owner: GithubUser;
    private: boolean;
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    archive_url: string;
    open_issues_count: number;
    topics: string[];
    has_issues: boolean;
    has_projects: boolean;
    archived: boolean;
    disabled: boolean;
    visibility: 'public' | 'private' | 'internal';
    pushed_at: string;
    created_at: string;
    updated_at: string;
    open_issues: number;
}

export default interface Issue {
    id: number;
    url: string;
    repository_url: string;
    labels_url: string;
    number: number;
    state: IssueState;
    title: string;
    body: string;
    user: GithubUser;
    labels: Label[];
    assignees: GithubUser[];
    comments: number;
    closed_at: null | string;
    created_at: string;
    updated_at: string;
    repository: Repository;
}
