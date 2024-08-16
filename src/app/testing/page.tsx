import React from 'react'
import ExpandableCardDemo from '@/components/TASKVIEWTEST'
import { db } from '@/lib/db'
import { auth } from '../../../auth'

const Testing = async () => {
  const session = await auth()
  return (
      <div className="flex-col flex h-screen mt-24">
        <ExpandableCardDemo cards={await db.task.findMany({
          where: {
            userId: session?.user?.id,
          },
        })}/>
      </div>
  )
}

export default Testing