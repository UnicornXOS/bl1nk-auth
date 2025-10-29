import { Octokit } from '@octokit/rest';

import { ENV } from '@/lib/env';
import { logger } from '@/lib/logger';
import { sendCodeReviewNotification } from '@/lib/integrations/slack';
import { CodeReviewJob } from '@/lib/queue';

const octokit = new Octokit({
  auth: ENV.GITHUB_TOKEN,
});

export async function processCodeReviewWebhook(payload: unknown): Promise<void> {
  if (!ENV.GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable is not set');
  }

  if (!ENV.CODE_REVIEW_ENABLED || ENV.CODE_REVIEW_ENABLED === 'false') {
    logger.info('Code review is disabled, skipping processing');
    return;
  }

  const job = payload as CodeReviewJob;

  logger.info('Processing code review', {
    repository: job.repository,
    pullRequest: job.pullRequest,
    author: job.author,
    filesChanged: job.changedFiles.length,
  });

  try {
    // Run comprehensive code analysis
    const analysis = await analyzeCodeChanges(job);

    // Send Slack notification with results
    await sendCodeReviewNotification({
      repository: job.repository,
      pullRequest: job.pullRequest,
      author: job.author,
      branch: job.branch,
      analysis,
    });

    // Comment on the PR with detailed feedback
    await commentOnPullRequest(job, analysis);

    logger.info('Code review completed successfully', {
      repository: job.repository,
      pullRequest: job.pullRequest,
    });

  } catch (error) {
    logger.error('Code review processing failed', {
      repository: job.repository,
      pullRequest: job.pullRequest,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

export async function analyzeCodeChanges(job: CodeReviewJob): Promise<CodeAnalysisResult> {
  const analysis: CodeAnalysisResult = {
    securityIssues: [],
    styleIssues: [],
    complexityIssues: [],
    performanceIssues: [],
    overallScore: 100,
    summary: '',
  };

  for (const file of job.changedFiles) {
    if (file.status === 'deleted') continue;

    try {
      // Get file content from GitHub
      const fileContent = await getFileContent(job.repository, job.branch, file.filename);

      // Run security analysis
      const securityResults = await analyzeSecurity(file.filename, fileContent);
      analysis.securityIssues.push(...securityResults);

      // Run style analysis
      const styleResults = await analyzeStyle(file.filename, fileContent);
      analysis.styleIssues.push(...styleResults);

      // Run complexity analysis
      const complexityResults = await analyzeComplexity(file.filename, fileContent);
      analysis.complexityIssues.push(...complexityResults);

      // Run performance analysis
      const performanceResults = await analyzePerformance(file.filename, fileContent);
      analysis.performanceIssues.push(...performanceResults);

    } catch (error) {
      logger.warn('Failed to analyze file', {
        filename: file.filename,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  // Calculate overall score
  analysis.overallScore = calculateOverallScore(analysis);

  // Generate summary
  analysis.summary = generateAnalysisSummary(analysis);

  return analysis;
}

async function getFileContent(repository: string, branch: string, filename: string): Promise<string> {
  const [owner, repo] = repository.split('/');

  try {
    const response = await octokit.repos.getContent({
      owner,
      repo,
      path: filename,
      ref: branch,
    });

    if ('content' in response.data && typeof response.data.content === 'string') {
      return Buffer.from(response.data.content, 'base64').toString('utf-8');
    }

    throw new Error('File content not available');
  } catch (error) {
    logger.error('Failed to fetch file content', {
      repository,
      branch,
      filename,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

async function analyzeSecurity(filename: string, content: string): Promise<SecurityIssue[]> {
  const issues: SecurityIssue[] = [];

  // Check for hardcoded secrets
  const secretPatterns = [
    /password\s*[:=]\s*['"][^'"]+['"]/gi,
    /secret\s*[:=]\s*['"][^'"]+['"]/gi,
    /token\s*[:=]\s*['"][^'"]+['"]/gi,
    /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/gi,
    /private[_-]?key\s*[:=]\s*['"][^'"]+['"]/gi,
  ];

  secretPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        issues.push({
          type: 'hardcoded_secret',
          severity: 'critical',
          line: getLineNumber(content, match),
          message: 'Hardcoded secret detected',
          suggestion: 'Move secrets to environment variables',
          code: match.trim(),
        });
      });
    }
  });

  // Check for SQL injection vulnerabilities
  const sqlPatterns = [
    /execute\s*\(\s*['"`].*[\+\$].*['"`]\s*\)/gi,
    /query\s*\(\s*['"`].*[\+\$].*['"`]\s*\)/gi,
    /SELECT.*WHERE.*[\+\$]/gi,
    /INSERT.*VALUES.*[\+\$]/gi,
  ];

  sqlPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        issues.push({
          type: 'sql_injection',
          severity: 'high',
          line: getLineNumber(content, match),
          message: 'Potential SQL injection vulnerability',
          suggestion: 'Use parameterized queries or prepared statements',
          code: match.trim(),
        });
      });
    }
  });

  // Check for XSS vulnerabilities
  const xssPatterns = [
    /innerHTML\s*[:=]\s*[^;]+[\+\$][^;]+/gi,
    /outerHTML\s*[:=]\s*[^;]+[\+\$][^;]+/gi,
    /document\.write\s*\(\s*[^)]*[\+\$][^)]*\s*\)/gi,
  ];

  xssPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        issues.push({
          type: 'xss',
          severity: 'high',
          line: getLineNumber(content, match),
          message: 'Potential XSS vulnerability',
          suggestion: 'Use textContent or sanitize input',
          code: match.trim(),
        });
      });
    }
  });

  return issues;
}

