import { useState } from 'react';
import { MailX } from 'mailx-sdk';
import { Send, CheckCircle, AlertCircle, Loader2, User, Mail, Link2, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Component ───────────────────────────────────────────────────────────────
const SdkTester = () => {
  const apiKey = import.meta.env.VITE_MAILX_API_KEY as string;

  const [name, setName]       = useState('');
  const [mail, setMail]       = useState('');
  const [link, setLink]       = useState('');
  const [errors, setErrors]   = useState<Record<string, string>>({});
  const [response, setResponse] = useState<{ success: boolean; message?: string } | null>(null);
  const [loading, setLoading]   = useState(false);

  // ── Validation ──────────────────────────────────────────────────────────
  const validate = () => {
    const errs: Record<string, string> = {};

    if (!name.trim()) errs.name = 'Required';
    if (!mail.trim()) {
      errs.mail = 'Required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail.trim())) {
      errs.mail = 'Invalid';
    }
    if (!link.trim()) {
      errs.link = 'Required';
    } else if (!/^https?:\/\/.+/.test(link.trim())) {
      errs.link = 'Invalid';
    }

    if (!apiKey) errs._global = 'API Key missing';

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
      setResponse(result as { success: boolean; message?: string });
      
      // Auto-clear success after 3s
      if (result.success) {
        setTimeout(() => setResponse(null), 3000);
      }
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Error';
      setResponse({ success: false, message });
    } finally {
      setLoading(false);
    }
  };

  const Field = ({ 
    id, 
    label, 
    placeholder, 
    icon: Icon, 
    value, 
    setter 
  }: { 
    id: string, 
    label: string, 
    placeholder: string, 
    icon: React.ElementType, 
    value: string, 
    setter: (v: string) => void 
  }) => (
    <div className="flex flex-col relative group flex-1 min-w-0">
      <div className={`
        flex items-center gap-s-10 p-s-10 px-s-14 rounded-s-14 transition-all duration-300
        ${errors[id] ? 'bg-error/5 border border-error/20' : 'bg-bg-elevated/40 border border-border hover:border-accent/40 hover:bg-bg-hover/60'}
        ${loading ? 'opacity-50 pointer-events-none' : ''}
      `}>
        <Icon size={14} className={errors[id] ? 'text-error' : 'text-text-muted group-hover:text-accent transition-colors'} />
        <div className="flex flex-col min-w-0 flex-1">
          <span className="text-s-10 font-bold uppercase tracking-tighter text-text-muted leading-none mb-s-2">
            {errors[id] || label}
          </span>
          <input
            className="w-full bg-transparent border-none p-0 text-s-14 text-text-primary outline-none placeholder:text-text-muted/40 font-medium"
            placeholder={placeholder}
            value={value}
            onChange={e => {
              setter(e.target.value);
              if (errors[id]) setErrors(prev => { const n = { ...prev }; delete n[id]; return n; });
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-bg-base p-s-32 font-sans selection:bg-accent selection:text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-s-1000"
      >
        <div className="glass-effect rounded-s-24 p-s-12 shadow-2xl overflow-hidden relative border border-white/5">
          {/* Header & Form Logic Container */}
          <div className="flex flex-col md:flex-row items-center gap-s-8">
            
            {/* Branding Section */}
            <div className="flex items-center gap-s-14 px-s-16 py-s-8 shrink-0">
              <div className="w-s-40 h-s-40 rounded-s-12 bg-gradient-to-br from-accent to-accent-dim flex items-center justify-center shadow-lg shadow-accent/20">
                <Zap size={20} className="text-white" />
              </div>
              <div className="hidden lg:block">
                <h2 className="text-s-14 font-bold text-text-primary tracking-tight leading-tight">Quick Send</h2>
                <p className="text-s-10 text-text-muted font-medium">MDS Fluid SDK</p>
              </div>
            </div>

            {/* Vertical Divider (Desktop) */}
            <div className="hidden md:block w-s-1 h-s-32 bg-border-dim" />

            {/* Fields Container */}
            <div className="flex flex-col sm:flex-row gap-s-8 flex-1 w-full px-s-4">
              <Field id="name" label="Recipient Name" placeholder="John Doe" icon={User} value={name} setter={setName} />
              <Field id="mail" label="Email Address" placeholder="hello@mailx.com" icon={Mail} value={mail} setter={setMail} />
              <Field id="link" label="Action link" placeholder="https://..." icon={Link2} value={link} setter={setLink} />
            </div>

            {/* Action Button */}
            <div className="shrink-0 w-full md:w-auto p-s-4 md:p-0">
              <button 
                onClick={handleSend}
                disabled={loading}
                className={`
                  relative overflow-hidden group
                  w-full md:w-s-140 h-s-54 rounded-s-16 font-bold text-s-14 flex items-center justify-center gap-s-8 transition-all duration-300
                  ${loading ? 'bg-bg-hover text-text-muted cursor-not-allowed' : 'bg-accent text-white hover:bg-accent-dim hover:scale-[1.02] active:scale-95 shadow-lg shadow-accent/25'}
                `}
              >
                <AnimatePresence mode='wait'>
                  {loading ? (
                    <motion.div key="loader" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin" />
                      <span>Sending</span>
                    </motion.div>
                  ) : (
                    <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                      <Send size={16} />
                      <span>Send Now</span>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {/* Subtle Glow Effect */}
                {!loading && <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
              </button>
            </div>
          </div>

          {/* Status Overlay */}
          <AnimatePresence>
            {response && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className={`
                  mx-s-12 mb-s-12 mt-s-8 p-s-12 rounded-s-14 border flex items-center justify-between gap-s-12
                  ${response.success ? 'bg-success/5 border-success/20 text-success' : 'bg-error/5 border-error/20 text-error'}
                `}>
                  <div className="flex items-center gap-s-10">
                    {response.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                    <span className="text-s-12 font-bold uppercase tracking-tight">
                      {response.success ? 'Transmission Successful' : `Failure: ${response.message}`}
                    </span>
                  </div>
                  {response.success && (
                    <div className="hidden sm:block text-s-11 opacity-60 font-medium">
                      Delivered via MailX High-Speed Relay
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Footer Info */}
        <div className="mt-s-16 flex items-center justify-between px-s-8 text-text-muted/40 font-bold text-s-10 uppercase tracking-widest">
          <div>Environment: Production</div>
          <div>MDS Version: 2.1.0-Fluid</div>
        </div>
      </motion.div>
    </div>
  );
};

export default SdkTester;
