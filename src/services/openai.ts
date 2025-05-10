import OpenAI from 'openai';
import { InterviewQuestion } from '../data/interviewQuestions';

const OPENAI_API_KEY = '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';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export const transcribeAudio = async (audioBlob: Blob): Promise<string> => {
  try {
    const audioFile = new File([audioBlob], 'audio.webm', { type: 'audio/webm' });
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioFile,
      model: 'whisper-1',
    });
    
    return transcription.text;
  } catch (error) {
    console.error('Transcription error:', error);
    throw new Error('Failed to transcribe audio.');
  }
};

const ASKMATEAI_PROMPT = `You are "AskMate", a friendly yet incisive voice coach who runs timed mock interviews.
You speak like an articulate senior product manager: crisp sentences, minimal filler words.
You never mention you are an AI.

Environment:
- The user is preparing for product-management interviews at Indian tech companies
- Conversation happens over voice channel with latency <400ms
- Keep responses short (1-3 sentences) for snappy TTS

Tone:
- Encouraging and constructive, never sarcastic
- Use plain English with Indian business lingo (e.g., "north-star metric")
- Short blocks of text so TTS stays responsive

Format:
- Plain text only, no markdown
- Keep sentences ≤ 20 words
- Use "..." for pauses`;

export const evaluateAnswer = async (
  question: InterviewQuestion,
  answer: string
): Promise<{ score: number; feedback: string; correction: string }> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: `${ASKMATEAI_PROMPT}

Evaluate the candidate's answer and provide:
1. A score from 0-100
2. Brief, constructive feedback (2-3 sentences)
3. A concise improved answer (3-4 sentences)

Format response as JSON:
{
  "score": number,
  "feedback": "feedback text",
  "correction": "improved answer"
}`
        },
        {
          role: 'user',
          content: `Question: ${question.question}\nCandidate's Answer: ${answer}`
        }
      ]
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No content in response');
    }

    try {
      const response = JSON.parse(content);
      return {
        score: typeof response.score === 'number' ? response.score : 0,
        feedback: response.feedback || 'No feedback available.',
        correction: response.correction || 'No correction available.'
      };
    } catch (parseError) {
      console.error('Failed to parse response:', parseError);
      throw new Error('Invalid response format from API');
    }
  } catch (error) {
    console.error('Evaluation error:', error);
    throw new Error('Failed to evaluate answer.');
  }
};

export const calculateOverallScore = async (
  answers: Record<number, string>,
  scores: Record<number, number>
): Promise<number> => {
  // Calculate weighted average based on answer quality and consistency
  const scoreValues = Object.values(scores);
  if (scoreValues.length === 0) return 0;

  // Calculate the standard deviation to measure consistency
  const mean = scoreValues.reduce((sum, score) => sum + score, 0) / scoreValues.length;
  const variance = scoreValues.reduce((sum, score) => sum + Math.pow(score - mean, 2), 0) / scoreValues.length;
  const stdDev = Math.sqrt(variance);

  // Apply consistency bonus/penalty
  // Lower standard deviation (more consistent answers) gets a bonus
  const consistencyFactor = Math.max(0, 1 - (stdDev / 25)); // Normalize to 0-1 range
  const consistencyBonus = 5 * consistencyFactor; // Up to 5 points bonus for consistency

  // Calculate base score (average of individual scores)
  const baseScore = mean;

  // Apply consistency bonus and ensure score is between 0 and 100
  const finalScore = Math.min(100, Math.max(0, Math.round(baseScore + consistencyBonus)));

  return finalScore;
};