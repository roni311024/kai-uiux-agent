import OpenAI from 'openai';
import fs from 'fs';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run(role, task, input) {
  const res = await client.chat.completions.create({
    model: 'gpt-4.1-mini',
    temperature: 0.35,
    messages: [
      { role: 'system', content: `You are ${role}. Return structured bullets with clear headings.` },
      { role: 'user', content: `TASK:\n${task}\n\nINPUT:\n${input}` }
    ]
  });
  return res.choices[0].message.content;
}

(async () => {
  const input = fs.readFileSync('./input.txt', 'utf8');

  const research = await run(
    'UX Researcher',
    'Create personas, JTBD, competitor gaps, and success metrics for KAI (frontline enablement).',
    input
  );

  const architect = await run(
    'UX Architect',
    'Create IA + sitemap + core flows (learner/manager/admin) + screen list with requirements and edge cases.',
    input
  );

  const ui = await run(
    'UI Designer',
    'Create design tokens + component inventory + states + accessibility notes. Keep it production-ready and minimal.',
    input
  );

  const writer = await run(
    'UX Writer',
    'Create tone guide + microcopy for key screens and all states (empty/error/loading/offline).',
    input
  );

  const qa = await run(
    'QA Auditor',
    'Run Nielsen + WCAG checks and propose fixes; include usability test script.',
    input
  );

  const manager = await run(
    'Product Design Manager',
    'Merge into one deliverable with sections A–I. Remove duplicates. Ensure consistency across flows, screens, microcopy and components.',
    `INPUT:\n${input}\n\nRESEARCH:\n${research}\n\nARCHITECT:\n${architect}\n\nUI:\n${ui}\n\nWRITER:\n${writer}\n\nQA:\n${qa}`
  );

  fs.writeFileSync('./KAI_UIUX_Agent_Output.md', manager);
  console.log('Done → KAI_UIUX_Agent_Output.md');
})();
