export interface Template {
name:string;
desc:string
category:string;
icon:string;
aiPrompt:string;
slug:string;
form:Form[];
    
}

export interface Form{
    label:string;
    type:string;
    name:string;
    placeholder:string;
    required:boolean;

}


export const template:Template[]=[
    {
        name:"Linkedin Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    },
    {
        name:"Blog Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    }
    ,
    {
        name:"Blog Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    },
    {
        name:"Blog Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    }
    ,
    {
        name:"Blog Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    },
    {
        name:"Blog Title",
        desc:"An Ai tool which generates Tilte on the basis of the content of the blog",
        category:"Blog",
        icon:"https://cdn-icons-png.flaticon.com/128/2537/2537860.png",
        aiPrompt:"Give me 5 blog ideas in bullet points on the bases on followin g content and niche",
        slug:"blog-title",
        form:[
           { label:"Enter your niche:",type:"text", name:"niche",placeholder:"Enter your niche",required:true},
           { label:"Enter your content:",type:"textarea", name:"content",placeholder:"Enter your content",required:true},

        ]
    }

]