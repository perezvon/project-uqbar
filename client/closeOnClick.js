const boxArray = ['user-dropdown-menu'];
window.addEventListener('mouseup', function(event){
	for(let i=0; i < boxArray.length; i++){
	    let box = document.getElementById(boxArray[i]);
	    if(box && event.target.parentNode != box){
		   box.style.display = 'none';
	    }
	}
});