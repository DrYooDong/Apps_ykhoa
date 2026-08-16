/**
 * CliniPortal 2.0 — Category Mapper (TypeScript Wrapper)
 */

export interface CategoryInfo {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  icon?: string;
  color?: string;
  bgLight?: string;
  description?: string;
}

export class CategoryCoreMapper {
  private get mapper() {
    if (typeof window !== 'undefined' && (window as any).CliniCategoryMapper) {
      return (window as any).CliniCategoryMapper;
    }
    return null;
  }

  private static readonly BUILT_IN_CATEGORIES: Record<string, CategoryInfo> = {
    'skills': {
      id: 'skills',
      slug: 'skills',
      name: 'Kỹ năng Lâm sàng',
      shortName: 'Kỹ năng',
      icon: 'fa-stethoscope',
      color: '#0284c7',
      description: 'Quy trình khám, bedside checklist và kỹ năng OSCE'
    },
    'approaches': {
      id: 'approaches',
      slug: 'approaches',
      name: 'Tiếp cận Lâm sàng',
      shortName: 'Tiếp cận',
      icon: 'fa-sitemap',
      color: '#10b981',
      description: 'Lưu đồ thuật toán và phác đồ chẩn đoán - xử trí cấp cứu'
    },
    'calculators': {
      id: 'calculators',
      slug: 'calculators',
      name: 'Công cụ Lâm sàng',
      shortName: 'Công cụ',
      icon: 'fa-calculator',
      color: '#f59e0b',
      description: 'Máy tính y học và hơn 120 thang điểm đánh giá nguy cơ'
    },
    'pharmacology': {
      id: 'pharmacology',
      slug: 'pharmacology',
      name: 'Dược lý Lâm sàng',
      shortName: 'Dược lý',
      icon: 'fa-pills',
      color: '#ec4899',
      description: 'Dược thư, tra cứu tương tác thuốc và tối ưu liều'
    },
    'pathophysiology': {
      id: 'pathophysiology',
      slug: 'pathophysiology',
      name: 'Cơ sở Y khoa',
      shortName: 'Cơ sở',
      icon: 'fa-dna',
      color: '#8b5cf6',
      description: 'Giải phẫu, sinh lý học và cơ chế bệnh sinh tương tác'
    },
    'ebm': {
      id: 'ebm',
      slug: 'ebm',
      name: 'Y học Chứng cứ',
      shortName: 'Chứng cứ',
      icon: 'fa-flask',
      color: '#06b6d4',
      description: 'Khuyến cáo thực hành lâm sàng và phân tích EBM Lab'
    },
    'docspace': {
      id: 'docspace',
      slug: 'docspace',
      name: 'DocSpace',
      shortName: 'DocSpace',
      icon: 'fa-id-badge',
      color: '#0284c7',
      description: 'Không gian làm việc lâm sàng cá nhân & sổ tay SOAP số hóa'
    }
  };

  getCategory(slug: string): CategoryInfo {
    const mapper = this.mapper;
    if (mapper) {
      return mapper.getCategory(slug);
    }
    const cleanSlug = (slug || '').toLowerCase().trim();
    if (CategoryCoreMapper.BUILT_IN_CATEGORIES[cleanSlug]) {
      return CategoryCoreMapper.BUILT_IN_CATEGORIES[cleanSlug]!;
    }
    return { id: slug, slug, name: slug };
  }

  getDisplayName(slug: string, shortForm: boolean = false): string {
    const mapper = this.mapper;
    if (mapper) {
      return mapper.getDisplayName(slug, shortForm);
    }
    const cleanSlug = (slug || '').toLowerCase().trim();
    const cat = CategoryCoreMapper.BUILT_IN_CATEGORIES[cleanSlug];
    if (cat) {
      return shortForm && cat.shortName ? cat.shortName : cat.name;
    }
    return slug;
  }

  toDisplayName(slug: string, shortForm: boolean = false): string {
    return this.getDisplayName(slug, shortForm);
  }

  renderBadge(slug: string, extraClass: string = ''): string {
    const mapper = this.mapper;
    if (mapper) {
      return mapper.renderBadge(slug, extraClass);
    }
    const cat = this.getCategory(slug);
    return `<span class="badge ${extraClass}" style="color: ${cat.color || 'var(--color-primary)'};">${cat.name}</span>`;
  }
}

export const categoryCoreMapper = new CategoryCoreMapper();
