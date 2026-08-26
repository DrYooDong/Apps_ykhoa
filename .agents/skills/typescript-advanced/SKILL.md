# 📘 TypeScript Advanced

> TypeScript 5+ advanced patterns rehberi.

---

## 📋 Utility Types

```typescript
// Partial - tüm prop'lar optional
type PartialUser = Partial<User>;

// Required - tüm prop'lar required
type RequiredUser = Required<User>;

// Pick - seçili prop'lar
type UserName = Pick<User, 'id' | 'name'>;

// Omit - prop'ları çıkar
type UserWithoutPassword = Omit<User, 'password'>;

// Record - key-value map
type UserMap = Record<string, User>;

// ReturnType - fonksiyon return tipi
type Result = ReturnType<typeof fetchUser>;
```

---

## 🔧 Advanced Patterns

### Discriminated Unions
```typescript
type Result<T> = 
  | { success: true; data: T }
  | { success: false; error: string };

function handle(result: Result<User>) {
  if (result.success) {
    console.log(result.data); // User
  } else {
    console.log(result.error); // string
  }
}
```

### Template Literal Types
```typescript
type EventName = `on${Capitalize<string>}`;
// "onClick", "onHover", etc.

type Route = `/${string}`;
```

### Conditional Types
```typescript
type NonNullable<T> = T extends null | undefined ? never : T;

type Flatten<T> = T extends Array<infer U> ? U : T;
```

---

## 🎯 Zod Integration

```typescript
import { z } from 'zod';

const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  age: z.number().min(0).max(120),
});

type User = z.infer<typeof UserSchema>;
```

---

## ⚡ Best Practices

1. **Strict mode** always on
2. **Avoid `any`** - use `unknown` instead
3. **Prefer interfaces** for objects
4. **Use const assertions** for literals
5. **Type narrowing** over type assertions

## 🔄 Workflow

> **Kaynak:** [TypeScript 5.0 Release Notes](https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/) & [Total TypeScript Best Practices](https://www.totaltypescript.com/)

### Aşama 1: Type Design & Schema
- [ ] **Interface vs Type**: Nesne yapıları için `interface`, union ve karmaşık tipler için `type` alias'larını belirle.
- [ ] **Zod Validation**: Runtime güvenliği için şemaları tanımla ve `z.infer` ile TS tiplerini türet.
- [ ] **Strict Check**: `tsconfig.json` dosyasında `strict: true` ayarının aktif olduğunu doğrula.

### Aşama 2: Advanced Logic Implementation
- [ ] **Type Narrowing**: `unknown` tiplerini `type guards` (is, in) veya `asserts` kullanarak daralt.
- [ ] **Conditional & Mapped Types**: Tekrar eden tipleri dinamik hale getirmek için `T extends U ? X : Y` yapılarını kullan.
- [ ] **Generic Constraints**: Generic tipleri `extends` ile kısıtlayarak tip güvenliğini artır.

### Aşama 3: Refactoring & Verification
- [ ] **Remove `any`**: Tüm `any` kullanımlarını `unknown` veya spesifik union tipleriyle değiştir.
- [ ] **Performance Audit**: Karmaşık recursive tiplerin derleme (build) süresini etkilemediğini doğrula.
- [ ] **Documentation**: `@param`, `@returns` ve `@typePara` etiketleriyle gelişmiş tipleri dökümante et.

### Kontrol Noktaları
| Aşama | Doğrulama |
|-------|-----------|
| 1 | `eslint-plugin-typescript` hataları temizlendi mi? |
| 2 | "Discriminated Unions" ile tüm case'ler handle edildi mi? |
| 3 | Tip tanımları ile gerçek runtime verileri tutarlı mı? |

---
*TypeScript Advanced v1.5 - With Workflow*
