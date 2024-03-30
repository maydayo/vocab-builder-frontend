This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Conventions

### File Placement

- Hook ใดๆ อยู่ directory เดียวกับ component นั้นๆ, แต่ถ้ามีคนใช้ 2 ที่ขึ้นไป ย้ายไปอยู่ src/hooks
- directory ของ Type
  - ใช้ที่เดียว วางไว้ในไฟล์
  - ใช้สองที่ขึ้นไป ถอยออกมาสร้างไฟล์ใน directory เดียวกัน
  - ถ้าใช้หลายที่แล้วไฟล์อยู่ห่างกัน ย้ายออกมาวางที่ src/types

### Naming

- ของที่เป็นพหูพจน์ใช้ <variableName>List ให้หมด จะได้ไม่ต้องคิดว่าเติม s ไหม
- ชื่อ hook ตั้งตามของที่ใช้ เช่น hook สำหรับ fetch subject ชื่อ useSubjectList ไม่ใช่ useFetchSubjectList

### Type Naming Convention

- ชื่อ props type ต่อท้ายด้วย <Name>Props เสมอ
  - ถ้า props มีแต่ react children อย่างเดียวไม่ต้องประกาศเป็น type
- ไม่ต้องมี suffix Type เช่น type ของ subject คือ Subject ไม่ใช่ SubjectType
- Type ของสิ่งที่ hook return คือ use<hookName>Result
- ของจากการยิง api ต่อท้ายด้วย <name>Response

### Next & React

- Router.push/replace อะไรที่เกี่ยวกับ url อย่าใช้ backtick ` มันจะescape character
- useRouter import จาก next/navigation ไม่ใช่ next/router
- url เราจะเป็น source of truth, ใช้ useRouterUrl hook เพ่ิม appendOrReplace queryString เสมอเวลา render subject, case, thread, post
- tag รูปใช้ html \<img\> ไม่ใช้ Next/Image
- ประกาศ destructuring props ข้างใน react function components อีกที destruct ที่ props argument

DO ✅

```
type ParagraphGeneratorProps = {
  id: number
  paragraph: string
}
export function ParagraphGenerator(props: ParagraphGeneratorProps) {
  const { id, paragraph } = props
} {
  return <></>
}
```

Don't ❌

```
export function ParagraphGenerator({ id, paragraph }: {id: number, paragraph: number | string}) {
  return <></>
}
```

### Dependencies

#### ReactQuery

- abstract เอา useQuery, useMutation ออกไปเป็น custom hook ทั้งหมด
- state ที่ของยังไม่แสดง ใช้ isPending ไม่ใช่ isLoading
- TanStack ให้วาง state ตามลำดับนี้ เพื่อง่ายต่อการ handle undefined
  - isError > data > isPending
  - บางกรณีอาจต้อง pending ก่อน data เช่น fetch thread เพราะมีของอยู่แล้วก่อน fetch
- useQuery vs useMutation: useQuery ใช้ตอนที่ต้องการ ยิง request เลยทันทีที่ component ปรากฎ, useMutation ใช้ตอนที่ต้องการ ยิง request ตอน specific event ต่างๆ เช่น onClick


#### Tailwind & DaisyUI

- css styling libs ให้ priority tailwind > headless UI > daisy ui
- theme สีของ daisy พวก primary, secondary ใส่ hex code แล้วเอาไปใช้เช่น bg-primary ได้เลย แต่ถ้าเป็น custom name ต้องไปหาวิธีทำเพิ่ม

### Misc.

- รูปแปลงเป็น webp

### Error Boundary

- error.tsx file จะช่วยดัก runtime error ที่ ไม่ได้ handle เบื้องหลังคือ error boundary component [ref](https://nextjs.org/docs/app/api-reference/file-conventions/error)

```
