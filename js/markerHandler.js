AFRAME .registerComponent("markerhandler",{
    init:async function(){ 
        var toys = await this.getToys();
this.el.addEventListener("markerFound",()=>{
    console.log("marker is found")
    var markerId = this.el.id 
    this.handleMarkerFound(toys,markerId)
} )
this.el.addEventListener("markerLost",()=>{
    console.log("marker is lost")
    this.handleMarkerLost()
})
    },
    handleMarkerFound: function (toys, markerId) {
        var toy = toys.filter(toy=>toy.id===markerId)[0]
        if(toy.unavailable_toy.includes(toy.unavailable_toy==="unavailable")){
    swal({
      icon:"warning",
      title:dish.dish_name.toUpperCase(),
      text:"this toy is not available",
      timer:2500,
      buttons:false
    })
        }
        else{
          var model = document.querySelector(`#model-${toy.id}`);    
         
          model.setAttribute("id", `model-${toy.id}`);
          model.setAttribute("position", toy.model_geometry.position);
          model.setAttribute("rotation", toy.model_geometry.rotation);
          model.setAttribute("scale", toy.model_geometry.scale);
          model.setAttribute("visible",true)
          var descContainer = document.querySelector(`#main-plane-${toy.id}`)
          descContainer.setAttribute("visible",true)
    
          var pricePlane = document.querySelector(`#price-plane-${toy.id}`)
          pricePlane.setAttribute("visible",true)
        }
        // Changing button div visibility
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "flex";
    
        var ratingButton = document.getElementById("rating-button");
        var orderButtton = document.getElementById("order-button");
    
        // Handling Click Events
        ratingButton.addEventListener("click", function () {
          swal({
            icon: "warning",
            title: "Rate Dish",
            text: "Work In Progress"
          });
        });
    
        orderButtton.addEventListener("click", () => {
          swal({
            icon: "https://i.imgur.com/4NZ6uLY.jpg",
            title: "Thanks For Order !",
            text: "Your toy will arrive soon>:("
          });
        });

        var toy = toys.filter(toy => toy.id === markerId)[0];
    
        var model = document.querySelector(`#model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
      },
    handleMarkerLost:function(){
        var buttondiv = document.getElementById("button-div")
        buttondiv.style.display = "none"
    },
    getToys:async function(){
        return await firebase.firestore().collection("toys").get().then(snap=>{
            return snap.docs.map(doc=>doc.data())
        })
           }

})