import { useState } from 'react';
import { MailX } from 'mailx-sdk';
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, Link2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';


// ─── Component ───────────────────────────────────────────────────────────────
const SdkTester = () => {
  const apiKey = import.meta.env.VITE_MAILX_API_KEY as string;

  const [name, setName]       = useState('');
  const [mail, setMail]       = useState('');
  const [link, setLink]       = useState('');
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading]   = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim())
      errs.name = 'Name is required.';

    if (!mail.trim())
      errs.mail = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim()))
      errs.mail = 'Enter a valid email address.';

    if (!link.trim())
      errs.link = 'Link is required.';
    else if (!/^https?:\/\/.+/.test(link.trim()))
      errs.link = 'Link must start with http:// or https://';

    if (!apiKey)
      errs._global = 'VITE_MAILX_API_KEY is not set in your .env file.';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // ── Send ────────────────────────────────────────────────────────────────
  const handleSend = async () => {
    if (!validate()) return;

    setLoading(true);
    setResponse(null);
    try {
      const mailx = new MailX({ apiKey });
      const result = await mailx.sendWithService({
        to: mail.trim(),
        data: { name: name.trim(), survey_link: link.trim() },
      });
      setResponse(result);
    } catch (error: any) {
      setResponse({ success: false, message: error.message ?? 'An unknown error occurred.' });
    } finally {
      setLoading(false);
    }
  };

  const field = (
    key: 'name' | 'mail' | 'link',
    label: string,
    placeholder: string,
    Icon: React.ElementType,
    value: string,
    setter: (v: string) => void,
  ) => (
    <div className="flex flex-col gap-s-8">
      <label className="flex items-center gap-s-8 text-s-11 font-semibold text-text-muted uppercase tracking-widest">
        <Icon size={12} />
        {label}
      </label>
      <input
        className={`w-full bg-bg-elevated border rounded-s-12 p-s-12 px-s-16 text-s-14 text-text-primary outline-none transition-all focus:border-accent focus:ring-s-3 focus:ring-accent/15 focus:bg-bg-hover ${errors[key] ? 'border-error ring-s-3 ring-error/5' : 'border-border'}`}
        placeholder={placeholder}
        value={value}
        onChange={e => {
          setter(e.target.value);
          if (errors[key]) setErrors(prev => { const n = { ...prev }; delete n[key]; return n; });
        }}
        disabled={loading}
      />
    </div>
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-base p-s-32 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.98, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col w-full max-w-s-440 bg-bg-card border border-border rounded-s-24 p-s-40 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-s-14 mb-s-32">
          <div className="flex items-center justify-center shrink-0 w-s-44 h-s-44 rounded-s-12 bg-accent/10 border border-accent/15 text-accent">
            <Send size={18} />
          </div>
          <div>
            <h2 className="text-s-18 font-semibold text-text-primary tracking-tight m-0">Quick Send</h2>
            <p className="text-s-12 text-text-secondary mt-s-3 font-normal m-0">Send via MailX SDK (MDS)</p>
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-s-18">
          {field('name', 'Name',  'John Doe',              User,  name, setName)}
          {field('mail', 'Email', 'recipient@example.com', Mail,  mail, setMail)}
          {field('link', 'Link',  'https://…',             Link2, link, setLink)}
        </div>

        <div className="h-s-1 bg-border-dim my-s-32" />

        {/* Send Button */}
        <button 
          className="w-full p-s-14 bg-accent text-white border-none rounded-s-14 text-s-14 font-semibold flex items-center justify-center gap-s-10 transition-all hover:bg-accent-dim hover:-translate-y-s-2 active:translate-y-0 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-bg-hover disabled:text-text-muted shadow-lg shadow-accent/20"
          onClick={handleSend} 
          disabled={loading}
        >
          {loading
            ? <><Loader2 size={18} className="animate-spin" /> Sending…</>
            : <><Send size={16} /> Send Now</>
          }
        </button>

        {/* Response */}
        <AnimatePresence>
          {response && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`mt-s-24 p-s-14 rounded-s-16 border flex items-center justify-center gap-s-8 font-semibold text-s-14 ${response.success ? 'bg-success/5 border-success/20 text-success' : 'bg-error/5 border-error/20 text-error'}`}
            >
              {response.success
                ? <><CheckCircle size={16} /> Sent Successfully</>
                : <><AlertCircle size={16} /> Failed to Send</>
              }
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SdkTester;