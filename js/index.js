
let rowData=document.getElementById("rowData");
let searchContainer= document.getElementById("searchContainer");
let submitBtn;
let nameInputTouched= false;
let emailInputTouched= false;
let ageInputTouched= false;
let phoneInputTouched= false;
let passwordInputTouched= false;
let repasswordInputTouched= false;



 function openSideNav(){

      $(".side-nav-menue").animate({left:0},500);
      $(".open-close-icon").removeClass("fa-align-justify");
      $(".open-close-icon").addClass("fa-x");
        
        for(i=0; i<5; i++){
            $(".link li").eq(i).animate({top:0},(i+5)*100);

        }
 }


 function closeSideNav(){

    let boxWidth= $(".side-nav-menue .nav-tab").outerWidth();
    $(".side-nav-menue").animate({left:-boxWidth},500);
    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".link li").animate({top:300},500);

 }

 closeSideNav()

 $(".side-nav-menue i.open-close-icon").click(()=>{
    if($(".side-nav-menue").css("left")=="0px")
    {
        closeSideNav()
    }

    else
    {
        openSideNav();
    }  
 })

 

 function displayMeaLs(arr){
    cartona=``;
    for(let i=0; i<arr.length; i++){
        cartona+=`
        <div class="col-md-3">
        <div onclick="getMealDetails('${arr[i].idMeal}')"  class="meal position-relative overflow-hidden rounded-2 carousel-pointer">
           <img  class="w-100" src="${arr[i].strMealThumb}"  alt="">
           <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
              <h3> ${arr[i].strMeal} </h3>
           </div>
        </div>
   </div>
        
        `
    }
   rowData.innerHTML=cartona;
  }
  searchByName("");

  async function getCategories(){
   searchContainer.innerHTML=""
     let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
     response= await response.json();
     displayCategories(response.categories);

  }


   function displayCategories(arr){

      cartona=``;
      for(let i=0; i<arr.length; i++){
          cartona+=`
          <div class="col-md-3">
          <div onclick="getCategoryMeals('${arr[i].strCategory}')" class="meal position-relative overflow-hidden rounded-2 carousel-pointer">
             <img  class="w-100" src="${arr[i].strCategoryThumb}"  alt="">
             <div class="meal-layer position-absolute text-center text-black p-2">
                <h3> ${arr[i].strCategory} </h3>
                <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ") }</p>
             </div>
          </div>
     </div>
          
          `
      }

      rowData.innerHTML=cartona;
   }
   

   async function getArea(){
      searchContainer.innerHTML=""
       let response= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
       response= await response.json();
       displayArea(response.meals);

   }
   
   function displayArea(arr){

      let cartona=``;
      for(i=0; i< arr.length; i++){
         cartona+=`
         <div class="col-md-3">
         <div onclick="getAreaMeals('${arr[i].strArea}')" class=" meal text-center rounded-2 carousel-pointer">
              <i class="fa-solid fa-house-laptop fa-4x"></i>
               <h3> ${arr[i].strArea} </h3>
         </div>
    </div>
         
         `
      }

       rowData.innerHTML=cartona;
   }


   async function getIngredients() {
      searchContainer.innerHTML=""
      let response= await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
      response= await response.json();
      console.log(response.meals);
      displayIngredients(response.meals.slice(0,20));
  }
  
  function displayIngredients(arr) {

     let cartona=``;
     for(i=0; i<arr.length; i++){
      cartona+=`
      <div class="col-md-3">
      <div  onclick="getIngredientsMeals('${arr[i].strIngredient}')"  class="meal text-center rounded-2 carousel-pointer">
           <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <h3> ${arr[i].strIngredient} </h3>
            <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ") }</p>
      </div>
 </div>
      
      `
   }

      rowData.innerHTML=cartona;
  }


 async function getCategoryMeals(category){

       let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
       response= await response.json();
       displayMeaLs(response.meals.slice(0,20));

  }

  async function getAreaMeals(area){

   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
   response= await response.json();
   displayMeaLs(response.meals.slice(0,20));

}

async function getIngredientsMeals(ingredients){

   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`);
   response= await response.json();
   displayMeaLs(response.meals.slice(0,20));

}

async function getMealDetails(mealID){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealID}`);
   response= await response.json();
   console.log(response.meals[0]);
   displayMealsDetails(response.meals[0]);
}


