async function saveToLocalStorage(event) {
  event.preventDefault();
  const userid = Math.floor(1000 * Math.random());
  const Selling = event.target.Selling.value;
  const Product = event.target.Product.value;

  const obj = {
    userid,
    Selling,
    Product,
  };

  try {
    const send = await axios.post(
      "https://crudcrud.com/api/399e61719dce4363a7dc991f3aefaa8e/stock",
      obj
    );
    {
      showUserOnScreen(send.data);
      console.log(send);
    }
  } catch (err) {
    document.body.innerHTML += `${err}`;
  }
}

window.addEventListener("DOMContentLoaded", async () => {
  // when the screen used to load=(we have to read data crud crud get request)
  //    axios.get is network call (asynchronously)
  try {
    const response = await axios.get(
      "https://crudcrud.com/api/399e61719dce4363a7dc991f3aefaa8e/stock"
    );

    const obj = [];
    for (let i = 0; i < response.data.length; i++) {
      obj.push(response.data[i]);
    }
    let sum = 0;
    for (let i = 0; i < obj.length; i++) {
      let amount = 0;
      amount = +obj[i].Selling;
      sum = sum + amount;
    }
    console.log(sum);
    const list = document.getElementById("listitem");
    const list2 = sum;
    list.innerHTML += list2;

    console.log(response);

    for (var i = 0; i < response.data.length; i++) {
      showUserOnScreen(response.data[i]);
    }
  } catch (err) {
    document.body.innerHTML += `${err}`;
  }
});

function showUserOnScreen(user) {
  document.getElementById("Selling").value = "";
  document.getElementById("Product").value = "";

  const parentNode = document.getElementById("listOfitem");
  const childHTML = `<li id='${user._id}'>'${user.Selling}' - '${user.Product}' <button onclick=deleteUser('${user._id}')>Delete</button></li>`;
  parentNode.innerHTML = parentNode.innerHTML + childHTML;
}

async function deleteUser(userid) {
  try {
    const userend = await axios.delete(
      `https://crudcrud.com/api/399e61719dce4363a7dc991f3aefaa8e/stock/${userid}`
    );
    showUserOnScreen(user)
    {
      removeUserFromScreen(userend);
    }
  } catch (err) {
    document.body.innerHTML += `${err}`;
  }
  
}

function removeUserFromScreen(userend) {
  const parentNode = document.getElementById("listOfitem");
  const childNodeToBeDeleted = document.getElementById(userend);
  if (childNodeToBeDeleted) {
    parentNode.removeChild(childNodeToBeDeleted);
  }
}
