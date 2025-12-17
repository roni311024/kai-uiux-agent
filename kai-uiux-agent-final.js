import OpenAI from 'openai';
import fs from 'fs';

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function run(role, task, input) {
  const systemPrompt = 'You are a world-class ' + role + '. Create thorough, actionable, and structured deliverables following UI/UX best practices. Include rationale for decisions, edge cases, error/empty/loading/offline states. Apply accessibility (WCAG) and usability (Nielsen) principles. Provide clear headings and bullet points.';
  const res = await client.chat.completions.create({
    model: 'gpt-4',
    temperature: 0.35,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: 'TASK:\n' + task + '\n\nINPUT:\n' + input },
    ],
  });
  return res.choices[0].message.content;
}

(async () => {
  const input = fs.readFileSync('./input.txt', 'utf8');

  const research = await run(
    'UX Researcher',
    'Develop comprehensive user personas (learners, managers, admins) including demographics, motivations, behaviors, pain points, and goals. Identify jobs-to-be-done and success metrics. Perform competitive analysis highlighting strengths, weaknesses, and gaps against SellPro, Intel Retail Edge, and Cornerstone.',
    input
  );

  const architect = await run(
    'UX Architect',
    'Design the information architecture and sitemap for learners, managers, and administrators. Create core user flows for tasks (onboarding, microlearning, validation, challenge creation, reporting). Include edge cases, alternate paths, and error handling. Provide a screen list with required data and states.',
    input
  );

  const ui = await run(
    'UI Designer',
    'Define a comprehensive design system with tokens (spacing system, typography scale, color palette, elevation levels), a component inventory (buttons, inputs, cards, lists, navigation, modals, notifications, etc.) and component variants and states (default, hover, active, disabled, loading). Include guidelines for accessibility (contrast, focus order, keyboard navigation). Provide design decisions and rationale.',
    input
  );

  const writer = await run(
    'UX Writer',
    'Develop a tone and voice guide consistent with the KAI brand - modern, motivating, premium. Write microcopy for key screens including calls to action, hints, error messages, empty states, and loading states. Provide copy guidelines and ensure clarity and inclusivity.',
    input
  );

  const qa = await run(
    'QA Auditor',
    'Conduct a heuristic evaluation using Nielsens heuristics and evaluate WCAG accessibility compliance for the proposed experience. Identify issues and propose improvements. Create a usability test script with tasks and success criteria.',
    input
  );

  const manager = await run(
    'Product Design Manager',
    'Merge and synthesize all agent outputs into a cohesive deliverable structured into sections A-I: A) Product brief; B) Personas & JTBD; C) Core journeys & flows; D) Sitemap / IA; E) Screen list & requirements; F) Design system (tokens, components & states); G) UX writing; H) QA audit; I) Dev handoff (acceptance criteria, analytics events, data needs). Remove duplicates, ensure consistency and clarity, and provide a summary of key insights.',
    'INPUT:\n' + input + '\n\nRESEARCH:\n' + research + '\n\nARCHITECT:\n' + architect + '\n\nUI:\n' + ui + '\n\nWRITER:\n' + writer + '\n\nQA:\n' + qa
  );

  fs.writeFileSync('./KAI_UIUX_Agent_Output.md', manager);
  console.log('Done -> KAI_UIUX_Agent_Output.md');
})();
