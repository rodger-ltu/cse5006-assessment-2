# Git question preparation

This is a plain-language reference for the assessment discussion. It describes
the repository that actually exists; it does not claim pull requests or other
workflows that were not used.

## What we did

- Created the local repository with `git init`.
- Configured Rodger Herbert and the La Trobe student email as the repository
  author identity.
- Connected the local repository to the private GitHub repository as `origin`.
- Used `main` for reviewed work and feature branches for major stages.
- Created descriptive commits rather than one large final commit.
- Pushed the feature branches and main history to GitHub.
- Kept `node_modules` and `.next` out of Git through `.gitignore`.

## Actual feature branches

- `feature/app-shell`
- `feature/announcement-feed`
- `feature/announcement-details`
- `feature/themes`
- `feature/responsive-navigation`
- `feature/accessibility-polish`
- `feature/finalisation`

The commit history is linear because each stage was built after the previous
stage had been reviewed. The feature branches act as named milestones and safe
development checkpoints. We did not create artificial conflicting branches or
claim to use pull requests.

## Actual staged commits

1. `chore: initialise Next.js project foundation`
2. `feat: build reusable application shell`
3. `feat: add typed university announcement feed`
4. `feat: add latest announcements and dynamic detail pages`
5. `feat: add persistent application themes`
6. `feat: add responsive selectable navigation`
7. `fix: adjust application scrollbar positioning`
8. `feat: improve accessibility and feed navigation`
9. `feat: finalise homepage and feed hierarchy`

## Commands to understand

### `git status`

Shows the current branch and which files are modified, staged or untracked. We
used it before committing to confirm exactly what would be included.

### `git add ...`

Copies selected changes into Git's staging area. Staging lets us choose the
files belonging to one logical commit.

### `git commit -m "message"`

Creates a local checkpoint from the staged changes. The message briefly states
the purpose of that checkpoint.

### `git switch -c feature/name`

Creates a new branch at the current commit and switches to it. A branch is a
movable name pointing to a line of commits; it is not a second full copy of the
project.

### `git push -u origin branch-name`

Uploads the local branch to the GitHub remote named `origin`. The `-u` records
the tracking relationship so later pushes can use the shorter `git push`.

### `git log --oneline --decorate --graph --all`

Displays the compact history, branch labels and relationship between commits.
This is the best command to show during the video.

## Likely questions and short answers

### What is the difference between Git and GitHub?

Git is the local version-control program that records commits and branches.
GitHub stores a remote copy of the repository and makes the history available
for submission and review.

### What is the difference between a commit and a push?

A commit records a checkpoint locally. A push transfers local commits to the
GitHub remote. A committed change is not automatically online until it is
pushed.

### Why did you use branches?

They separate major development stages, preserve safe checkpoints and make the
history easier to inspect. If a stage failed, the previously reviewed branch
and commit would still be available.

### Why is the graph mostly a straight line?

This was an individual staged project. Each feature began after the preceding
stage was reviewed, so there was no genuine parallel development to merge. The
linear history honestly represents the work.

### Why are `node_modules` and `.next` not committed?

They are generated folders. Dependencies can be recreated from `package.json`
and `package-lock.json`, while `.next` is recreated by the build. Committing
them would make the repository unnecessarily large and noisy.

### How can someone reproduce the project?

Clone the GitHub repository, run `npm install`, then `npm run dev`. The lockfile
records the dependency versions used by the project.

### What remains before submission?

Review and commit the current final cleanup, push it, advance `main` to the
approved final commit, run lint and the production build, then prepare the zip
without `node_modules` or `.next`.

## Current position when this note was drafted

- Current branch: `feature/finalisation`
- Latest committed checkpoint: `bb7a96f`
- `main` currently points to the reviewed accessibility commit `8841ab1`.
- The most recent interface cleanup and documentation changes are intentionally
  uncommitted until Rodger finishes the visual review.

Update this final section after the last commit and merge so it remains true.
