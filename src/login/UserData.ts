export const ALLOW_PRIVATE_REPOS = 'private_repos';
export const ACCESS_TOKEN = 'access_token';

export function canAccessPrivateRepos(): boolean {
    return localStorage.getItem(ALLOW_PRIVATE_REPOS) === 'true';
}

export function setCanAccessPrivateRepos(allow: boolean) {
    if (allow) localStorage.setItem(ALLOW_PRIVATE_REPOS, 'true');
    else localStorage.removeItem(ALLOW_PRIVATE_REPOS);
}

export function toggleCanAccessPrivateRepos() {
    setCanAccessPrivateRepos(!canAccessPrivateRepos());
}

export function getStoredAccessToken(): string | null {
    return localStorage.getItem(ACCESS_TOKEN);
}

export function setStoredAccessToken(accessToken: string) {
    localStorage.setItem(ACCESS_TOKEN, accessToken);
}

export function clearStoredAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN);
}
