type SupabaseRequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  prefer?: string;
  query?: string;
};

function getSupabaseServerConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server env is not configured.");
  }

  return {
    restUrl: `${url.replace(/\/$/, "")}/rest/v1`,
    serviceRoleKey,
  };
}

export async function supabaseServerRequest<T>(
  path: string,
  options: SupabaseRequestOptions = {},
): Promise<T> {
  const { restUrl, serviceRoleKey } = getSupabaseServerConfig();
  const response = await fetch(`${restUrl}/${path}${options.query ?? ""}`, {
    method: options.method ?? "GET",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: options.prefer ?? "return=representation",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase request failed: ${response.status} ${errorText}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return (await response.json()) as T;
}

export async function uploadSupabaseStorageObject({
  bucket,
  contentType,
  objectPath,
  body,
}: {
  bucket: string;
  contentType: string;
  objectPath: string;
  body: ArrayBuffer;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server env is not configured.");
  }

  const storageUrl = `${url.replace(/\/$/, "")}/storage/v1/object/${bucket}/${objectPath}`;
  const response = await fetch(storageUrl, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": contentType,
      "x-upsert": "false",
    },
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase storage upload failed: ${response.status} ${errorText}`);
  }

  return response.json() as Promise<{ Key?: string; Id?: string }>;
}

export async function createSupabaseStorageSignedUrl({
  bucket,
  objectPath,
  expiresIn = 3600,
}: {
  bucket: string;
  objectPath: string;
  expiresIn?: number;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase server env is not configured.");
  }

  const baseUrl = url.replace(/\/$/, "");
  const safePath = objectPath.split("/").map(encodeURIComponent).join("/");
  const response = await fetch(`${baseUrl}/storage/v1/object/sign/${bucket}/${safePath}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ expiresIn }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Supabase signed URL failed: ${response.status} ${errorText}`);
  }

  const body = (await response.json()) as { signedURL?: string; signedUrl?: string };
  const signedPath = body.signedURL ?? body.signedUrl;

  if (!signedPath) {
    return null;
  }

  return signedPath.startsWith("http") ? signedPath : `${baseUrl}/storage/v1${signedPath}`;
}
