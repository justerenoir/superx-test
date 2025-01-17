import { OpenAI } from 'openai'
import { NextResponse } from 'next/server'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

export async function POST(request: Request) {
  try {
    const { content } = await request.json()

    const prompt = `
      Create a new post that captures a similar tone and style to the following post, but with unique content:
      "${content}"
      
      The new post should:
      1. Maintain a similar writing style and tone
      2. Be about a related but different topic
      3. Be approximately the same length
      4. Be creative and engaging
      
      Return only the new post text, without quotes or additional formatting.
    `

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 200,
    })

    const remixedContent = completion.choices[0].message.content

    return NextResponse.json({ content: remixedContent })
  } catch (error) {
    console.error('Error in remix API:', error)
    return NextResponse.json(
      { error: 'Failed to generate remixed content' },
      { status: 500 }
    )
  }
} 