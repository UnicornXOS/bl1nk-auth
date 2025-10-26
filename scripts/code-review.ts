#!/usr/bin/env tsx

/**
 * Automated Code Review Script
 *
 * This script can be run manually or as part of CI/CD pipeline
 * to perform comprehensive code analysis on a repository.
 *
 * Usage:
 *   npm run code-review -- --repo owner/repo --pr 123
 *   npm run code-review -- --help
 */

import { Octokit } from '@octokit/rest';
import { program } from 'commander';
import * as fs from 'fs';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { addCodeReviewToQueue } from '@/lib/queue';
import { analyzeCodeChanges } from '@/lib/integrations/code-review';

interface CLIOptions {
  repo: string;
  pr: number;
  branch?: string;
  baseBranch?: string;
  output?: string;
}

async function main() {
  // Parse command line arguments
  program
    .name('code-review')
    .description('Automated code review tool')
    .version('1.0.0')
    .requiredOption('-r, --repo <repository>', 'GitHub repository (owner/repo)')
    .requiredOption('-p, --pr <pull-request>', 'Pull request number', parseInt)
    .option('-b, --branch <branch>', 'Branch name', 'main')
    .option('-bb, --base-branch <base-branch>', 'Base branch for comparison', 'main')
    .option('-o, --output <file>', 'Output file for results')
    .parse();

  const options = program.opts<CLIOptions>();

  if (!ENV.GITHUB_TOKEN) {
    logger.error('GITHUB_TOKEN environment variable is required');
    process.exit(1);
  }

  try {
    logger.info('Starting code review', {
      repository: options.repo,
      pullRequest: options.pr,
      branch: options.branch,
      baseBranch: options.baseBranch,
    });

    // Get PR details from GitHub
    const prDetails = await getPullRequestDetails(options.repo, options.pr);

    // Get changed files
    const changedFiles = await getChangedFiles(options.repo, options.pr);

    // Create code review job
    const job = {
      provider: 'code-review' as const,
      repository: options.repo,
      pullRequest: options.pr,
      author: prDetails.author,
      branch: options.branch || 'main',
      baseBranch: options.baseBranch || 'main',
      changedFiles,
      timestamp: Date.now(),
    };

    // Run analysis
    const analysis = await analyzeCodeChanges(job);

    // Output results
    if (options.output) {
      await writeResultsToFile(options.output, analysis);
    } else {
      printResultsToConsole(analysis);
    }

    // Optionally enqueue for async processing
    if (ENV.CODE_REVIEW_ENABLED !== 'false') {
      await addCodeReviewToQueue(job);
      logger.info('Code review job enqueued for async processing');
    }

    // Exit with appropriate code based on analysis results
    const hasCriticalIssues = analysis.securityIssues.some((i: any) => i.severity === 'critical');
    const hasHighIssues = analysis.securityIssues.some((i: any) => i.severity === 'high');

    if (hasCriticalIssues) {
      logger.error('Code review found critical security issues');
      process.exit(1);
    } else if (hasHighIssues) {
      logger.warn('Code review found high-severity issues');
      process.exit(0); // Still pass but with warnings
    } else {
      logger.info('Code review completed successfully');
      process.exit(0);
    }

  } catch (error) {
    logger.error('Code review failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
    });
    process.exit(1);
  }
}

async function getPullRequestDetails(repository: string, pullRequest: number) {
  const [owner, repo] = repository.split('/');
  const octokit = new Octokit({ auth: ENV.GITHUB_TOKEN });

  try {
    const response = await octokit.pulls.get({
      owner,
      repo,
      pull_number: pullRequest,
    });

    return {
      author: response.data.user?.login || 'unknown',
      title: response.data.title,
      body: response.data.body,
      state: response.data.state,
      merged: response.data.merged,
      mergeable: response.data.mergeable,
    };
  } catch (error) {
    logger.error('Failed to fetch PR details', {
      repository,
      pullRequest,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

async function getChangedFiles(repository: string, pullRequest: number) {
  const [owner, repo] = repository.split('/');
  const octokit = new Octokit({ auth: ENV.GITHUB_TOKEN });

  try {
    const response = await octokit.pulls.listFiles({
      owner,
      repo,
      pull_number: pullRequest,
    });

    return response.data.map(file => ({
      filename: file.filename,
      status: file.status as 'added' | 'modified' | 'deleted' | 'renamed',
      additions: file.additions,
      deletions: file.deletions,
      patch: file.patch,
    }));
  } catch (error) {
    logger.error('Failed to fetch changed files', {
      repository,
      pullRequest,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

async function writeResultsToFile(outputPath: string, analysis: any) {
  const results = {
    timestamp: new Date().toISOString(),
    analysis,
  };

  await fs.promises.writeFile(
    outputPath,
    JSON.stringify(results, null, 2),
    'utf-8'
  );

  logger.info('Results written to file', { outputPath });
}

function printResultsToConsole(analysis: any) {
  console.log('\n🤖 Automated Code Review Results');
  console.log('================================');
  console.log(`Overall Score: ${analysis.overallScore}/100`);

  if (analysis.securityIssues.length > 0) {
    console.log(`\n🔴 Security Issues (${analysis.securityIssues.length}):`);
    analysis.securityIssues.forEach((issue: any) => {
      console.log(`  • Line ${issue.line}: ${issue.message} (${issue.severity})`);
      console.log(`    Suggestion: ${issue.suggestion}`);
    });
  }

  if (analysis.styleIssues.length > 0) {
    console.log(`\n🟡 Style Issues (${analysis.styleIssues.length}):`);
    analysis.styleIssues.slice(0, 5).forEach((issue: any) => {
      console.log(`  • Line ${issue.line}: ${issue.message}`);
      console.log(`    Suggestion: ${issue.suggestion}`);
    });
  }

  console.log(`\n📝 Summary: ${analysis.summary}`);
}

// Run the script
if (require.main === module) {
  main().catch((error) => {
    logger.error('Script execution failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    process.exit(1);
  });
}