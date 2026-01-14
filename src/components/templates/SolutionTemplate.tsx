'use client';

import { useState } from 'react';
import TemplateToggle from './TemplateToggle';

const exampleData = {
  client: 'Patriot Home Insurance',
  program: 'Claims Processing Transformation',
  owner: 'Jessica Martinez, Solutions Engineer',
  scope: {
    inScope: [
      'Triage + tiering of incoming claims',
      'Claim writing / estimate package creation',
      'Internal QA with defect taxonomy',
      'Submission to carrier system (ClaimCenter)',
      'Feedback loop handling (revisions, disputes)',
      'Reporting + governance cadence',
    ],
    outScope: [
      'Final claim approval authority (carrier-retained)',
      'Payments authorization',
      'Litigation handling',
      'Field inspections (unless added later)',
      'Fraud investigation (escalate to SIU)',
    ],
  },
  unitOfWork: 'Estimate package delivered to carrier system',
  channels: 'ClaimCenter + Xactimate',
  tiers: [
    { tier: 'Tier 1', desc: 'Standard: single-structure, clean docs, low supplement likelihood', mix: '60%', aht: '2.3 hrs', notes: 'Templated workflow, minimal research' },
    { tier: 'Tier 2', desc: 'Complex: multi-room/multi-trade, missing docs, supplements likely', mix: '30%', aht: '4 hrs', notes: 'Additional documentation gathering required' },
    { tier: 'Tier 3', desc: 'High-risk: large loss, coverage questions, fraud indicators', mix: '10%', aht: '8 hrs', notes: 'Senior writer assignment, compliance review' },
  ],
  workflow: [
    { step: 1, stage: 'Intake Received', owner: 'System', desc: 'FNOL + supporting documents received via ClaimCenter' },
    { step: 2, stage: 'Triage + Tier Assignment', owner: 'JDA', desc: 'Assign Tier 1/2/3 based on complexity indicators' },
    { step: 3, stage: 'Writer Assignment', owner: 'JDA', desc: 'Route to appropriate tier writer, start SLA clock' },
    { step: 4, stage: 'Gather Missing Info', owner: 'JDA', desc: 'Checklist review + outreach for missing documentation' },
    { step: 5, stage: 'Draft Estimate Package', owner: 'JDA', desc: 'Create estimate per carrier guidelines in Xactimate' },
    { step: 6, stage: 'QA Review', owner: 'JDA', desc: 'Rubric scoring + defect taxonomy application' },
    { step: 7, stage: 'Rework Loop', owner: 'JDA', desc: 'Writer corrections if needed, re-QA for material changes' },
    { step: 8, stage: 'Submit to Carrier', owner: 'JDA', desc: 'Package submitted in ClaimCenter with notes + attachments' },
    { step: 9, stage: 'Carrier Feedback', owner: 'Client', desc: 'Approve / revise / dispute decision from carrier' },
    { step: 10, stage: 'Handle Revision', owner: 'JDA', desc: 'Process revision requests + re-QA if material change' },
    { step: 11, stage: 'Close File', owner: 'JDA', desc: 'Tag reason codes, update status, archive documentation' },
    { step: 12, stage: 'Weekly Reporting', owner: 'JDA', desc: 'Compile metrics, trend analysis, escalation summary' },
  ],
  team: [
    { role: 'Program Manager', count: '1', span: 'Program-wide', shift: '8am-5pm CT' },
    { role: 'Team Lead', count: '2', span: '1:10 writers', shift: '7am-4pm / 10am-7pm CT' },
    { role: 'Senior Claim Writer', count: '4', span: '—', shift: 'Staggered (7am-7pm CT)' },
    { role: 'Claim Writer', count: '14', span: '—', shift: 'Staggered (7am-7pm CT)' },
    { role: 'QA Analyst', count: '2', span: '1:12 writers', shift: '8am-5pm CT' },
  ],
  qa: [
    { element: 'Sample Rate', details: 'Tier 1: 15%, Tier 2: 35%, Tier 3: 70% (first 30 days), then calibrate down' },
    { element: 'QA Rubric', details: 'Accuracy (35%), Completeness (25%), Compliance (20%), Notes/Tone (10%), Attachments (10%)' },
    { element: 'Target Score', details: '97%+ first-pass rate' },
    { element: 'Defect Taxonomy', details: 'Critical / Major / Minor classification; auto-escalation on critical defects' },
    { element: 'Calibration', details: 'Weekly calibration with carrier QA lead; monthly rubric review' },
    { element: 'Coaching Loop', details: 'Weekly 1:1s with writers; retraining triggers at <90% individual score' },
  ],
  governance: [
    { meeting: 'Daily Standup', freq: 'Daily (8:30am CT)', attendees: 'Leads + Writers', purpose: 'Volume, blockers, priority claims' },
    { meeting: 'Weekly Scorecard Review', freq: 'Wednesdays 2pm', attendees: 'JDA Ops + Carrier Claims Ops', purpose: 'KPIs, defect trends, action items' },
    { meeting: 'Monthly Business Review', freq: 'First Thursday', attendees: 'VP Claims Ops + JDA Leadership', purpose: 'Performance trends, strategic items, CAT prep' },
    { meeting: 'QBR', freq: 'Quarterly', attendees: 'Exec sponsors both sides', purpose: 'Strategic review, expansion planning, contract review' },
  ],
  kpis: [
    { metric: 'First Contact Time', target: '< 24 hours', measurement: '90th percentile', freq: 'Weekly' },
    { metric: 'Cycle Time (Non-CAT)', target: '≤ 12 days', measurement: 'Median', freq: 'Weekly' },
    { metric: 'First-Pass QA Rate', target: '97%+', measurement: 'Monthly average', freq: 'Weekly' },
    { metric: 'Reopen Rate', target: '≤ 8%', measurement: 'Rolling 30-day', freq: 'Weekly' },
    { metric: 'Supplement Rate', target: '≤ 12%', measurement: 'Monthly average', freq: 'Monthly' },
  ],
  assumptions: 'Carrier provides ClaimCenter access + Xactimate licenses within 2 weeks of signature. Templates and guidelines documentation complete. Volume remains within 3,500-4,000/month band (non-CAT). Complexity mix stable at 60/30/10. Carrier responds to escalations within 4 business hours.',
  dependencies: 'SSO/VPN integration for secure system access. Carrier maintains guidelines documentation. Timely FNOL data quality (complete policyholder info, photos, adjuster notes). 48-hour SLA on carrier feedback for revisions.',
  risks: [
    { risk: 'CAT volume exceeds 9,500/month', likelihood: 'Medium', impact: 'High', mitigation: 'Surge pricing clause, pre-trained bench pool of 8 writers, weekend coverage protocol' },
    { risk: 'Tier 3 mix exceeds 15%', likelihood: 'Medium', impact: 'Medium', mitigation: 'Tier premium pricing trigger, senior writer cross-training' },
    { risk: 'ClaimCenter access delayed', likelihood: 'Medium', impact: 'High', mitigation: 'Sandbox environment for training, phased go-live with manual workarounds' },
    { risk: 'Xactimate proficiency gaps', likelihood: 'High', impact: 'Medium', mitigation: 'Extended training period, buddy system with senior writers, Xactimate certification requirement' },
  ],
};

