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

  getCategory(slug: string): CategoryInfo {
    const mapper = this.mapper;
    if (mapper) {
      return mapper.getCategory(slug);
    }
    return { id: slug, slug, name: slug };
  }

  getDisplayName(slug: string, shortForm: boolean = false): string {
    const mapper = this.mapper;
    if (mapper) {
      return mapper.getDisplayName(slug, shortForm);
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
    return `<span class="${extraClass}">${slug}</span>`;
  }
}

export const categoryCoreMapper = new CategoryCoreMapper();
