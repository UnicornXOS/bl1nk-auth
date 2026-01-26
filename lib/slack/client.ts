export class SlackClient {
    private webhookUrl: string;

    constructor(webhookUrl: string) {
        this.webhookUrl = webhookUrl;
    }

    async sendMessage(text: string) {
        const response = await fetch(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            throw new Error(`Slack notification failed: ${response.statusText}`);
        }

        return response.json();
    }

    async sendFormattedMessage(blocks: any[]) {
        return fetch(this.webhookUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ blocks }),
        });
    }
}

export const slack = new SlackClient(process.env.SLACK_WEBHOOK_URL || "");
