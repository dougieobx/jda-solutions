'use client';

import { useState } from 'react';
import TemplateToggle from './TemplateToggle';

const exampleData = {
  client: 'Patriot Home Insurance',
  program: 'Claims Processing Transformation',
  owner: 'Jessica Martinez, Solutions Engineer',
  pricingModel: [
    { model: 'Fixed / Per-FTE', selected: 'No', rationale: 'CAT volume swings make fixed model risky for both parties' },
    { model: 'Per-Unit / Transaction', selected: 'No', rationale: 'Pure per-file doesn\'t cover fixed infrastructure costs' },
    { model: 'Hybrid (Base + Variable)', selected: 'Yes', rationale: 'Base monthly covers core team + infrastructure; per-file variable aligns cost with output; CAT surge bands handle spikes' },
  ],
  baseScope: [
    'Triage + tiering of incoming claims',
    'Claim writing / estimate package creation (Tier 1, 2, 3)',
    'Internal QA with defect taxonomy (sampling per tier)',
    'Submission to carrier system (ClaimCenter)',
    'Governance cadence (daily standup, weekly scorecard, monthly review)',
    'Weekly reporting + trend analysis',
  ],
  volumeBands: [
    { band: 'Base', range: '0 - 4,000 files/month', price: 'Included in base', monthly: '$185,000 base' },
    { band: 'Band 1', range: '4,001 - 6,000 files', price: '$42.50 / file', monthly: '$85,000 - $127,500' },
    { band: 'Band 2', range: '6,001 - 9,000 files', price: '$38.00 / file', monthly: '$114,000 - $152,000' },
    { band: 'CAT Surge', range: '> 9,000 files/month', price: '$52.00 / file', monthly: 'Variable (surge staffing)' },
  ],
  tierTreatment: [
    { approach: 'Blended Rate', selected: 'Yes', details: 'Single per-file rate based on assumed 60/30/10 tier mix' },
    { approach: 'Tiered Rates', selected: 'No', details: 'Reference rates: T1 $32, T2 $48, T3 $85 (for mix-shift calculations)' },
    { approach: 'Mix Adjustment Clause', selected: 'Yes', details: 'If Tier 3 exceeds 15% for a full month, Tier 3 premium rate applies' },
  ],
  assumptions: [
    { assumption: 'Monthly Volume', value: '3,500 files (avg)', source: '12-month trailing average from carrier data' },
    { assumption: 'CAT Peak Volume', value: '9,500 files/month', source: 'Historical CAT season max (6-10 week events)' },
    { assumption: 'Complexity Mix', value: '60% T1 / 30% T2 / 10% T3', source: 'Carrier estimate, validated with sample files' },
    { assumption: 'Productivity (T1)', value: '3.5 files/day', source: 'Industry benchmark + carrier workflow analysis' },
    { assumption: 'Productivity (T2)', value: '2 files/day', source: 'Industry benchmark + carrier workflow analysis' },
    { assumption: 'Productivity (T3)', value: '1 file/day', source: 'Industry benchmark + carrier workflow analysis' },
    { assumption: 'Shrinkage', value: '22%', source: 'Standard (training, meetings, admin, PTO)' },
    { assumption: 'Ramp Period', value: '30 days to steady-state', source: '60 days to calibrated QA' },
  ],
  riskBuffers: [
    { category: 'Volume Volatility', buffer: '8%', rationale: 'CAT events unpredictable; maintain surge bench at 15% capacity' },
    { category: 'Rework / Quality', buffer: '8%', rationale: '8% of files expected to require rework loop based on industry data' },
    { category: 'Complexity Shift', buffer: '4%', rationale: 'Tier 2/3 mix could increase during CAT or policy changes' },
    { category: 'Compliance Overhead', buffer: '3%', rationale: 'Access logging, audit trail maintenance, SOC 2 controls' },
  ],
  sensitivity: [
    { rank: 1, driver: 'Volume drops below 2,500/month sustained', impact: '+22% base adjustment to maintain margin' },
    { rank: 2, driver: 'Tier 3 mix exceeds 15% for full month', impact: '+$15/file premium on Tier 3 files (or mix-adjusted rate)' },
    { rank: 3, driver: 'CAT event exceeds 12,000 files/month', impact: 'Emergency surge clause: +$58/file + weekend premium' },
    { rank: 4, driver: 'Weekend coverage required outside CAT', impact: '+$18,000/month fixed coverage fee' },
  ],
  margins: [
    { guardrail: 'Target Margin', threshold: '38%', action: 'Standard approval path' },
    { guardrail: 'Floor Margin', threshold: '30%', action: 'VP Sales approval required; restructure discussion' },
    { guardrail: 'Walk-Away', threshold: '25%', action: 'Do not proceed without EVP exception and strategic justification' },
  ],
  changeControlLink: [
    'Volume outside 2,500-4,000 band for 2+ consecutive months (non-CAT)',
    'CAT surge exceeds 9,500/month or lasts > 10 weeks',
    'Tier 3 mix exceeds 15% for full month',
    'SLA targets tightened by more than 20%',
    'New claim types added (e.g., wildfire smoke, mold remediation)',
  ],
};

