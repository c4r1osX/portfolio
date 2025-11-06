import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { EmailService } from './services/email-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit, AfterViewInit, OnDestroy {
  private particleInterval: any;
  private observer!: IntersectionObserver;
  private floatInterval: any;
  
  // Estado del formulario
  isSubmitting = false;
  formMessage = '';
  formMessageType: 'success' | 'error' | '' = '';

  constructor(private emailService: EmailService) {}

  ngOnInit(): void {
    // El código se ejecutará después de que la vista esté inicializada
  }

  ngAfterViewInit(): void {
    this.initScrollProgressBar();
    this.initNavbarScrollEffect();
    this.initIntersectionObserver();
    this.initSmoothScroll();
    this.initParallaxEffect();
    this.initFloatingImage();
    this.initParticles();
    this.initButtonEffects();
    this.initMobileOptimizations();
    this.initEasterEgg();
  }

  ngOnDestroy(): void {
    if (this.particleInterval) {
      clearInterval(this.particleInterval);
    }
    if (this.floatInterval) {
      clearInterval(this.floatInterval);
    }
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private initScrollProgressBar(): void {
    window.addEventListener('scroll', () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      const progressBar = document.getElementById('progressBar');
      if (progressBar) {
        progressBar.style.width = scrolled + '%';
      }
    });
  }

  private initNavbarScrollEffect(): void {
    window.addEventListener('scroll', () => {
      const navbar = document.getElementById('navbar');
      if (navbar) {
        if (window.scrollY > 100) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }
    });
  }

  private initIntersectionObserver(): void {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -100px 0px'
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    document.querySelectorAll('.container').forEach(container => {
      this.observer.observe(container);
    });

    document.querySelectorAll('.skill-card').forEach(card => {
      this.observer.observe(card);
    });
  }

  private initSmoothScroll(): void {
    document.querySelectorAll('nav a').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        if (targetId) {
          const targetSection = document.querySelector(targetId);
          if (targetSection) {
            const offsetTop = (targetSection as HTMLElement).offsetTop - 80;
            window.scrollTo({
              top: offsetTop,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  }

  async onFormSubmit(event: Event): Promise<void> {
    event.preventDefault();
    
    // Limpiar mensajes anteriores
    this.formMessage = '';
    this.formMessageType = '';
    this.isSubmitting = true;

    const form = event.target as HTMLFormElement;
    const formData = {
      nombre: (form.elements.namedItem('nombre') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      mensaje: (form.elements.namedItem('mensaje') as HTMLTextAreaElement).value
    };

    try {
      const result = await this.emailService.sendEmail(formData);
      
      this.formMessageType = result.success ? 'success' : 'error';
      this.formMessage = result.message;

      if (result.success) {
        form.reset();
        
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
          this.formMessage = '';
          this.formMessageType = '';
        }, 5000);
      }
    } catch (error) {
      this.formMessageType = 'error';
      this.formMessage = 'Error inesperado. Por favor, intente nuevamente.';
    } finally {
      this.isSubmitting = false;
    }
  }

  private initParallaxEffect(): void {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const heroContent = document.querySelector('.hero-content') as HTMLElement;
      if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.2}px)`;
      }
    });
  }

  private initFloatingImage(): void {
    const profileImg = document.querySelector('.profile-img') as HTMLElement;
    let floatDirection = 1;
    let floatPosition = 0;

    this.floatInterval = setInterval(() => {
      floatPosition += floatDirection * 0.2;
      if (floatPosition > 5 || floatPosition < -5) {
        floatDirection *= -1;
      }
      if (profileImg) {
        profileImg.style.transform = `translateY(${floatPosition}px)`;
      }
    }, 50);
  }

  private initParticles(): void {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.style.position = 'fixed';
      particle.style.width = '2px';
      particle.style.height = '2px';
      particle.style.background = '#e63946';
      particle.style.left = Math.random() * window.innerWidth + 'px';
      particle.style.top = '-10px';
      particle.style.pointerEvents = 'none';
      particle.style.opacity = '0.4';
      particle.style.zIndex = '1';
      document.body.appendChild(particle);

      let posY = -10;
      const speed = Math.random() * 1.5 + 0.5;

      const interval = setInterval(() => {
        posY += speed;
        particle.style.top = posY + 'px';

        if (posY > window.innerHeight) {
          clearInterval(interval);
          particle.remove();
        }
      }, 25);
    };

    this.particleInterval = setInterval(createParticle, 800);

    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight / 2) {
        clearInterval(this.particleInterval);
        this.particleInterval = setInterval(createParticle, 2000);
      } else {
        clearInterval(this.particleInterval);
        this.particleInterval = setInterval(createParticle, 800);
      }
    });
  }

  private initButtonEffects(): void {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', (e: Event) => {
        const mouseEvent = e as MouseEvent;
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = mouseEvent.clientX - rect.left;
        const y = mouseEvent.clientY - rect.top;

        (btn as HTMLElement).style.setProperty('--mouse-x', x + 'px');
        (btn as HTMLElement).style.setProperty('--mouse-y', y + 'px');
      });
    });
  }

  private initMobileOptimizations(): void {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    if (isMobile) {
      document.querySelectorAll('.tech-item, .project-card').forEach(item => {
        (item as HTMLElement).style.transition = 'transform 0.2s ease';
      });
    }
  }

  private initEasterEgg(): void {
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
      if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
          document.body.style.animation = 'rainbow 2s infinite';
          konamiIndex = 0;
        }
      } else {
        konamiIndex = 0;
      }
    });

    const style = document.createElement('style');
    style.textContent = `
      @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }

  scrollToSection(sectionId: string, event: Event): void {
    event.preventDefault();
    const targetSection = document.querySelector(sectionId);
    if (targetSection) {
      const offsetTop = (targetSection as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }
}