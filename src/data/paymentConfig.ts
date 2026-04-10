export const headerConfig = {
  phone: '+91-9090403075',
  whatsapp: '919090403075',
  socials: [
    { platform: 'Instagram', href: 'https://instagram.com/airlandholidays' },
    { platform: 'Facebook', href: 'https://facebook.com/airlandholidays' },
    { platform: 'Youtube', href: 'https://youtube.com/@airlandholidays' },
  ],
  marqueeItems: [
    '✈ 10,000+ Visas Processed',
    '🏆 99% USA Visa Success Rate',
    '🌍 Custom Tours for 50+ Countries',
    '⚡ 72-Hour Visa Processing Available',
    '🎯 IATA Certified Travel Agency',
    '📞 Expert Consultation — Call Us Now',
  ],
};

export const paymentConfig = {
  bankTransfer: {
    accountNumber: '389005001548',
    accountName: 'Airland Holidays Private Limited',
    ifscCode: 'ICIC0003890',
  },
  upi: {
    id: 'airlandholidays@icici',
    name: 'Airland Holidays Private Limited',
    qrImage: 'https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=upi://pay?pa=airlandholidays@icici&pn=AirlandHolidays&cu=INR',
    note: 'A payment gateway charge 3% will be levied on using the above payment link.',
  },
  razorpay: {
    link: 'https://razorpay.me/@airlandholidays',
    note: 'A payment gateway charge 3% will be levied on using above given payment link.',
  },
  importantNotes: [
    'To ensure your payment is securely processed, please make payments only to the official bank details provided on our website.',
    'Do not make payments to any other account. We will not be responsible for any losses incurred if payments are made to unauthorized bank accounts.',
    'If you have any questions or concerns, please contact us on +91-9090403075.',
    'A payment gateway charge 3% will be levied on using above given payment link.',
  ],
  shortHaulPolicy: {
    label: 'SHORT HAUL PACKAGES',
    description: 'For Short Haul Destinations: Domestic Trips, Bhutan, Nepal, Sri Lanka, Thailand, Singapore, Bali, Dubai, Kazakhstan, Azerbaijan, Vietnam, Malaysia, Maldives, Mauritius and Similar.',
    rows: [
      { days: 'At the time of booking', amount: '25% of the full tour cost or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: 'Within 45 Days from Departure Date', amount: '50% of the Full Tour Cost or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: 'Within 30 Days from Date of Departure', amount: '75% of the Full Tour Cost or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: '20 Days from Date of Departure', amount: '100% of the Full Tour Cost' },
    ],
    notes: [
      'Please Note: For Issuance of the Flight Tickets, we require Full Payment of Airfare',
      'Please Note: Non-Refundable Services in the tour package have to be paid in full at the time of Booking',
      'Please Note: Payment Policy is non-negotiable and have to be paid accordingly.',
      'Please Note: Payment Schedule may vary based on the destination and travel date (such as during any event, peak season etc.) Kindly confirm the exact payment timeline with your sales agent.',
    ],
  },
  longHaulPolicy: {
    label: 'LONG HAUL PACKAGES',
    description: 'For Long Haul Destinations: Europe, UK, Scotland, Ireland, USA, Canada, Japan, South Korea, Turkey, Egypt, Australia, New Zealand, South Africa, Kenya, South America, Jordan, Israel and Similar.',
    rows: [
      { days: 'At the time of booking', amount: 'INR 40,000 Per Person or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: 'Within 60 Days from Departure Date', amount: '50% of the Full Tour Cost or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: 'Within 45 Days from Departure Date', amount: '75% of the Full Tour Cost or cancellation charges whichever is higher (non-refundable and non-transferable)' },
      { days: '30 Days from Departure Date', amount: '100% of the Full Tour cost' },
    ],
    notes: [
      'Please Note: For Issuance of the Flight Tickets, we require Full Payment of Airfare',
      'Please Note: Non-Refundable Services in the tour package have to be paid in full at the time of Booking',
      'Please Note: Payment Policy is non-negotiable and have to be paid accordingly.',
      'Please Note: Payment Schedule may vary based on the destination and travel date (such as during any event, peak season etc.) Kindly confirm the exact payment timeline with your sales agent.',
    ],
  },
  services: ['Visa Processing', 'Tour Package - Short Haul', 'Tour Package - Long Haul', 'Flight Booking', 'Hotel Booking', 'Travel Insurance', 'Other'],
  formFields: {
    name: '', mobile: '', amount: '', service: '', transactionId: '', notes: '', screenshot: null,
  },
};
