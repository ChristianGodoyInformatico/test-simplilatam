import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor() { }

  extractErrorMessage(error: any): string {
    let messages: string[] = [];
    
    if (error.error && typeof error.error === 'object') {
      for (const [key, value] of Object.entries(error.error)) {
        if (Array.isArray(value)) {
          messages.push(`${key}: ${value.join(', ')}`);
        } else {
          messages.push(`${key}: ${value}`);
        }
      }
    } else {
      messages.push('Ha ocurrido un error inesperado.');
    }
    
    return messages.join('\n'); // Unir todos los mensajes en un solo string con saltos de línea
  }
}
