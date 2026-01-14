'use client';

import { useState } from 'react';
import TemplateToggle from './TemplateToggle';

const exampleData = {
  client: 'Patriot Home Insurance',
  program: 'Claims Processing Transformation',
  effectiveDate: '04/01/2025',
  baselineScope: [
    'Triage + tiering of incoming homeowners claims',
    'Claim writing / estimate package creation (Tier 1, 2, 3)',
    'Internal QA with defect taxonomy',
    'Submission to ClaimCenter with notes + attachments',
    'Feedback loop handling (revisions, disputes)',
    'No payments authority (carrier-retained)',
  ],
  volumeMix: [
    { param: 'Volume Band (Non-CAT)', value: '3,000 - 4,000 files/month', notes: 'Per pricing agreement base band' },
    { param: 'CAT Surge Threshold', value: '> 6,000 files/month', notes: 'Triggers surge pricing + staffing' },
    { param: 'Complexity Mix', value: '60% T1 / 30% T2 / 10% T3', notes: 'Per Solution Blueprint' },
  ],
  slas: [
    { sla: 'Coverage Hours', baseline: '7am-7pm CT weekdays; weekend surge during CAT' },
    { sla: 'First Contact Time', baseline: '< 24 hours (90th percentile)' },
    { sla: 'Estimate Package (Tier 1)', baseline: '5 business days' },
    { sla: 'Estimate Package (Tier 2)', baseline: '8 business days' },
    { sla: 'Estimate Package (Tier 3)', baseline: '12 business days' },
    { sla: 'First-Pass QA Rate', baseline: '97%+' },
  ],
  volumeTriggers: [
    { trigger: 'Volume Exceeds Band 2', threshold: '> 6,000 files for 2+ weeks', evidence: 'Weekly claim count report', action: 'Activate Band 2 pricing ($38/file)' },
    { trigger: 'CAT Surge Activated', threshold: '> 9,000 files/month or declared CAT', evidence: 'Monthly volume + CAT declaration', action: 'Surge pricing ($52/file) + surge staffing + weekend coverage' },
    { trigger: 'CAT Extended', threshold: 'Surge > 10 consecutive weeks', evidence: 'Rolling volume report', action: 'Pricing restructure discussion; possible base adjustment' },
    { trigger: 'Volume Drops', threshold: '< 2,500 files for 2+ months', evidence: 'Monthly volume report', action: 'Base fee adjustment discussion; staffing reduction plan' },
  ],
  complexityTriggers: [
    { trigger: 'Tier 3 Mix Increase', threshold: 'T3 exceeds 15% for full month', evidence: 'Tier distribution report', action: 'Apply Tier 3 premium ($85/file) or repricing discussion' },
    { trigger: 'New Claim Type Added', threshold: 'New category > 5% of volume', evidence: 'Work type analysis', action: 'Scope addendum + tier mapping + repricing' },
    { trigger: 'Fraud/SIU Escalations', threshold: '> 3% of files require SIU referral', evidence: 'Escalation log', action: 'Additional compliance staffing; pricing adjustment' },
  ],
  slaTriggers: [
    { trigger: 'SLA Tightening', threshold: 'First contact reduced to < 12 hours', evidence: 'Written change request', action: 'Repricing required; staffing model adjustment' },
    { trigger: 'Coverage Expansion', threshold: 'Weekend coverage required (non-CAT)', evidence: 'Written change request', action: '+$18,000/month fixed fee or per-file uplift' },
    { trigger: 'Cycle Time Reduction', threshold: 'Estimate package SLAs reduced > 20%', evidence: 'Written change request', action: 'Repricing + additional staffing required' },
  ],
  complianceTriggers: [
    { trigger: 'New Audit Requirement', threshold: 'New certification or regulatory audit', evidence: 'Written notice', action: 'Cost pass-through; 30-day implementation window' },
    { trigger: 'System Change', threshold: 'Migration from ClaimCenter or Xactimate change', evidence: 'Written notice', action: 'Retraining costs ($25K); 8-week transition timeline' },
    { trigger: 'Access Restriction', threshold: 'New PII/access logging requirements', evidence: 'IT Security directive', action: 'Tooling/process change order; compliance overhead adjustment' },
  ],
  approvalPath: [
    { step: 1, action: 'Trigger Identified', owner: 'JDA PM or Carrier Claims Ops', timeline: 'Within 5 business days of occurrence' },
    { step: 2, action: 'Impact Assessment', owner: 'JDA Solutions Engineer', timeline: '5 business days' },
    { step: 3, action: 'Change Proposal Drafted', owner: 'JDA Account Manager', timeline: '5 business days' },
    { step: 4, action: 'Carrier Review + Approval', owner: 'VP Claims Operations', timeline: '10 business days' },
    { step: 5, action: 'Implementation', owner: 'Joint Ops Team', timeline: 'Per agreed timeline (typically next billing cycle)' },
  ],
};

