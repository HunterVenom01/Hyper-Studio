import { CORS_HEADERS } from "@/shared/utils/cors";
import { getUnifiedModelsResponse } from "./models/catalog";
import { POST as handleChatCompletions } from "./chat/completions/route";

/**
 * Handle CORS preflight
 */
export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

/**
 * GET /v1 - Return models list (OpenAI compatible)
 * Delegates to the same catalog builder as `/api/v1/models` (T09).
 */
export async function GET(request: Request) {
  return getUnifiedModelsResponse(request, {
    "Content-Type": "application/json",
    ...CORS_HEADERS,
  });
}

/**
 * POST /v1 - Direct chat completions fallback for clients that point directly to /v1
 */
export async function POST(request: Request) {
  return handleChatCompletions(request);
}
