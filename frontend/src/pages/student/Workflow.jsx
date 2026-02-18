import React from 'react';
import Layout from '../../components/Layout';
import { ShieldCheck, Search, Sparkles, Database, Workflow as WorkflowIcon, MessageCircle, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

const steps = [
  {
    title: 'RBAC',
    description: 'Request is checked against role-based access control for the student, faculty, or admin.',
    icon: ShieldCheck,
  },
  {
    title: 'Query',
    description: 'User question is normalized, classified, and enriched with campus context.',
    icon: Search,
  },
  {
    title: 'Embedding',
    description: 'The query is embedded into a vector representation.',
    icon: Sparkles,
  },
  {
    title: 'Vector search',
    description: 'The vector store is searched for the most relevant chunks of campus knowledge.',
    icon: Database,
  },
  {
    title: 'RAG',
    description: 'Relevant chunks are composed into a prompt with guardrails and system instructions.',
    icon: WorkflowIcon,
  },
  {
    title: 'Response',
    description: 'The LLM generates a grounded, role-aware answer for the user.',
    icon: MessageCircle,
  },
  {
    title: 'Citation',
    description: 'Sources used for the answer are attached as structured citations.',
    icon: BookOpen,
  },
];

export default function Workflow() {
  return (
    <Layout role="student">
      <div className="space-y-8">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">CampusGPT workflow</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            End-to-end flow from role checks to grounded responses and citations.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-4 top-0 h-full w-px bg-[#0B1120] md:left-6" aria-hidden />
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <Card
                  key={step.title}
                  className="relative flex items-center gap-4 rounded-xl border border-[#1F2937] bg-[#111827] px-4 py-4 shadow-md shadow-black/20 transition-transform duration-150 hover:scale-[1.02]"
                >
                  <div className="absolute left-[-1.25rem] flex h-full items-center md:left-[-1.5rem]">
                    <div className="h-10 w-10 rounded-full border border-[#1F2937] bg-[#020617] text-[#F9FAFB]">
                      <div className="flex h-full w-full items-center justify-center">
                        <Icon className="h-4 w-4 text-[#22D3EE]" />
                      </div>
                    </div>
                  </div>
                  <CardHeader className="pl-8 pr-0">
                    <CardTitle className="text-sm font-semibold text-[#F9FAFB]">
                      {index + 1}. {step.title}
                    </CardTitle>
                    <CardDescription className="text-xs text-[#9CA3AF]">
                      {step.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="hidden flex-1 justify-end pr-0 md:flex">
                    <div className="h-1 w-20 rounded-full bg-[#22D3EE]/40" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

