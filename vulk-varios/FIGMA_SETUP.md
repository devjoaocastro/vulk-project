# Figma Integration Setup

## Overview
Vulk now includes advanced Figma integration that allows users to import projects directly from Figma, similar to bolt.new. Users can connect their Figma account and import design files to generate code automatically.

## Features Implemented

### 1. Figma Import Modal
- **Location**: `src/components/FigmaImportModal.tsx`
- **Features**:
  - Beautiful modal with Figma branding
  - Optional Figma URL input
  - OAuth login button
  - Loading states and error handling

### 2. Figma OAuth Authentication
- **Location**: `src/app/api/auth/figma/callback/route.ts`
- **Features**:
  - Secure OAuth flow with Figma
  - Access token storage in secure cookies
  - User information retrieval
  - Error handling and redirects

### 3. Figma Project Import
- **Location**: `src/app/api/figma/import/route.ts`
- **Features**:
  - Parse Figma file URLs
  - Extract file data via Figma API
  - Generate component images
  - Process design tokens and styles
  - Create project structure

### 4. Homepage Integration
- **Location**: `src/app/page.tsx`
- **Features**:
  - Figma import button (replaces file upload)
  - Modal state management
  - Import handling and project creation
  - Toast notifications

## Setup Instructions

### 1. Create Figma App
1. Go to [Figma Developer Settings](https://www.figma.com/developers/apps)
2. Click "Create new app"
3. Fill in the details:
   - **App name**: `Vulk`
   - **App description**: `AI-powered full-stack development platform`
   - **App website**: `https://vulk.dev`
   - **App icon**: Upload Vulk logo

### 2. Configure OAuth
1. In your Figma app settings, go to "OAuth 2.0"
2. Add redirect URI: `https://vulk.dev/api/auth/figma/callback`
3. For local development: `http://localhost:3000/api/auth/figma/callback`
4. Select scopes: `file_read`
5. Copy the **Client ID** and **Client Secret**

### 3. Environment Variables
Add these to your `.env.local` file:

```bash
# Figma OAuth
FIGMA_CLIENT_ID=your-figma-client-id
FIGMA_CLIENT_SECRET=your-figma-client-secret
NEXT_PUBLIC_FIGMA_CLIENT_ID=your-figma-client-id
```

### 4. Production Setup
1. Update Figma app redirect URI to production URL
2. Set environment variables in Vercel
3. Test the complete flow

## How It Works

### User Flow
1. User clicks Figma icon on homepage
2. Modal opens with Figma branding
3. User can optionally enter Figma file URL
4. User clicks "Log in to Figma"
5. Redirected to Figma OAuth
6. After authorization, redirected back to Vulk
7. Access token stored in secure cookie
8. User can import projects from Figma

### Technical Flow
1. **OAuth**: Secure token exchange with Figma
2. **API Integration**: Fetch file data using Figma API
3. **Processing**: Parse components, styles, and assets
4. **Generation**: Create project structure and code
5. **Storage**: Save project to database
6. **Redirect**: Navigate to generated project

## API Endpoints

### `POST /api/figma/import`
Imports a project from Figma URL.

**Request Body**:
```json
{
  "figmaUrl": "https://www.figma.com/file/...",
  "accessToken": "figma_access_token"
}
```

**Response**:
```json
{
  "success": true,
  "project": {
    "name": "Imported from Figma",
    "components": [...],
    "metadata": {...}
  }
}
```

### `GET /api/auth/figma/callback`
Handles Figma OAuth callback.

**Query Parameters**:
- `code`: Authorization code from Figma
- `state`: Optional state parameter (Figma URL)

## Security Features

- **Secure Cookies**: Access tokens stored in httpOnly cookies
- **CSRF Protection**: State parameter validation
- **Error Handling**: Comprehensive error handling and logging
- **Token Expiry**: Automatic token refresh handling

## Future Enhancements

1. **Real-time Sync**: Keep projects in sync with Figma changes
2. **Component Library**: Build reusable component library from Figma
3. **Design Tokens**: Extract and use Figma design tokens
4. **Collaboration**: Multi-user Figma project collaboration
5. **Version Control**: Track Figma file versions

## Testing

1. **Local Testing**:
   ```bash
   npm run dev
   # Click Figma icon on homepage
   # Test OAuth flow
   # Test project import
   ```

2. **Production Testing**:
   - Deploy to Vercel
   - Test with real Figma files
   - Verify OAuth flow works
   - Test project generation

## Troubleshooting

### Common Issues
1. **OAuth Error**: Check redirect URI matches exactly
2. **API Error**: Verify Figma API permissions
3. **Token Error**: Check cookie settings and HTTPS
4. **Import Error**: Verify Figma file is accessible

### Debug Steps
1. Check browser console for errors
2. Verify environment variables
3. Test Figma API endpoints directly
4. Check server logs for detailed errors

## Support

For issues with Figma integration:
1. Check this documentation
2. Review server logs
3. Test with simple Figma files first
4. Contact development team
