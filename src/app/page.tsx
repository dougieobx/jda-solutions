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

  const ActiveComponent = activeTemplate.component;

  return (
    <main className="min-h-screen bg-[#F8F9FA] flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1B3A5C] to-[#2D3E50] py-6 px-6 shadow-lg">
        <div className="max-w-[1400px] mx-auto">
          <h1 className="font-[family-name:var(--font-heading)] tracking-tight text-white flex items-baseline gap-2">
            <span className="text-3xl font-bold">JDA TSG</span>
            <span className="text-[#00A8CC] text-2xl">|</span>
            <span className="text-xl font-normal italic">Expect more, move faster.</span>
          </h1>
          <p className="text-white/80 text-base mt-1 font-[family-name:var(--font-body)]">
            Solutions Engineering Template Library
          </p>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 max-w-[1400px] mx-auto w-full py-8 px-6 gap-8">
        {/* Sidebar */}
        <nav className="w-72 flex-shrink-0">
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
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-8 border border-[#E8ECEF]">
            <ActiveComponent />
          </div>
        </div>
      </div>
    </main>
  );
}
