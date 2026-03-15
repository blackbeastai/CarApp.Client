import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CarModelService, CreateCarModel } from '../car-model.service';
import { LookupService, Brand, carClasses } from '../../../core/services/lookup.service';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-car-model-form',
  templateUrl: './car-model-form.component.html',
  styleUrls: ['./car-model-form.component.scss']
})
export class CarModelFormComponent implements OnInit {

  carModelForm!: FormGroup;
  brands: Brand[] = [];
  carClasses: carClasses[] = [];
  isLoading = false;
  isEditMode = false;
  carModelId = 0;
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  constructor(
    private fb: FormBuilder,
    private carModelService: CarModelService,
    private lookupService: LookupService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.loadLookups();

    // Check if edit mode
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.carModelId = +id;
      this.loadCarModel(this.carModelId);
    }
  }

  initForm(): void {
    this.carModelForm = this.fb.group({
      brandId: ['', Validators.required],
      classId: ['', Validators.required],
      modelName: ['', Validators.required],
      // 10 alphanumeric only — custom validator
      modelCode: ['', [
        Validators.required,
        Validators.maxLength(10),
        Validators.pattern('^[a-zA-Z0-9]{1,10}$')
      ]],
      description: ['', Validators.required],
      features: ['', Validators.required],
      price: ['', [Validators.required,
      Validators.min(0)]],
      dateOfManufacturing: ['', Validators.required],
      isActive: [true],
      sortOrder: [0]
    });
  }

  loadLookups(): void {
    this.lookupService.getBrands().subscribe(
      data => this.brands = data
    );
    this.lookupService.getCarClasses().subscribe(
      data => this.carClasses = data
    );
  }

  loadCarModel(id: number): void {
    this.carModelService.getById(id).subscribe({
      next: car => {
        this.carModelForm.patchValue({
          brandId: car.brandId,
          classId: car.classId,
          modelName: car.modelName,
          modelCode: car.modelCode,
          description: car.description,
          features: car.features,
          price: car.price,
          dateOfManufacturing: car.dateOfManufacturing
            .split('T')[0],
          isActive: car.isActive,
          sortOrder: car.sortOrder
        });
      }
    });
  }

  // Easy access to form controls in template
  get f() { return this.carModelForm.controls; }

  onFileSelect(event: any): void {
    const files: FileList = event.target.files;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate file size — max 5MB
      if (file.size > 5 * 1024 * 1024) {
        this.notificationService.error(
          `${file.name} exceeds 5MB limit`);
        continue;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        this.notificationService.error(
          `${file.name} is not a valid image`);
        continue;
      }

      this.selectedFiles.push(file);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number): void {
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  onSubmit(): void {
    if (this.carModelForm.invalid) {
      // Mark all fields as touched to show errors
      this.carModelForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formValue = this.carModelForm.value as CreateCarModel;

    if (this.isEditMode) {
      this.carModelService
        .update(this.carModelId, formValue)
        .subscribe({
          next: () => {
            // Upload images only if files selected
            if (this.selectedFiles.length > 0) {
              this.uploadImagesIfAny(this.carModelId);
            } else {
              this.onSuccess();
            }

          },
          error: () => {
            this.isLoading = false;
          }
        });
    } else {
      this.carModelService.create(formValue).subscribe({
        next: (res) => {
          const newId = res.id;
          // Upload images only if files selected
          if (this.selectedFiles.length > 0) {
            this.uploadImagesIfAny(newId);
          } else {
            this.onSuccess();
          }
        },
        error: () => {
          this.isLoading = false;
        }
      });
    }
  }

  uploadImagesIfAny(carModelId: number): void {
    if (this.selectedFiles.length > 0) {
      this.carModelService
        .uploadImages(carModelId, this.selectedFiles)
        .subscribe({
          next: () => this.onSuccess(),
          error: () => this.onSuccess() // still navigate even if upload fails
        });
    } else {
      this.onSuccess();
    }
  }

  onSuccess(): void {
    this.isLoading = false;
    this.notificationService.success(
      this.isEditMode
        ? 'Car model updated successfully!'
        : 'Car model created successfully!'
    );
    this.router.navigate(['/car-model']);
  }

  onCancel(): void {
    this.router.navigate(['/car-model']);
  }
}