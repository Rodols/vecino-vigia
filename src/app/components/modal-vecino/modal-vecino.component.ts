import { Component, OnInit } from "@angular/core";
import { VecinoNuevoService } from "../../services/vecino-nuevo.service";
import { Vecino } from "../../models/Vecino";
import { NgForm } from "@angular/forms";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-modal-vecino",
  templateUrl: "./modal-vecino.component.html",
  styleUrls: ["./modal-vecino.component.css"]
})
export class ModalVecinoComponent implements OnInit {
  selectedVecino = new Vecino();

  constructor(
    private addVecinoService: VecinoNuevoService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit(vecinoForm: NgForm) {
    if (vecinoForm.valid) {
      this.addVecinoService.insertVecino(vecinoForm.value);
      vecinoForm.reset();
    } else {
      this.toastr.warning(
        "Todos los campos son obligatorios, revisa los datos que ingresaste"
      );
    }
  }

  deleteVecino(id) {
    this.deleteVecino(id);
  }
}
