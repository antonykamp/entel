import { Ctx } from "blitz"

export default async function checkLogin(_ = null, context: Ctx) {
  context.session.$authorize()
}
