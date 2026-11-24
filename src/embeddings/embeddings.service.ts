import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

type InputType = 'document' | 'query';

interface VoyageResponse {
  data: { embedding: number[]; index: number }[];
  usage: { total_tokens: number };
}

@Injectable()
export class EmbeddingService {
  private readonly apiKey: string;

  constructor(config: ConfigService) {
    this.apiKey = config.getOrThrow<string>('VOYAGE_API_KEY');
  }

  async embed(texts: string[], InputType: InputType): Promise<number[][]> {
    const res = await fetch('https://api.voyageai.com/v1/embeddings', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        input: texts,
        model: 'voyage-3.5',
        input_type: InputType,
      }),
    });

    if (!res.ok)
      throw new Error(`Voyage error ${res.status}: ${await res.text()}`);

    const body = (await res.json()) as VoyageResponse;
    return body.data.sort((a, b) => a.index - b.index).map((d) => d.embedding);
  }
}
