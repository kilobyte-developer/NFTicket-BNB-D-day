import React, { useState } from 'react';
import './ButtonAnimations.css';

const ChevronIcon = ({ isOpen }) => (
  <svg
    className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  </svg>
);

const faqData = [
  {
    question: 'What types of DeFi tools can I build with your platform?',
    answer: 'Our platform lets you build staking tools, lending protocols, yield farming solutions, decentralized exchanges, and tokenized asset platforms with ease and flexibility.',
  },
  {
    question: 'Do I need prior blockchain development experience to use your APIs and SDKs?',
    answer: 'No, our tools are designed for both experienced blockchain developers and newcomers. We provide extensive documentation and support to get you started.',
  },
  {
    question: 'How does your platform ensure security for deployed smart contracts?',
    answer: 'We provide audited smart contract templates and follow best security practices. However, ultimate security responsibility lies with the developer to audit their custom code.',
  },
  {
    question: 'Is your platform compatible with multiple blockchains and Layer 2 networks?',
    answer: 'Yes, we support a wide range of EVM-compatible blockchains and are continuously expanding our support for Layer 2 solutions to ensure maximum interoperability.',
  },
  {
    question: 'What is the pricing structure for accessing your APIs and SDKs?',
    answer: 'We offer a tiered pricing model including a generous free tier for developers, a growth plan for scaling businesses, and custom enterprise solutions. Please see our pricing section for more details.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0); // First item open by default

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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
      <div className="relative z-10 max-w-3xl mx-auto">
        <h2
          className="text-center text-4xl md:text-5xl font-medium mb-12"
          style={{
            fontFamily: 'Poppins, sans-serif',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #C0C0C0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div
              key={index}
              className="rounded-2xl p-px"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(192, 192, 192, 0.05) 100%)',
              }}
            >
              <div className="rounded-[15px] bg-[rgba(255,255,255,0.05)] backdrop-blur-sm">
                <button
                  onClick={() => handleToggle(index)}
                  className="animated-button w-full flex justify-between items-center text-left p-6"
                >
                  <span className="text-lg font-medium text-slate-300">{item.question}</span>
                  <ChevronIcon isOpen={openIndex === index} />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pt-2 pb-6 text-slate-400">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;