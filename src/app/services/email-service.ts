import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_7ynjmm6'; // Reemplazar
  private templateId = 'template_0tj71uj'; // Reemplazar
  private publicKey = 'Sip97lTpZP64m3r6o'; // Reemplazar

  constructor() {
    // Inicializar EmailJS
    emailjs.init(this.publicKey);
  }

  async sendEmail(formData: { nombre: string; email: string; mensaje: string }): Promise<{ success: boolean; message: string }> {
  try {
    const now = new Date();

    const templateParams = {
      name: formData.nombre,
      title: formData.email,  // si quieres mostrar el correo bajo "Contact Us"
      message: formData.mensaje,
      time: now.toLocaleString() // opcional, mostrará la hora actual
    };

    const response = await emailjs.send(
      this.serviceId,
      this.templateId,
      templateParams
    );

    if (response.status === 200) {
      return {
        success: true,
        message: '¡Correo enviado exitosamente! Pronto me comunicaré con usted.'
      };
    } else {
      return {
        success: false,
        message: 'Error al enviar el correo. Por favor, intente nuevamente.'
      };
    }
  } catch (error) {
    console.error('Error al enviar email:', error);
    return {
      success: false,
      message: 'Error al enviar el correo. Por favor, intente nuevamente o contácteme directamente.'
    };
  }
}
}