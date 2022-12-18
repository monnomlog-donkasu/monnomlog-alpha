import { getJsonFromBody } from "@common/util";
import insertQueue from "@modules/import/wordpress/insert-queue";
import { getPublishedPost, parseXml } from "@modules/import/wordpress/parse";
import type { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export default async (req: NextApiRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  const json = await getJsonFromBody<{ id: string }>(req);
  const { id } = json;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  const xmlRes = await fetch(xmlurl);
  const xmlData = await xmlRes.text();
  const wpJson = await parseXml(xmlData);
  const wpData = getPublishedPost(wpJson);

  const res = await insertQueue(wpData);

  return NextResponse.json({
    message: "OK",
    data: res.data,
  });
};

export const config = {
  runtime: "experimental-edge",
};