function displayMealsDetails(meal){
   searchContainer.innerHTML=""
  let ingredients='';
  for(let i=1; i<=20; i++){
     if(meal[`strIngredient${i}`]){
       ingredients+=`<li class=" alert alert-info m-2 p-1"> ${meal[`strMeasure${i}`]} ${meal[`strIngredient${i}`]}</li>`


     }
   
  }

   let tags=  meal.strTags?.split(",");
   if (!tags) tags=[];
   let tagsStr= ''
   for ( let i=0; i<tags.length; i++){
      tagsStr+=`
      <li class=" alert alert-danger m-2 p-1">${tags[i]}</li>
      `
   }
  let cartona=`
   <div class="col-md-4">
    <img class="rounded-2 w-100"  src="${meal.strMealThumb}" alt="">
    <h2> ${meal.strMeal}</h2>
    </div>
  <div class="col-md-8">
  <h2> Instructions</h2>
  <p>${meal.strInstructions}</p>
  <h3><span class="fa-bolder">Area:</span>${meal.strArea}</h3>
  <h3><span class="fa-bolder">Catergory:</span>${meal.strCategory}</h3>
  <h3> Recipes</h3>
  <ul class="list-unstyled d-flex g-5 flex-wrap">
    ${ingredients};
   </ul>

   <h3>Tags</h3>
   <ul class="list-unstyled d-flex g-5 flex-wrap">
       ${tagsStr}
     </ul>

     <a target="_blank" href="${meal.strSource}"  class="btn btn-success">Source</a>
     <a  target="_blank" href="${meal.strYoutube}"  class="btn btn-danger">Youtube</a>
 </div>`
  rowData.innerHTML=cartona;

}

function searchShowInputs(){

   searchContainer.innerHTML=`
   <div class="row py-4" >
     <div class="col-md-6 py-4 ">
        <input  onkeyup="searchByName(this.value)" type="text" class="form-control bg-transparent text-white" placeholder="Search By Name">
     </div>

    <div class="col-md-6 py-4">
      <input onkeyup="searchByFlitter(this.value)" maxlength="1" type="text" class="form-control bg-transparent text-white " placeholder="Search By First Letter">
   </div>
 </div> 
  `
  rowData.innerHTML= ""
}


async function searchByName(term){
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`);
   response= await response.json();
   response.meals? displayMeaLs(response.meals): displayMeaLs([]);
}


async function searchByFlitter(term){
   term== ""? term="a":""
   let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${term}`);
   response= await response.json();
   response.meals? displayMeaLs(response.meals): displayMeaLs([]);
}

