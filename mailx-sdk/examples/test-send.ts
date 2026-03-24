/**
 * Example of sending an email using the MailX SDK (Commented for production)
 * 
import { MailX } from '../src/index.js';

const mailx = new MailX({
  apiKey: 'mx_live_qgz1Cn5SOIpFlJFLzrP0QSSS4528', // Replace with a valid API key from the dashboard
  baseUrl: 'http://localhost:5000/api/v1',
});
async function main() {
  console.log('--- Sending Feedback Request (via Template) ---');
  const response = await mailx.sendWithService({
    to: 'jsnamien@gmail.com',
    data: {
      name: 'ha ji ',
      survey_link: 'https://mailx.app/survey/123',
    },
  });
  console.log('Response:', response);
}

main().catch(console.error);
*/
