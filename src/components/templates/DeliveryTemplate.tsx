'use client';

import { useState } from 'react';
import TemplateToggle from './TemplateToggle';

const exampleData = {
  client: 'Patriot Home Insurance',
  program: 'Claims Processing Transformation',
  goLive: '04/01/2025',
  owner: 'Marcus Thompson, Delivery Manager',
  overview: 'Managed claims desk for homeowners insurance with CAT surge support. Scope includes triage, estimate package creation (Xactimate), internal QA, and submission to ClaimCenter. Team of 23 FTE including Program Manager, Team Leads, Senior Claim Writers, Claim Writers, and QA Analysts. Coverage 7am-7pm CT weekdays with weekend surge during CAT events. Target: 3,500 files/month steady-state, 9,500+ during CAT; 97% first-pass QA; ≤8% reopen rate.',
  metrics: [
    { metric: 'First Contact Time', target: '< 24 hours', measurement: '90th percentile', freq: 'Weekly' },
    { metric: 'Cycle Time (Non-CAT)', target: '≤ 12 days', measurement: 'Median', freq: 'Weekly' },
    { metric: 'First-Pass QA Rate', target: '97%+', measurement: 'Monthly average', freq: 'Weekly' },
    { metric: 'Reopen Rate', target: '≤ 8%', measurement: 'Rolling 30-day', freq: 'Weekly' },
    { metric: 'Supplement Rate', target: '≤ 12%', measurement: 'Monthly average', freq: 'Monthly' },
  ],
  opModel: 'Claims arrive via ClaimCenter FNOL. JDA triages and assigns tier (T1/T2/T3) based on complexity indicators. Writers create estimate packages in Xactimate per carrier guidelines. QA reviews per tier sampling rates (15%/35%/70%). Packages submitted to ClaimCenter with notes and attachments. Feedback loop for revisions handled within 48 hours. Senior writers handle Tier 3 and act as SME escalation point. Team Leads manage daily ops and writer performance. PM owns client relationship and governance cadence.',
  staffing: [
    { role: 'Program Manager', count: '1', span: 'Program-wide', shift: '8am-5pm CT', start: '03/15/2025' },
    { role: 'Team Lead', count: '2', span: '1:10 writers', shift: '7am-4pm / 10am-7pm CT', start: '03/17/2025' },
    { role: 'Senior Claim Writer', count: '4', span: '—', shift: 'Staggered (7am-7pm CT)', start: '03/17/2025' },
    { role: 'Claim Writer', count: '14', span: '—', shift: 'Staggered (7am-7pm CT)', start: '03/24/2025' },
    { role: 'QA Analyst', count: '2', span: '1:12 writers', shift: '8am-5pm CT', start: '03/24/2025' },
  ],
  hiring: {
    required: [
      'Xactimate proficiency (certification preferred)',
      '2+ years claims documentation or estimate writing experience',
      'Knowledge of homeowners insurance claims process',
      'Strong attention to detail and documentation skills',
      'Reliable high-speed internet and dedicated home office',
    ],
    preferred: [
      'Guidewire ClaimCenter experience',
      'CAT claims experience (hurricane, hail, wind)',
      'IICRC certification or similar',
      'Remote work experience (1+ years)',
      'Property inspection or adjusting background',
    ],
  },
  training: [
    { phase: 'Company Onboarding', duration: 'Day 1', content: 'HR policies, compliance training, IT setup, VPN/SSO access', owner: 'HR / IT' },
    { phase: 'Carrier Guidelines', duration: 'Days 2-5', content: 'Patriot Home claims standards, ClaimCenter workflows, Xactimate templates, defect taxonomy', owner: 'Trainer / Carrier SME' },
    { phase: 'Shadowing + Practice', duration: 'Week 2', content: 'Observe senior writers, practice files in sandbox, QA calibration sessions', owner: 'Team Lead / Senior Writer' },
    { phase: 'Supervised Production', duration: 'Week 3-4', content: 'Live files with 100% QA review, real-time coaching, tier certification', owner: 'Team Lead / QA' },
    { phase: 'Full Production', duration: 'Week 5+', content: 'Full queue access, standard QA sampling, performance tracking begins', owner: 'Team Lead' },
  ],
  qa: [
    { element: 'Sampling Rates', details: 'Tier 1: 15%, Tier 2: 35%, Tier 3: 70% (first 30 days), then calibrate based on performance' },
    { element: 'Rubric Categories', details: 'Accuracy (35%), Completeness (25%), Compliance (20%), Notes/Tone (10%), Attachments (10%)' },
    { element: 'Target Score', details: '97%+ first-pass rate' },
    { element: 'Defect Taxonomy', details: 'Critical / Major / Minor; auto-escalation on critical defects; retraining trigger at <90% individual score' },
    { element: 'Calibration', details: 'Weekly calibration with carrier QA lead; monthly rubric review and adjustment' },
  ],
  governance: [
    { meeting: 'Daily Standup', freq: 'Daily (8:30am CT)', attendees: 'Leads + Writers', purpose: 'Volume, blockers, priority claims, CAT status' },
    { meeting: 'Weekly Scorecard Review', freq: 'Wednesdays 2pm', attendees: 'JDA Ops + Carrier Claims Ops', purpose: 'KPIs, defect trends, action items, volume forecasting' },
    { meeting: 'Monthly Business Review', freq: 'First Thursday', attendees: 'VP Claims Ops + JDA Leadership', purpose: 'Performance trends, strategic items, CAT readiness, expansion planning' },
  ],
  scorecard: [
    { report: 'Daily Volume Summary', freq: 'Daily (6pm CT)', owner: 'Team Lead', dist: 'Internal Slack + Carrier Ops email' },
    { report: 'Weekly Scorecard', freq: 'Tuesdays by 10am', owner: 'Program Manager', dist: 'Carrier Claims Ops + JDA Leadership' },
    { report: 'Monthly Business Review Deck', freq: 'Monthly (3 days before MBR)', owner: 'Program Manager', dist: 'VP Claims Ops + JDA Execs' },
    { report: 'CAT Surge Report', freq: 'Daily during CAT', owner: 'Program Manager', dist: 'All stakeholders' },
  ],
  launchPlan: [
    { phase: 'Day 0-30 (Foundation)', milestones: 'Team hired and onboarded, training complete, ClaimCenter/Xactimate access live, QA rubric calibrated, pilot files processed', criteria: 'All 23 FTE certified; 100 pilot files with <5% defect rate' },
    { phase: 'Day 31-60 (Stabilization)', milestones: 'Full volume absorbed, QA calibrated with carrier, all SLAs met, first scorecard published', criteria: 'Volume at 3,500/month; First-pass QA ≥95%; client satisfaction survey ≥4.0' },
    { phase: 'Day 61-90 (Optimization)', milestones: 'Performance at target, cost per file stabilized, CAT readiness validated, process improvements documented', criteria: 'Steady-state achieved; 3 improvement initiatives identified; surge bench activated' },
  ],
  tooling: [
    'Guidewire ClaimCenter (claims management, submission)',
    'Xactimate (estimating software)',
    'Okta SSO + VPN access',
    'Slack (internal comms + carrier channel)',
    'Playvox (QA scoring, coaching)',
    'Looker (reporting dashboards)',
    'SharePoint (document management, guidelines)',
    'Zoom (governance calls, training)',
  ],
  risks: [
    { risk: 'ClaimCenter access delayed past March 15', impact: 'Training delay, go-live at risk', mitigation: 'Sandbox environment ready; escalate to carrier IT sponsor; parallel track with manual process', owner: 'JDA PM + Carrier IT' },
    { risk: 'Xactimate proficiency gaps in new hires', impact: 'Longer ramp, lower productivity in first 60 days', mitigation: 'Extended buddy system with seniors; Xactimate certification boot camp; performance-based tier assignment', owner: 'Training Lead' },
    { risk: 'CAT event during ramp period', impact: 'Team overwhelmed before full productivity', mitigation: 'Surge bench on standby; carrier flex on SLAs during ramp; phased volume increase', owner: 'Program Manager' },
    { risk: 'Volume forecasting inaccuracy', impact: 'Over/under staffing', mitigation: 'Weekly volume check-ins with carrier; 2-week look-ahead forecasting; flex staffing pool', owner: 'Program Manager' },
  ],
};

