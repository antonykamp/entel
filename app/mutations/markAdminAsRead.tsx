import db from "db"
import { Ctx } from "blitz"

export default async function markAdminMessagesAsRead({ chatId }, context: Ctx) {
  context.session.$authorize()
  const admins = await db.adminMessage.findMany({
    where: { sentInId: chatId, wasReadBy: { none: { id: context.session.userId } } },
    select: { id: true },
  })
  const promisses = admins.map(async (mes) => {
    db.adminMessage.update({
      where: { id: mes.id },
      data: { wasReadBy: { connect: { id: context.session.userId! } } },
    })
  })
  Promise.all(promisses)
}
