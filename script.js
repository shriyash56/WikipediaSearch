let val="";

var myEfficientFn = debounce(function response(){
  var value = document.getElementById("searchInput").value;

fetch(`https://en.wikipedia.org/w/api.php?&origin=*&format=json&action=opensearch&search=${value}`)
  .then(response => response.json())
  .then(result => {
        let arrayTitle = result[1];
        let arrayLink  = result[3];
        let innerHtml = "";
        let count = 0; 
        if(arrayLink != undefined) {
            if(arrayLink.length === 0) {
                innerHtml+='<li style="font-size:2em;">Result Not Found..</li>'
            }
            arrayLink.forEach(element => {
                innerHtml+=`<li><a href=${element} target="_blank">${arrayTitle[count++]}</a></li>`
            });
        }
        console.log(innerHtml);
        document.getElementById("list").innerHTML = innerHtml;
  })
  .catch(error => console.log('error', error));
}, 250);

window.addEventListener('resize', myEfficientFn);

document.getElementById("searchInput").oninput = ()=>{
    myEfficientFn();
}


function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};