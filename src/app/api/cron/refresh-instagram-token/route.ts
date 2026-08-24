import { NextResponse } from "next/server";

type InstagramRefreshResponse = { access_token: string; expires_in: number };
type VercelEnvListResponse = { envs: Array<{ id: string; key: string }> };

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const currentToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const vercelToken = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  const teamId = process.env.VERCEL_TEAM_ID;
  const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  if (!currentToken || !vercelToken || !projectId || !deployHookUrl) {
    return NextResponse.json({ error: "Missing required environment variables" }, { status: 500 });
  }

  const teamQuery = teamId ? `?teamId=${teamId}` : "";

  // 1. Exchange the current long-lived token for a fresh 60-day one.
  const refreshRes = await fetch(
    `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`
  );
  if (!refreshRes.ok) {
    return NextResponse.json(
      { error: "Instagram token refresh failed", detail: await refreshRes.text() },
      { status: 502 }
    );
  }
  const { access_token: newToken } = (await refreshRes.json()) as InstagramRefreshResponse;

  // 2. Look up the env var's id on Vercel (PATCH needs the id, not just the key).
  const listRes = await fetch(`https://api.vercel.com/v10/projects/${projectId}/env${teamQuery}`, {
    headers: { Authorization: `Bearer ${vercelToken}` },
  });
  if (!listRes.ok) {
    return NextResponse.json({ error: "Failed to list Vercel env vars" }, { status: 502 });
  }
  const { envs } = (await listRes.json()) as VercelEnvListResponse;
  const target = envs.find((env) => env.key === "INSTAGRAM_ACCESS_TOKEN");
  if (!target) {
    return NextResponse.json({ error: "INSTAGRAM_ACCESS_TOKEN not found on Vercel" }, { status: 404 });
  }

  // 3. Write the new token back.
  const updateRes = await fetch(
    `https://api.vercel.com/v10/projects/${projectId}/env/${target.id}${teamQuery}`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${vercelToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: newToken }),
    }
  );
  if (!updateRes.ok) {
    return NextResponse.json({ error: "Failed to update Vercel env var" }, { status: 502 });
  }

  // 4. Redeploy so the new token actually takes effect (env var changes alone don't).
  await fetch(deployHookUrl, { method: "POST" });

  return NextResponse.json({ status: "ok", refreshedAt: new Date().toISOString() });
}
