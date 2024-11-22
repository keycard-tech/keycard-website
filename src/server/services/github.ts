import { Octokit } from '@octokit/rest'

const octokit = new Octokit()

export const RELEASE_TAG_FALLBACK = 'Latest version'

type Repo = 'status-mobile' | 'status-desktop'

export async function fetchLatestRelease({ repo }: { repo: Repo }) {
  const release = octokit.rest.repos.getLatestRelease({
    owner: 'status-im',
    repo,
  })

  return release
}
