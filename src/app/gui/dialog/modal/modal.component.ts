import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() title: string = 'Модальное окно';  // Заголовок модального окна
  @Input() isVisible: boolean = false;        // Флаг для отображения окна
  @Output() closeModal = new EventEmitter<void>();  // Событие закрытия окна

  onClose() {
    this.closeModal.emit(); // Закрытие через родителя
  }
}