async function analyzeStyle(filename: string, content: string): Promise<StyleIssue[]> {
  const issues: StyleIssue[] = [];
  const lines = content.split('\n');

  // Check for console.log statements
  lines.forEach((line, index) => {
    if (line.includes('console.log') || line.includes('console.error') || line.includes('console.warn')) {
      issues.push({
        type: 'debug_statement',
        severity: 'low',
        line: index + 1,
        message: 'Debug statement found',
        suggestion: 'Remove debug statements before production',
        code: line.trim(),
      });
    }
  });

  // Check for long lines
  lines.forEach((line, index) => {
    if (line.length > 120) {
      issues.push({
        type: 'long_line',
        severity: 'low',
        line: index + 1,
        message: 'Line too long',
        suggestion: 'Break line into multiple lines',
        code: line.trim(),
      });
    }
  });

  // Check for missing semicolons (basic check)
  lines.forEach((line, index) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') &&
        !trimmed.startsWith('//') && !trimmed.startsWith('/*') && !trimmed.startsWith('*')) {
      issues.push({
        type: 'missing_semicolon',
        severity: 'low',
        line: index + 1,
        message: 'Missing semicolon',
        suggestion: 'Add semicolon at end of statement',
        code: line.trim(),
      });
    }
  });

  return issues;
}

async function analyzeComplexity(filename: string, content: string): Promise<ComplexityIssue[]> {
  const issues: ComplexityIssue[] = [];
  const lines = content.split('\n');

  // Check for large functions
  let functionStart = -1;
  let functionLines = 0;
  let inFunction = false;

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.includes('function ') || trimmed.match(/^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*\(/)) {
      if (inFunction) {
        // End of previous function
        if (functionLines > 50) {
          issues.push({
            type: 'large_function',
            severity: 'medium',
            line: functionStart + 1,
            message: `Function too large (${functionLines} lines)`,
            suggestion: 'Break down into smaller functions',
            code: '',
          });
        }
      }

      functionStart = index;
      functionLines = 0;
      inFunction = true;
    }

    if (inFunction) {
      functionLines++;

      if (trimmed.includes('}')) {
        if (functionLines > 50) {
          issues.push({
            type: 'large_function',
            severity: 'medium',
            line: functionStart + 1,
            message: `Function too large (${functionLines} lines)`,
            suggestion: 'Break down into smaller functions',
            code: '',
          });
        }
        inFunction = false;
      }
    }
  });

  // Check for deep nesting
  let depth = 0;
  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (trimmed.includes('{')) {
      depth++;
      if (depth > 4) {
        issues.push({
          type: 'deep_nesting',
          severity: 'medium',
          line: index + 1,
          message: `Deep nesting detected (level ${depth})`,
          suggestion: 'Extract nested logic into separate functions',
          code: line.trim(),
        });
      }
    }

    if (trimmed.includes('}')) {
      depth--;
    }
  });

  return issues;
}

