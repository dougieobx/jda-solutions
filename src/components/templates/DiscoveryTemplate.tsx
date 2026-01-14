'use client';

import { useState } from 'react';
import TemplateToggle from './TemplateToggle';

// Example data for Homeowners Insurance Claims scenario
const exampleData = {
  clientName: 'Patriot Home Insurance',
  closeDate: '02/28/2025',
  problem: {
    painPoints: '• CAT (catastrophic storm) events create severe backlog; cycle time jumps from ~18 days to 45–60+ days\n• Vendor quality is inconsistent across IA firms; supplements and reopens are high, driving extra LAE\n• Internal claims managers spend 40%+ of time "babysitting" vendors with no reliable scorecard\n• No standardized QA process; audit prep is manual and painful',
    costOfInaction: '$4.8M in excess LAE annually from rework and supplements; NPS dropped 18 points after last CAT season; state regulator flagged cycle time concerns in Q3 audit; top 2 IA vendors threatening to exit due to volume unpredictability',
    triggerEvent: 'VP Claims Operations mandate after Q3 board review; current primary IA contract expires March 31, 2025; hurricane season planning begins in 60 days',
  },
  outcomes: [
    { metric: 'Average Cycle Time', current: '18 days (45-60 CAT)', target: '12 days (24 CAT)', timeline: 'Day 90' },
    { metric: 'First Contact SLA', current: '~48 hours', target: '24 hours (90%+)', timeline: 'Day 60' },
    { metric: 'First-Pass QA Score', current: '82%', target: '97%+', timeline: 'Day 90' },
    { metric: 'Reopen Rate', current: '14%', target: '≤ 8%', timeline: 'Day 120' },
  ],
  demand: {
    unitOfWork: 'Claim file processed through estimate package + carrier submission',
    monthlyVolume: '3,500 files/month (avg), 9,500 peak during CAT',
    tiers: [
      { tier: 'Tier 1', desc: 'Standard: single-structure, clean docs, low supplement likelihood', mix: '60%', aht: '2.3 hrs' },
      { tier: 'Tier 2', desc: 'Complex: multi-room/multi-trade, missing docs, supplements likely', mix: '30%', aht: '4 hrs' },
      { tier: 'Tier 3', desc: 'High-risk: large loss, coverage questions, fraud indicators, high compliance', mix: '10%', aht: '8 hrs' },
    ],
    seasonality: 'Primary CAT spikes May–September (hurricane/tornado season); secondary spikes from hail/wind events. Peak volumes can sustain 6–10 weeks. Weekend surge coverage required during active CAT events.',
  },
  constraints: [
    { type: 'Timeline', details: 'Go-live target: 6 weeks for initial coverage; full scale within 90 days' },
    { type: 'Budget', details: '$2.4M annual ceiling; must demonstrate 15% LAE reduction vs. current vendor mix' },
    { type: 'Compliance', details: 'SOC 2-like controls required; strict access logging; no offshore access to PII; audit-ready QA documentation' },
    { type: 'Tooling', details: 'Must work inside Guidewire ClaimCenter + Xactimate; limited API availability; carrier retains final approval authority' },
  ],
  stakeholders: [
    { name: 'Michael Torres', title: 'VP, Claims Operations', role: 'Decision Maker', priority: 'Cycle time, LAE reduction, CAT readiness' },
    { name: 'Sandra Williams', title: 'Head of Claims QA', role: 'Champion', priority: 'Quality scores, reopen rates, audit readiness' },
    { name: 'David Chen', title: 'IT Security Lead', role: 'Approver', priority: 'PII controls, access logging, SOC 2 alignment' },
    { name: 'Rachel Kim', title: 'Director, Procurement', role: 'Approver', priority: 'Cost structure, contract terms, vendor consolidation' },
  ],
  openItems: [
    '12-month volume data by week + CAT event history',
    'Defect taxonomy + current vendor QA rubric (if any)',
    'Top 10 reasons for reopens/supplements',
    'Sample set of 30 closed files (good/average/bad examples)',
  ],
  nextSteps: [
    { action: 'Schedule workflow deep dive with Claims Ops + QA teams', owner: 'JDA SE', due: '01/22/2025' },
    { action: 'Conduct security intake call with IT Security Lead', owner: 'JDA Security', due: '01/24/2025' },
    { action: 'Request ClaimCenter sandbox access for workflow mapping', owner: 'JDA PM', due: '01/27/2025' },
  ],
};