function showContacts(){
         rowData.innerHTML=`
         
         <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
         <div class="container w-75 justify-content-center align-items-center text-center">
             <div class="row g-4 py-4">
                 <div class="col-md-6 ">
                    <input  id="nameInput" onkeyup="inputsValidation()" type="text" class="form-control " placeholder="Enter Your Name">
                    <div id="nameAlert" class="alert alert-danger w-100 d-none">
                         special character and number not allowed
                    </div>
                 </div>
 
                 <div class="col-md-6 ">
                     <input id="emailInput" onkeyup="inputsValidation()" type="email" class="form-control " placeholder="Enter Your Email">
                     <div id="emailAlert" class="alert alert-danger w-100 d-none">
                         email not valid  *exampley@yyy.zzz
                    </div>
                  </div>
 
                  <div class="col-md-6 ">
                     <input  id="phoneInput" onkeyup="inputsValidation()"  type="text" class="form-control " placeholder="Enter Your Phone">
                     <div id="phoneAlert" class="alert alert-danger w-100 d-none">
                         Enter your valid phone Number
                    </div>
                  </div>
 
                  <div class="col-md-6 ">
                     <input id="ageInput"  onkeyup="inputsValidation()" type="number" class="form-control " placeholder="Enter Your Age">
                     <div id="ageAlert" class="alert alert-danger w-100 d-none">
                         Enter your valid age
                    </div>
                  </div>
                  
                  <div class="col-md-6">
                     <input  id="passwordInput" onkeyup="inputsValidation()" type="password" class="form-control " placeholder="Enter Your Password">
                     <div id="passwordAlert" class="alert alert-danger w-100 d-none">
                     Enter valid password *Minimum eight character, at least one letter and one number:*
                    </div>
                  </div>
 
                  <div class="col-md-6">
                     <input id="reaptPasswordInput" onkeyup="inputsValidation()"  type="password" class="form-control" placeholder="Reapet Your Password">
                     <div id="repasswordAlert" class="alert alert-danger w-100 d-none">
                        Enter your repassword
                    </div>

                  </div>
             </div>
             <button id="submitBtn" disabled class="btn btn-outline-danger "> Submit </button>
         </div>
       </div>   
         
         `
         submitBtn= document.getElementById("submitBtn");

         
 document.getElementById("nameInput").addEventListener("focus",()=>{
   nameInputTouched=true;
  });

  document.getElementById("emailInput").addEventListener("focus",()=>{
   emailInputTouched=true;
  });

  document.getElementById("phoneInput").addEventListener("focus",()=>{
   phoneInputTouched=true;
  });

  document.getElementById("ageInput").addEventListener("focus",()=>{
   ageInputTouched=true;
  });

  document.getElementById("passwordInput").addEventListener("focus",()=>{
   passwordInputTouched=true;
  });

  document.getElementById("reaptPasswordInput").addEventListener("focus",()=>{
   repasswordInputTouched=true;
  });
}


  
function inputsValidation(){
    if(nameInputTouched){
      if(nameValidation()){
         document.getElementById("nameAlert").classList.replace("d-block", "d-none");
         document.getElementById("nameInput").classList.add("is-valid");
      }
    else{
       document.getElementById("nameAlert").classList.replace("d-none", "d-block");
       document.getElementById("nameInput").classList.remove("is-valid");
       
    }

    }
  
     if(emailInputTouched){
      if(emailValidation()){
         document.getElementById("emailAlert").classList.replace("d-block", "d-none");
         document.getElementById("emailInput").classList.add("is-valid");
     }
    else{
       document.getElementById("emailAlert").classList.replace("d-none", "d-block");
       document.getElementById("emailInput").classList.remove("is-valid");
     }  
     }

     if(phoneInputTouched){

      if(phoneValidation()){
         document.getElementById("phoneAlert").classList.replace("d-block", "d-none");
         document.getElementById("phoneInput").classList.add("is-valid");
        }
       else{
        document.getElementById("phoneAlert").classList.replace("d-none", "d-block");
        document.getElementById("phoneInput").classList.remove("is-valid");
        }
     }
   
     if(ageInputTouched){
      if(ageValidation()){
         document.getElementById("ageAlert").classList.replace("d-block", "d-none");
         document.getElementById("ageInput").classList.add("is-valid");
        }
       else{
       document.getElementById("ageAlert").classList.replace("d-none", "d-block");
       document.getElementById("ageInput").classList.remove("is-valid")
       }
     }
  
     if(passwordInputTouched){
      if(passwordValidation()){
         document.getElementById("passwordAlert").classList.replace("d-block", "d-none");
        }
       else{
       document.getElementById("passwordAlert").classList.replace("d-none", "d-block");
       }
     }

     if(repasswordInputTouched){

      if(repasswordValidation()){
         document.getElementById("repasswordAlert").classList.replace("d-block", "d-none");
         document.getElementById("repasswordInput").classList.add("is-valid");
        }
       else{
       document.getElementById("repasswordAlert").classList.replace("d-none", "d-block");
       document.getElementById("repasswordInput").classList.remove("is-valid");
       }
     }
 
 

    if( nameValidation() &&
      emailValidation() &&
      phoneValidation() &&
      ageValidation() &&
      passwordValidation() &&
      repasswordValidation()) {
         submitBtn.removeAttribute("disabled");
      }
      else{
         submitBtn.setAttribute("disabled",true);
      }
}

 function nameValidation(){
   return /^[a-zA-Z\ ]+$/.test(document.getElementById("nameInput").value);
 }

 function emailValidation(){
   return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(document.getElementById("emailInput").value);

 }

 function phoneValidation(){
   return /^[0-9]{1,}$/.test(document.getElementById("phoneInput").value);

 }

 function ageValidation(){
   return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("ageInput").value);

 }

 function passwordValidation(){
   return  /^(?=.*\d)(?=.*[a-z]).{8,}$/.test(document.getElementById("passwordInput").value);

 }

 function repasswordValidation(){
   return document.getElementById("reaptPasswordInput").value == document.getElementById("passwordInput").value;

 }





  