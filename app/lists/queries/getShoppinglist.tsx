import db from "db"
import { Ctx } from "blitz"

export default async function getShoppinglist({ id }, context: Ctx) {
  context.session.$authorize()
  const list = await db.shoppinglist.findFirst({
    where: { id: id },
    select: {
      id: true,
      comment: true,
      store: true,
      items: { select: { id: true, name: true } },
    },
  })
  return list!
}
