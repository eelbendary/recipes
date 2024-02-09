searchresult = document.querySelector(".search-result");
searxhbtn = document.getElementById("searchbtn");
searxhbtn.addEventListener("click", getMeals);
function randomMeals() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((result) => {
      let myData = result.json();
      return myData;
    })
    .then((myData) => {
      console.log(myData);
      searchresult.innerHTML = "";
      for (let i = 0; i < myData.categories.length; i++) {
        searchresult.innerHTML += `
        <div class="col-lg-4 col-md-6 box my-4">
        <img src="${myData.categories[i].strCategoryThumb}" style="width: 100%;">
        <div class="des">
          <h3 class=" px-2 text-center">${myData.categories[i].strCategory}</h3>
           </div>
      </div>`;
      }
    });
}
randomMeals();
function getMeals() {
  searMeal = document.getElementById("search-meal").value.trim();
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searMeal}`)
    .then((result) => {
      let myData = result.json();
      return myData;
    })
    .then((myData) => {
      console.log(myData.meals[0]);
      searchresult.innerHTML = "";
      for (let i = 0; i < myData.meals.length; i++) {
        searchresult.innerHTML += `
      <div class="col-lg-3 col-md-3 box my-4 animate__flash dur2">
        <img src="${myData.meals[i].strMealThumb}" style="width: 100%;">
        <div class="des">
          <h3 class=" px-2 text-center">${myData.meals[i].strMeal}</h3>
          <div class="wrapper side-panel-open">
          <button class=" popbtn " onclick="getRecip(${myData.meals[i].idMeal}
          )" >Get  rec</button>
        </div>
      </div>
    </div>`;
      }
    });
  recbtn = document.querySelectorAll(".rec");
  console.log(recbtn);
}
ric1 = document.getElementById("recinfo");
function getRecip(i) {
  console.log(i);
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${i}`)
    .then(async (result) => {
      let myDataric = await result.json();
      return myDataric;
    })
    .then((myDataric) => {
      console.log(myDataric);
      // ric1.style.display = "block";
      console.log("popup");
      let ing = "";

      for (let i = 1; i <= 20; i++) {
        if (myDataric.meals[0][`strIngredient${i}`] === "") {
          continue;
        } else {
          console.log(myDataric.meals[0][`strIngredient${i}`]);
          ing += myDataric.meals[0][`strIngredient${i}`] + ",  ";
        }
      }
      ric1.innerHTML = "";
      ric1.innerHTML = `
      <div class="pop-up" id="popUp${i}">
    <div class="side-panal inner">
      <div class="container ric">
        <p id="close"><i class="ri-close-line"></i></p>
        <div class= d-flex>
        <div style="width:45%;" >
        <img  class="desimg"src=${myDataric.meals[0].strMealThumb}> 
        </div>
        <div>
        <h4>${myDataric.meals[0].strMeal}</h4>
        <p>ingredian: ${ing}</p>
        <button class="video" ><a href=${myDataric.meals[0].strYoutube}><i class="ri-youtube-fill"></i>Watch video</a></button>
        </div>
        </div>
      </div>
    </div>
  </div>
      `;
      popup = document.querySelector(`#popUp${i}`);
      popup.classList.add("show");
      close = document.getElementById("close");
      close.addEventListener("click", () => popup.classList.remove("show"));
    });
}
