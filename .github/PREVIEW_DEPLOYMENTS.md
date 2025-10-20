# Preview Deployments

This repository uses GitHub Actions to automatically deploy preview versions of the application for every pull request and branch.

## How It Works

### Preview Deployments (Pull Requests & Branches)

When you create a pull request or push to a branch:

1. The `preview.yml` workflow automatically triggers
2. It builds the WASM module and webpack bundle
3. Deploys the build to GitHub Pages at: `https://[owner].github.io/[repo]/preview/[branch-name]/`
4. For pull requests, a comment is posted with the preview URL

**Preview URL Format:**
```
https://[owner].github.io/sandspiel/preview/[branch-name]/
```

### Main Deployment

Pushes to `main` or `master` branches deploy to the root of GitHub Pages:
```
https://[owner].github.io/sandspiel/
```

### Cleanup

When a pull request is closed or a branch is deleted, the `cleanup-preview.yml` workflow automatically removes the preview deployment to keep the repository clean.

## Workflows

### 1. `preview.yml` - Deploy Preview
- **Triggers:** Pull requests and pushes to non-main branches
- **Actions:**
  - Sets up Node.js 18 and Rust
  - Builds WASM with wasm-pack
  - Builds webpack bundle
  - Deploys to `preview/[branch-name]/`
  - Comments on PR with preview URL

### 2. `deploy.yml` - Deploy Production
- **Triggers:** Pushes to main/master branch
- **Actions:**
  - Builds and deploys to root of GitHub Pages

### 3. `cleanup-preview.yml` - Cleanup Preview
- **Triggers:** PR closed or branch deleted
- **Actions:**
  - Removes the preview directory from GitHub Pages

## Requirements

The workflows use the following GitHub Actions:
- `actions/checkout@v4` - Check out repository code
- `actions/setup-node@v4` - Set up Node.js environment
- `dtolnay/rust-toolchain@stable` - Set up Rust toolchain
- `Swatinem/rust-cache@v2` - Cache Rust dependencies
- `peaceiris/actions-gh-pages@v3` - Deploy to GitHub Pages
- `actions/github-script@v7` - Post PR comments

## Permissions

The workflows require the following permissions:
- `contents: write` - To push to the gh-pages branch
- `pull-requests: write` - To comment on pull requests (preview workflow only)

These are granted via the `permissions` key in each workflow.

## Testing Locally

To test the build locally before pushing:

```bash
# Install Rust and wasm-pack
cargo install wasm-pack

# Build WASM
cd crate && wasm-pack build --target bundler

# Install npm dependencies
npm install --legacy-peer-deps

# Build the project
NODE_OPTIONS=--openssl-legacy-provider npm run build

# The output will be in the dist/ directory
```

## Troubleshooting

### Build Failures

If the workflow fails:
1. Check the Actions tab for detailed error logs
2. Ensure all dependencies are properly locked in package.json and Cargo.toml
3. Test the build locally using the commands above

### Preview Not Updating

If the preview doesn't update after pushing:
1. Check that the workflow completed successfully
2. Wait a few minutes for GitHub Pages to update
3. Try a hard refresh (Ctrl+Shift+R) in your browser

### Cleanup Not Working

If old previews aren't being cleaned up:
1. Check that the cleanup-preview.yml workflow ran
2. Manually delete the preview directory from the gh-pages branch if needed
