//import { Ingredient } from "./ingredient.model";

export class Recipies {
    constructor(
        public name: String,
        public imageUrl:String,
        public description:String,
        public source:String,
        public preparation:String,
        public cooking:String,
        public serve: String,
        public category:String,
        public subcategory:String,
        public ingredients: [[]],
        public steps:[[]],
        public calories: String
                ) { }
}        