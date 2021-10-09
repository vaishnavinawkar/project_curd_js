document.querySelector('#search-icon').onclick = () => {
    document.querySelector('#search-form').classList.toggle('active');
  
  }
  
  
  document.querySelector('#close').onclick = () => {
    document.querySelector('#search-form').classList.remove('active');
      
  }
  
  
  //-----------------------------------------------------------------
  
  let globalRecipeData = [];
  RecipeContents = document.getElementById("RecipeContents");
  const taskModal = document.querySelector(".task__modal__body");
  
  
  const addCard = () => {
      
      const newRecipeDetails = {
        id: `${Date.now()}`, 
        url: document.getElementById("imageURL").value,
        title: document.getElementById("title").value,
        recipeName: document.getElementById("recipeName").value,
        
        ingredient:document.getElementById("ingredient").value,
        description: document.getElementById("description").value,
        procdure: document.getElementById("procdure").value
      };
     
      RecipeContents.insertAdjacentHTML('beforeend', generateRecipeCard(newRecipeDetails));
    
      globalRecipeData.push(newRecipeDetails);
      saveToLocalStorage();
  
  
  
  }
  
  const generateRecipeCard = ({id,url, title,recipeName , ingredient,description,procdure}) => {
  
      return (`<div class="col-md-6 col-lg-4 mt-3" id=${id} keys=${id}>
      <div class="card" >
          <div class="card-header">
              <h4 class="card-title">${title}</h4>
              <div class="d-flex justify-content-end">
  
                  <button type="button" class="btn btn-outline-secondary" name=${id} onclick="EditRecipe(this)" >
                      <i class="fas fa-pencil-alt"  name=${id}></i>
                  </button>
                  <button type="button" class="btn btn-outline-danger" name="${id}" onclick="deleteRecipe(this)">
                      <i class="far fa-trash-alt" name=${id} ></i>
                  </button>
              </div>
          </div>
          <img src=${url} class="card-img-top" alt="image"/>
          <div class="card-body">
             
              <h5 class="card-title" >${recipeName}</h5>
              <hr style="color: rgb(215, 245, 186); width: 100%;height: 5px;">
          
  
              <p class="card-text "  >${ingredient}</p>
              <hr style="color: rgb(215, 245, 186); width: 100%;height: 5px;">
  
  
              <p class="card-text">${description}</p>
              <hr style="color: rgb(215, 245, 186); width: 100%;height: 5px;">
  
             <p class="card-text">${procdure}</p>
             <hr style="color: rgb(215, 245, 186); width: 100%;height: 5px;">
          </div>
          <div class="card-footer ">
              <a href="#" class="btn btn-outline-success float-end">
                  <i class="far fa-thumbs-up"></i>
              </a>
              <a href="#" class="btn btn-outline-success float-end">
                  <i class="far fa-thumbs-down"></i>
              </a>
              <button type="button" class="btn btn-outline-success "  data-bs-toggle="modal"  data-bs-target="#showRecipe" name=${id} onclick:"saveEditRecipe(this,arguments)">Open</button>
  
          </div>
      </div>
  </div>
  </div>`)
  
  };
  
  // const openRecipe = (e) => {
  //   const targetID = e.getAttribute("name");
  
  //   const getRecipe = globalRecipeData.filter(( e) => e.id! === targetID );
  //   taskModal.innerHTML = generateRecipeCard(getRecipe[0]);
  // };
  
  
  
  
  const saveToLocalStorage = () => {
   
     localStorage.setItem("Recipes", JSON.stringify({tasks: globalRecipeData}) );
  }
  
  const reloadRecipeCard = () =>{
    const localStorageCopy = JSON.parse(localStorage.getItem("Recipes"));
    console.log(localStorageCopy);
    if (localStorageCopy){
       globalRecipeData= localStorageCopy["tasks"];
    }
    // console.log(globalRecipeData);
    globalRecipeData.map((cardData) => {
      
      RecipeContents.insertAdjacentHTML('beforeend', generateRecipeCard(cardData));
    })
  }
  
  const deleteRecipe = (e) => {
    const targetID = e.getAttribute("name");
   
   globalRecipeData = globalRecipeData.filter((e) => e.id!== targetID);
   saveToLocalStorage();
   window.location.reload();
    
  }
  
  const EditRecipe = (e) => {
    const targetID = e.getAttribute("name");
  console.log(e);
  console.log(e.parentNode);
  
  console.log(e.parentNode.parentNode.childNodes[1]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1]); 
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[9]);
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[13]);
  
  
  console.log(e.parentNode.parentNode.childNodes[1].setAttribute("contenteditable","true"));
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].setAttribute("contenteditable","true")); 
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].setAttribute("contenteditable","true"));
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[9].setAttribute("contenteditable","true"));
  console.log(e.parentNode.parentNode.parentNode.childNodes[5].childNodes[13].setAttribute("contenteditable","true"));
  
  
  
  
  console.log(e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5]);
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5].setAttribute("onclick","saveEditRecipe(this)");
  // e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5].setAttribute("onclick","openRecipe(this,arguments)");
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5].setAttribute("data-bs-toggle", "modal");
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5].setAttribute("data-bs-target", "#showTask");
  e.parentNode.parentNode.parentNode.childNodes[7].childNodes[5].innerHTML = "Save Changes";
  
   }
  
  
  
   
  
  const savedEditRecipe = (e) =>{
    e.innerHTML="OPEN"
    e.style.color="green"
    e.style.background = "transparent"
    e.style.border = "solid 2px green"
    console.log(e.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1].style = "display : visible")
    console.log(e.parentNode.parentNode.childNodes[1].childNodes[1].childNodes[1])
    const title = e.parentNode.parentNode.parentNode.childNodes[1].innerHTML
    const recipeName = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[1].innerHTML
    const ingredient = e.parentNode.parentNode.parentNode.childNodes[5].childNodes[5].innerHTML
    const  description=e.parentNode.parentNode.parentNode.childNodes[5].childNodes[9].innerHTML
    const procdure=e.parentNode.parentNode.parentNode.childNodes[5].childNodes[13].innerHTML
    const targetiD = e.getAttribute("name")
    let Ftarget = globalRecipedata.filter((card)=>{
            if(card.id == targetiD){
               card.title = title
               card.recipeName=recipeName
               card.ingredient=ingredient
               card.description =description
               card.procdure=procdure
            }
            return card
    })
    console.log(Ftarget)
    globalRecipedata = Ftarget
   saveToLocalStorage()
  }
  
  
  
  
  
  