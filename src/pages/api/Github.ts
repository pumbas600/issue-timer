import { Octokit } from '@octokit/core';

export default async function test(octokit: Octokit) {
    const response = await octokit.request('GET /issues', {});
    console.log(response);
}
