import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Import node-fetch

class LangflowClient {
  constructor(baseURL, applicationToken) {
    this.baseURL = baseURL;
    this.applicationToken = applicationToken;
  }

  async post(endpoint, body, headers = { 'Content-Type': 'application/json' }) {
    headers['Authorization'] = `Bearer ${this.applicationToken}`;
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
      });

      const responseMessage = await response.json();
      if (!response.ok) {
        throw new Error(
          `${response.status} ${response.statusText} - ${JSON.stringify(responseMessage)}`
        );
      }
      return responseMessage;
    } catch (error) {
      console.error('Request Error:', error.message);
      throw error;
    }
  }

  async runFlow(flowId, langflowId, inputValue, inputType, outputType, tweaks) {
    const endpoint = `/lf/${langflowId}/api/v1/run/${flowId}`;
    return this.post(endpoint, {
      input_value: inputValue,
      input_type: inputType,
      output_type: outputType,
      tweaks,
    });
  }
}

export async function POST(req) {
  const body = await req.json();
  const { inputValue, inputType = 'chat', outputType = 'chat' } = body;

  const flowId = '7745b4fc-54b6-46f0-8114-b39fc90d685d'; // Replace with your Flow ID
  const langflowId = 'c44a2f14-40fa-4f70-b689-49c5a8232279'; // Replace with your Langflow ID
  const applicationToken = 'AstraCS:cmcMUNiYjHxqNFbRZQHgRrlI:1d7634d7b0d39e83eb65d50c12fc1149ad99244947c60314e5262133c1ab77cb'; // Replace with your actual token

  const tweaks = {
    // Add any necessary tweaks here
  };

  const langflowClient = new LangflowClient(
    'https://api.langflow.astra.datastax.com',
    applicationToken
  );

  try {
    const response = await langflowClient.runFlow(
        flowId,
        langflowId,
        inputValue,
        inputType,
        outputType,
        tweaks
    );
    console.log('Langflow Response:', JSON.stringify(response, null, 2));
    return NextResponse.json(response);
} catch (error) {
    console.error('Langflow Error:', error.message);
    return NextResponse.json(
        { error: error.message },
        { status: 500 }
    );
}
}
