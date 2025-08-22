import React from 'react';
import './ButtonAnimations.css';

const CheckIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  </svg>
);

const CrossIcon = ({ className }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const pricingPlans = [
  {
    name: 'Base',
    tag: 'Free',
    price: '$0',
    description: "Web3's most powerful free tier, built for developers.",
    features: [
      { text: '1.5 billion CUs per month', included: true },
      { text: '3,000 CUs/s base throughput', included: true },
      { text: 'Up to 50 Gas Manager Policies', included: true },
      { text: 'Gas Manager 7% admin fee', included: true },
      { text: 'Advanced Debug APIs', included: false },
      { text: 'Performance Monitoring', included: false },
      { text: 'Priority Support', included: false },
      { text: 'NFT API', included: false },
      { text: 'Pre-paid Rate $0.70/1M CU', included: false },
      { text: 'Custom Web hooks', included: false },
    ],
    cta: 'Start Building',
    isPopular: false,
  },
  {
    name: 'Growth',
    tag: 'Most Popular',
    price: '$39',
    description: 'A plan that grow your business, adapting to your needs.',
    features: [
        { text: '1.5 billion CUs per month', included: true },
        { text: '3,000 CUs/s base throughput', included: true },
        { text: 'Up to 50 Gas Manager Policies', included: true },
        { text: 'Gas Manager 7% admin fee', included: true },
        { text: 'Advanced Debug APIs', included: true },
        { text: 'Performance Monitoring', included: true },
        { text: 'Priority Support', included: true },
        { text: 'NFT API', included: true },
        { text: 'Pre-paid Rate $0.70/1M CU', included: false },
        { text: 'Custom Web hooks', included: false },
    ],
    cta: 'Get Started',
    isPopular: true,
  },
  {
    name: 'Scale',
    tag: 'Business',
    price: '$99',
    description: 'Self-serve options with exclusive enterprise discounts.',
    features: [
        { text: '1.5 billion CUs per month', included: true },
        { text: '3,000 CUs/s base throughput', included: true },
        { text: 'Up to 50 Gas Manager Policies', included: true },
        { text: 'Gas Manager 7% admin fee', included: true },
        { text: 'Advanced Debug APIs', included: true },
        { text: 'Performance Monitoring', included: true },
        { text: 'Priority Support', included: true },
        { text: 'NFT API', included: true },
        { text: 'Pre-paid Rate $0.70/1M CU', included: true },
        { text: 'Custom Web hooks', included: true },
    ],
    cta: 'Contact Us',
    isPopular: false,
  },
];

const Pricing = () => {
  return (
    <section className="bg-black text-white py-24 px-6 relative">
      {/* subtle background grid */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(192,192,192,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(192,192,192,0.02) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-medium"
            style={{
              fontFamily: 'Poppins, sans-serif',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 50%, #FFFFFF 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
          Our Pricing
        </h2>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className={`rounded-2xl p-8 flex flex-col relative backdrop-blur-sm`}
            style={{
              border: '1px solid rgba(255, 255, 255, 0.1)',
              background: plan.isPopular
                ? 'radial-gradient(circle at top, rgba(168, 85, 247, 0.2), transparent 40%), rgba(255, 255, 255, 0.05)'
                : 'rgba(255, 255, 255, 0.05)',
            }}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white text-xs font-normal px-3 py-1 rounded-full">
                {plan.tag}
              </div>
            )}
            {!plan.isPopular && (
                 <div className="text-xs font-normal px-3 py-1 rounded-full bg-white/10 w-fit mb-4 border border-white/20">{plan.tag}</div>
            )}
            
            <h3 className="text-2xl font-normal mb-2 bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">{plan.name}</h3>
            <p className="text-slate-400 mb-6 h-12">{plan.description}</p>
            
            <div className="mb-6">
              <span className="text-5xl font-medium">{plan.price}</span>
              <span className="text-slate-400"> /month</span>
            </div>

            <hr className="border-white/10 mb-6" />

            <div className="space-y-4 mb-8 flex-grow">
              <p className="font-normal">Includes:</p>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-3">
                  {feature.included ? <CheckIcon className="w-5 h-5 text-[#A855F7]" /> : <CrossIcon className="w-5 h-5 text-slate-600" />}
                  <span className={feature.included ? 'text-slate-300' : 'text-slate-500'}>{feature.text}</span>
                </div>
              ))}
            </div>

            <button className={`animated-button w-full py-3 rounded-lg font-normal mt-auto ${plan.isPopular ? 'bg-gradient-to-r from-[#8B5CF6] to-[#A855F7]' : 'border border-white/20'}`}>
              {plan.cta}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Pricing;