export default function ChangeControlTemplate() {
  const [showExample, setShowExample] = useState(false);
  const d = showExample ? exampleData : null;

  return (
    <div className="space-y-8">
      {/* Document Header */}
      <div className="border-b-2 border-[#00A8CC] pb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-xs font-semibold text-[#00A8CC] uppercase tracking-wider mb-2">Template 04</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-4xl text-[#1B3A5C]">
              Change Control Exhibit
            </h2>
          </div>
          <div className="text-right text-sm text-[#6B7C93]">
            <p><span className="font-semibold">Version:</span> 1.5</p>
            <p><span className="font-semibold">Last Updated:</span> Jan 2025</p>
          </div>
        </div>
        <p className="text-[#6B7C93] italic">
          Lists measurable triggers that require repricing or scope adjustment and specifies what happens when they occur. Used to prevent &quot;free work&quot; from creeping in and keep the partnership stable when volumes, complexity, or SLAs change.
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
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Program</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.program : '[Program Name]'}
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Effective Date</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.effectiveDate : '[MM/DD/YYYY]'}
          </div>
        </div>
      </div>

      {/* Section 1: Baseline Scope */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">1</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Baseline Scope</h3>
        </div>
        <div className="pl-11">
          <div className={`min-h-[80px] bg-white border border-[#E8ECEF] rounded-lg p-4 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
            {d ? (
              <ul className="space-y-1">
                {d.baselineScope.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mb-2">[Summarize what is included in the current agreement:]</p>
                <ul className="space-y-1 ml-4">
                  <li>[e.g., Tier 1 &amp; Tier 2 email/chat support]</li>
                  <li>[e.g., English language only]</li>
                  <li>[e.g., Standard QA and weekly reporting]</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 2: Volume + Mix */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">2</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Baseline Volume Band + Complexity Mix</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Parameter</th>
                  <th className="px-4 py-3 text-left font-semibold">Baseline Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.volumeMix : [
                  { param: 'Volume Band', value: '[e.g., 10,000 - 15,000 / month]', notes: '[e.g., Per pricing agreement]' },
                  { param: 'Complexity Mix', value: '[e.g., 60% T1 / 30% T2 / 10% T3]', notes: '[e.g., Per Solution Blueprint]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.param}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.value}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 3: SLAs */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">3</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Baseline SLAs / Coverage Model</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">SLA / Coverage</th>
                  <th className="px-4 py-3 text-left font-semibold">Baseline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.slas : [
                  { sla: 'Coverage Hours', baseline: '[e.g., M-F, 8am-8pm EST]' },
                  { sla: 'First Response Time', baseline: '[e.g., < 1 hour (95th pct)]' },
                  { sla: 'Resolution Rate', baseline: '[e.g., 90%+ FCR]' },
                  { sla: 'CSAT', baseline: '[e.g., 4.5+ / 5]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.sla}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.baseline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4-7: Trigger Tables */}
      {[
        { num: 4, title: 'Volume Triggers', data: d ? d.volumeTriggers : null },
        { num: 5, title: 'Complexity / New Work Type Triggers', data: d ? d.complexityTriggers : null },
        { num: 6, title: 'SLA / Coverage Triggers', data: d ? d.slaTriggers : null },
        { num: 7, title: 'Compliance / Tooling Triggers', data: d ? d.complianceTriggers : null },
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
                    <th className="px-4 py-3 text-left font-semibold">Trigger</th>
                    <th className="px-4 py-3 text-left font-semibold">Threshold</th>
                    <th className="px-4 py-3 text-left font-semibold">Evidence</th>
                    <th className="px-4 py-3 text-left font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8ECEF]">
                  {(section.data || [
                    { trigger: '[Trigger type]', threshold: '[Threshold]', evidence: '[Evidence source]', action: '[Action required]' },
                    { trigger: '[Trigger type]', threshold: '[Threshold]', evidence: '[Evidence source]', action: '[Action required]' },
                  ]).map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                      <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.trigger}</td>
                      <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.threshold}</td>
                      <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.evidence}</td>
                      <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      ))}

      {/* Section 8: Approval Path */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-8 h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-sm">8</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Approval Path + Timeline</h3>
        </div>
        <div className="pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-16">Step</th>
                  <th className="px-4 py-3 text-left font-semibold">Action</th>
                  <th className="px-4 py-3 text-left font-semibold">Owner</th>
                  <th className="px-4 py-3 text-left font-semibold">Timeline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.approvalPath : [
                  { step: 1, action: 'Trigger Identified', owner: '[e.g., Ops Lead or Client]', timeline: '[e.g., Within 5 business days]' },
                  { step: 2, action: 'Impact Assessment', owner: '[e.g., Solutions Engineer]', timeline: '[e.g., 5 business days]' },
                  { step: 3, action: 'Change Proposal', owner: '[e.g., Account Manager]', timeline: '[e.g., 5 business days]' },
                  { step: 4, action: 'Client Approval', owner: '[e.g., Client Stakeholder]', timeline: '[e.g., 10 business days]' },
                  { step: 5, action: 'Implementation', owner: '[e.g., Joint team]', timeline: '[e.g., Per agreed timeline]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3"><span className="w-6 h-6 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs">{row.step}</span></td>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.action}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.owner}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.timeline}</td>
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
