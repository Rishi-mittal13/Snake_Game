

let buttons = document.querySelectorAll('button');
let input = document.querySelector('input');


for(let button of buttons){
    button.addEventListener('click' , function(event){
        let btnText = event.target.innerText;
        if(btnText === 'AC'){
            input.value = ""
        }
        else if(btnText==='CE'){
            input.value = input.value.slice(0 ,input.value.length-1 )

        }
        else if(btnText==='×'){
            input.value+='*';
        }
        else if(btnText === '='){
            try{
                let a = input.value;
                input.value = eval(input.value);
                let b =  input.value;

            }
            catch(e){
                input.value = 'Invalid input';
            }
        }
        else{
            input.value += btnText;
        }
    })
}

















