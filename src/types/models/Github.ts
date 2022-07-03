export type IssueState = 'open' | 'closed';

export interface Label {
    id?: number;
    url?: string;
    name?: string;
    description?: string | null;
    color?: string | null;
    default?: boolean;
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
    description: string | null;
    fork: boolean;
    url: string;
    archive_url: string;
    open_issues_count: number;
    topics?: string[];
    has_issues: boolean;
    has_projects: boolean;
    archived: boolean;
    disabled: boolean;
    visibility?: string; // 'public' | 'private' | 'internal';
    pushed_at: string | null;
    created_at: string | null;
    updated_at: string | null;
    open_issues: number;
}

export default interface Issue {
    id: number;
    url: string;
    repository_url: string;
    labels_url: string;
    number: number;
    state: string; // IssueState
    title: string;
    body?: string | null;
    user: GithubUser | null;
    labels: (string | Label)[];
    assignees?: GithubUser[] | null;
    comments: number;
    closed_at: null | string;
    created_at: string;
    updated_at: string;
    repository?: Repository;
}
