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
npx prisma migrate dev --name create_tables
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

## Backend
```
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "danqing0703@gmail.com"}'
{"success":true,"message":"Thank you for subscribing to our updates!","data":{"id":1,"email":"danqing0703@gmail.com","created_at":"2025-02-12T08:36:26.604","status":"subscribed"}}
```

```
curl -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "danqing0703@gmail.com"}'
{"message":"You are already subscribed to our updates.","alreadySubscribed":true,"data":{"email":"danqing0703@gmail.com","status":"subscribed","created_at":"2025-02-12T08:36:26.604"}}
```

```
curl -X POST http://localhost:3000/api/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email": "danqing0703@gmail.com"}'
{"success":true,"message":"You have been successfully unsubscribed from updates."}
```

