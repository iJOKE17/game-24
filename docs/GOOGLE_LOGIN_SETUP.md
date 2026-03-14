# Google Login Setup

This guide walks you through getting **Google OAuth credentials** and configuring them for the login page.

---

## 1. Create or select a Google Cloud project

1. Go to **[Google Cloud Console](https://console.cloud.google.com/)**.
2. Sign in with your Google account.
3. Open the **project** dropdown at the top (next to “Google Cloud”) and either:
   - Click **New Project**, give it a name (e.g. “Game 24”), and create it, or
   - Select an existing project.

---

## 2. Configure the OAuth consent screen

1. In the left sidebar go to: **APIs & Services** → **OAuth consent screen**.
2. Choose **External** (so any Google user can sign in). Click **Create**.
3. Fill in:
   - **App name**: e.g. `Game 24`
   - **User support email**: your email
   - **Developer contact email**: your email
4. Click **Save and Continue**.
5. **Scopes**: click **Add or Remove Scopes**. Add:
   - `.../auth/userinfo.email`
   - `.../auth/userinfo.profile`
   - `openid`
     (Often “email”, “profile”, “openid” are already there.) Save and continue.
6. **Test users** (if the app is still in “Testing”): add your own email so you can sign in. Later you can submit for verification or leave in testing.
7. Click **Save and Continue** through the rest. Back on the OAuth consent screen you should see your app in “Testing” or “Production”.

---

## 3. Create OAuth 2.0 credentials

1. In the left sidebar go to: **APIs & Services** → **Credentials**.
2. Click **+ Create Credentials** → **OAuth client ID**.
3. **Application type**: choose **Web application**.
4. **Name**: e.g. `Game 24 Web`.
5. **Authorized JavaScript origins**:
   - Local: `http://localhost:3000`
   - Production: `https://your-domain.com` (e.g. `https://game-24-lyart.vercel.app`)
6. **Authorized redirect URIs** (must match exactly):
   - Local: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`
7. Click **Create**.

You’ll see a dialog with:

- **Client ID** (e.g. `xxxxx.apps.googleusercontent.com`)
- **Client secret**

Copy both; you’ll put them in `.env.local`.

---

## 4. What to get from Google (summary)

| Item              | Where to get it                                            |
| ----------------- | ---------------------------------------------------------- |
| **Client ID**     | APIs & Services → Credentials → your OAuth 2.0 Client ID   |
| **Client secret** | Same place; click the client to reveal/copy                |
| **Redirect URI**  | You define this: `{NEXTAUTH_URL}/api/auth/callback/google` |

---

## 5. Set up environment variables locally

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```
2. Edit `.env.local` and set:

   ```env
   NEXTAUTH_SECRET=your-random-secret-at-least-32-chars
   NEXTAUTH_URL=http://localhost:3000

   GOOGLE_CLIENT_ID=your-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-client-secret
   ```

3. **NEXTAUTH_SECRET**: generate a random string (e.g. 32+ characters). You can use:
   ```bash
   openssl rand -base64 32
   ```
   Never commit `.env.local` or share the secret.

---

## 6. Production (e.g. Vercel)

1. In your hosting dashboard (e.g. Vercel), add the same variables:
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` = `https://your-domain.com`
   - `GOOGLE_CLIENT_ID`
   - `GOOGLE_CLIENT_SECRET`
2. In Google Cloud Console, add your production URL to:
   - **Authorized JavaScript origins**: `https://your-domain.com`
   - **Authorized redirect URIs**: `https://your-domain.com/api/auth/callback/google`

---

## 7. Install dependency and run

If not already installed:

```bash
npm install next-auth
# or
pnpm add next-auth
# or
yarn add next-auth
```

Then:

```bash
npm run dev
```

Open [http://localhost:3000/login](http://localhost:3000/login) and click **Google** to sign in. After success you’ll be redirected to `/play`.

---

## Fix 400: redirect_uri_mismatch

เมื่อ Google แจ้ง **redirect_uri_mismatch** แปลว่า URI ที่แอปส่งไปไม่ตรงกับที่ใส่ใน Google Cloud Console (ต้องตรงทุกตัวอักษร)

### ขั้นตอนแก้

1. **ดูว่าแอปใช้ URL อะไร**
   - ถ้าเข้าแอปที่ `http://localhost:3000` → redirect URI ต้องเป็น  
     `http://localhost:3000/api/auth/callback/google`
   - ถ้าเข้าแอปที่ `http://127.0.0.1:3000` → ต้องใช้  
     `http://127.0.0.1:3000/api/auth/callback/google`  
     (localhost กับ 127.0.0.1 คนละ URI ในสายตา Google)

2. **ตั้งค่าใน Google Cloud Console**
   - ไปที่ [APIs & Services → Credentials](https://console.cloud.google.com/apis/credentials)
   - กดเข้า **OAuth 2.0 Client ID** ที่ใช้กับแอป (ประเภท Web application)
   - ใน **Authorized redirect URIs** กด **+ ADD URI** แล้วใส่ **ให้ตรงตัวอักษร** หนึ่งในนี้ (ตามที่คุณเข้าแอป):
     - `http://localhost:3000/api/auth/callback/google`
     - หรือ `http://127.0.0.1:3000/api/auth/callback/google`
   - **ห้ามมี slash ต่อท้าย** (เช่น ไม่ใช้ `.../google/`)
   - กด **Save**

3. **เช็ค .env**
   - ต้องมี `NEXTAUTH_URL` ให้ตรงกับที่เปิดแอป:
     - เปิดด้วย `http://localhost:3000` → `NEXTAUTH_URL=http://localhost:3000`
     - เปิดด้วย `http://127.0.0.1:3000` → `NEXTAUTH_URL=http://127.0.0.1:3000`
   - แก้แล้ว restart dev server (`npm run dev` ใหม่)

4. **รอสักครู่**  
   การเปลี่ยน redirect URI ใน Google บางครั้งใช้เวลา 1–2 นาทีถึงจะ生效 ลองกดล็อกอินด้วย Google อีกครั้ง

---

## Troubleshooting

- **Redirect URI mismatch**: The redirect URI in Google must be exactly  
  `http://localhost:3000/api/auth/callback/google` (no trailing slash). Same for production with your real domain.
- **403 / Access blocked**: Check OAuth consent screen (External vs Internal), added scopes, and if in Testing, add your email as a test user.
- **Invalid client**: Double-check `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in `.env.local` and that the file is loaded (restart the dev server after changes).
