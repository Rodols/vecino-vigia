import { Component, OnInit } from '@angular/core';
import { VecinoNuevoService } from '../../services/vecino-nuevo.service';
import { Vecino } from '../../models/Vecino';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modal-vecino',
  templateUrl: './modal-vecino.component.html',
  styleUrls: ['./modal-vecino.component.css']
})
export class ModalVecinoComponent implements OnInit {
  selectedVecino = new Vecino();

  constructor(private addVecinoService: VecinoNuevoService) { }

  ngOnInit() {
  }

  onSubmit(vecinoForm: NgForm) {
    this.addVecinoService.insertVecino(vecinoForm.value);
    this.resetForm(vecinoForm);
  }

  deleteVecino(id) {
    this.deleteVecino(id);
  }

  resetForm(vecinoForm: NgForm) {
    if (vecinoForm != null) {
      vecinoForm.reset();
      this.selectedVecino = new Vecino();
    }
  }

}