export default function DeliveryTemplate() {
  const [showExample, setShowExample] = useState(false);
  const d = showExample ? exampleData : null;

  return (
    <div className="space-y-8">
      {/* Document Header */}
      <div className="border-b-2 border-[#00A8CC] pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-[#00A8CC] uppercase tracking-wider mb-2">Template 05</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[#1B3A5C]">
              Delivery Handoff Pack
            </h2>
          </div>
          <div className="text-right text-sm text-[#6B7C93]">
            <p><span className="font-semibold">Version:</span> 2.2</p>
            <p><span className="font-semibold">Last Updated:</span> Jan 2025</p>
          </div>
        </div>
        <p className="text-[#6B7C93] italic">
          Gives delivery teams what they need to launch and run the program: hiring profile, ramp plan, QA plan, governance cadence, and scorecard. Used as the internal implementation guide and the basis for kickoff and onboarding.
        </p>
      </div>

      <TemplateToggle showExample={showExample} onToggle={() => setShowExample(!showExample)} />

      {/* Meta Fields */}
      <div className="grid grid-cols-4 gap-4 p-5 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]">
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Client</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.client : '[Client Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Program</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.program : '[Program Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Go-Live Date</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.goLive : '[MM/DD/YYYY]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Delivery Owner</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.owner : '[Name]'}
          </div>
        </div>
      </div>

      {/* Section 1: Overview */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">1</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Program Overview</h3>
        </div>
        <div className="pl-11">
          <div className={`min-h-[80px] bg-white border border-[#E8ECEF] rounded-lg p-4 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
            {d ? d.overview : '[Brief description of what we are delivering: scope, team size, coverage, key targets]'}
          </div>
        </div>
      </section>

      {/* Section 2: Success Metrics */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">2</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Success Metrics (KPIs + Targets)</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold">Target</th>
                  <th className="px-4 py-3 text-left font-semibold">Measurement</th>
                  <th className="px-4 py-3 text-left font-semibold">Reporting Freq</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.metrics : [
                  { metric: '[e.g., First Response Time]', target: '[e.g., < 1 hour]', measurement: '[e.g., 95th percentile]', freq: '[e.g., Weekly]' },
                  { metric: '[e.g., Resolution Rate]', target: '[e.g., 90%+]', measurement: '[e.g., First contact]', freq: '[e.g., Weekly]' },
                  { metric: '[e.g., CSAT]', target: '[e.g., 4.5+ / 5]', measurement: '[e.g., Monthly average]', freq: '[e.g., Monthly]' },
                  { metric: '[e.g., QA Score]', target: '[e.g., 92%+]', measurement: '[e.g., Monthly average]', freq: '[e.g., Monthly]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#1B3A5C]' : 'text-[#1B3A5C]'}`}>{row.metric}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.target}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.measurement}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.freq}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Operating Model */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">3</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Operating Model Summary</h3>
        </div>
        <div className="pl-11">
          <div className={`min-h-[80px] bg-white border border-[#E8ECEF] rounded-lg p-4 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
            {d ? d.opModel : '[Summarize the end-to-end workflow and role responsibilities]'}
          </div>
        </div>
      </section>

      {/* Section 4: Staffing */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">4</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Staffing Plan + Coverage</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-left font-semibold">Count</th>
                  <th className="px-4 py-3 text-left font-semibold">Span</th>
                  <th className="px-4 py-3 text-left font-semibold">Shift</th>
                  <th className="px-4 py-3 text-left font-semibold">Start Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.staffing : [
                  { role: '[e.g., Team Lead]', count: '[X]', span: '[e.g., 1:12]', shift: '[e.g., 8am-5pm EST]', start: '[Date]' },
                  { role: '[e.g., Senior Agent]', count: '[X]', span: '—', shift: '[e.g., Staggered]', start: '[Date]' },
                  { role: '[e.g., Agent]', count: '[X]', span: '—', shift: '[e.g., Staggered]', start: '[Date]' },
                  { role: '[e.g., QA Specialist]', count: '[X]', span: '[e.g., 1:15]', shift: '[e.g., Core hours]', start: '[Date]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#1B3A5C]' : 'text-[#1B3A5C]'}`}>{row.role}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.count}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.span}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.shift}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.start}</td>
                  </tr>
                ))}
                <tr className="bg-white font-semibold">
                  <td className="px-4 py-3 text-[#00A8CC]">TOTAL</td>
                  <td className="px-4 py-3 text-[#00A8CC]">{d ? '23 FTE' : '[X FTE]'}</td>
                  <td className="px-4 py-3 text-[#6B7C93]" colSpan={3}>—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Hiring Profile */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">5</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Hiring Profile + Screening Criteria</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/2">Required</th>
                  <th className="px-4 py-3 text-left font-semibold w-1/2">Preferred</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className={`px-4 py-3 align-top ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                    <ul className="space-y-2">
                      {(d ? d.hiring.required : [
                        '[e.g., 2+ years customer service experience]',
                        '[e.g., Strong written communication]',
                        '[e.g., Tech-savvy (CRM, ticketing)]',
                        '[e.g., Typing speed 50+ WPM]',
                        '[e.g., Reliable internet / home office setup]',
                      ]).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className={`px-4 py-3 align-top ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                    <ul className="space-y-2">
                      {(d ? d.hiring.preferred : [
                        '[e.g., Industry experience (SaaS, fintech)]',
                        '[e.g., Zendesk / Salesforce experience]',
                        '[e.g., Bilingual (Spanish)]',
                        '[e.g., Remote work experience]',
                      ]).map((item, i) => (
                        <li key={i}>• {item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6-9: Training, QA, Governance, Scorecard */}
      {[
        { num: 6, title: 'Training / Onboarding Plan', headers: ['Phase', 'Duration', 'Content', 'Owner'], data: d?.training, fallback: [
          { phase: '[e.g., Company Onboarding]', duration: '[e.g., Day 1]', content: '[e.g., HR, compliance, systems access]', owner: '[e.g., HR / IT]' },
          { phase: '[e.g., Product Training]', duration: '[e.g., Days 2-5]', content: '[e.g., Client product, workflows, tools]', owner: '[e.g., Trainer / Client]' },
          { phase: '[e.g., Nesting]', duration: '[e.g., Week 2-3]', content: '[e.g., Supervised live work, real-time coaching]', owner: '[e.g., Team Lead]' },
          { phase: '[e.g., Full Production]', duration: '[e.g., Week 4+]', content: '[e.g., Full volume, standard QA]', owner: '[e.g., Team Lead]' },
        ]},
        { num: 7, title: 'QA Plan', headers: ['Element', 'Details'], data: d?.qa, fallback: [
          { element: 'Rubric Categories', details: '[e.g., Accuracy, Tone, Resolution, Process adherence]' },
          { element: 'Sampling Rate', details: '[e.g., 5% of tickets, min 10/agent/month]' },
          { element: 'Target Score', details: '[e.g., 92%+]' },
          { element: 'Calibration', details: '[e.g., Monthly with client stakeholders]' },
          { element: 'Coaching Loop', details: '[e.g., Weekly 1:1s, real-time feedback on critical errors]' },
        ]},
        { num: 8, title: 'Governance Cadence', headers: ['Meeting', 'Frequency', 'Attendees', 'Purpose'], data: d?.governance, fallback: [
          { meeting: '[e.g., Daily Standup]', freq: '[Daily]', attendees: '[Team Lead + Agents]', purpose: '[Volume, blockers, priorities]' },
          { meeting: '[e.g., Weekly Ops Review]', freq: '[Weekly]', attendees: '[JDA Ops + Client Ops]', purpose: '[KPIs, issues, actions]' },
          { meeting: '[e.g., QBR]', freq: '[Quarterly]', attendees: '[Leadership + Stakeholders]', purpose: '[Strategic review, roadmap]' },
        ]},
        { num: 9, title: 'Scorecard / Reporting Spec', headers: ['Report', 'Frequency', 'Owner', 'Distribution'], data: d?.scorecard, fallback: [
          { report: '[e.g., Daily Volume Summary]', freq: '[Daily]', owner: '[Team Lead]', dist: '[Internal]' },
          { report: '[e.g., Weekly Scorecard]', freq: '[Weekly]', owner: '[Ops Lead]', dist: '[Client + Internal]' },
          { report: '[e.g., Monthly Business Review]', freq: '[Monthly]', owner: '[Account Manager]', dist: '[Client + Leadership]' },
        ]},
      ].map((section) => (
        <section key={section.num}>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">{section.num}</span>
            <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">{section.title}</h3>
          </div>
          <div className="pl-11">
            <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
              <table className="w-full text-sm">
                <thead className="bg-[#1B3A5C] text-white">
                  <tr>
                    {section.headers.map((h, i) => (
                      <th key={i} className="px-4 py-3 text-left font-semibold">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF]">
                  {(section.data || section.fallback).map((row: Record<string, string>, i: number) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                      {Object.values(row).map((val, j) => (
                        <td key={j} className={`px-4 py-3 ${j === 0 ? 'font-semibold text-[#1B3A5C]' : d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{val}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Section 10: Launch Plan */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">10</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Launch Plan (30/60/90 Milestones)</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Phase</th>
                  <th className="px-4 py-3 text-left font-semibold">Milestones</th>
                  <th className="px-4 py-3 text-left font-semibold">Success Criteria</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.launchPlan : [
                  { phase: 'Day 1-30 (Foundation)', milestones: '[e.g., Team hired, training complete, systems live, nesting done]', criteria: '[e.g., All agents certified, handling tickets]' },
                  { phase: 'Day 31-60 (Stabilization)', milestones: '[e.g., Full volume absorbed, QA calibrated, SLAs met]', criteria: '[e.g., First scorecard published, client satisfaction > 4.0]' },
                  { phase: 'Day 61-90 (Optimization)', milestones: '[e.g., Performance at target, improvements identified]', criteria: '[e.g., Steady-state achieved, expansion discussions]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.phase}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.milestones}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.criteria}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 11: Tooling */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">11</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Tooling / Access Checklist</h3>
        </div>
        <div className="pl-11">
          <div className="space-y-2">
            {(d ? d.tooling : [
              '[e.g., Zendesk / Ticketing system access]',
              '[e.g., CRM access (Salesforce)]',
              '[e.g., Knowledge base access]',
              '[e.g., SSO / VPN setup]',
              '[e.g., Communication tools (Slack, Teams)]',
              '[e.g., QA tool access]',
              '[e.g., Reporting / BI dashboards]',
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
      </section>

      {/* Section 12: Risks */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">12</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Risks + Open Issues for Kickoff</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Risk / Issue</th>
                  <th className="px-4 py-3 text-left font-semibold">Impact</th>
                  <th className="px-4 py-3 text-left font-semibold">Mitigation / Next Step</th>
                  <th className="px-4 py-3 text-left font-semibold">Owner</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.risks : [
                  { risk: '[e.g., System access delayed]', impact: '[e.g., Training delay]', mitigation: '[e.g., Use sandbox, escalate to client IT]', owner: '[Name]' },
                  { risk: '[e.g., Knowledge gaps in documentation]', impact: '[e.g., Slower ramp]', mitigation: '[e.g., Shadow sessions with client SMEs]', owner: '[Name]' },
                  { risk: '[Risk / Issue 3]', impact: '[Impact]', mitigation: '[Mitigation]', owner: '[Owner]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.risk}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.impact}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.mitigation}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.owner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
