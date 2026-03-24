import { type MailXOptions, type SendMailData, type SendWithServiceData, type MailResponse } from './types.js';

/**
 * Custom Error class for MailX API failures
 */
export class MailXError extends Error {
  public statusCode: number | undefined;
  public data: any | undefined;

  constructor(message: string, statusCode?: number, data?: any) {
    super(message);
    this.name = 'MailXError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

/**
 * The MailX SDK Client
 */
export class MailX {
  private apiKey: string;
  private baseUrl: string;

  /**
   * Initialize the MailX SDK
   * @param options Configuration options
   */
  constructor(options: MailXOptions) {
    if (!options.apiKey) {
      throw new Error('MailX API key is required');
    }
    this.apiKey = options.apiKey;
    // For development, we default to localhost. In production, this would be your API URL.
    this.baseUrl = options.baseUrl || 'http://localhost:5000/api/v1';
  }

  /**
   * Internal helper to make requests
   */
  private async request<T>(path: string, options: RequestInit): Promise<T> {
    const url = `${this.baseUrl}${path}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'x-api-key': this.apiKey,
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new MailXError(
        data.message || `Request failed with status ${response.status}`,
        response.status,
        data
      );
    }

    return data as T;
  }

  /**
   * Send a direct email using HTML
   */
  async sendMail(data: SendMailData): Promise<MailResponse> {
    try {
      const result = await this.request<any>('/send-mail', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return {
        success: true,
        message: result.message || 'Mail queued',
        data: result.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'An unknown error occurred',
      };
    }
  }

  /**
   * Send an email using a registered Service Template
   */
  async sendWithService(data: SendWithServiceData): Promise<MailResponse> {
    try {
      const result = await this.request<any>('/send-mail/service', {
        method: 'POST',
        body: JSON.stringify(data),
      });
      return {
        success: true,
        message: result.message || 'Mail queued via service',
        data: result.data,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message || 'An unknown error occurred',
      };
    }
  }
}
