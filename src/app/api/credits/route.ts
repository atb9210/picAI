import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// Per ora, usiamo un utente di default per testare
async function getOrCreateDefaultUser() {
  let user = await db.user.findFirst({
    where: { email: 'test@example.com' },
    select: { 
      credits: true,
      plan: true,
      id: true
    }
  })

  if (!user) {
    user = await db.user.create({
      data: {
        email: 'test@example.com',
        name: 'Test User',
        credits: 50,
        plan: 'FREE'
      },
      select: {
        credits: true,
        plan: true,
        id: true
      }
    })
  }

  return user
}

export async function GET() {
  try {
    const user = await getOrCreateDefaultUser()

    return NextResponse.json({
      credits: user.credits,
      plan: user.plan,
      userId: user.id
    })

  } catch (error) {
    console.error('Credits API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { amount, type } = await request.json()

    if (typeof amount !== 'number' || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const user = await getOrCreateDefaultUser()

    const result = await db.$transaction(async (tx) => {
      const currentUser = await tx.user.findUnique({
        where: { id: user.id },
        select: { id: true, credits: true, plan: true }
      })

      if (!currentUser) {
        throw new Error('User not found')
      }

      if (type === 'DEDUCT' && currentUser.credits < amount) {
        throw new Error('Insufficient credits')
      }

      const updatedUser = await tx.user.update({
        where: { id: currentUser.id },
        data: {
          credits: type === 'DEDUCT' 
            ? { decrement: amount }
            : { increment: amount }
        }
      })

      await tx.transaction.create({
        data: {
          userId: currentUser.id,
          type: type === 'DEDUCT' ? 'USAGE' : 'BONUS',
          amount: type === 'DEDUCT' ? -amount : amount,
          credits: amount,
          status: 'COMPLETED'
        }
      })

      return updatedUser
    })

    return NextResponse.json({
      credits: result.credits,
      success: true
    })

  } catch (error: any) {
    console.error('Credits update error:', error)
    
    if (error.message === 'Insufficient credits') {
      return NextResponse.json(
        { error: 'Crediti insufficienti' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}