async function analyzePerformance(filename: string, content: string): Promise<PerformanceIssue[]> {
  const issues: PerformanceIssue[] = [];

  // Check for inefficient loops
  const loopPatterns = [
    /for\s*\(\s*let\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\.length\s*;\s*\w+\+\+\s*\)/gi,
    /for\s*\(\s*var\s+\w+\s*=\s*0\s*;\s*\w+\s*<\s*\w+\.length\s*;\s*\w+\+\+\s*\)/gi,
  ];

  loopPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        issues.push({
          type: 'inefficient_loop',
          severity: 'low',
          line: getLineNumber(content, match),
          message: 'Inefficient loop pattern detected',
          suggestion: 'Cache array length or use for...of loop',
          code: match.trim(),
        });
      });
    }
  });

  // Check for synchronous operations that could be async
  const syncPatterns = [
    /fs\.readFileSync/gi,
    /fs\.writeFileSync/gi,
    /require\s*\(/gi,
  ];

  syncPatterns.forEach((pattern) => {
    const matches = content.match(pattern);
    if (matches) {
      matches.forEach((match) => {
        issues.push({
          type: 'sync_operation',
          severity: 'low',
          line: getLineNumber(content, match),
          message: 'Synchronous operation detected',
          suggestion: 'Consider using asynchronous alternatives',
          code: match.trim(),
        });
      });
    }
  });

  return issues;
}

