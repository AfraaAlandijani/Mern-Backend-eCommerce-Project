import { Schema ,model} from "mongoose";
import { CategoryInput } from "../types/categoryTypes";


const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: [3, 'Category name must me at least 3 chracters'],
        maxlength: [100,'Category name must be at most 100 chracters']
    },
    slug: {
        type: String,
        unique: true,
        lowercase:true
    }
},
    {timestamps:true}
    
);

export const Category = model<CategoryInput>("Categories", categorySchema);

