import { useState } from 'react';
import { MailX } from 'mailx-sdk';
import { Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SdkTester = () => {
  const [apiKey] = useState('mx_live_qgz1Cn5SOIpFlJFLzrP0QSSS4528');
  const [name, setName] = useState('ha ji ');
  const [mail, setMail] = useState('jsnamien@gmail.com');
  const [link, setLink] = useState('https://mailx.app/survey/123');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    try {
      const mailx = new MailX({ apiKey });
      const result = await mailx.sendWithService({
        to: mail,
        data: { name, survey_link: link },
      });
      setResponse(result);
    } catch (error: any) {
      setResponse({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto py-12 px-4 max-w-md">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card"
      >
        <div className="flex items-center gap-3 mb-8 justify-center">
          <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-500">
            <Send size={20} />
          </div>
          <h2 className="text-xl font-bold">Quick Send</h2>
        </div>

        <div className="space-y-4">
          <div>
            <label>Name</label>
            <input 
              className="input-field mb-0" 
              placeholder="Enter your name"
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
          </div>

          <div>
            <label>Mail</label>
            <input 
              className="input-field mb-0" 
              placeholder="recipient@example.com"
              value={mail} 
              onChange={e => setMail(e.target.value)} 
            />
          </div>

          <div>
            <label>Link</label>
            <input 
              className="input-field mb-0" 
              placeholder="https://..."
              value={link} 
              onChange={e => setLink(e.target.value)} 
            />
          </div>
        </div>

        <button 
          onClick={handleSend}
          disabled={loading}
          className="btn-primary mt-8 flex items-center justify-center gap-2 py-3 w-full"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            <>
              <Send size={18} />
              <span>Send Now</span>
            </>
          )}
        </button>

        <AnimatePresence>
          {response && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-xl border text-sm ${response.success ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400' : 'border-red-500/30 bg-red-500/5 text-red-500'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                {response.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                <span className="font-bold">{response.success ? 'Sent!' : 'Failed'}</span>
              </div>
              <p className="opacity-80">{response.success ? `Log ID: ${response.data?.logId}` : response.message}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default SdkTester;
