let product_name = document.getElementById("product_name");
let product_price = document.getElementById("product_price");
let product_description = document.getElementById("product_description");
let product_category = document.getElementById("product_category");
let tbody = document.getElementById("tbody");
let search = document.getElementById("search");
let update = document.getElementById("update");
let add = document.getElementById("add");
let product_list = []
let list = JSON.parse(localStorage.getItem('products'));
if (localStorage.getItem('products') == null) {
    product_list = []
} else {
    product_list = list
    display_list();
}

function add_product() {

    var product = {
        p_name: product_name.value,
        p_price: product_price.value,
        p_description: product_description.value,
        p_category: product_category.value
    }
    product_list.push(product);
    localStorage.setItem('products', JSON.stringify(product_list));
    display_list();
    // clear();
}


function display_list() {

    var row = ``;
    for (var i = 0; i < product_list.length; i++) {
        row += `
        <tr>
                        <td>${i}</td>
                        <td>${product_list[i].p_name}</td>
                        <td>${product_list[i].p_price}</td>
                        <td>${product_list[i].p_description}</td>
                        <td>
                            <button class="btn btn-info" onclick="update_product(${i})">update</button>
                            <button class="btn btn-danger" onclick="delete_product(${i})">delete</button>
                        </td>
                    </tr>
                </tbody>
        `
    }
    tbody.innerHTML = row;

}

function delete_product(id) {
    product_list.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(product_list));
    display_list();
}

function search_product() {
    var row = ``;

    for (var i = 0; i < product_list.length; i++) {
        if (product_list[i].p_name.toLowerCase().includes(search.value)) {
            row += `
        <tr>
                        <td>${i}</td>
                        <td>${product_list[i].p_name}</td>
                        <td>${product_list[i].p_price}</td>
                        <td>${product_list[i].p_description}</td>
                        <td>
                            <button class="btn btn-info" onclick="update_product(${i})">update</button>
                            <button class="btn btn-danger" onclick="delete_product(${i})">delete</button>
                        </td>
                    </tr>
                </tbody>
        `
        } else {
            display_list();
        }


    }
    tbody.innerHTML = row;
}

function update_product(id) {
    let updated_row = product_list[id];
    update.style.display = "block"
    add.style.display = "none";
    product_name.value = product_list[id].p_name;
    product_price.value = product_list[id].p_price;
    product_description.value = product_list[id].p_description;
    product_category.value = product_list[id].p_category;
    product_list.splice(id, 1);
    localStorage.setItem('products', JSON.stringify(product_list));
    add_product();
    add.style.display = "block";
    update.style.display = "none"
    
}

function clear(){
    product_name.value =" ";
    product_price.value =" ";
    product_description.value =" ";
    product_category.value =" ";  
}