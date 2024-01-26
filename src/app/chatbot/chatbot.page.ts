import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { OpenAI } from 'openai';
import { environment } from 'src/environments/environment.prod';

const settings = {
  apiKey: environment.openai_api_key,
  dangerouslyAllowBrowser: true,
};
interface Message {
  user: 'You' | 'E-CO Bot';
  content: string;
  date: string;
  image?: string;
}

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.page.html',
  styleUrls: ['./chatbot.page.scss'],
})
export class ChatbotPage {
  userInput: string = '';
  response: string = '';
  messages: Message[] = [];
  loading: boolean = false;

  openai = new OpenAI(settings);

  constructor() {}

  async sendToChatbot() {
    try {
      const date = new Date();
      this.response = '';
      this.messages.push({
        user: 'You',
        content: this.userInput,
        date: `${date.getHours()}:${date.getMinutes()}`,
      });
      const prompt = this.userInput;
      this.userInput = '';
      this.loading = true;

      const containsLive = prompt.toLowerCase().includes('live');

      const stream = await this.openai.chat.completions
        .create({
          model: environment.open_ai_model,
          messages: [
            {
              role: 'system',
              content:
                "As E-CO, the AI chatbot for EcoThreads, an eco-friendly fashion brand, your primary role is to assist users with inquiries about EcoThreads' services, policies, and products. Your responses should be informative, courteous, and reflect EcoThreads' commitment to sustainability and customer satisfaction. Address user questions with specific information about recycling bins, discounts for first-time customers, order tracking, and connecting with customer service agents. Additionally, emphasize EcoThreads' dedication to environmental sustainability in your interactions, aligning with the brand's values. If you encounter questions that fall outside your training or require human assistance, guide users to appropriate resources or suggest contacting customer service for further help. Aim to provide a positive user experience by being helpful, respectful, and knowledgeable about EcoThreads and its eco-friendly practices.",
            },
            { role: 'user', content: prompt },
          ],
          stream: true,
        })
        .then((x) => {
          return x;
        });

      for await (const chunk of stream) {
        this.response += chunk.choices[0]?.delta.content || '';
      }
      this.loading = false;

      if (containsLive) {
        this.response += " Here's the link to a live operator: https://meet.google.com/gpt-obiz-efe";
      }

      this.messages.push({
        user: 'E-CO Bot',
        content: this.response,
        image: '/assets/chatbot/chatbot.png',
        date: `${date.getHours()}:${date.getMinutes()}`,
      });

      this.response = '';
    } catch (E) {
      console.log(E);
    }
  }
}
