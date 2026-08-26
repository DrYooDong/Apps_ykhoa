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

export const collections = {
  physiology,
  epidemiology,
  biochemistry,
  pathophysiology,
  guidelines
};
