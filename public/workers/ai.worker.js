// Load Transformer.js and a small model for in-browser inference
import { pipeline } from '@xenova/transformers';

let generator;

self.onmessage = async (e) => {
  if (e.data.type === 'load') {
    try {
      generator = await pipeline('text-generation', 'Xenova/TinyLlama-1.1B-Chat-v1.0', {
        progress_callback: (progress) => {
          self.postMessage({ type: 'progress', progress });
        }
      });
      self.postMessage({ type: 'ready' });
    } catch (err) {
      self.postMessage({ type: 'error', error: err.message });
    }
  } else if (e.data.type === 'generate') {
    if (!generator) {
      self.postMessage({ type: 'error', error: 'Model not loaded' });
      return;
    }
    const { prompt, maxTokens = 100 } = e.data;
    const result = await generator(prompt, { max_new_tokens: maxTokens });
    self.postMessage({ type: 'result', text: result[0].generated_text });
  }
};