export default function SolutionTemplate() {
  const [showExample, setShowExample] = useState(false);
  const d = showExample ? exampleData : null;

  return (
    <div className="space-y-8">
      {/* Document Header */}
      <div className="border-b-2 border-[#00A8CC] pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-[#00A8CC] uppercase tracking-wider mb-2">Template 02</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[#1B3A5C]">
              Solution Blueprint
            </h2>
          </div>
          <div className="text-right text-sm text-[#6B7C93]">
            <p><span className="font-semibold">Version:</span> 3.0</p>
            <p><span className="font-semibold">Last Updated:</span> Jan 2025</p>
          </div>
        </div>
        <p className="text-[#6B7C93] italic">
          Defines the actual service &quot;system&quot; so the deal is operable, not just sellable. Used as the internal alignment artifact and the backbone for staffing, delivery planning, and the proposal narrative.
        </p>
      </div>

      <TemplateToggle showExample={showExample} onToggle={() => setShowExample(!showExample)} />

      {/* Meta Fields */}
      <div className="grid grid-cols-3 gap-4 p-5 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]">
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Client</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.client : '[Client Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Program Name</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.program : '[Program Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Blueprint Owner</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.owner : '[Solutions Engineer]'}
          </div>
        </div>
      </div>

      {/* Section 1: Scope */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">1</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Scope (In / Out)</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/2">In Scope</th>
                  <th className="px-4 py-3 text-left font-semibold w-1/2">Out of Scope</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white">
                  <td className={`px-4 py-3 align-top ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                    <ul className="space-y-2">
                      {(d ? d.scope.inScope : [
                        '[e.g., Tier 1 & Tier 2 email/chat support]',
                        '[e.g., M-F 8am-8pm EST coverage]',
                        '[e.g., English language only]',
                        '[e.g., Standard QA and reporting]',
                        '[e.g., Weekly governance calls]',
                      ]).map((item, i) => (
                        <li key={i}>{d ? `• ${item}` : item}</li>
                      ))}
                    </ul>
                  </td>
                  <td className={`px-4 py-3 align-top ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                    <ul className="space-y-2">
                      {(d ? d.scope.outScope : [
                        '[e.g., Phone support]',
                        '[e.g., Weekend / holiday coverage]',
                        '[e.g., Tier 3 escalations (client-retained)]',
                        '[e.g., Social media monitoring]',
                        '[e.g., Outbound campaigns]',
                      ]).map((item, i) => (
                        <li key={i}>{d ? `• ${item}` : item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: Unit of Work */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">2</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Unit of Work + Complexity Tiers</h3>
        </div>
        <div className="pl-11 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Unit of Work</label>
              <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.unitOfWork : '[e.g., Support ticket]'}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Channel(s)</label>
              <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
                {d ? d.channels : '[e.g., Email, Chat]'}
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Tier</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Description</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">% Mix</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Target AHT</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Handling Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF] bg-white">
                {(d ? d.tiers : [
                  { tier: 'Tier 1', desc: '[Description]', mix: '[X%]', aht: '[X min]', notes: '[e.g., Scripted, macro-enabled]' },
                  { tier: 'Tier 2', desc: '[Description]', mix: '[X%]', aht: '[X min]', notes: '[e.g., Research required]' },
                  { tier: 'Tier 3', desc: '[Description]', mix: '[X%]', aht: '[X min]', notes: '[e.g., Escalation to client]' },
                ]).map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-semibold text-[#1B3A5C]">{row.tier}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.desc}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.mix}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.aht}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: Workflow */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">3</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Workflow (End-to-End)</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-16">Step</th>
                  <th className="px-4 py-3 text-left font-semibold">Stage</th>
                  <th className="px-4 py-3 text-left font-semibold">Owner</th>
                  <th className="px-4 py-3 text-left font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.workflow : [
                  { step: 1, stage: '[e.g., Ticket Received]', owner: '[System / JDA / Client]', desc: '[e.g., Customer submits ticket via portal]' },
                  { step: 2, stage: '[e.g., Triage & Route]', owner: '[System / JDA / Client]', desc: '[e.g., Auto-categorize and assign to queue]' },
                  { step: 3, stage: '[e.g., Agent Assignment]', owner: '[System / JDA / Client]', desc: '[e.g., Skill-based routing to available agent]' },
                  { step: 4, stage: '[e.g., Resolution]', owner: '[System / JDA / Client]', desc: '[e.g., Agent resolves or escalates]' },
                  { step: 5, stage: '[e.g., QA Sample]', owner: '[System / JDA / Client]', desc: '[e.g., Random sample for quality review]' },
                  { step: 6, stage: '[e.g., Close]', owner: '[System / JDA / Client]', desc: '[e.g., Ticket closed, CSAT survey sent]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3"><span className="w-6 h-6 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs">{row.step}</span></td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#1B3A5C]' : 'text-[#1B3A5C]'}`}>{row.stage}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.owner}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Team Model */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">4</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Team Model + Coverage</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Role</th>
                  <th className="px-4 py-3 text-left font-semibold">Headcount</th>
                  <th className="px-4 py-3 text-left font-semibold">Span of Control</th>
                  <th className="px-4 py-3 text-left font-semibold">Shift / Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.team : [
                  { role: '[e.g., Team Lead]', count: '[X]', span: '[e.g., 1:12 agents]', shift: '[e.g., 8am-5pm EST]' },
                  { role: '[e.g., Senior Agent]', count: '[X]', span: '—', shift: '[e.g., Staggered]' },
                  { role: '[e.g., Agent]', count: '[X]', span: '—', shift: '[e.g., Staggered]' },
                  { role: '[e.g., QA Specialist]', count: '[X]', span: '[e.g., 1:15 agents]', shift: '[e.g., Core hours]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#1B3A5C]' : 'text-[#1B3A5C]'}`}>{row.role}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.count}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.span}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.shift}</td>
                  </tr>
                ))}
                <tr className="bg-white font-semibold">
                  <td className="px-4 py-3 text-[#00A8CC]">TOTAL</td>
                  <td className="px-4 py-3 text-[#00A8CC]">{d ? '23 FTE' : '[X FTE]'}</td>
                  <td className="px-4 py-3 text-[#6B7C93]">—</td>
                  <td className="px-4 py-3 text-[#6B7C93]">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: QA Model */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">5</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">QA Model</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/3">Element</th>
                  <th className="px-4 py-3 text-left font-semibold">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.qa : [
                  { element: 'Sample Rate', details: '[e.g., 5% of tickets, min 10/agent/month]' },
                  { element: 'QA Rubric', details: '[e.g., Accuracy, Tone, Resolution, Process adherence]' },
                  { element: 'Target Score', details: '[e.g., 92%+]' },
                  { element: 'Calibration', details: '[e.g., Monthly with client stakeholders]' },
                  { element: 'Coaching Loop', details: '[e.g., Weekly 1:1s, real-time feedback on critical errors]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.element}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Governance */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">6</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Governance Cadence + Escalation</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Meeting</th>
                  <th className="px-4 py-3 text-left font-semibold">Frequency</th>
                  <th className="px-4 py-3 text-left font-semibold">Attendees</th>
                  <th className="px-4 py-3 text-left font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.governance : [
                  { meeting: '[e.g., Daily Standup]', freq: '[Daily]', attendees: '[Team Lead + Agents]', purpose: '[Volume, blockers, priorities]' },
                  { meeting: '[e.g., Weekly Ops Review]', freq: '[Weekly]', attendees: '[JDA Ops + Client Ops]', purpose: '[KPIs, issues, actions]' },
                  { meeting: '[e.g., QBR]', freq: '[Quarterly]', attendees: '[Leadership + Stakeholders]', purpose: '[Strategic review, roadmap]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#1B3A5C]' : 'text-[#1B3A5C]'}`}>{row.meeting}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.freq}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.attendees}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: KPIs */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">7</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">KPIs / Reporting</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Metric</th>
                  <th className="px-4 py-3 text-left font-semibold">Target</th>
                  <th className="px-4 py-3 text-left font-semibold">Measurement</th>
                  <th className="px-4 py-3 text-left font-semibold">Frequency</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.kpis : [
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

      {/* Section 8: Assumptions */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">8</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Assumptions + Dependencies</h3>
        </div>
        <div className="pl-11 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Key Assumptions</label>
            <div className={`min-h-[80px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
              {d ? d.assumptions : '[e.g., Client provides access to CRM within 2 weeks of contract signature; Volume remains within 10,000-15,000/month band; Complexity mix remains stable at 60/30/10]'}
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-[#1B3A5C] mb-2">Dependencies on Client</label>
            <div className={`min-h-[60px] bg-white border border-[#E8ECEF] rounded-lg p-3 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
              {d ? d.dependencies : '[e.g., SSO integration; Knowledge base access; Timely escalation responses]'}
            </div>
          </div>
        </div>
      </section>

      {/* Section 9: Risks */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">9</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Risks + Mitigations</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Risk</th>
                  <th className="px-4 py-3 text-left font-semibold">Likelihood</th>
                  <th className="px-4 py-3 text-left font-semibold">Impact</th>
                  <th className="px-4 py-3 text-left font-semibold">Mitigation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.risks : [
                  { risk: '[e.g., Volume exceeds forecast]', likelihood: '[High / Medium / Low]', impact: '[High / Medium / Low]', mitigation: '[e.g., Surge pricing clause, flex staffing pool]' },
                  { risk: '[e.g., Delayed system access]', likelihood: '[High / Medium / Low]', impact: '[High / Medium / Low]', mitigation: '[e.g., Sandbox environment for training]' },
                  { risk: '[Risk 3]', likelihood: '[High / Medium / Low]', impact: '[High / Medium / Low]', mitigation: '[Mitigation]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.risk}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.likelihood}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.impact}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.mitigation}</td>
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
