Content container with optional header, description, body, actions, and footer. Composes CardHeader, CardTitle, CardDescription, CardContent, CardAction, CardFooter.

```jsx
<Card>
  <CardHeader>
    <CardTitle>Analytics</CardTitle>
    <CardDescription>Last 30 days</CardDescription>
    <CardAction><Button size="sm" variant="ghost">View all</Button></CardAction>
  </CardHeader>
  <CardContent>
    <p>Chart or content here</p>
  </CardContent>
  <CardFooter>
    <span>Updated 2 min ago</span>
  </CardFooter>
</Card>
```

**Sizes:** `default` (16px gap/padding) · `sm` (12px gap/padding)
**Sub-components:** CardHeader · CardTitle · CardDescription · CardAction · CardContent · CardFooter
