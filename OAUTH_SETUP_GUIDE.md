# OAuth Integration Setup Guide

## Overview
Your application now supports Google and Apple sign-in for authentication. Users will see three options on the sign-in/sign-up modal:
- Email/Password (traditional)
- Continue with Google
- Continue with Apple

## What's Been Added

### Frontend Changes
- Updated `src/components/AuthModal.tsx` with:
  - Google OAuth button with official Google branding
  - Apple OAuth button with Apple branding
  - Clean divider UI ("Or continue with")
  - Proper error handling for OAuth flows
  - Automatic redirect to `/dashboard` after successful login

### How It Works
1. User clicks "Continue with Google" or "Continue with Apple"
2. Supabase redirects to the provider's OAuth consent screen
3. User authorizes the application
4. Provider redirects back to your app with authentication token
5. Supabase creates/signs in the user automatically
6. User is redirected to `/dashboard`

---

## Configuration Required in Supabase

You need to enable and configure OAuth providers in your Supabase project dashboard.

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Authentication → Providers**

---

## Google OAuth Setup

### 1. Create Google OAuth Credentials

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Navigate to **APIs & Services → Credentials**
4. Click **Create Credentials → OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted:
   - User Type: External
   - App name: Your app name
   - User support email: Your email
   - Developer contact: Your email
6. For Application type, select **Web application**
7. Add authorized redirect URIs:
   ```
   https://<your-project-ref>.supabase.co/auth/v1/callback
   ```
   Replace `<your-project-ref>` with your Supabase project reference ID

8. Click **Create** and save:
   - Client ID
   - Client Secret

### 2. Configure in Supabase

1. In Supabase Dashboard → **Authentication → Providers**
2. Find **Google** and click to enable
3. Enter:
   - **Client ID** (from Google Cloud Console)
   - **Client Secret** (from Google Cloud Console)
4. Click **Save**

### 3. Additional Google Configuration

**Authorized JavaScript origins:**
```
http://localhost:5173
https://yourdomain.com
```

**Authorized redirect URIs:**
```
https://<your-project-ref>.supabase.co/auth/v1/callback
```

---

## Apple OAuth Setup

### 1. Apple Developer Account Setup

1. You need an [Apple Developer account](https://developer.apple.com/) ($99/year)
2. Go to **Certificates, Identifiers & Profiles**

### 2. Create App ID

1. Click **Identifiers → +** (plus button)
2. Select **App IDs** and click Continue
3. Select **App** and click Continue
4. Configure:
   - Description: Your app name
   - Bundle ID: `com.yourcompany.yourapp`
   - Capabilities: Check **Sign in with Apple**
5. Click **Continue** then **Register**

### 3. Create Service ID

1. Click **Identifiers → +** (plus button)
2. Select **Services IDs** and click Continue
3. Configure:
   - Description: Your app name (for web)
   - Identifier: `com.yourcompany.yourapp.web`
   - Check **Sign in with Apple**
4. Click **Continue** then **Register**
5. Click on your newly created Service ID
6. Check **Sign in with Apple** and click **Configure**
7. Add domains and redirect URLs:
   - **Domains:** `<your-project-ref>.supabase.co`
   - **Return URLs:** `https://<your-project-ref>.supabase.co/auth/v1/callback`
8. Click **Next**, **Done**, then **Continue**, then **Save**

### 4. Create Private Key

1. Go to **Keys → +** (plus button)
2. Configure:
   - Key Name: Your key name
   - Check **Sign in with Apple**
   - Click **Configure** next to Sign in with Apple
   - Select your Primary App ID
   - Click **Save**
3. Click **Continue** then **Register**
4. **Download the key file** (you can only download once!)
5. Note your **Key ID** (shown after registration)

### 5. Configure in Supabase

1. In Supabase Dashboard → **Authentication → Providers**
2. Find **Apple** and click to enable
3. Enter:
   - **Services ID:** `com.yourcompany.yourapp.web`
   - **Team ID:** Found in Apple Developer membership page
   - **Key ID:** From step 4 above
   - **Private Key:** Open the downloaded `.p8` file and paste contents
4. Click **Save**

---

## Testing OAuth Integration

### Local Development

1. **Important:** OAuth providers require HTTPS in production but can work locally
2. Start your dev server: `npm run dev`
3. Open `http://localhost:5173`
4. Click on "Get Started" or "Sign In"
5. Try clicking "Continue with Google" or "Continue with Apple"

**Note:** Some providers may not work on `localhost`. You may need to:
- Test in production environment
- Use a tool like ngrok to create HTTPS tunnel
- Add `http://localhost:5173` to authorized origins (Google only)

### Production Testing

1. Deploy your application
2. Ensure your production URL is added to:
   - Google: Authorized JavaScript origins
   - Apple: Domains and Return URLs
   - Supabase: Site URL in Authentication settings
3. Test the complete OAuth flow

---

## Troubleshooting

### "Invalid redirect URI"
- Verify the redirect URI matches exactly in provider console
- Format: `https://<project-ref>.supabase.co/auth/v1/callback`
- Check for trailing slashes (should not have one)

### "OAuth provider returned error"
- Check that Client ID/Secret are correct
- Ensure provider is enabled in Supabase
- Verify all URLs are added to provider console

### User is redirected but not signed in
- Check browser console for errors
- Verify redirect URL in Supabase settings
- Ensure `window.location.origin` is correct

### Apple OAuth not working
- Verify you're using HTTPS (Apple requires it)
- Check Service ID configuration
- Ensure private key is valid and complete
- Verify Team ID and Key ID are correct

---

## Security Notes

1. **Never commit secrets:** Keep Client Secrets and Private Keys secure
2. **HTTPS only:** OAuth should only be used over HTTPS in production
3. **Validate redirects:** Supabase handles this automatically
4. **Token security:** Tokens are stored securely by Supabase Auth

---

## Additional Configuration

### Customize Redirect URL

If you want to redirect to a different page after login, update in `AuthModal.tsx`:

```typescript
const { error } = await supabase.auth.signInWithOAuth({
  provider,
  options: {
    redirectTo: `${window.location.origin}/your-custom-page`,
  },
});
```

### Request Additional Scopes (Google)

```typescript
const { error } = await supabase.auth.signInWithOAuth({
  provider: 'google',
  options: {
    redirectTo: `${window.location.origin}/dashboard`,
    scopes: 'email profile https://www.googleapis.com/auth/calendar',
  },
});
```

### Handle OAuth Errors

The `AuthModal` component already handles errors, but you can customize the error messages:

```typescript
catch (err) {
  const errorMessage = err instanceof Error ? err.message : 'An error occurred';
  // Custom error handling here
  setError(errorMessage);
}
```

---

## User Data

When a user signs in with OAuth, their profile is automatically created in the `profiles` table with:
- `id` (from auth.users)
- `email`
- `full_name` (from OAuth provider if available)
- `avatar_url` (from OAuth provider if available)
- Other metadata from the provider

Access this data via `useAuth()` hook:
```typescript
const { user } = useAuth();
console.log(user?.email);
console.log(user?.user_metadata); // Contains OAuth provider data
```

---

## Support

If you encounter issues:
1. Check Supabase logs in Dashboard → Logs
2. Check browser console for errors
3. Verify all configuration steps
4. Test with different browsers
5. Ensure all URLs use HTTPS in production

---

**Setup Status:**
- ✅ Frontend implementation complete
- ⏳ Supabase configuration required (follow steps above)
- ⏳ OAuth provider setup required (Google/Apple)

Once configured, users will be able to sign in with Google or Apple with a single click!
