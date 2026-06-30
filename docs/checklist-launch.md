I'm preparing my application for a production launch on Vercel using the checklist at https://vercel.com/docs/production-checklist.

If you have access to my project, please review it against this checklist and help me ensure everything is ready. If you don't have access to my project, please ask me for the codebase and help me ensure everything is ready:

## Operational excellence
- Define an incident response plan with escalation paths, communication channels, and rollback strategies
- Familiarize with how to stage, promote, and rollback deployments
- Configure caching for monorepo builds (e.g. Turborepo) to prevent unnecessary builds
- Perform a zero downtime DNS migration to Vercel DNS

## Security
- Implement a Content Security Policy (CSP) and proper security headers
- Enable Deployment Protection to prevent unauthorized access
- Configure the Vercel Web Application Firewall (WAF) with custom rules, IP blocking, and managed rulesets
- Enable Log Drains to persist deployment logs
- Review common SSL certificate issues
- Enable a Preview Deployment Suffix with a custom domain
- Commit lockfiles to pin dependencies and speed up builds
- Implement rate limiting to prevent abuse
- Review and implement access roles for team members
- Enable SAML SSO and SCIM (Enterprise only)
- Enable Audit Logs (Enterprise only)
- Ensure cookies comply with the allowed cookie policy (Enterprise only)
- Set up a firewall rule to block unwanted bots

## Reliability
- Enable Observability Plus for debugging, performance optimization, and traffic monitoring (Pro and Enterprise)
- Enable automatic Function failover for multi-region redundancy (Enterprise only)
- If using Secure Compute, enable a passive failover region (Enterprise only)
- Implement caching headers for static assets and Function responses
- Understand the differences between caching headers and ISR
- Add distributed tracing instrumentation
- Run a load test on your application (Enterprise only)

## Performance
- Enable Speed Insights for field performance data and Core Web Vitals
- Review Time To First Byte (TTFB) for fast responses
- Use Image Optimization to reduce image sizes
- Use Script Optimization to improve script loading
- Use Font Optimization to remove external font network requests
- Ensure Vercel Function region matches your API or database region
- Review third-party proxy limitations and consult your Vercel account representative if applicable (Enterprise)

## Cost optimization
- Enable Fluid compute for reduced cold starts and optimized concurrency
- Follow the manage and optimize usage guides
- Configure Spend Management and alert thresholds
- Review and adjust Function maximum duration and memory
- Set appropriate ISR revalidation times or move to on-demand revalidation
- Opt in to new image optimization pricing (for teams created before Feb 18, 2025)
- Move large media files (GIFs, videos) to blob storage

Please analyze my project, identify which items are already handled, flag anything missing, and help me address the gaps. Start by asking about my project setup and which plan I'm on so you can tailor the recommendations.
