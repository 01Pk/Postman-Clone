// console.log('Hello');
// Initialize no of parameters

// Utility Functions:

// 1. Utility Function to get the DOM Element from string
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}
let addedParamsCount = 0;

// Hide the parameter box initally

let parametersBox = document.getElementById('parameterBox');
parametersBox.style.display = "none";

// If the user clicks on params box, hide the json box

let paramsRadio = document.getElementById('paramsradio');
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = "none";
    document.getElementById('parameterBox').style.display = "block";
});

// If the user clicks on json box, hide the json box


let jsonRadio = document.getElementById('jsonradio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('parameterBox').style.display = "none";
    document.getElementById('requestJsonBox').style.display = "block";
});

// if the user click on the add parameter button
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    // console.log('kya hua?');
    let params = document.getElementById('params');
    let string = `      <div class="form-row my-2">
                        <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamsCount + 2}</label>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterkey${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                        <input type="text" class="form-control" id="parametervalue${addedParamsCount + 2}" placeholder="Enter Parameter  ${addedParamsCount + 2} Value">
                        </div>
                        <button type="button"  class="btn btn-primary deleteParam">-</button>
                        </div>`;
    //Convert the element string to DOM node

    let paramElement = getElementFromString(string);
    //   console.log(paramElement); 

    params.appendChild(paramElement);

    // Add an event listener to remove the parameter on clicking - button

    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            // console.log();
            e.target.parentElement.remove();
        });
    }
    addedParamsCount++;

});

// if the user  click on submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    // Show please wait in the response box to request patience from user
    document.getElementById("responseJsonText").value = 'Please Wait...';

    //Fetch all the values user has Entered
    let url = document.getElementById("urlField").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    // If the user has used params option instead of json, collect all the parameter in an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount + 1; i++) {
            if (document.getElementById('parameterkey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterkey' + (i + 1)).value;
                let value = document.getElementById('parametervalue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data);
        console.log(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
        console.log(data);
    }
    //if the requestType is GET invoked fetch api
    if (requestType == 'GET') { 
        fetch(url, {
            method: 'GET',
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }
    else{
        fetch(url, {
            method: 'POST',
            body:data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }
        })
            .then(response => response.text())
            .then((text) => {
                document.getElementById('responseJsonText').value = text;
            });
    }
    //Log all the value in the console for debugging
    // console.log(url);
    // console.log(requestType);
    // console.log(contentType);
    // console.log("data is " + data);

});