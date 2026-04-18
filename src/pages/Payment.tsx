import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Phone, MessageCircle, Copy, IndianRupee,
  Building2, ExternalLink, Upload, Send,
  CheckCircle2, Share2, AlertTriangle
} from 'lucide-react';
import { headerConfig, paymentConfig } from '../data/paymentConfig';

export default function Payment() {
  const [formData, setFormData] = useState(paymentConfig.formFields);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string, field: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text', err);
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: 'Airland Holidays — Payment',
      text: 'Complete your payment for Airland Holidays services here:',
      url: window.location.href,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 2500);
      }
    } catch { }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, screenshot: e.target.files[0] as any });
    }
  };

  return (
    <div className="bg-[#FAFAFA] min-h-screen pb-20 md:pb-12">
      {/* Page Header Strip */}
      <div className="bg-white border-b border-slate-200 py-8 px-4">
        <div className="content-container flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 text-primary bg-primary/10 rounded-2xl p-2 flex items-center justify-center">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-sans text-3xl md:text-4xl text-slate-900 font-serif" style={{ fontFamily: 'Marcellus, serif' }}>
                Pay us at
              </h1>
              <p className="text-slate-500 text-sm mt-1">
                All payments are manually verified by our team within 2 business hours
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="content-container mt-10 px-4">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

          {/* LEFT COLUMN */}
          <div className="lg:w-2/3 space-y-10">
            {/* PAYMENT METHODS */}

            {/* Bank Transfer */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
                <Building2 className="w-3.5 h-3.5" />
                Bank Transfer
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                {[
                  { label: 'A/C No', value: paymentConfig.bankTransfer.accountNumber, id: 'acc' },
                  { label: 'A/C Name', value: paymentConfig.bankTransfer.accountName, id: 'name' },
                  { label: 'IFSC Code', value: paymentConfig.bankTransfer.ifscCode, id: 'ifsc' },
                ].map((item) => (
                  <div key={item.id} className="flex items-baseline gap-2 text-slate-700 text-sm py-1.5 border-b border-slate-50 last:border-0 hover:bg-slate-50 rounded px-2 transition-colors">
                    <span className="font-bold text-slate-500 min-w-[100px]">{item.label}:</span>
                    <span className="font-mono text-slate-900 font-semibold">{item.value}</span>
                    <button
                      onClick={() => handleCopy(item.value, item.id)}
                      className="ml-auto text-xs text-primary hover:underline flex items-center gap-1"
                    >
                      {copiedField === item.id ? (
                        <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied</span>
                      ) : (
                        <><Copy className="w-3 h-3" /> Copy</>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>

            <div className="border-t border-slate-200 my-8"></div>

            {/* UPI Payment */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
                <IndianRupee className="w-3.5 h-3.5" />
                UPI Payment
              </div>
              <div className="flex flex-col md:flex-row gap-8 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm items-start">
                <div className="flex-1 w-full space-y-2">
                  <div className="flex flex-col gap-1 text-sm py-1.5 px-2 hover:bg-slate-50 rounded transition-colors">
                    <span className="font-bold text-slate-500">UPI us at (Google Pay/BHIM/PhonePe):</span>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-slate-900 font-semibold text-base">{paymentConfig.upi.id}</span>
                      <button
                        onClick={() => handleCopy(paymentConfig.upi.id, 'upi')}
                        className="text-xs text-primary hover:underline flex items-center gap-1"
                      >
                        {copiedField === 'upi' ? (
                          <span className="text-green-600 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Copied</span>
                        ) : (
                          <><Copy className="w-3 h-3" /> Copy</>
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm py-1.5 px-2">
                    <span className="font-bold text-slate-500 min-w-[100px]">UPI Name:</span>
                    <span className="font-mono text-slate-900 font-semibold">{paymentConfig.upi.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center flex-shrink-0 md:ml-auto w-full md:w-auto">
                  <img src={paymentConfig.upi.qrImage} loading="lazy" alt="UPI QR Code" className="w-[160px] h-[160px] border-4 border-slate-100 rounded-2xl shadow-sm" />
                  <span className="text-xs text-slate-500 text-center mt-2 font-medium">Scan to Pay</span>
                </div>
              </div>
            </motion.div>

            <div className="border-t border-slate-200 my-8"></div>

            {/* Razorpay Link */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 bg-slate-900 text-white text-xs font-bold px-4 py-2 rounded-full mb-4">
                <ExternalLink className="w-3.5 h-3.5" />
                Razorpay Link
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <p className="font-bold text-slate-500 text-sm mb-2">Payment via Razorpay:</p>
                <a
                  href={paymentConfig.razorpay.link}
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline text-sm font-medium flex items-center gap-1.5 w-max"
                >
                  {paymentConfig.razorpay.link} <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="text-amber-700 text-xs mt-4 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 shadow-sm">
                  <span className="font-semibold">Note:</span> {paymentConfig.razorpay.note}
                </div>
              </div>
            </motion.div>

            {/* PAYMENT POLICY SECTION */}
            <div className="mt-16">
              <h2 className="text-2xl text-slate-900 mb-4 font-serif" style={{ fontFamily: 'Marcellus, serif' }}>Payment Policy</h2>
              <div className="text-slate-600 text-sm leading-relaxed mb-8 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <p className="mb-2"><span className="font-bold text-slate-800">Short Haul:</span> {paymentConfig.shortHaulPolicy.description.replace('For Short Haul Destinations: ', '')}</p>
                <p><span className="font-bold text-slate-800">Long Haul:</span> {paymentConfig.longHaulPolicy.description.replace('For Long Haul Destinations: ', '')}</p>
              </div>

              {/* Short Haul Table */}
              <div className="mb-12 overflow-x-auto rounded-xl border border-slate-200 shadow-sm">
                <div className="inline-flex bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-br-2xl uppercase tracking-widest absolute shrink-0 z-10 shadow-sm">
                  {paymentConfig.shortHaulPolicy.label}
                </div>
                <table className="w-full border-collapse text-sm min-w-[600px] mt-10">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="w-2/5 px-4 py-3 text-left border-y border-r border-slate-200">Number Of Days Prior To Tour Date</th>
                      <th className="px-4 py-3 text-left border-y border-slate-200">Amount need to be paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentConfig.shortHaulPolicy.rows.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 border border-slate-200 text-slate-700 leading-relaxed font-medium">{row.days}</td>
                        <td className="px-4 py-3 border border-slate-200 text-slate-700 leading-relaxed">{row.amount}</td>
                      </motion.tr>
                    ))}
                    {paymentConfig.shortHaulPolicy.notes.map((note, i) => (
                      <tr key={`note-${i}`} className="bg-slate-100 font-semibold text-slate-800 text-xs">
                        <td colSpan={2} className="px-4 py-2.5 border border-slate-200">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Long Haul Table */}
              <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm relative">
                <div className="inline-flex bg-slate-900 text-white text-xs font-black px-4 py-2 rounded-br-2xl uppercase tracking-widest absolute top-0 left-0 z-10 shadow-sm">
                  {paymentConfig.longHaulPolicy.label}
                </div>
                <table className="w-full border-collapse text-sm min-w-[600px] mt-10">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 font-bold">
                      <th className="w-2/5 px-4 py-3 text-left border-y border-r border-slate-200">Number Of Days Prior To Tour Date</th>
                      <th className="px-4 py-3 text-left border-y border-slate-200">Amount need to be paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentConfig.longHaulPolicy.rows.map((row, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.04 }}
                        className="odd:bg-white even:bg-slate-50/50 hover:bg-slate-50 transition-colors"
                      >
                        <td className="px-4 py-3 border border-slate-200 text-slate-700 leading-relaxed font-medium">{row.days}</td>
                        <td className="px-4 py-3 border border-slate-200 text-slate-700 leading-relaxed">{row.amount}</td>
                      </motion.tr>
                    ))}
                    {paymentConfig.longHaulPolicy.notes.map((note, i) => (
                      <tr key={`note-${i}`} className="bg-slate-100 font-semibold text-slate-800 text-xs">
                        <td colSpan={2} className="px-4 py-2.5 border border-slate-200">{note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MANUAL FORM SECTION */}
            <div className="mt-16">
              <h2 className="text-2xl text-slate-900 mb-2 font-serif" style={{ fontFamily: 'Marcellus, serif' }}>Submit Payment Proof</h2>
              <p className="text-slate-500 text-sm mb-8">Complete your payment using any method above, then fill in the details below</p>

              <motion.div
                initial={{ y: 40, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-secondary" />

                {isSubmitted ? (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <CheckCircle2 className="w-10 h-10 text-green-500" />
                    </div>
                    <h3 className="text-3xl text-slate-900 mb-4 font-serif" style={{ fontFamily: 'Marcellus, serif' }}>Payment Details Received!</h3>
                    <p className="text-slate-500 text-base leading-relaxed max-w-md mx-auto mb-8">
                      Our team will verify your payment within 2 business hours and send confirmation to your contact details.
                    </p>
                    <div className="flex gap-4 w-full md:w-auto">
                      <button onClick={handleShare} className="btn-outline flex-1 md:flex-none px-6 py-3 font-semibold rounded-xl">Share Page</button>
                      <a href="/" className="btn-primary flex-1 md:flex-none px-6 py-3 font-semibold rounded-xl block text-center">Back to Home</a>
                    </div>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <input
                        required
                        type="text"
                        placeholder="Full Name *"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="Mobile Number *"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                      <input
                        required
                        type="number"
                        placeholder="Amount Paid ₹ *"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                      <select
                        required
                        defaultValue=""
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all appearance-none"
                      >
                        <option value="" disabled>Select Service *</option>
                        {paymentConfig.services.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <input
                        type="text"
                        placeholder="Transaction ID / Ref No."
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                      <input
                        type="date"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                      />
                    </div>

                    <textarea
                      rows={3}
                      placeholder="Notes / Additional Info"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3.5 text-slate-800 text-sm placeholder:text-slate-200 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
                    />

                    {formData.screenshot ? (
                      <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-5 py-3">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                          <div>
                            <p className="text-sm font-semibold text-slate-800 truncate max-w-[200px] md:max-w-[400px]">
                              {(formData.screenshot as File).name}
                            </p>
                            <p className="text-xs text-slate-500">
                              {((formData.screenshot as File).size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, screenshot: null })}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-full text-slate-200 hover:text-red-500 border border-slate-200 shadow-sm transition-colors"
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-primary/50 rounded-2xl p-8 cursor-pointer transition-colors bg-slate-50 hover:bg-primary/5">
                        <Upload className="w-8 h-8 text-slate-200 mb-3" />
                        <span className="font-semibold text-slate-600 text-sm">Upload Payment Screenshot</span>
                        <span className="text-slate-200 text-xs mt-1">JPG, PNG, PDF — Max 10MB</span>
                        <input type="file" className="hidden" accept="image/*,.pdf" onChange={handleFileChange} />
                      </label>
                    )}

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white text-lg py-4 rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 mt-2 font-serif"
                      style={{ fontFamily: 'Marcellus, serif' }}
                    >
                      <Send className="w-5 h-5" /> Submit Payment Details
                    </button>
                  </form>
                )}
              </motion.div>
            </div>

          </div>

          {/* RIGHT COLUMN - Sticky */}
          <div className="lg:w-1/3">
            <div className="sticky top-[150px]">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-4 border-b border-amber-200/50 pb-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600" />
                  Note:
                </div>
                <div>
                  {paymentConfig.importantNotes.map((note, index) => (
                    <div key={index} className="flex items-start gap-3 text-amber-800 text-sm leading-relaxed mb-3 last:mb-0">
                      <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                      <span>{note}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={handleShare}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
                >
                  <Share2 className="w-4 h-4" /> Share Payment Page
                </button>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent('Pay for Airland Holidays services here: ' + window.location.href)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-2 border border-green-300 text-green-700 hover:bg-green-50 font-semibold py-3.5 rounded-xl transition-colors text-sm shadow-sm bg-white"
                >
                  <MessageCircle className="w-4 h-4" /> Share via WhatsApp
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* MOBILE BOTTOM STICKY ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 p-4 flex gap-3 md:hidden shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <a href={`tel:${headerConfig.phone}`} className="flex-1 flex items-center justify-center gap-2 border border-slate-300 text-slate-700 font-bold py-3 rounded-xl text-sm hover:bg-slate-50 transition-colors">
          <Phone className="w-4 h-4" /> Call Us
        </a>
        <a href={`https://wa.me/${headerConfig.whatsapp}`} target="_blank" rel="noreferrer" className="flex-1 bg-green-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-green-600 transition-colors">
          <MessageCircle className="w-4 h-4" /> WhatsApp
        </a>
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 md:bottom-10 right-6 z-[200] bg-slate-900 text-white text-sm font-medium px-5 py-3 rounded-xl shadow-xl flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-green-400" /> Link copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
