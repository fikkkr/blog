import { NextResponse } from "next/server";
import { getGithubRepos, getGithubUser, computeLanguageStats } from "@/lib/github";

export const revalidate = 3600; // 1 hour ISR

export async function GET() {
  try {
    const [user, repos] = await Promise.all([getGithubUser(), getGithubRepos()]);
    const languageStats = computeLanguageStats(repos);

    return NextResponse.json({
      user,
      repos,
      languageStats,
      timestamp: new Date().toISOString(),
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch GitHub telemetry" },
      { status: 500 }
    );
  }
}
