import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Schema cho Bộ bài giảng Sinh lý học Y khoa (Physiology)
 */
const physiology = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/basic-medical/physiology' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    code: z.string().optional(),
    part: z.string().optional(),
    system: z.string().optional(),
    systemName: z.string().optional(),
    guytonChapter: z.string().optional(),
    ganongChapter: z.string().optional(),
    category: z.string().default('physiology'),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    clinicalPearls: z.array(z.string()).default([]),
    sections: z.array(z.object({
      id: z.string(),
      number: z.number().optional(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

/**
 * Schema cho Bộ bài giảng Dịch tễ học & Y tế công cộng (Epidemiology)
 */
const epidemiology = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/basic-medical/epidemiology' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    code: z.string().optional(),
    category: z.string().default('epidemiology'),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    clinicalPearls: z.array(z.string()).default([]),
    pillars: z.array(z.object({
      id: z.string(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

/**
 * Schema cho Bộ bài giảng Hóa sinh Y học & Chuyển hóa (Biochemistry)
 */
const biochemistry = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/basic-medical/biochemistry' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    code: z.string().optional(),
    block: z.string().optional(),
    blockName: z.string().optional(),
    harperChapter: z.string().optional(),
    tiêu_chuẩn: z.string().optional(),
    category: z.string().default('biochemistry'),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    clinicalPearls: z.array(z.string()).default([]),
    sections: z.array(z.object({
      id: z.string(),
      number: z.number().optional(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

/**
 * Schema cho Ca Lâm Sàng Cơ Chế Bệnh Sinh (CCBS Pathophysiology)
 */
const pathophysiology = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/basic-medical/pathophysiology-cases' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    code: z.string().optional(),
    specialty: z.string().optional(),
    category: z.string().default('pathophysiology'),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    clinicalPearls: z.array(z.string()).default([]),
    sections: z.array(z.object({
      id: z.string(),
      number: z.number().optional(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

/**
 * Schema cho Khuyến Cáo Điều Trị Y Học Chứng Cứ (EBM Guidelines)
 */
const guidelines = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/ebm/guidelines/kho-guidelines' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    code: z.string().optional(),
    organization: z.string().optional(),
    year: z.number().or(z.string()).optional(),
    category: z.string().default('guidelines'),
    specialty: z.string().optional(),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    tags: z.array(z.string()).default([]),
    keyRecommendations: z.array(z.string()).default([]),
    evidenceClass: z.string().optional(),
    sections: z.array(z.object({
      id: z.string(),
      number: z.number().optional(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

/**
 * Schema cho Kho Phân Tích Nghiên Cứu Y Khoa Chuyên Sâu (CliniResearch Studio)
 */
const research = defineCollection({
  loader: glob({ pattern: '*.mdx', base: './src/content/ebm/research/kho-nghien-cuu' }),
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    titleEn: z.string().optional(),
    slug: z.string().optional(),
    code: z.string().optional(),
    trialAcronym: z.string().optional(),
    authors: z.string().optional(),
    journal: z.string().optional(),
    organization: z.string().optional(),
    year: z.number().or(z.string()).optional(),
    doi: z.string().optional(),
    pmid: z.string().optional(),
    nctId: z.string().optional(),
    category: z.string().default('research'),
    specialty: z.string().optional(),
    specialty2: z.string().optional(),
    conditionKey: z.string().optional(),
    problemLabels: z.array(z.string()).default([]),
    icd10: z.array(z.string()).or(z.string()).optional(),
    design: z.string().default('rct'),
    phase: z.string().optional(),
    blinding: z.string().optional(),
    centerScope: z.string().optional(),
    hypothesisType: z.string().optional(),
    sampleSize: z.number().or(z.string()).nullable().optional(),
    followUpDuration: z.string().optional(),
    asianData: z.boolean().optional(),
    populationTags: z.array(z.string()).default([]),
    population: z.string().optional(),
    interventionClass: z.string().optional(),
    drug: z.string().optional(),
    intervention: z.string().optional(),
    comparatorType: z.string().optional(),
    comparatorDetail: z.string().optional(),
    primaryEndpointCategory: z.string().optional(),
    primaryEndpoint: z.string().optional(),
    keyResults: z.string().optional(),
    outcomeDirection: z.string().optional(),
    impactVerdict: z.string().optional(),
    safetyHighlight: z.string().optional(),
    robOverall: z.string().optional(),
    gradeCertainty: z.string().optional(),
    fragilityIndex: z.number().nullable().optional(),
    fundingSource: z.string().optional(),
    topicTags: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
    status: z.string().default('published'),
    version: z.string().optional(),
    updatedAt: z.string().optional(),
    description: z.string().optional(),
    summary: z.string().optional(),
    detailedConclusion: z.string().optional(),
    keyRecommendations: z.array(z.string()).default([]),
    clinicalPearls: z.array(z.string()).default([]),
    sections: z.array(z.object({
      id: z.string(),
      number: z.number().optional(),
      title: z.string(),
      icon: z.string().optional()
    })).default([])
  })
});

export const collections = {
  physiology,
  epidemiology,
  biochemistry,
  pathophysiology,
  guidelines,
  research
};
