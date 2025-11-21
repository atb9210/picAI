import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'
import ZAI from 'z-ai-web-dev-sdk'

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

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, ratio, creativity, detail } = await request.json()

    if (!prompt?.trim()) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      )
    }

    // Get user and check credits
    const user = await getOrCreateDefaultUser()

    const creditsNeeded = 5
    if (user.credits < creditsNeeded) {
      return NextResponse.json(
        { error: 'Crediti insufficienti', creditsNeeded, currentCredits: user.credits },
        { status: 400 }
      )
    }

    // Deduct credits and create image record
    const result = await db.$transaction(async (tx) => {
      // Update user credits
      await tx.user.update({
        where: { id: user.id },
        data: { credits: { decrement: creditsNeeded } }
      })

      // Create transaction record
      await tx.transaction.create({
        data: {
          userId: user.id,
          type: 'USAGE',
          amount: -creditsNeeded,
          credits: creditsNeeded,
          status: 'COMPLETED',
          metadata: { action: 'image_generation' }
        }
      })

      // Create image record
      const image = await tx.image.create({
        data: {
          userId: user.id,
          prompt: prompt.trim(),
          style,
          ratio,
          creativity,
          detail,
          creditsUsed: creditsNeeded,
          status: 'PROCESSING',
          metadata: { creativity, detail, ratio }
        }
      })

      return image
    })

    // Generate image with ZAI
    try {
      const zai = await ZAI.create()
      
      const enhancedPrompt = `${prompt.trim()}, ${style} style, high quality, detailed`
      
      const imageResponse = await zai.images.generations.create({
        prompt: enhancedPrompt,
        size: ratio === '1:1' ? '1024x1024' : ratio === '16:9' ? '1792x1024' : '1024x1792',
        // Additional parameters based on creativity and detail could be added here
      })

      const base64Image = imageResponse.data[0]?.base64
      
      if (!base64Image) {
        throw new Error('No image generated')
      }

      // Update image record with result
      const updatedImage = await db.image.update({
        where: { id: result.id },
        data: {
          status: 'COMPLETED',
          generatedUrl: `data:image/png;base64,${base64Image}`,
          thumbnailUrl: `data:image/png;base64,${base64Image}`
        }
      })

      return NextResponse.json({
        success: true,
        image: updatedImage,
        creditsRemaining: user.credits - creditsNeeded
      })

    } catch (generationError) {
      console.error('Image generation failed:', generationError)
      
      // Refund credits on failure
      await db.$transaction(async (tx) => {
        await tx.user.update({
          where: { id: user.id },
          data: { credits: { increment: creditsNeeded } }
        })

        await tx.transaction.create({
          data: {
            userId: user.id,
            type: 'REFUND',
            amount: creditsNeeded,
            credits: creditsNeeded,
            status: 'COMPLETED',
            metadata: { reason: 'generation_failure', imageId: result.id }
          }
        })

        await tx.image.update({
          where: { id: result.id },
          data: { status: 'FAILED' }
        })
      })

      return NextResponse.json(
        { error: 'Generazione immagine fallita, crediti rimborsati' },
        { status: 500 }
      )
    }

  } catch (error: any) {
    console.error('Image generation API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}