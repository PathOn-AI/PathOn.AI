# PathOn.AI

## ORM with Prisma
```
npm install prisma --save-dev
```
then
```
npx prisma init
```

```
npx prisma migrate dev --name create_books_table
```

```
npm install -D ts-node @types/node typescript
npm install @prisma/client
```

```
"prisma": {
  "seed": "ts-node --compiler-options {\"module\":\"CommonJS\"} prisma/seed.ts"
}
```

```
npx prisma db seed
```
