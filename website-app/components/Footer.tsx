import { useState } from 'react';

const Footer = () => {
 const [email, setEmail] = useState('');
 const [message, setMessage] = useState('');
 const [loading, setLoading] = useState(false);

 const handleSubscribe = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
   try {
     const response = await fetch('/api/subscribe', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email }),
     });
     const data = await response.json();
     setMessage(data.message);
     if (data.success) setEmail('');
   } catch {
     setMessage('Failed to subscribe. Please try again.');
   }
   setLoading(false);
 };

 const handleUnsubscribe = async (e: React.FormEvent) => {
   e.preventDefault();
   setLoading(true);
   try {
     const response = await fetch('/api/unsubscribe', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ email }),
     });
     const data = await response.json();
     setMessage(data.message);
     if (data.success) setEmail('');
   } catch {
     setMessage('Failed to unsubscribe. Please try again.');
   }
   setLoading(false);
 };

 return (
   <footer className="relative px-4 py-6 bg-gray-100 dark:bg-gray-500">
     <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
       {/* Newsletter Subscription */}
       <div className="flex flex-col items-start">
         <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
           Stay Updated
         </h3>
         <div className="w-full max-w-md">
           <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
             <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               placeholder="Enter your email"
               className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
               required
             />
             {message && (
               <p className="text-sm text-gray-600 dark:text-gray-300">{message}</p>
             )}
             <div className="flex gap-2">
               <button
                 type="submit"
                 disabled={loading}
                 className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
               >
                 {loading ? 'Processing...' : 'Subscribe'}
               </button>
               <button
                 type="button"
                 onClick={handleUnsubscribe}
                 disabled={loading}
                 className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50"
               >
                 {loading ? 'Processing...' : 'Unsubscribe'}
               </button>
             </div>
           </form>
         </div>
       </div>

       {/* Copyright */}
       <div className="flex items-center justify-end">
         <div className="text-sm text-gray-800 dark:text-gray-400">
           © {new Date().getFullYear()}, Built by{' '}
           <a
             href="https://github.com/PathOn-AI"
             className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600"
           >
             PathOn-AI
           </a>
         </div>
       </div>
     </div>
   </footer>
 );
};

export default Footer;