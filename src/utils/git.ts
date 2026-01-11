import { execSync } from "node:child_process";

export interface CommitterInfo {
  name: string;
  href: string;
}

export interface CommitInfo {
  hash: string;
  committer: CommitterInfo;
}

export const REPO = "AerynOS/dotdev";

const cache = new Map<string, CommitterInfo>();

const baseHeaders = {
  Accept: "application/vnd.github+json",
  "User-Agent": "AerynOS/docs (https://aerynos.dev)",
};

const GITHUB_OPTIONS: RequestInit = process.env.GITHUB_TOKEN
  ? {
      headers: {
        ...baseHeaders,
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      },
    }
  : { headers: baseHeaders };

export const getCommitInfo = async (
  filePath: string
): Promise<CommitInfo | null> => {
  let hash: string;
  let email: string;
  let name: string;

  try {
    const raw = execSync(`git log -1 --format="%H,%ae,%an" -- "${filePath}"`, {
      stdio: ["ignore", "pipe", "ignore"],
    })
      .toString()
      .trim();
    if (!raw) return null;
    [hash, email, name] = raw.split(",", 3);
  } catch {
    return null;
  }

  if (!hash || !email || !name) {
    return null;
  }

  const cached = cache.get(email);
  if (cached) {
    return { hash, committer: cached };
  }

  const info: CommitterInfo = { name, href: `mailto:${email}` };

  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits/${hash}`,
      GITHUB_OPTIONS
    );
    if (res.ok) {
      const commit = (await res.json()) as {
        author?: { html_url?: string };
      };
      if (commit.author?.html_url) {
        info.href = commit.author.html_url;
      }
    }
  } catch {
    // ignore network errors and fall back to mailto link
  }

  cache.set(email, info);
  return { hash, committer: info };
};
