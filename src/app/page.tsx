'use client';

import { useState } from 'react';
import DiscoveryTemplate from '@/components/templates/DiscoveryTemplate';
import SolutionTemplate from '@/components/templates/SolutionTemplate';
import PricingTemplate from '@/components/templates/PricingTemplate';
import ChangeControlTemplate from '@/components/templates/ChangeControlTemplate';
import DeliveryTemplate from '@/components/templates/DeliveryTemplate';

const templates = [
  { id: 'discovery', number: '01', title: 'Discovery Summary', component: DiscoveryTemplate },
  { id: 'solution', number: '02', title: 'Solution Blueprint', component: SolutionTemplate },
  { id: 'pricing', number: '03', title: 'Pricing Architecture', component: PricingTemplate },
  { id: 'change-control', number: '04', title: 'Change Control Exhibit', component: ChangeControlTemplate },
  { id: 'delivery', number: '05', title: 'Delivery Handoff Pack', component: DeliveryTemplate },
];

export default function Home() {
  const [activeTemplate, setActiveTemplate] = useState(templates[0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const ActiveComponent = activeTemplate.component;

  const handleTemplateSelect = (template: typeof templates[0]) => {
    setActiveTemplate(template);
    setMobileMenuOpen(false);
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1B3A5C] to-[#2D3E50] py-4 md:py-6 px-4 md:px-6 shadow-lg">
        <div className="max-w-[1400px] mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="font-[family-name:var(--font-heading)] tracking-tight text-white flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
              <span className="text-2xl md:text-3xl font-bold">JDA TSG</span>
              <span className="hidden sm:inline text-[#00A8CC] text-2xl">|</span>
              <span className="text-base md:text-xl font-normal italic opacity-90">Expect more, move faster.</span>
            </h1>
            <p className="text-white/80 text-sm md:text-base mt-1 font-[family-name:var(--font-body)]">
              Solutions Engineering Template Library
            </p>
          </div>
          <a
            href="https://chatgpt.com/g/g-6967e1948aa08191bd70df9552cc1dd9-discovergpt-discovery-call-assistant"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#00A8CC] hover:bg-[#008fb3] text-white font-semibold text-sm rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
            Try DiscoverGPT
          </a>
        </div>
      </header>

      {/* Mobile Template Selector */}
      <div className="lg:hidden sticky top-0 z-20 bg-white shadow-md border-b border-[#E8ECEF]">
        <div className="px-4 py-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-full flex items-center justify-between p-3 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]"
          >
            <div className="flex items-center gap-3">
              <span className="font-bold text-sm w-6 h-6 rounded flex items-center justify-center bg-[#00A8CC] text-white">
                {activeTemplate.number}
              </span>
              <span className="font-medium text-[#1B3A5C] font-[family-name:var(--font-heading)]">
                {activeTemplate.title}
              </span>
            </div>
            <svg 
              className={`w-5 h-5 text-[#6B7C93] transition-transform ${mobileMenuOpen ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Mobile Dropdown Menu */}
          {mobileMenuOpen && (
            <div className="absolute left-4 right-4 mt-2 bg-white rounded-lg shadow-lg border border-[#E8ECEF] overflow-hidden z-30">
              {templates.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleTemplateSelect(template)}
                  className={`flex items-center gap-3 p-4 w-full text-left border-b border-[#E8ECEF] last:border-b-0 transition-colors
                    ${activeTemplate.id === template.id
                      ? 'bg-[#00A8CC] text-white'
                      : 'text-[#2D3E50] hover:bg-[#F8F9FA]'
                    }`}
                >
                  <span className={`font-bold text-sm w-6 h-6 rounded flex items-center justify-center ${
                    activeTemplate.id === template.id 
                      ? 'bg-white/20 text-white' 
                      : 'bg-[#00A8CC]/10 text-[#00A8CC]'
                  }`}>
                    {template.number}
                  </span>
                  <span className="font-medium font-[family-name:var(--font-heading)]">
                    {template.title}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full py-4 md:py-8 px-4 md:px-6 gap-8">
        {/* Sidebar - Hidden on mobile */}
        <nav className="hidden lg:block w-72 flex-shrink-0">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-md p-6 border border-[#E8ECEF]">
              <h2 className="text-lg font-semibold text-[#1B3A5C] mb-2 font-[family-name:var(--font-heading)]">
                Deal Lifecycle Templates
              </h2>
              <p className="text-[#6B7C93] text-sm mb-6 font-[family-name:var(--font-body)]">
                Select a template to view
              </p>
              <ul className="space-y-2">
                {templates.map((template) => (
                  <li key={template.id}>
                    <button
                      onClick={() => setActiveTemplate(template)}
                      className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-all duration-200
                        ${activeTemplate.id === template.id
                          ? 'bg-[#00A8CC] text-white shadow-md'
                          : 'text-[#2D3E50] hover:bg-[#F8F9FA] hover:text-[#1B3A5C]'
                        }`}
                    >
                      <span className={`font-bold text-sm w-6 h-6 rounded flex items-center justify-center ${
                        activeTemplate.id === template.id 
                          ? 'bg-white/20 text-white' 
                          : 'bg-[#00A8CC]/10 text-[#00A8CC]'
                      }`}>
                        {template.number}
                      </span>
                      <span className={`font-medium text-[15px] font-[family-name:var(--font-heading)]`}>
                        {template.title}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help Card */}
            <div className="mt-6 bg-gradient-to-br from-[#1B3A5C] to-[#2D3E50] rounded-lg shadow-md p-5 text-white">
              <h3 className="font-semibold mb-2 font-[family-name:var(--font-heading)]">💡 Quick Tips</h3>
              <ul className="text-sm text-[#E8ECEF] space-y-2 font-[family-name:var(--font-body)]">
                <li>• Use the toggle to see real examples</li>
                <li>• Templates flow through the deal lifecycle</li>
              </ul>
            </div>
          </div>
        </nav>

        {/* Template Content */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 md:p-8 border border-[#E8ECEF]">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