async function commentOnPullRequest(job: CodeReviewJob, analysis: CodeAnalysisResult): Promise<void> {
  const [owner, repo] = job.repository.split('/');

  const commentBody = generateCommentBody(analysis);

  try {
    await octokit.issues.createComment({
      owner,
      repo,
      issue_number: job.pullRequest,
      body: commentBody,
    });

    logger.info('PR comment created successfully', {
      repository: job.repository,
      pullRequest: job.pullRequest,
    });

  } catch (error) {
    logger.error('Failed to create PR comment', {
      repository: job.repository,
      pullRequest: job.pullRequest,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw error;
  }
}

function generateCommentBody(analysis: CodeAnalysisResult): string {
  let body = `## 🤖 Automated Code Review\n\n`;

  body += `**Overall Score: ${analysis.overallScore}/100**\n\n`;

  if (analysis.securityIssues.length > 0) {
    body += `### 🔴 Security Issues (${analysis.securityIssues.length})\n\n`;
    analysis.securityIssues.slice(0, 5).forEach((issue) => {
      body += `- **Line ${issue.line}**: ${issue.message}\n`;
      body += `  - Suggestion: ${issue.suggestion}\n`;
      if (issue.code) {
        body += `  - Code: \`${issue.code}\`\n`;
      }
      body += `\n`;
    });

    if (analysis.securityIssues.length > 5) {
      body += `*... and ${analysis.securityIssues.length - 5} more issues*\n\n`;
    }
  }

  if (analysis.styleIssues.length > 0) {
    body += `### 🟡 Style Issues (${analysis.styleIssues.length})\n\n`;
    analysis.styleIssues.slice(0, 3).forEach((issue) => {
      body += `- **Line ${issue.line}**: ${issue.message}\n`;
      body += `  - Suggestion: ${issue.suggestion}\n`;
      body += `\n`;
    });

    if (analysis.styleIssues.length > 3) {
      body += `*... and ${analysis.styleIssues.length - 3} more issues*\n\n`;
    }
  }

  body += `### 📝 Summary\n\n`;
  body += `${analysis.summary}\n\n`;

  body += `---\n`;
  body += `*Generated by automated code review bot*`;

  return body;
}

function calculateOverallScore(analysis: CodeAnalysisResult): number {
  let score = 100;

  // Security issues have highest impact
  analysis.securityIssues.forEach((issue) => {
    switch (issue.severity) {
      case 'critical':
        score -= 20;
        break;
      case 'high':
        score -= 10;
        break;
      case 'medium':
        score -= 5;
        break;
      case 'low':
        score -= 2;
        break;
    }
  });

  // Style issues have lower impact
  analysis.styleIssues.forEach((issue) => {
    switch (issue.severity) {
      case 'high':
        score -= 3;
        break;
      case 'medium':
        score -= 2;
        break;
      case 'low':
        score -= 1;
        break;
    }
  });

  // Complexity issues
  analysis.complexityIssues.forEach((issue) => {
    switch (issue.severity) {
      case 'high':
        score -= 5;
        break;
      case 'medium':
        score -= 3;
        break;
      case 'low':
        score -= 1;
        break;
    }
  });

  return Math.max(0, Math.min(100, score));
}

function generateAnalysisSummary(analysis: CodeAnalysisResult): string {
  const totalIssues = analysis.securityIssues.length + analysis.styleIssues.length +
                     analysis.complexityIssues.length + analysis.performanceIssues.length;

  if (totalIssues === 0) {
    return '✅ Excellent! No issues found in this code review.';
  }

  let summary = `Found ${totalIssues} issues across ${analysis.securityIssues.length} security, ` +
                `${analysis.styleIssues.length} style, ${analysis.complexityIssues.length} complexity, ` +
                `and ${analysis.performanceIssues.length} performance concerns.\n\n`;

  if (analysis.securityIssues.length > 0) {
    const criticalCount = analysis.securityIssues.filter(i => i.severity === 'critical').length;
    const highCount = analysis.securityIssues.filter(i => i.severity === 'high').length;

    if (criticalCount > 0) {
      summary += `⚠️ **${criticalCount} critical security issues require immediate attention.**\n`;
    }
    if (highCount > 0) {
      summary += `🔶 **${highCount} high-severity security issues should be addressed.**\n`;
    }
  }

  summary += `\nOverall code quality score: **${analysis.overallScore}/100**`;

  return summary;
}

function getLineNumber(content: string, searchText: string): number {
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes(searchText)) {
      return i + 1;
    }
  }
  return 1;
}

// Type definitions
export interface SecurityIssue {
  type: 'hardcoded_secret' | 'sql_injection' | 'xss' | 'path_traversal' | 'command_injection';
  severity: 'critical' | 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion: string;
  code: string;
}

export interface StyleIssue {
  type: 'debug_statement' | 'long_line' | 'missing_semicolon' | 'inconsistent_formatting';
  severity: 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion: string;
  code: string;
}

export interface ComplexityIssue {
  type: 'large_function' | 'deep_nesting' | 'complex_condition' | 'long_parameter_list';
  severity: 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion: string;
  code: string;
}

export interface PerformanceIssue {
  type: 'inefficient_loop' | 'sync_operation' | 'memory_leak' | 'unnecessary_computation';
  severity: 'high' | 'medium' | 'low';
  line: number;
  message: string;
  suggestion: string;
  code: string;
}

export interface CodeAnalysisResult {
  securityIssues: SecurityIssue[];
  styleIssues: StyleIssue[];
  complexityIssues: ComplexityIssue[];
  performanceIssues: PerformanceIssue[];
  overallScore: number;
  summary: string;
}