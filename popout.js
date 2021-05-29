//create-todo <- creates todo button onclick ".new-item"
//new-item <-if button pressed, saves and hides "new-item"

document.querySelector('.create-todo').addEventListener('click',function(){
    document.querySelector('.new-item').style.display='block';
});

document.querySelector('.new-item button').addEventListener('click', function(){
    
    var itemName = document.querySelector('.new-item input').value;
    if (itemName != ''){
        var itemsStorage = localStorage.getItem('todo-items');
        var itemsArr = JSON.parse(itemsStorage);
        itemsArr.push({"item":itemName, "status":0});
        saveItems(itemsArr);
        fetchItems();
        document.querySelector('.new-item input').value='';
        document.querySelector('.new-item').style.display='none';
    }
});


function fetchItems(){

    const itemsList = document.querySelector('ul.todo-items');
    itemsList.innerHTML = '';
    var newItemHTML = '';

    try{

    var itemsArr = JSON.parse(items);

    for(var i = 0; i < itemsArr.length; i++){
        var status = '';
        if (itemsArr[i].status == 1){
            status = 'class="done"';
        }
        newItemHTML += `<li data-itemindex = "${i}" ${status}> <span class="item">${itemsArr[i].item}</span> <div><span onclick="itemComplete('${i}')"> O </span><span onclick="itemDelete('${i}')"> X </span></div></li>`
        itemsArr[i];
    }

    itemsList.innerHTML = newItemHTML;
    
    var itemsListUL = document.querySelectorAll('ul li');
    for(var i = 0; i < itemsListUL.length; i++){

        itemsListUL[i].querySelector('.itemComplete').addEventListener('click', function(){

            var index = this.parent.parentNode.dataset.itemindex;
            itemComplete(i);

        });

        itemsListUL[i].querySelector('.itemDelete').addEventListener('click', function(){

            var index = this.parent.parentNode.dataset.itemindex;
            itemDelete(i);

        });

    }
}

    catch(e){

    }

}

function itemComplete(index){

    var items = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(items);

    itemsArr[index].status=1;

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').className='done';

}

function itemDelete(index){

    var items = localStorage.getItem('todo-items');
    var itemsArr = JSON.parse(items);

    itemsArr.splice(index, 1);

    saveItems(itemsArr);

    document.querySelector('ul.todo-items li[data-itemindex="'+index+'"]').remove();
}
function saveItems(obj){

    var string = JSON.stringify(obj);

    localStorage.setItem('todo-items', string);

}

fetchItems();