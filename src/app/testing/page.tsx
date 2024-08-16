import React from 'react'
import ExpandableCardDemo from '@/components/TASKVIEWTEST'
import { db } from '@/lib/db'
import { auth } from '../../../auth'
import TaskView from '@/components/TaskView'

const Testing = async () => {
  const session = await auth()
  return (
      <div className="flex-col flex h-screen mt-24">
        {/* <ExpandableCardDemo cards={await db.task.findMany({
          where: {
            userId: session?.user?.id,
          },
        })}/> */}
        <TaskView cards={await db.task.findMany()}/>
      </div>
  )
}

export default Testing