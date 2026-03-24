/**
 * Initialization options for MailX SDK
 */
export interface MailXOptions {
  /** API Key from your MailX dashboard */
  apiKey: string;
  /** Custom API base URL (defaults to http://localhost:5000/api/v1) */
  baseUrl?: string;
}

/**
 * Data needed to send a direct manual email
 */
export interface SendMailData {
  /** Recipient email(s) */
  to: string | string[];
  /** Email subject */
  subject: string;
  /** HTML content of the email */
  html: string;
  /** Optional SMTP configuration ID to use */
  smtpConfigId?: string;
}

/**
 * Data needed to send an email via a registered Service Template
 */
export interface SendWithServiceData {
  /** Recipient email(s) */
  to: string | string[];
  /** Template variables (e.g. { name: 'Jasleen' }) */
  data?: Record<string, any>;
  /** Optional subject override */
  subject?: string;
}

/**
 * Standard API response from MailX
 */
export interface MailResponse {
  /** Whether the operation was successful */
  success: boolean;
  /** Human-readable status or error message */
  message: string;
  /** Log information if successful */
  data?: {
    /** Unique ID for the email log */
    logId: string;
    /** Current status (e.g. 'queued') */
    status: string;
  };
}

/**
 * Detailed email log information
 */
export interface EmailLog {
  id: string;
  to: string | string[];
  subject: string;
  status: string;
  createdAt: string;
  sentAt?: string;
  errorMessage?: string;
}