export default function PricingTemplate() {
  const [showExample, setShowExample] = useState(false);
  const d = showExample ? exampleData : null;

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Document Header */}
      <div className="border-b-2 border-[#00A8CC] pb-4 md:pb-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
          <div>
            <p className="text-xs font-semibold text-[#00A8CC] uppercase tracking-wider mb-2">Template 03</p>
            <h2 className="font-[family-name:var(--font-heading)] font-bold text-2xl sm:text-3xl md:text-4xl text-[#1B3A5C]">
              Pricing Architecture
            </h2>
          </div>
          <div className="text-left sm:text-right text-sm text-[#6B7C93]">
            <p><span className="font-semibold">Version:</span> 2.0</p>
            <p><span className="font-semibold">Last Updated:</span> Jan 2025</p>
          </div>
        </div>
        <p className="text-sm md:text-base text-[#6B7C93] italic">
          Translates the Blueprint into a defensible pricing structure with clear assumptions, buffers, and sensitivity drivers. Used to protect margin, accelerate approvals, and communicate pricing logic without drowning in spreadsheets.
        </p>
      </div>

      <TemplateToggle showExample={showExample} onToggle={() => setShowExample(!showExample)} />

      {/* Meta Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 md:p-5 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]">
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
          <label className="block text-xs font-semibold text-[#6B7C93] uppercase tracking-wider mb-1">Pricing Owner</label>
          <div className={`h-10 bg-white border border-[#E8ECEF] rounded px-3 flex items-center text-sm ${d ? 'text-[#1B3A5C] font-medium' : 'text-[#6B7C93]'}`}>
            {d ? d.owner : '[Name]'}
          </div>
        </div>
      </div>

      {/* Section 1: Pricing Model */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">1</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-lg md:text-xl text-[#1B3A5C]">Pricing Model</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/3">Model Type</th>
                  <th className="px-4 py-3 text-left font-semibold">Selected</th>
                  <th className="px-4 py-3 text-left font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.pricingModel : [
                  { model: 'Fixed / Per-FTE', selected: '[Yes / No]', rationale: '[e.g., Predictable volume, client prefers fixed cost]' },
                  { model: 'Per-Unit / Transaction', selected: '[Yes / No]', rationale: '[e.g., Variable volume, aligns cost with output]' },
                  { model: 'Hybrid (Base + Variable)', selected: '[Yes / No]', rationale: '[e.g., Base covers fixed costs, variable for volume swings]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.model}</td>
                    <td className="px-4 py-3">
                      {d ? (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.selected === 'Yes' ? 'bg-[#00A8CC]/10 text-[#00A8CC]' : 'bg-[#E8ECEF] text-[#6B7C93]'}`}>
                          {row.selected}
                        </span>
                      ) : (
                        <span className="text-[#6B7C93]">{row.selected}</span>
                      )}
                    </td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 2: What's Included */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">2</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">What&apos;s Included (Base Scope)</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className={`min-h-[100px] bg-white border border-[#E8ECEF] rounded-lg p-4 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
            {d ? (
              <ul className="space-y-1">
                {d.baseScope.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            ) : (
              <>
                <p className="mb-2">[List all items included in the base price:]</p>
                <ul className="space-y-1 ml-4">
                  <li>[e.g., Tier 1 &amp; Tier 2 support]</li>
                  <li>[e.g., M-F 8am-8pm coverage]</li>
                  <li>[e.g., Standard QA (5% sample)]</li>
                  <li>[e.g., Weekly reporting]</li>
                  <li>[e.g., Weekly governance call]</li>
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Section 3: Volume Bands */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">3</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Volume Bands / Surge Structure</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Band</th>
                  <th className="px-4 py-3 text-left font-semibold">Volume Range</th>
                  <th className="px-4 py-3 text-left font-semibold">Price / Unit</th>
                  <th className="px-4 py-3 text-left font-semibold">Monthly Range</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.volumeBands : [
                  { band: 'Base', range: '[e.g., 0 - 10,000]', price: '[$X.XX]', monthly: '[$XX,XXX - $XX,XXX]' },
                  { band: 'Standard', range: '[e.g., 10,001 - 15,000]', price: '[$X.XX]', monthly: '[$XX,XXX - $XX,XXX]' },
                  { band: 'Surge', range: '[e.g., 15,001+]', price: '[$X.XX]', monthly: '[Variable]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.band}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.range}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.price}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.monthly}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 4: Tier Treatment */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">4</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Complexity Tier Treatment</h3>
        </div>
        <div className="pl-11 space-y-4">
          {!showExample && (
            <div className="p-4 bg-[#F8F9FA] border-l-4 border-[#00A8CC] rounded-r-lg">
              <p className="text-sm text-[#2D3E50] italic">
                How do complexity tiers affect pricing? Select one approach.
              </p>
            </div>
          )}
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Approach</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Selected</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF] bg-white">
                {(d ? d.tierTreatment : [
                  { approach: 'Blended Rate', selected: '[Yes / No]', details: '[e.g., Single rate based on assumed 60/30/10 mix]' },
                  { approach: 'Tiered Rates', selected: '[Yes / No]', details: '[e.g., T1: $X, T2: $Y, T3: $Z]' },
                  { approach: 'Mix Adjustment Clause', selected: '[Yes / No]', details: '[e.g., Repricing if T2/T3 exceeds X%]' },
                ]).map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-semibold text-[#1B3A5C]">{row.approach}</td>
                    <td className="px-4 py-2">
                      {d ? (
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${row.selected === 'Yes' ? 'bg-[#00A8CC]/10 text-[#00A8CC]' : 'bg-[#E8ECEF] text-[#6B7C93]'}`}>
                          {row.selected}
                        </span>
                      ) : (
                        <span className="text-[#6B7C93]">{row.selected}</span>
                      )}
                    </td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 5: Key Assumptions */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">5</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Key Assumptions</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold w-1/3">Assumption</th>
                  <th className="px-4 py-3 text-left font-semibold">Value</th>
                  <th className="px-4 py-3 text-left font-semibold">Source / Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.assumptions : [
                  { assumption: 'Monthly Volume', value: '[e.g., 12,000 units]', source: '[e.g., Based on 6-month avg]' },
                  { assumption: 'Complexity Mix', value: '[e.g., 60/30/10]', source: '[e.g., Client estimate]' },
                  { assumption: 'Blended AHT', value: '[e.g., 12 minutes]', source: '[e.g., Weighted average]' },
                  { assumption: 'Shrinkage', value: '[e.g., 22%]', source: '[e.g., PTO, training, breaks]' },
                  { assumption: 'Utilization', value: '[e.g., 78%]', source: '[e.g., Productive time]' },
                  { assumption: 'Ramp Period', value: '[e.g., 6 weeks]', source: '[e.g., To full productivity]' },
                  { assumption: 'SLA Targets', value: '[e.g., 1hr FRT, 90% FCR]', source: '[e.g., Per Solution Blueprint]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.assumption}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.value}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 6: Risk Buffers */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">6</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Risk Buffers</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Risk Category</th>
                  <th className="px-4 py-3 text-left font-semibold">Buffer %</th>
                  <th className="px-4 py-3 text-left font-semibold">Rationale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.riskBuffers : [
                  { category: 'Volume Unknowns', buffer: '[e.g., 5%]', rationale: '[e.g., Limited historical data]' },
                  { category: 'Complexity Volatility', buffer: '[e.g., 3%]', rationale: '[e.g., New product launch in pipeline]' },
                  { category: 'Rework / Quality', buffer: '[e.g., 2%]', rationale: '[e.g., Knowledge gaps in early weeks]' },
                  { category: 'Compliance / Security', buffer: '[e.g., 2%]', rationale: '[e.g., Additional controls required]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.category}</td>
                    <td className={`px-4 py-3 font-semibold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.buffer}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.rationale}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 7: Sensitivity Drivers */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">7</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Sensitivity Drivers</h3>
        </div>
        <div className="pl-11 space-y-4">
          {!showExample && (
            <div className="p-4 bg-[#F8F9FA] border-l-4 border-[#00A8CC] rounded-r-lg">
              <p className="text-sm text-[#2D3E50] italic">
                What factors would change price the most? Rank by impact.
              </p>
            </div>
          )}
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA]">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Rank</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Driver</th>
                  <th className="px-4 py-2 text-left font-semibold text-[#1B3A5C]">Impact if Changed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF] bg-white">
                {(d ? d.sensitivity : [
                  { rank: 1, driver: '[e.g., Volume drops below 8,000]', impact: '[e.g., +15% per-unit to maintain margin]' },
                  { rank: 2, driver: '[e.g., T2/T3 mix increases 10pts]', impact: '[e.g., +8% blended rate]' },
                  { rank: 3, driver: '[e.g., Weekend coverage added]', impact: '[e.g., +$XX,XXX / month]' },
                ]).map((row, i) => (
                  <tr key={i}>
                    <td className="px-4 py-2 font-bold text-[#00A8CC]">{row.rank}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.driver}</td>
                    <td className={`px-4 py-2 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 8: Margin Guardrails */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">8</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Margin Guardrails</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="overflow-hidden rounded-lg border border-[#E8ECEF]">
            <table className="w-full text-sm">
              <thead className="bg-[#1B3A5C] text-white">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold">Guardrail</th>
                  <th className="px-4 py-3 text-left font-semibold">Threshold</th>
                  <th className="px-4 py-3 text-left font-semibold">Action Required</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8ECEF]">
                {(d ? d.margins : [
                  { guardrail: 'Target Margin', threshold: '[e.g., 32%]', action: '[Standard approval path]' },
                  { guardrail: 'Floor Margin', threshold: '[e.g., 25%]', action: '[e.g., VP approval required]' },
                  { guardrail: 'Walk-Away', threshold: '[e.g., 20%]', action: '[e.g., Do not proceed]' },
                ]).map((row, i) => (
                  <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#F8F9FA]'}>
                    <td className="px-4 py-3 font-semibold text-[#1B3A5C]">{row.guardrail}</td>
                    <td className={`px-4 py-3 font-bold ${d ? 'text-[#00A8CC]' : 'text-[#6B7C93]'}`}>{row.threshold}</td>
                    <td className={`px-4 py-3 ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Section 9: Link to Change Control */}
      <section>
        <div className="flex items-center gap-3 mb-4">
          <span className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#00A8CC] text-white flex items-center justify-center font-bold text-xs md:text-sm flex-shrink-0">9</span>
          <h3 className="font-[family-name:var(--font-heading)] font-semibold text-xl text-[#1B3A5C]">Link to Change Control</h3>
        </div>
        <div className="pl-10 md:pl-11">
          <div className="p-5 bg-[#F8F9FA] rounded-lg border border-[#E8ECEF]">
            <p className={`text-sm mb-3 ${d ? 'text-[#2D3E50]' : 'text-[#2D3E50]'}`}>
              This pricing is valid under the baseline conditions documented in the <span className="font-semibold text-[#00A8CC]">Change Control Exhibit</span>. Repricing triggers include:
            </p>
            <ul className={`space-y-2 text-sm ${d ? 'text-[#2D3E50]' : 'text-[#6B7C93]'}`}>
              {(d ? d.changeControlLink : [
                '[e.g., Volume outside X-Y band for 2+ months]',
                '[e.g., Complexity mix shifts more than X pts]',
                '[e.g., SLA targets tightened by more than X%]',
                '[e.g., New work types added exceeding X% of volume]',
              ]).map((item, i) => (
                <li key={i}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-8 md:mt-12 pt-4 md:pt-6 border-t border-[#E8ECEF] flex flex-col sm:flex-row items-center justify-between gap-2 text-xs md:text-sm text-[#6B7C93]">
        <p>JDA TSG  |  Solutions Engineering</p>
        <p>Confidential - Internal Use Only</p>
      </div>
    </div>
  );
}