export default function DiscoveryTemplate() {
  const [showExample, setShowExample] = useState(false);
  const d = showExample ? exampleData : null;

  return (
    <div className="space-y-8">
      {/* Document Header */}
      <div className="border-b-2 border-[#00A8CC] pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-[#00A8CC] uppercase tracking-wider mb-2">Template 01</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[#1B3A5C]">
              Discovery Summary
            </h2>
          </div>
          <div className="text-right text-sm text-[#6B7C93]">
            <p><span className="font-semibold">Version:</span> 2.1</p>
            <p><span className="font-semibold">Last Updated:</span> Jan 2025</p>
          </div>
        </div>
        <p className="text-[#6B7C93] italic">
          Captures the core problem, outcomes, volumes/volatility, constraints, and decision process from discovery. Used to confirm feasibility and identify what&apos;s missing before building the Solution Blueprint and pricing.
        </p>
      </div>

      {/* Toggle */}
      <TemplateToggle showExample={showExample} onToggle={() => setShowExample(!showExample)} />

      {/* Meta Fields */}
      <div className="grid grid-cols-2 gap-4 p-5 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]">
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Client Name</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.clientName : '[Client Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Target Close Date</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.closeDate : '[MM/DD/YYYY]'}
          </div>
        </div>
      </div>

      {/* Section 1: Problem */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">1</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Problem</h3>
        </div>
        <div className="pl-11 space-y-4">
          {!showExample && (
            <div className="p-4 bg-[#F8F9FA] border-l-4 border-[#00A8CC] rounded-r-lg">
              <p className="text-sm text-[#2D3E50] italic">
                What&apos;s broken today? Why does the client need to change now? What happens if they do nothing?
              </p>
            </div>
          )}
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Current State Pain Points</label>
              <div className={`min-h-[80px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm whitespace-pre-line ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.problem.painPoints : '[e.g., Current vendor missing SLAs by 15%+ for 3 consecutive quarters; Internal team at 140% capacity, turnover spiking; Customer complaints up 2x YoY]'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Cost of Inaction</label>
              <div className={`min-h-[60px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.problem.costOfInaction : '[e.g., $2.4M annual revenue at risk from churn; compliance audit in Q3 with no clear path to passing]'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Trigger Event</label>
              <div className={`min-h-[40px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.problem.triggerEvent : '[e.g., CEO mandate to fix CX by Q4; current contract expires in 90 days]'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Outcomes */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">2</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Outcomes</h3>
        </div>
        <div className="pl-11 space-y-4">
          {!showExample && (
            <div className="p-4 bg-[#F8F9FA] border-l-4 border-[#00A8CC] rounded-r-lg">
              <p className="text-sm text-[#2D3E50] italic">
                What does success look like? Be specific with metrics and timeframes.
              </p>
            </div>
          )}
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Outcome</th>
                  <th className="px-4 py-3 text-left font-semibold">Current</th>
                  <th className="px-4 py-3 text-left font-semibold">Target</th>
                  <th className="px-4 py-3 text-left font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.outcomes : [
                  { metric: '[Metric 1]', current: '[Current value]', target: '[Target value]', timeline: '[Day X]' },
                  { metric: '[Metric 2]', current: '[Current value]', target: '[Target value]', timeline: '[Day X]' },
                  { metric: '[Metric 3]', current: '[Current value]', target: '[Target value]', timeline: '[Day X]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.metric}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.current}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.target}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Demand */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">3</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Demand</h3>
        </div>
        <div className="pl-11 space-y-4">
          {!showExample && (
            <div className="p-4 bg-[#F8F9FA] border-l-4 border-[#00A8CC] rounded-r-lg">
              <p className="text-sm text-[#2D3E50] italic">
                Define the unit of work, expected volumes, and complexity distribution. This drives staffing and pricing.
              </p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Unit of Work</label>
              <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.demand.unitOfWork : '[e.g., Support ticket, Application, Claim]'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Monthly Volume</label>
              <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.demand.monthlyVolume : '[e.g., 12,000 - 15,000 / month]'}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Complexity Distribution</label>
            <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Tier</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Description</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">% Mix</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Avg Handle Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF] bg-white">
                  {(d ? d.demand.tiers : [
                    { tier: 'Tier 1', desc: '[Description]', mix: '[X%]', aht: '[X min]' },
                    { tier: 'Tier 2', desc: '[Description]', mix: '[X%]', aht: '[X min]' },
                    { tier: 'Tier 3', desc: '[Description]', mix: '[X%]', aht: '[X min]' },
                  ]).map((row, i) => (
                    <tr key={i}>
                      <td className="px-4 py-2 font-semibold text-[#1B3A5C]">{row.tier}</td>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.desc}</td>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.mix}</td>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.aht}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Seasonality / Volatility Notes</label>
            <div className={`min-h-[60px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
              {d ? d.demand.seasonality : '[e.g., Volume spikes 40% in Q4; Monday volumes 25% higher than Friday]'}
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Constraints */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">4</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Constraints</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/4">Constraint</th>
                  <th className="px-4 py-3 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.constraints : [
                  { type: 'Timeline', details: '[e.g., Must be live by Sept 1; current contract ends Aug 31]' },
                  { type: 'Budget', details: '[e.g., $1.2M annual ceiling; must show 15% savings vs. current]' },
                  { type: 'Compliance', details: '[e.g., SOC 2 Type II required; HIPAA BAA needed]' },
                  { type: 'Geography', details: '[e.g., US-only agents required; EST business hours coverage]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.type}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Stakeholders */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">5</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Stakeholders</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Name</th>
                  <th className="px-4 py-3 text-left font-semibold">Title</th>
                  <th className="px-4 py-3 text-left font-semibold">Role in Decision</th>
                  <th className="px-4 py-3 text-left font-semibold">Priority / Focus</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.stakeholders : [
                  { name: '[Name]', title: '[Title]', role: '[Decision Maker / Champion / Approver]', priority: '[e.g., Cost savings, speed]' },
                  { name: '[Name]', title: '[Title]', role: '[Decision Maker / Champion / Approver]', priority: '[e.g., Quality, CSAT]' },
                  { name: '[Name]', title: '[Title]', role: '[Decision Maker / Champion / Approver]', priority: '[e.g., Compliance, terms]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50] font-medium' : 'text-[#6B7C93]'}`}>{row.name}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.title}</td>
                    <td className="px-4 py-3">
                      {d ? (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          row.role === 'Decision Maker' ? 'bg-[#00A8CC]/10 text-[#00A8CC]' :
                          row.role === 'Champion' ? 'bg-[#1B3A5C]/10 text-[#1B3A5C]' :
                          'bg-[#6B7C93]/10 text-[#6B7C93]'
                        }`}>{row.role}</span>
                      ) : (
                        <span className="text-[#6B7C93]">{row.role}</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.priority}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Open Items + Next Steps */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">6</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Open Items + Next Steps</h3>
        </div>
        <div className="pl-11 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Missing Information</label>
            <div className="space-y-2">
              {(d ? d.openItems : [
                '[Item 1 - e.g., Historical volume data (last 12 months)]',
                '[Item 2 - e.g., Current cost breakdown]',
                '[Item 3 - e.g., Existing SLA documentation]',
              ]).map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-white border border-[#E8ECEF] rounded-lg">
                  <div className={`w-5 h-5 rounded border-2 flex-shrink-0 flex items-center justify-center ${d ? 'border-[#00A8CC] bg-[#00A8CC]' : 'border-[#E8ECEF]'}`}>
                    {d && <span className="text-white text-xs">✓</span>}
                  </div>
                  <span className={`text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Next Steps</label>
            <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8F9FA]">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Action</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Owner</th>
                    <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Due</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF] bg-white">
                  {(d ? d.nextSteps : [
                    { action: '[Action item]', owner: '[Name]', due: '[Date]' },
                    { action: '[Action item]', owner: '[Name]', due: '[Date]' },
                    { action: '[Action item]', owner: '[Name]', due: '[Date]' },
                  ]).map((row, i) => (
                    <tr key={i}>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.action}</td>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.owner}</td>
                      <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.due}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-[#E8ECEF] flex items-center justify-between text-sm text-[#6B7C93]">
        <p>JDA TSG  |  Solutions Engineering</p>
        <p>Confidential - Internal Use Only</p>
      </div>
    </div>
  );
}
