# 🚀 EcoTerra Deployment Guide

## Firebase Hosting Deployment

### Prerequisites
- Firebase CLI installed: `npm install -g firebase-tools`
- Firebase project created
- Firebase Hosting enabled

### Steps

1. **Login to Firebase**
   ```bash
   firebase login
   ```

2. **Initialize Firebase in your project**
   ```bash
   firebase init hosting
   ```
   - Select your Firebase project
   - Set public directory to `out`
   - Configure as single-page app: `Yes`
   - Set up automatic builds: `No` (for now)

3. **Update next.config.ts for static export**
   ```typescript
   /** @type {import('next').NextConfig} */
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   };

   export default nextConfig;
   ```

4. **Build and export**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy --only hosting
   ```

## Vercel Deployment (Recommended)

### Easy One-Click Deploy

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables for Vercel

Add these in your Vercel project settings:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
GOOGLE_GENAI_API_KEY=your_google_ai_key
```

## Netlify Deployment

1. Build the project: `npm run build`
2. Drag and drop the `.next` folder to Netlify
3. Add environment variables in Netlify dashboard

## Docker Deployment

### Dockerfile
```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

### Build and run
```bash
docker build -t ecoterra .
docker run -p 3000:3000 ecoterra
```

## Environment Variables

Create a `.env.local` file with:

```env
# Firebase (Optional - for feedback and footprint saving)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Google AI (Required for destination recommendations)
GOOGLE_GENAI_API_KEY=your_google_ai_api_key
```

## Performance Optimization

### Before Deployment

1. **Optimize images**: All images are already optimized with Next.js Image
2. **Bundle analysis**: Run `npx @next/bundle-analyzer` to analyze bundle size
3. **Lighthouse audit**: Check performance, accessibility, SEO scores
4. **Environment check**: Ensure all environment variables are set

### Post-Deployment

1. **Set up monitoring**: Use Vercel Analytics or Google Analytics
2. **Error tracking**: Consider Sentry for error monitoring
3. **Performance monitoring**: Use Web Vitals tracking

## Troubleshooting

### Common Issues

1. **Build fails**: Check TypeScript errors with `npm run typecheck`
2. **Environment variables not working**: Ensure they start with `NEXT_PUBLIC_` for client-side access
3. **Firebase connection issues**: Check Firebase config and security rules
4. **AI recommendations not working**: Verify Google AI API key

### Debug Mode

Run with debug logging:
```bash
DEBUG=* npm run dev
```

## Security Checklist

- [ ] Environment variables properly configured
- [ ] Firebase security rules set up
- [ ] API keys properly scoped
- [ ] Content Security Policy configured
- [ ] HTTPS enabled in production

## Monitoring

### Key Metrics to Track

1. **Core Web Vitals**
   - Largest Contentful Paint (LCP)
   - First Input Delay (FID)
   - Cumulative Layout Shift (CLS)

2. **User Engagement**
   - Carbon calculator usage
   - Destination recommendation clicks
   - Feedback form submissions

3. **Performance**
   - Page load times
   - API response times
   - Error rates

---

**Happy Deploying! 🚀**