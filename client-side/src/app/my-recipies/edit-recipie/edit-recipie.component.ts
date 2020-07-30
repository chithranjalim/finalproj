import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { RecipiesService } from '../recipies.service';
import { Recipies } from '../recipies.model';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from "../../auth.service";
import { FormBuilder, Validators,FormGroup, FormArray, FormControl, } from "@angular/forms";

@Component({
  selector: 'app-edit-recipie',
  templateUrl: './edit-recipie.component.html',
  styleUrls: ['./edit-recipie.component.css']
})
export class EditRecipieComponent implements OnInit {
  public recipeForm:FormGroup;
  public categories: any[];
  public subcategories: any[];
  //public recipe;
  public recipeFormData;
  recipies: Recipies[];
  id:String;
  recipie = new Recipies(null,null,null,null,null,null,null,null,null,null,null,null);
  edited= new Recipies(null,null,null,null,null,null,null,null,null,null,null,null);
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private router: ActivatedRoute,
    private recipiesService: RecipiesService) { }

  ngOnInit(): void {

    this.router.paramMap
    .subscribe((params) => {
      this.id= params.get('id');
    });

    this.recipiesService.getRecipie(this.id)
    .subscribe((data) => {
      this.recipie = JSON.parse(JSON.stringify(data));
      console.log(this.recipie);
    });
  
    this.categories = [
      {
        name: 'breakfast',
        id: 1
      },
      {
        name: 'lunch',
        id: 2
      },
      {
        name: 'appetizer',
        id: 3
      },
      {
        name: 'dinner',
        id: 4
      },
      {
        name: 'side',
        id: 5
      },{
        name: 'dessert',
        id: 6
      }
    ];
    this.subcategories = [
      {
        name: 'paleo',
        id: 1
      },
      {
        name: 'keto',
        id: 'keto'
      },
      {
        name: 'fall',
        id: 'fall'
      },
      {
        name: 'spring',
        id: 4
      },
      {
        name: 'summer',
        id: 5
      },
      {
        name: 'instant pot',
        id: 6
      },
      {
        name: 'meal prep',
        id: 7
      },
      {
        name: 'seafood',
        id: 8
      },
      {
        name: 'pork',
        id: 9
      },
      {
        name: 'vegan',
        id: 10
      },
      {
        name: 'vegetarian',
        id: 11
      }
    ]
    const id = +this.router.snapshot.paramMap.get('id');
    if (id) {
      this.setFormValues(this.recipie);
    }
    else {
      this.createForm();
    }
  }

  amountValidator(c: FormControl) {
    return c.value > 340 ? null : {
      validAmount: {
        valid: false
      }
    };
  }
  createForm() {
    this.recipeForm = this.fb.group({
      name: [{value:'recipie.name', disabled: false}],
      imageUrl: [{value:'recipie.imageurl' , disabled: false}],
      description: [{value:'recipie.description', disabled: false}],
      source: [{value: 'recipie.source', disabled: false}],
      preparation: [{value: 'recipie.preparation', disabled: false}],
      cooking: [{value: 'recipie.cooking', disabled: false}],
      serve: [{value: 'recipie.serve', disabled: false}],
      category: [{value: 'recipie.category', disabled: false}],
      subcategory: [{value: 'recipie.subcategory', disabled: false}],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
      calories: [{value: 'recipie.calories', disabled: false}]
    });
    this.onChanges();
  }

  setFormValues(data) {
    this.recipeForm = this.fb.group({
      name: [{value: data.name ? data.name : null, disabled: false}, Validators.required],
      imageUrl: [{value: data.imageUrl ? data.imageUrl : null, disabled: false}],
      description: [{value: data.description ? data.description : null, disabled: false}, Validators.required],
      source: [{value: data.source ? data.source : null, disabled: false}],
      preparation: [{value: data.preparation ? data.preparation : null, disabled: false}],
      cooking: [{value: data.cooking ? data.cooking : null, disabled: false}],
      serve: [{value: data.serve ? data.serve : null, disabled: false}],
      category: [{value: data.category ? data.category : null, disabled: false}],
      category1: [{value: data.category ? data.category : null, disabled: false}],
      subcategory: [{value: data.subcategory ? data.subcategory : [], disabled: false}],
      subcategory1: [{value: data.subcategory ? data.subcategory : [], disabled: false}],
      ingredients: this.fb.array([]),
      steps: this.fb.array([]),
      calories: [{value: data.calories, disabled: false}, Validators.required, this.amountValidator]
    })
  
    const arrayControl = <FormArray>this.recipeForm.controls['ingredients'];
    data.ingredients.forEach(item => {
       const newGroup = this.fb.group({
        name: [item.name, [Validators.required]],
        amount: [item.amount, [Validators.required]]
      });
      arrayControl.insert(arrayControl.length, newGroup);
    });
  }
  getControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }
  getControlsstep() {
    return (this.recipeForm.get('steps') as FormArray).controls;
  }
  onChanges() {
    this.recipeForm.get('category').valueChanges.subscribe(val => {
      const subCategoryControl = this.recipeForm.get('subcategory');
      if (val) {
        //update our validators
        subCategoryControl.setValidators(Validators.required); 
        //update formControl validity based on new validators
        subCategoryControl.updateValueAndValidity();
      }
      else {
        //remove validators cause we don't want them if no category val
        subCategoryControl.setValidators(null);
        //update formControl validity based on new validators
        //in case they were marked as invalid from previously
        subCategoryControl.updateValueAndValidity();
      }
    });
  }

  onSubmit() {    
    if (this.recipeForm.valid) {
      // this.recipeFormData = this.recipeForm.value;
      this.edited= this.recipeForm.value;
      this.recipiesService.editRecipie(this.id, this.edited)
      .subscribe(
        res => {
          console.log(res);
          alert("Success");
          this.route.navigate(["/myRecipies"]);
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
         
            }
          }
        }
      )
    }
  else {  
      Object.keys(this.recipeForm.controls).forEach(field => {
        const control = this.recipeForm.get(field);
        if (!control['controls'])
        {
          control.markAsTouched({ onlySelf: true });
        }
        else 
        {
          let nestedFormArray = control['controls'];
          nestedFormArray.forEach(subcCtrlGp => {
            Object.keys(subcCtrlGp['controls']).forEach(subField => {
              const nestedControl = subcCtrlGp.get(subField);
              nestedControl.markAsTouched({ onlySelf: true });
            });
          });
        }
     })
    }
  }

  public addIngredient() {
    const ingredientsFormArray = <FormArray>this.recipeForm.controls['ingredients'];
    const ingredientFormGroup = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      amount: new FormControl(null, [Validators.required])
    });
    ingredientsFormArray.insert(ingredientsFormArray.length, ingredientFormGroup);
  }

  public removeIngredient(i) {
    const ingredientsFormArray = <FormArray>this.recipeForm.controls['ingredients'];
    ingredientsFormArray.removeAt(i);
  }
  public addstep() {
    const stepFormArray = <FormArray>this.recipeForm.controls['steps'];
    const stepFormGroup = new FormGroup({
      step: new FormControl(null, [Validators.required])
    });
    stepFormArray.insert(stepFormArray.length, stepFormGroup);
  }

  public removestep(i) {
    const stepFormArray = <FormArray>this.recipeForm.controls['steps'];
    stepFormArray.removeAt(i);
  }
}


