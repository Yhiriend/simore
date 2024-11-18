// src/jspdf-autotable.d.ts
import { jsPDF } from "jspdf";

declare module "jspdf" {
  export interface jsPDF {
    autoTable: any;
  }
}
