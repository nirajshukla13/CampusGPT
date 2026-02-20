import React from 'react';
import Layout from '../../components/Layout';
import { appColors } from '../../config/colors.js';
import { FileText, ScanText, Database, Workflow, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';

const steps = [
  {
    title: 'Data ingestion',
    description: 'Collect PDFs, videos, images, and other campus content from multiple systems.',
    icon: FileText,
  },
  {
    title: 'Text extraction',
    description: 'Extract clean, structured text from raw documents and media.',
    icon: ScanText,
  },
  {
    title: 'Vector indexing',
    description: 'Embed content into vectors and store them in a searchable index.',
    icon: Database,
  },
  {
    title: 'RAG pipeline',
    description: 'Retrieve the most relevant chunks and build context-aware prompts.',
    icon: Workflow,
  },
  {
    title: 'LLM generation',
    description: 'Generate grounded answers using the retrieved context and the LLM.',
    icon: Sparkles,
  },
];

export default function Architecture() {
  return (
    <Layout role="student">
      <div className="space-y-8" style={{ backgroundColor: appColors.mainBackground, minHeight: '100vh', padding: '1.5rem' }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold md:text-3xl">System architecture</h1>
          <p className="text-sm text-[#9CA3AF] md:text-base">
            How CampusGPT turns raw campus data into grounded, reliable answers.
          </p>
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-6 top-0 h-full w-px bg-[#0B1120] md:left-7" aria-hidden />
          <div className="space-y-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isLast = index === steps.length - 1;

              return (
                <div key={step.title} className="relative flex gap-3">
                  <div className="relative z-10 mt-2 flex h-8 w-8 items-center justify-center rounded-full border border-[#22D3EE]/40 bg-[#020617] text-[#22D3EE]">
                    <Icon className="h-4 w-4" />
                  </div>
                  {!isLast && (
                    <div className="absolute left-4 top-8 h-full w-px bg-[#22D3EE]/40 opacity-60" />
                  )}
                  <Card className="flex-1 rounded-xl border shadow-md shadow-black/20" style={{ backgroundColor: appColors.sidebarBackground, borderColor: appColors.cardBorder }}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-semibold text-[#F9FAFB]">
                        {index + 1}. {step.title}
                      </CardTitle>
                      <CardDescription className="text-xs text-[#9CA3AF]">
                        {step.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="h-1 w-16 rounded-full bg-[#22D3EE]/40" />
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

