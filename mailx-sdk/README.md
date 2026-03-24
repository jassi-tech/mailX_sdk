# MailX SDK

A lightweight, zero-dependency SDK for integrating MailX email services into your JavaScript/TypeScript applications.

## Features
- **Zero Dependencies**: Powered by native `fetch`.
- **Lightweight**: ~1kb gzipped.
- **Universal**: Works in Node.js, Browsers, and React/Vue/Next.js.
- **Type-Safe**: Full TypeScript support with JSDoc documentation.

## Installation

Since this is a local SDK, you can link it to your project:

```bash
# In your project directory
npm install /path/to/mailx-sdk
```

## Quick Start

```typescript
import { MailX } from 'mailx-sdk';

const mailx = new MailX({
  apiKey: 'your_api_key_here',
  baseUrl: 'http://localhost:5000/api/v1' // Optional: defaults to production
});

async function sendEmail() {
  try {
    const response = await mailx.sendWithService({
      to: 'recipient@example.com',
      data: {
        name: 'John Doe',
        survey_link: 'https://example.com/survey'
      }
    });
    console.log('Email sent successfully:', response.data.logId);
  } catch (error) {
    if (error instanceof MailXError) {
      console.error(`API Error (${error.statusCode}):`, error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}
```

## API Reference

### `new MailX(options: MailXOptions)`
Initializes the SDK.
- `apiKey`: Your MailX API Key.
- `baseUrl`: (Optional) The API base URL.

### `sendWithService(payload: SendServicePayload)`
Sends an email using a predefined service template.
- `to`: Recipient email address(es).
- `data`: Key-value pairs matching your template variables.

## Error Handling
The SDK throws `MailXError` for API failures, which includes:
- `message`: Human-readable error message.
- `statusCode`: HTTP status code from the server.
- `data`: Detailed error payload from the API.

## License
ISC
